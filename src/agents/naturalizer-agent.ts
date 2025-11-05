/**
 * Naturalizer Agent
 * Removes AI tells and makes content sound human/natural
 *
 * Personality: SPARK (Creative writing)
 * Model: MiniMax-01 (great at creative rewriting)
 * Budget: 2 min per slide (33 slides = 66 min total)
 * Confidence: 95%
 */

interface NaturalizerResult {
  original: string;
  naturalized: string;
  ai_tells_removed: string[];
  improvements: string[];
  time_seconds: number;
  success: boolean;
  error?: string;
}

// Common AI giveaways to detect and remove
const AI_TELLS = [
  'delve',
  'leverage',
  'utilize',
  'robust',
  'comprehensive',
  'multifaceted',
  'myriad',
  'plethora',
  'paradigm',
  'synergy',
  'holistic',
  'cutting-edge',
  'state-of-the-art',
  'game-changer',
  'It is important to note',
  'It should be noted',
  'It is worth noting',
  'In conclusion',
  'To summarize',
  'In summary',
  'Moreover',
  'Furthermore',
  'Additionally',
  'Consequently',
  'various',
  'several',
  'numerous',
  'significant',
  'substantial',
  'considerable',
];

export class NaturalizerAgent {
  private apiKey: string;
  private apiEndpoint: string;

  constructor() {
    // MiniMax API configuration
    this.apiKey = process.env.MINIMAX_API_KEY || process.env.DEEPSEEK_API_KEY!; // Fallback to DeepSeek
    this.apiEndpoint = process.env.MINIMAX_API_KEY
      ? 'https://api.minimax.chat/v1/text/chatcompletion_v2'
      : 'https://api.deepseek.com/v1/chat/completions';
  }

  /**
   * Detect AI tells in text
   */
  detectAITells(text: string): string[] {
    const found: string[] = [];
    const lowerText = text.toLowerCase();

    for (const tell of AI_TELLS) {
      if (lowerText.includes(tell.toLowerCase())) {
        found.push(tell);
      }
    }

    return found;
  }

  /**
   * Naturalize content using MiniMax or DeepSeek
   */
  async naturalize(content: string, slideNumber?: number): Promise<NaturalizerResult> {
    const startTime = Date.now();
    const aiTellsFound = this.detectAITells(content);

    console.log(`🎨 Naturalizing content${slideNumber ? ` (Slide ${slideNumber})` : ''}...`);
    if (aiTellsFound.length > 0) {
      console.log(`   Found ${aiTellsFound.length} AI tells: ${aiTellsFound.join(', ')}`);
    }

    try {
      const prompt = `You are Dr. Sharma, a real pediatrician teaching medical students in a conversational, engaging way.

Rewrite this slide content to sound NATURAL and HUMAN:

${content}

REQUIREMENTS:
1. Remove AI giveaways (delve, leverage, robust, "it is important to note", etc.)
2. Use contractions (don't, won't, can't instead of do not, will not, cannot)
3. Add casual asides like:
   - "This is huge for boards!"
   - "You'll see this all the time on rotations"
   - "Quick pearl..."
   - "Red flag!"
4. Vary sentence length (mix short punchy sentences with longer explanations)
5. Add personality and warmth
6. Keep medical accuracy intact
7. Sound like a real doctor teaching, not an AI

STYLE: Conversational, confident, practical. Like chatting with a senior resident who really knows their stuff.

TIME BUDGET: 2 minutes max

Return ONLY the naturalized content, nothing else.`;

      const response = await fetch(this.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: process.env.MINIMAX_API_KEY ? 'abab6.5s-chat' : 'deepseek-chat',
          messages: [
            {
              role: 'system',
              content: 'You are Dr. Sharma, a friendly pediatrician teaching medical students.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.8, // More creative
          max_tokens: 2048,
        }),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const naturalized = data.choices[0].message.content.trim();

      const endTime = Date.now();
      const timeSeconds = Math.round((endTime - startTime) / 1000);

      console.log(`✅ Naturalized (${timeSeconds}s)`);

      return {
        original: content,
        naturalized,
        ai_tells_removed: aiTellsFound,
        improvements: [
          'Added conversational tone',
          'Used contractions',
          'Added personality',
          'Varied sentence structure',
        ],
        time_seconds: timeSeconds,
        success: true,
      };
    } catch (error: any) {
      console.error('❌ Naturalization failed:', error);

      const endTime = Date.now();
      const timeSeconds = Math.round((endTime - startTime) / 1000);

      return {
        original: content,
        naturalized: content, // Return original if failed
        ai_tells_removed: [],
        improvements: [],
        time_seconds: timeSeconds,
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Naturalize all slides
   */
  async naturalizeAllSlides(slides: { number: number; content: string }[]): Promise<NaturalizerResult[]> {
    console.log(`\n🎨 Naturalizing ${slides.length} slides...`);
    console.log(`   Budget: 2 min/slide = ${slides.length * 2} min total\n`);

    const results: NaturalizerResult[] = [];
    let totalTime = 0;

    for (const slide of slides) {
      const result = await this.naturalize(slide.content, slide.number);
      results.push(result);
      totalTime += result.time_seconds;

      // Check time budget (120 seconds per slide max)
      if (result.time_seconds > 120) {
        console.log(`⚠️  Slide ${slide.number} exceeded time budget (${result.time_seconds}s > 120s)`);
      }

      // Small delay between slides
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const successCount = results.filter(r => r.success).length;
    const totalMinutes = Math.round(totalTime / 60);

    console.log(`\n✅ Naturalization complete:`);
    console.log(`   ${successCount}/${slides.length} slides naturalized`);
    console.log(`   Total time: ${totalMinutes} minutes`);
    console.log(`   Avg time per slide: ${Math.round(totalTime / slides.length)}s`);

    return results;
  }

  /**
   * Quick naturalize (for single strings)
   */
  async naturalizeQuick(text: string): Promise<string> {
    const result = await this.naturalize(text);
    return result.naturalized;
  }
}

// Export singleton
let naturalizerInstance: NaturalizerAgent | null = null;

export function getNaturalizerAgent(): NaturalizerAgent {
  if (!naturalizerInstance) {
    naturalizerInstance = new NaturalizerAgent();
  }
  return naturalizerInstance;
}
