import React, { useRef, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';

interface Props {
  selectedDate: string; // ISO date "2026-02-19"
  onDateChange: (date: string) => void;
  daysRange?: number; // days before + after today (default 3)
}

function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + n);
  return d;
}

function toISO(d: Date): string {
  return d.toISOString().split('T')[0]!;
}

function dayLabel(d: Date, today: Date): string {
  const diff = Math.round((d.getTime() - today.getTime()) / 86_400_000);
  if (diff === -1) return 'Yesterday';
  if (diff === 0)  return 'Today';
  if (diff === 1)  return 'Tomorrow';
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
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
      scrollRef.current.scrollTo({ x: idx * 88, animated: false });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ScrollView
      ref={scrollRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: '#161B22', maxHeight: 52 }}
      contentContainerStyle={{ paddingHorizontal: 8 }}
    >
      {days.map((day) => {
        const iso = toISO(day);
        const active = iso === selectedDate;
        return (
          <TouchableOpacity
            key={iso}
            onPress={() => onDateChange(iso)}
            style={{
              width: 80,
              marginHorizontal: 4,
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: 20,
              backgroundColor: active ? '#2196F3' : 'transparent',
            }}
          >
            <Text style={{ color: active ? '#fff' : '#8B949E', fontSize: 12, fontWeight: active ? '700' : '400' }}>
              {dayLabel(day, today)}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
