import React, { useRef, useEffect } from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';

interface Props {
  selectedDate: string; // ISO date "2026-02-19"
  onDateChange: (date: string) => void;
  daysRange?: number; // days before + after today (default 3)
}

// Two-letter weekday abbreviations indexed by getDay() (0=Sunday)
const WEEKDAYS = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'] as const;
const CELL_WIDTH = 52;
const ACTIVE_COLOR = '#E53935';
const INACTIVE_COLOR = '#8B949E';

function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

function toISO(d: Date): string {
  return d.toISOString().split('T')[0]!;
}

// "DD.MM." format using UTC to stay consistent with ISO date
function formatDayMonth(d: Date): string {
  const dd = String(d.getUTCDate()).padStart(2, '0');
  const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
  return `${dd}.${mm}.`;
}

export function DateFilterStrip({ selectedDate, onDateChange, daysRange = 3 }: Props) {
  const scrollRef = useRef<ScrollView>(null);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const total = daysRange * 2 + 1;
  const days = Array.from({ length: total }, (_, i) => addDays(today, i - daysRange));

  // Scroll to active date on mount
  useEffect(() => {
    const idx = days.findIndex((d) => toISO(d) === selectedDate);
    if (idx >= 0 && scrollRef.current) {
      scrollRef.current.scrollTo({ x: idx * CELL_WIDTH, animated: false });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      // maxHeight prevents the ScrollView from stretching vertically inside a flex column
      style={{ backgroundColor: '#161B22', maxHeight: 56 }}
      contentContainerStyle={{ paddingHorizontal: 8, alignItems: 'flex-start' }}
    >
      {days.map((day) => {
        const iso = toISO(day);
        const active = iso === selectedDate;
        const isCurrentDay = iso === toISO(today);
        const color = active ? ACTIVE_COLOR : INACTIVE_COLOR;
        return (
          <TouchableOpacity
            key={iso}
            onPress={() => onDateChange(iso)}
            style={{
              width: CELL_WIDTH,
              paddingVertical: 8,
              alignItems: 'center',
              // Always reserve space for bottom border to prevent layout shift
              borderBottomWidth: 3,
              borderBottomColor: active ? ACTIVE_COLOR : 'transparent',
            }}
          >
            <Text style={{ color, fontSize: 11, fontWeight: '700', letterSpacing: 0.5 }}>
              {isCurrentDay ? 'TODAY' : WEEKDAYS[day.getUTCDay()]}
            </Text>
            <Text style={{ color, fontSize: 12, fontWeight: '400', marginTop: 2 }}>
              {formatDayMonth(day)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
