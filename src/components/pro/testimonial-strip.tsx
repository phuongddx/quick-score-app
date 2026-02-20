import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

interface Testimonial {
  initials: string;
  avatarColor: string;
  quote: string;
  name: string;
  subtitle: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    initials: 'MJ',
    avatarColor: '#2563EB',
    quote: '"The xG stats completely changed how I watch football. Now I actually understand the game."',
    name: 'Marcus J.',
    subtitle: 'Arsenal fan · Pro since 2024',
  },
];

const GOLD = '#FBBF24';
const SURFACE = '#161B22';
const BORDER = '#30363D';
const TEXT_PRIMARY = '#E6EDF3';
const TEXT_SECONDARY = '#8B949E';

export function TestimonialStrip() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.sectionTitle}>FANS LOVE IT</Text>
      {TESTIMONIALS.map(({ initials, avatarColor, quote, name, subtitle }) => (
        <View key={name} style={styles.card}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={12} color={GOLD} fill={GOLD} />
            ))}
          </View>
          <Text style={styles.quote}>{quote}</Text>
          <View style={styles.authorRow}>
            <View style={[styles.avatar, { backgroundColor: avatarColor }]}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
            <View>
              <Text style={styles.authorName}>{name}</Text>
              <Text style={styles.authorSubtitle}>{subtitle}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  sectionTitle: {
    color: TEXT_SECONDARY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  card: {
    backgroundColor: SURFACE,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 2,
    marginBottom: 10,
  },
  quote: {
    color: TEXT_PRIMARY,
    fontSize: 14,
    lineHeight: 21,
    fontStyle: 'italic',
    marginBottom: 14,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarInitials: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  authorName: {
    color: TEXT_PRIMARY,
    fontSize: 13,
    fontWeight: '600',
  },
  authorSubtitle: {
    color: TEXT_SECONDARY,
    fontSize: 12,
    marginTop: 1,
  },
});
