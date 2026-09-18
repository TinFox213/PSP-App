import { describe, it, expect } from 'vitest';
import { parseTranscriptDeterministically } from '../../api/voice-parse';

describe('Voice Logging NLP Parsing API', () => {
  it('correctly parses phrase "I had one cup of curd and a boiled egg"', () => {
    const transcript = 'I had one cup of curd and a boiled egg';
    const items = parseTranscriptDeterministically(transcript);

    expect(items.length).toBe(2);

    const curd = items.find((i) => i.name.toLowerCase().includes('curd'));
    const egg = items.find((i) => i.name.toLowerCase().includes('egg'));

    expect(curd).toBeDefined();
    expect(curd?.proteinG).toBe(6);
    expect(curd?.calories).toBe(95);

    expect(egg).toBeDefined();
    expect(egg?.proteinG).toBe(6);
    expect(egg?.calories).toBe(70);

    const totalProtein = items.reduce((sum, i) => sum + i.proteinG, 0);
    expect(totalProtein).toBe(12);
  });

  it('correctly parses regional food items like sundal and idli', () => {
    const transcript = 'Had a plate of sundal and two idlis';
    const items = parseTranscriptDeterministically(transcript);

    expect(items.length).toBe(2);
    expect(items.some((i) => i.name.toLowerCase().includes('sundal'))).toBe(true);
    expect(items.some((i) => i.name.toLowerCase().includes('idli'))).toBe(true);
  });

  it('handles unknown food transcript with a graceful custom entry', () => {
    const transcript = 'Some exotic berry shake';
    const items = parseTranscriptDeterministically(transcript);

    expect(items.length).toBe(1);
    expect(items[0].name).toContain('Voice Logged:');
    expect(items[0].calories).toBeGreaterThan(0);
  });
});
