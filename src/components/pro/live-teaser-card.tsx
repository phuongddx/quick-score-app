import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { Lock } from 'lucide-react-native';

const LOCKED_MATCHES = [
  { home: 'Arsenal', away: 'Man City', minute: "72'" },
  { home: 'Barcelona', away: 'Real Madrid', minute: "45+2'" },
  { home: 'Liverpool', away: 'Bayern', minute: "88'" },
];

const GOLD = '#FBBF24';
const SURFACE = '#161B22';
const BORDER = '#30363D';
const TEXT_PRIMARY = '#E6EDF3';
const TEXT_SECONDARY = '#8B949E';

// Teaser card showing locked live match scores — drives FOMO before purchase
export function LiveTeaserCard() {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.25, duration: 650, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 650, useNativeDriver: true }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.liveBadge}>
          <Animated.View style={[styles.liveDot, { opacity: pulseAnim }]} />
          <Text style={styles.liveText}>LIVE NOW</Text>
        </View>
        <Text style={styles.matchCount}>22 matches in progress</Text>
      </View>

      {LOCKED_MATCHES.map(({ home, away, minute }) => (
        <View key={`${home}-${away}`} style={styles.matchRow}>
          <Text style={styles.teamName}>{home}</Text>
          <View style={styles.centerCol}>
            <Text style={styles.minute}>{minute}</Text>
            <View style={styles.scoreArea}>
              <Lock size={13} color={GOLD} />
            </View>
          </View>
          <Text style={[styles.teamName, styles.teamRight]}>{away}</Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Lock size={11} color={TEXT_SECONDARY} />
        <Text style={styles.footerText}>Upgrade to see all live scores</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 20,
    backgroundColor: SURFACE,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: BORDER,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
  },
  liveText: {
    color: '#FF3B30',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  matchCount: {
    color: TEXT_SECONDARY,
    fontSize: 12,
  },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  teamName: {
    flex: 1,
    color: TEXT_PRIMARY,
    fontSize: 14,
    fontWeight: '600',
  },
  teamRight: {
    textAlign: 'right',
  },
  centerCol: {
    alignItems: 'center',
    width: 56,
    gap: 2,
  },
  minute: {
    color: '#FF3B30',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  scoreArea: {
    width: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(251,191,36,0.08)',
    borderRadius: 7,
    paddingVertical: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    backgroundColor: 'rgba(251,191,36,0.04)',
  },
  footerText: {
    color: TEXT_SECONDARY,
    fontSize: 12,
  },
});
