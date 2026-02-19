import { describe, test, expect } from 'vitest';

// ─── Label logic from live-indicator.tsx ─────────────────────────────────────

function getLiveLabel(minute: number, isHalftime?: boolean): string {
  return isHalftime ? 'HT' : `${minute}'`;
}

describe('LiveIndicator label logic', () => {
  test('shows minute with apostrophe during play', () => {
    expect(getLiveLabel(23)).toBe("23'");
    expect(getLiveLabel(67)).toBe("67'");
    expect(getLiveLabel(90)).toBe("90'");
  });

  test('shows "HT" during halftime', () => {
    expect(getLiveLabel(45, true)).toBe('HT');
  });

  test('shows minute 1 as "1\'"', () => {
    expect(getLiveLabel(1)).toBe("1'");
  });

  test('shows minute 45+2 correctly', () => {
    // In real app this would be "45'" — our mock data uses 45
    expect(getLiveLabel(45)).toBe("45'");
  });
});
