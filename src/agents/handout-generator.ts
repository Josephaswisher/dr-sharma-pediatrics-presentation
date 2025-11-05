/**
 * Handout Generator Agent
 * Creates detailed student handouts that follow lecture flow
 *
 * Personality: NEXUS (Pattern recognition, educational design)
 * Model: DeepSeek (great at long-form content, cheap)
 * Output: Detailed PDF-ready handouts
 * Confidence: 90%
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import jsPDF from 'jspdf';

interface HandoutSection {
  slide_number: number;
  title: string;
  content: string;
  clinical_pearls?: string[];
  fill_in_blanks?: string[];
  board_tips?: string[];
}

interface HandoutResult {
  markdown: string;
  pdf_path: string;
  word_count: number;
  sections: number;
  success: boolean;
  error?: string;
}

export class HandoutGenerator {
  private apiKey: string;
  private handoutsDir: string;

  constructor() {
    this.apiKey = process.env.DEEPSEEK_API_KEY!;
    this.handoutsDir = path.join(process.cwd(), 'public', 'handouts');
  }

  /**
   * Generate comprehensive handout
   */
  async generate(sourceContent: string, title: string): Promise<HandoutResult> {
    console.log(`\n📄 Generating detailed handout: ${title}`);

    try {
      // Ensure handouts directory exists
      await fs.mkdir(this.handoutsDir, { recursive: true });

      // Generate content with DeepSeek
      const markdown = await this.generateMarkdown(sourceContent, title);

      // Count words and sections
      const wordCount = markdown.split(/\s+/).length;
      const sections = (markdown.match(/^## /gm) || []).length;

      // Save markdown
      const markdownPath = path.join(this.handoutsDir, `${this.slugify(title)}.md`);
      await fs.writeFile(markdownPath, markdown, 'utf-8');

      // Generate PDF (basic)
      const pdfPath = await this.generatePDF(markdown, title);

      console.log(`✅ Handout generated:`);
      console.log(`   ${wordCount} words, ${sections} sections`);
      console.log(`   Markdown: ${markdownPath}`);
      console.log(`   PDF: ${pdfPath}`);

      return {
        markdown,
        pdf_path: pdfPath,
        word_count: wordCount,
        sections,
        success: true,
      };
    } catch (error: any) {
      console.error('❌ Handout generation failed:', error);
      return {
        markdown: '',
        pdf_path: '',
        word_count: 0,
        sections: 0,
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate markdown content with DeepSeek
   */
  private async generateMarkdown(sourceContent: string, title: string): Promise<string> {
    console.log('🤖 Calling DeepSeek for handout generation...');

    const prompt = `Generate a comprehensive student handout for Dr. Sharma's Pediatric Clerkship Review.

SOURCE CONTENT:
${sourceContent}

REQUIREMENTS:

1. **Follow Lecture Flow**: Structure handout to match the slide presentation order

2. **Sections to Include**:
   - Overview/Learning Objectives
   - Detailed Content (broken into digestible sections)
   - Clinical Pearls (💎 boxes with key takeaways)
   - Board Tips (📚 "High Yield for Boards")
   - Fill-in-the-Blank Review Questions
   - Quick Reference Tables
   - Practice Questions

3. **Format**:
   - Use Markdown
   - Clear headings (##, ###)
   - Bullet points for lists
   - Tables for comparisons
   - Callout boxes for important info:
     > 💎 **Clinical Pearl**: ...
     > ⚠️ **Red Flag**: ...
     > 📚 **Board Tip**: ...

4. **Style**:
   - Conversational but professional
   - Practical and clinically relevant
   - Board-exam focused
   - Include mnemonics where appropriate

5. **Engagement**:
   - Add spaces for notes
   - Fill-in-blank sections to keep students active
   - "Stop and Think" moments

Return ONLY the Markdown content. Make it comprehensive (3000-5000 words).`;

    try {
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are an expert medical educator creating student handouts.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          max_tokens: 16000, // Long-form content
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (error) {
      console.error('DeepSeek API error:', error);
      throw error;
    }
  }

  /**
   * Generate PDF from markdown (basic)
   */
  private async generatePDF(markdown: string, title: string): Promise<string> {
    console.log('📄 Generating PDF...');

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let y = 20;

    // Title
    pdf.setFontSize(18);
    pdf.setFont('helvetica', 'bold');
    pdf.text(title, pageWidth / 2, y, { align: 'center' });
    y += 15;

    // Convert markdown to plain text (basic)
    const plainText = markdown
      .replace(/^#+ /gm, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1');

    // Split into lines
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'normal');
    const lines = pdf.splitTextToSize(plainText, pageWidth - 40);

    for (const line of lines) {
      if (y > pageHeight - 20) {
        pdf.addPage();
        y = 20;
      }
      pdf.text(line, 20, y);
      y += 6;
    }

    // Save
    const filename = `${this.slugify(title)}.pdf`;
    const pdfPath = path.join(this.handoutsDir, filename);
    await fs.writeFile(pdfPath, Buffer.from(pdf.output('arraybuffer')));

    return `/handouts/${filename}`;
  }

  /**
   * Slugify title for filename
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

// Export singleton
let handoutInstance: HandoutGenerator | null = null;

export function getHandoutGenerator(): HandoutGenerator {
  if (!handoutInstance) {
    handoutInstance = new HandoutGenerator();
  }
  return handoutInstance;
}
