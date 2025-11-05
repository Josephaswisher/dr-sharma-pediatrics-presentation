/**
 * Visual QA Agent
 * Takes screenshots, performs OCR, analyzes with Claude Vision
 *
 * Personality: SAGE (Strategic analysis)
 * Model: Claude Sonnet 4 (best vision model)
 * Confidence: 99%
 */

import puppeteer, { Browser, Page } from 'puppeteer';
import Anthropic from '@anthropic-ai/sdk';
import { saveScreenshot, supabase } from '../lib/supabase';
import * as fs from 'fs/promises';
import * as path from 'path';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export interface VisualQAResult {
  slide_number: number;
  screenshot_path: string;
  screenshot_base64: string;
  ocr_text: string;
  visual_analysis: {
    layout_quality: number; // 0-10
    color_contrast: number; // 0-10
    readability: number; // 0-10
    accessibility_score: number; // 0-100
    issues_found: string[];
    suggestions: string[];
    logic_check: {
      text_matches_visuals: boolean;
      inconsistencies: string[];
    };
  };
  success: boolean;
  error?: string;
}

export class VisualQAAgent {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private screenshotsDir: string;

  constructor() {
    this.screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');
  }

  /**
   * Initialize Puppeteer
   */
  async initialize(): Promise<void> {
    console.log('🔧 Initializing Visual QA Agent...');

    // Ensure screenshots directory exists
    await fs.mkdir(this.screenshotsDir, { recursive: true });

    // Launch browser
    this.browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
      ],
    });

    this.page = await this.browser.newPage();

    // Set viewport
    await this.page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2, // Retina display
    });

    console.log('✅ Visual QA Agent initialized');
  }

  /**
   * Take stabilized screenshot (waits for full render)
   */
  async takeScreenshot(
    slideNumber: number,
    iteration: number
  ): Promise<{ path: string; base64: string }> {
    if (!this.page) {
      throw new Error('Visual QA Agent not initialized');
    }

    const url = `http://localhost:3000/slides/${slideNumber}`;
    console.log(`📸 Taking screenshot of slide ${slideNumber}...`);

    try {
      // Navigate to slide
      await this.page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });

      // Wait for critical elements
      await this.page.waitForSelector('.slide-content', {
        visible: true,
        timeout: 10000,
      });

      // Wait for fonts to load
      await this.page.evaluateHandle('document.fonts.ready');

      // Wait for any animations to settle
      await new Promise(resolve => setTimeout(resolve, 5000));

      // Hide cursor and hover effects
      await this.page.evaluate(() => {
        document.body.style.cursor = 'none';
        const style = document.createElement('style');
        style.textContent = '* { cursor: none !important; }';
        document.head.appendChild(style);
      });

      // Take screenshot
      const filename = `iteration-${iteration}-slide-${slideNumber}.png`;
      const screenshotPath = path.join(this.screenshotsDir, filename);

      const buffer = await this.page.screenshot({
        path: screenshotPath,
        fullPage: true,
        type: 'png',
      }) as Buffer;

      const base64 = Buffer.from(buffer).toString('base64');

      console.log(`✅ Screenshot saved: ${filename}`);

      return {
        path: `/screenshots/${filename}`,
        base64,
      };
    } catch (error) {
      console.error(`❌ Screenshot failed for slide ${slideNumber}:`, error);
      throw error;
    }
  }

  /**
   * Extract text via OCR (using Claude Vision)
   */
  async extractText(base64Image: string): Promise<string> {
    console.log('🔍 Extracting text via OCR...');

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/png',
                  data: base64Image,
                },
              },
              {
                type: 'text',
                text: 'Extract ALL text from this image. Return only the text, exactly as it appears, preserving formatting.',
              },
            ],
          },
        ],
      });

      const textContent = response.content.find((c) => c.type === 'text');
      return (textContent && 'text' in textContent) ? textContent.text : '';
    } catch (error) {
      console.error('❌ OCR failed:', error);
      return '';
    }
  }

  /**
   * Analyze with Claude Vision
   */
  async analyzeVisual(base64Image: string, ocrText: string): Promise<any> {
    console.log('🎨 Analyzing visual quality...');

    try {
      const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4096,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: 'image/png',
                  data: base64Image,
                },
              },
              {
                type: 'text',
                text: `Analyze this medical education slide for Dr. Sharma's pediatric clerkship presentation.

OCR Text Extracted:
${ocrText}

Provide analysis in JSON format:

{
  "layout_quality": <0-10 score>,
  "color_contrast": <0-10 score>,
  "readability": <0-10 score>,
  "accessibility_score": <0-100 WCAG 2.1 AA compliance>,
  "issues_found": [<list of specific issues>],
  "suggestions": [<specific improvements>],
  "logic_check": {
    "text_matches_visuals": <true/false>,
    "inconsistencies": [<any text/visual mismatches>]
  },
  "eric_carle_aesthetic": {
    "has_playful_colors": <true/false>,
    "has_textured_appearance": <true/false>,
    "has_hand_drawn_feel": <true/false>,
    "needs_improvement": [<suggestions for Eric Carle style>]
  }
}

Be thorough but concise.`,
              },
            ],
          },
        ],
      });

      const textBlock = response.content.find((c) => c.type === 'text');
      const analysisText = (textBlock && 'text' in textBlock) ? textBlock.text : '';

      // Extract JSON from response
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('No JSON found in analysis response');
    } catch (error) {
      console.error('❌ Visual analysis failed:', error);
      return {
        layout_quality: 0,
        color_contrast: 0,
        readability: 0,
        accessibility_score: 0,
        issues_found: ['Analysis failed'],
        suggestions: [],
        logic_check: {
          text_matches_visuals: false,
          inconsistencies: ['Could not analyze'],
        },
      };
    }
  }

  /**
   * Analyze single slide
   */
  async analyzeSlide(
    slideNumber: number,
    iteration: number
  ): Promise<VisualQAResult> {
    console.log(`\n🔍 VISUAL QA - Slide ${slideNumber} (Iteration ${iteration})`);

    try {
      // Take screenshot
      const { path: screenshotPath, base64 } = await this.takeScreenshot(
        slideNumber,
        iteration
      );

      // Extract text
      const ocrText = await this.extractText(base64);

      // Analyze visual
      const analysis = await this.analyzeVisual(base64, ocrText);

      // Save to Supabase
      await saveScreenshot({
        iteration,
        slide_number: slideNumber,
        screenshot_url: screenshotPath,
        screenshot_base64: base64.substring(0, 1000), // Truncate for storage
        ocr_text: ocrText,
        visual_analysis: analysis,
        issues_found: analysis.issues_found || [],
        accessibility_score: analysis.accessibility_score || 0,
        quality_score: Math.round(
          (analysis.layout_quality +
            analysis.color_contrast +
            analysis.readability) /
            3 *
            10
        ),
      });

      console.log(`✅ Visual QA complete for slide ${slideNumber}`);
      console.log(`   Accessibility: ${analysis.accessibility_score}/100`);
      console.log(`   Issues found: ${analysis.issues_found?.length || 0}`);

      return {
        slide_number: slideNumber,
        screenshot_path: screenshotPath,
        screenshot_base64: base64,
        ocr_text: ocrText,
        visual_analysis: analysis,
        success: true,
      };
    } catch (error: any) {
      console.error(`❌ Visual QA failed for slide ${slideNumber}:`, error);
      return {
        slide_number: slideNumber,
        screenshot_path: '',
        screenshot_base64: '',
        ocr_text: '',
        visual_analysis: {
          layout_quality: 0,
          color_contrast: 0,
          readability: 0,
          accessibility_score: 0,
          issues_found: ['Visual QA failed'],
          suggestions: [],
          logic_check: {
            text_matches_visuals: false,
            inconsistencies: [],
          },
        },
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Analyze all slides
   */
  async analyzeAllSlides(iteration: number, totalSlides: number = 33): Promise<VisualQAResult[]> {
    console.log(`\n📸 Analyzing all ${totalSlides} slides (Iteration ${iteration})...`);

    const results: VisualQAResult[] = [];

    for (let i = 1; i <= totalSlides; i++) {
      const result = await this.analyzeSlide(i, iteration);
      results.push(result);

      // Small delay between slides
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`\n✅ Visual QA complete: ${successCount}/${totalSlides} slides analyzed`);

    return results;
  }

  /**
   * Cleanup
   */
  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      this.page = null;
      console.log('🔒 Visual QA Agent closed');
    }
  }
}

// Export singleton instance
let visualQAInstance: VisualQAAgent | null = null;

export async function getVisualQAAgent(): Promise<VisualQAAgent> {
  if (!visualQAInstance) {
    visualQAInstance = new VisualQAAgent();
    await visualQAInstance.initialize();
  }
  return visualQAInstance;
}
