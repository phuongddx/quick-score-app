import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  Dimensions,
  StyleSheet,
  StatusBar,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import {
  X,
  Check,
  Bell,
  BarChart2,
  Users,
  TrendingUp,
  Star,
  Shield,
  ChevronRight,
  Trophy,
  Zap,
} from 'lucide-react-native';
import { LiveTeaserCard } from '@/components/pro/live-teaser-card';
import { TestimonialStrip } from '@/components/pro/testimonial-strip';

const { width: SCREEN_W } = Dimensions.get('window');

// ─── Pricing plans — yearly first for anchoring bias ─────────────────────────
type PlanId = 'weekly' | 'monthly' | 'yearly';

interface Plan {
  id: PlanId;
  label: string;
  price: string;
  period: string;
  perMonth: string;
  badge?: string;
  savings?: string;
}

const PLANS: Plan[] = [
  {
    id: 'yearly',
    label: 'Yearly',
    price: '$39.99',
    period: '/year',
    perMonth: '$3.33/mo',
    badge: 'BEST VALUE',
    savings: 'Save 50% vs monthly',
  },
  { id: 'monthly', label: 'Monthly', price: '$4.99', period: '/month', perMonth: '$4.99/mo' },
  { id: 'weekly', label: 'Weekly', price: '$2.99', period: '/week', perMonth: '$11.96/mo' },
];

const PRO_FEATURES = [
  { icon: Zap, label: 'Ad-free experience', sub: 'Zero interruptions, pure football' },
  { icon: Bell, label: 'Live match alerts', sub: 'Goals, cards, final whistle instantly' },
  { icon: BarChart2, label: 'Advanced stats & xG data', sub: 'Shots, possession, expected goals' },
  { icon: Users, label: 'Full lineups & formations', sub: 'Starting XI, tactics, substitutions' },
  { icon: TrendingUp, label: 'Head-to-head history', sub: 'Last 10 meetings, form guides' },
  { icon: Star, label: 'Match predictions & insights', sub: 'AI-powered pre-match analysis' },
  { icon: Shield, label: 'All leagues & competitions', sub: 'Unlock 500+ leagues worldwide' },
];

export default function ProUpgradeScreen() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>('yearly');
  const [isPurchasing, setIsPurchasing] = useState(false);

  // CTA button glow pulse
  const glowAnim = useRef(new Animated.Value(0)).current;
  // Trophy icon bounce on mount
  const heroScaleAnim = useRef(new Animated.Value(0.7)).current;
  // Staggered feature row entrance
  const featureAnims = useRef(PRO_FEATURES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Trophy entrance bounce
    Animated.spring(heroScaleAnim, {
      toValue: 1,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // CTA pulse loop
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, { toValue: 1, duration: 1400, useNativeDriver: true }),
        Animated.timing(glowAnim, { toValue: 0, duration: 1400, useNativeDriver: true }),
      ]),
    ).start();

    // Staggered feature rows — start after hero settles
    const timer = setTimeout(() => {
      Animated.stagger(
        55,
        featureAnims.map((anim) =>
          Animated.timing(anim, { toValue: 1, duration: 260, useNativeDriver: true }),
        ),
      ).start();
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  const ctaScale = glowAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.022] });
  const activePlan = PLANS.find((p) => p.id === selectedPlan)!;

  const handlePurchase = () => {
    setIsPurchasing(true);
    // TODO: wire up expo-in-app-purchases / RevenueCat
    setTimeout(() => setIsPurchasing(false), 2000);
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Atmospheric glow layers */}
      <View style={styles.bgBase} />
      <View style={styles.bgGlowGold} />
      <View style={styles.bgGlowBlue} />

      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => router.back()}
          activeOpacity={0.7}
          accessibilityLabel="Close upgrade screen"
        >
          <X size={20} color="#8B949E" />
        </TouchableOpacity>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scroll}
          bounces={false}
        >
          {/* ── Hero ── */}
          <View style={styles.heroSection}>
            <Animated.View style={[styles.trophyRing, { transform: [{ scale: heroScaleAnim }] }]}>
              <View style={styles.trophyInner}>
                <Trophy size={30} color="#FBBF24" />
              </View>
            </Animated.View>

            <View style={styles.socialProofPill}>
              <View style={styles.socialDot} />
              <Text style={styles.socialProofText}>50,000+ fans already Pro</Text>
            </View>

            <Text style={styles.heroTitle}>Miss Nothing.{'\n'}Watch Everything.</Text>
            <Text style={styles.heroSub}>
              Live scores, advanced stats & alerts — all in one place.
            </Text>

            <View style={styles.ratingRow}>
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={14} color="#FBBF24" fill="#FBBF24" />
              ))}
              <Text style={styles.ratingText}>4.9 · 12K ratings</Text>
            </View>
          </View>

          {/* ── Live FOMO teaser ── */}
          <LiveTeaserCard />

          {/* ── Feature list with staggered entrance ── */}
          <View style={styles.featureCard}>
            <Text style={styles.featureCardTitle}>WHAT YOU UNLOCK</Text>
            {PRO_FEATURES.map(({ icon: Icon, label, sub }, i) => {
              const opacity = featureAnims[i];
              const translateX = featureAnims[i].interpolate({
                inputRange: [0, 1],
                outputRange: [-12, 0],
              });
              return (
                <Animated.View
                  key={label}
                  style={[styles.featureRow, { opacity, transform: [{ translateX }] }]}
                >
                  <View style={styles.featureCheckCircle}>
                    <Check size={12} color="#0D1117" strokeWidth={3} />
                  </View>
                  <View style={styles.featureTextWrap}>
                    <Text style={styles.featureLabel}>{label}</Text>
                    <Text style={styles.featureSub}>{sub}</Text>
                  </View>
                  <Icon size={16} color="#FBBF24" />
                </Animated.View>
              );
            })}
          </View>

          {/* ── Testimonial ── */}
          <TestimonialStrip />

          {/* ── Pricing selector — vertical stack ── */}
          <View style={styles.pricingSection}>
            <Text style={styles.pricingSectionTitle}>CHOOSE YOUR PLAN</Text>
            <View style={styles.planStack}>
              {PLANS.map((plan) => {
                const active = plan.id === selectedPlan;
                const isHighlighted = plan.id === 'yearly';
                return (
                  <TouchableOpacity
                    key={plan.id}
                    style={[
                      styles.planCard,
                      active && styles.planCardActive,
                      isHighlighted && !active && styles.planCardHighlighted,
                    ]}
                    onPress={() => setSelectedPlan(plan.id)}
                    activeOpacity={0.8}
                  >
                    {plan.badge && (
                      <View style={styles.planBadge}>
                        <Text style={styles.planBadgeText}>{plan.badge}</Text>
                      </View>
                    )}
                    <View style={styles.planLeft}>
                      <Text style={[styles.planLabel, active && styles.planLabelActive]}>
                        {plan.label}
                      </Text>
                      {plan.savings && (
                        <Text style={styles.planSavings}>{plan.savings}</Text>
                      )}
                    </View>
                    <View style={styles.planRight}>
                      <View style={styles.planPriceRow}>
                        <Text style={[styles.planPrice, active && styles.planPriceActive]}>
                          {plan.price}
                        </Text>
                        <Text style={styles.planPeriod}>{plan.period}</Text>
                      </View>
                      <Text style={styles.planPerMonth}>{plan.perMonth}</Text>
                    </View>
                    <View style={[styles.planRadio, active && styles.planRadioActive]}>
                      {active && <View style={styles.planRadioDot} />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          <View style={{ height: 130 }} />
        </ScrollView>

        {/* ── Sticky CTA ── */}
        <View style={styles.ctaArea}>
          <Animated.View style={{ transform: [{ scale: ctaScale }] }}>
            <TouchableOpacity
              style={[styles.ctaBtn, isPurchasing && styles.ctaBtnDisabled]}
              onPress={handlePurchase}
              activeOpacity={0.85}
              disabled={isPurchasing}
              accessibilityRole="button"
              accessibilityLabel={`Start 7-day free trial with ${activePlan.label} plan`}
            >
              {isPurchasing ? (
                <Text style={styles.ctaBtnText}>Processing...</Text>
              ) : (
                <>
                  <Text style={styles.ctaBtnText}>Start 7-Day Free Trial</Text>
                  <ChevronRight size={18} color="#0D1117" strokeWidth={2.5} />
                </>
              )}
            </TouchableOpacity>
          </Animated.View>

          <Text style={styles.ctaDisclaimer}>
            Then {activePlan.price}{activePlan.period} · Cancel anytime
          </Text>

          <View style={styles.ctaLinksRow}>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.ctaLink}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.ctaLinkSep}>·</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.ctaLink}>Terms of Service</Text>
            </TouchableOpacity>
            <Text style={styles.ctaLinkSep}>·</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.ctaLink}>Restore</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

// ─── Design tokens ─────────────────────────────────────────────────────────
const GOLD = '#FBBF24';
const GOLD_DIM = 'rgba(251,191,36,0.12)';
const GOLD_BORDER = 'rgba(251,191,36,0.35)';
const BG = '#0D1117';
const SURFACE = '#161B22';
const BORDER = '#30363D';
const TEXT_PRIMARY = '#E6EDF3';
const TEXT_SECONDARY = '#8B949E';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  bgBase: { ...StyleSheet.absoluteFillObject, backgroundColor: BG },
  bgGlowGold: {
    position: 'absolute',
    top: -80,
    left: SCREEN_W / 2 - 130,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(251,191,36,0.07)',
    transform: [{ scaleY: 0.45 }],
  },
  bgGlowBlue: {
    position: 'absolute',
    bottom: 60,
    right: -50,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(33,150,243,0.05)',
  },

  safeArea: { flex: 1 },
  closeBtn: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 16 : 12,
    right: 16,
    zIndex: 10,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1C2128',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: { paddingTop: 8, paddingBottom: 16 },

  // ── Hero ────────────────────────────────────────────────────────────────
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  trophyRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1.5,
    borderColor: GOLD_BORDER,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    backgroundColor: GOLD_DIM,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 22,
    elevation: 10,
  },
  trophyInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(251,191,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialProofPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,200,83,0.12)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginBottom: 16,
  },
  socialDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#00C853',
    marginRight: 7,
  },
  socialProofText: {
    color: '#00C853',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  heroTitle: {
    color: TEXT_PRIMARY,
    fontSize: 32,
    fontWeight: '800',
    textAlign: 'center',
    lineHeight: 38,
    letterSpacing: -0.8,
    marginBottom: 10,
  },
  heroSub: {
    color: TEXT_SECONDARY,
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 14,
  },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ratingText: { color: TEXT_SECONDARY, fontSize: 13, marginLeft: 6, fontWeight: '500' },

  // ── Features ─────────────────────────────────────────────────────────────
  featureCard: {
    marginHorizontal: 16,
    backgroundColor: SURFACE,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 20,
  },
  featureCardTitle: {
    color: TEXT_SECONDARY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  featureCheckCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: GOLD,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    flexShrink: 0,
  },
  featureTextWrap: { flex: 1 },
  featureLabel: { color: TEXT_PRIMARY, fontSize: 14, fontWeight: '600', marginBottom: 2 },
  featureSub: { color: TEXT_SECONDARY, fontSize: 12, lineHeight: 16 },

  // ── Pricing vertical stack ────────────────────────────────────────────────
  pricingSection: { marginHorizontal: 16, marginBottom: 8 },
  pricingSectionTitle: {
    color: TEXT_SECONDARY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
  },
  planStack: { gap: 10 },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BORDER,
    padding: 16,
    overflow: 'visible',
  },
  planCardActive: {
    borderColor: GOLD,
    backgroundColor: GOLD_DIM,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 6,
  },
  planCardHighlighted: {
    borderColor: 'rgba(251,191,36,0.22)',
  },
  planBadge: {
    position: 'absolute',
    top: -12,
    left: 16,
    backgroundColor: GOLD,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  planBadgeText: { color: '#0D1117', fontSize: 9, fontWeight: '800', letterSpacing: 0.8 },
  planLeft: { flex: 1 },
  planLabel: { color: TEXT_SECONDARY, fontSize: 13, fontWeight: '600' },
  planLabelActive: { color: GOLD },
  planSavings: { color: '#00C853', fontSize: 12, fontWeight: '600', marginTop: 2 },
  planRight: { alignItems: 'flex-end', marginRight: 12 },
  planPriceRow: { flexDirection: 'row', alignItems: 'baseline', gap: 2 },
  planPrice: { color: TEXT_PRIMARY, fontSize: 20, fontWeight: '800' },
  planPriceActive: { color: TEXT_PRIMARY },
  planPeriod: { color: TEXT_SECONDARY, fontSize: 12 },
  planPerMonth: { color: TEXT_SECONDARY, fontSize: 12, marginTop: 2 },
  planRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planRadioActive: { borderColor: GOLD, backgroundColor: GOLD_DIM },
  planRadioDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: GOLD },

  // ── CTA ──────────────────────────────────────────────────────────────────
  ctaArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: Platform.OS === 'ios' ? 8 : 20,
    backgroundColor: 'rgba(13,17,23,0.96)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: BORDER,
  },
  ctaBtn: {
    backgroundColor: GOLD,
    borderRadius: 14,
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 18,
    elevation: 10,
  },
  ctaBtnDisabled: { opacity: 0.6 },
  ctaBtnText: { color: '#0D1117', fontSize: 17, fontWeight: '800', letterSpacing: -0.2 },
  ctaDisclaimer: {
    color: TEXT_SECONDARY,
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 17,
  },
  ctaLinksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  ctaLink: { color: TEXT_SECONDARY, fontSize: 11, textDecorationLine: 'underline' },
  ctaLinkSep: { color: TEXT_SECONDARY, fontSize: 11 },
});
