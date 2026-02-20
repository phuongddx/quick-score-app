import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import {
  X,
  Trophy,
  Bell,
  TrendingUp,
  Monitor,
  Ban,
} from 'lucide-react-native';
import { LiveTeaserCard } from '@/components/pro/live-teaser-card';
import { TestimonialStrip } from '@/components/pro/testimonial-strip';

const FEATURES = [
  { Icon: Ban, color: '#ef4444', title: 'Ad-free Experience', subtitle: 'Enjoy uninterrupted scores' },
  { Icon: TrendingUp, color: '#22c55e', title: 'Advanced Stats & xG', subtitle: 'Deep analytics and expected goals' },
  { Icon: Bell, color: '#f59e0b', title: 'VIP Push Notifications', subtitle: 'Instant alerts for your teams' },
  { Icon: Monitor, color: '#8b5cf6', title: '4K/HD Highlights', subtitle: 'Watch key moments in high quality' },
];

// Plans reordered: yearly first for anchoring bias
const PLANS = [
  {
    id: 'yearly',
    label: 'Yearly',
    price: '$39.99',
    period: '/year',
    perMonth: '$3.33/mo',
    badge: 'BEST VALUE',
    savings: 'Save 33%',
  },
  {
    id: 'monthly',
    label: 'Monthly',
    price: '$4.99',
    period: '/month',
    perMonth: '$4.99/mo',
  },
];

export default function ProPlansScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  // Trophy bounce on mount
  const heroScaleAnim = useRef(new Animated.Value(0.7)).current;
  // Staggered feature entrance
  const featureAnims = useRef(FEATURES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    // Trophy spring entrance
    Animated.spring(heroScaleAnim, {
      toValue: 1,
      tension: 60,
      friction: 8,
      useNativeDriver: true,
    }).start();

    // Staggered features after hero settles
    const timer = setTimeout(() => {
      Animated.stagger(
        50,
        featureAnims.map((anim) =>
          Animated.timing(anim, { toValue: 1, duration: 250, useNativeDriver: true }),
        ),
      ).start();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () =>
    // TODO: wire up IAP
    console.log('Purchase plan:', selectedPlan);

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header} accessibilityRole="header">
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerBtn}
          accessibilityRole="button"
          accessibilityLabel="Close paywall screen"
        >
          <X size={22} color="#8B949E" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => console.log('Restore purchases')}
          style={styles.headerBtn}
          accessibilityRole="button"
          accessibilityLabel="Restore previous purchases"
        >
          <Text style={styles.restoreText}>Restore</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Hero */}
        <View style={styles.heroSection}>
          {/* Trophy with spring animation */}
          <Animated.View style={[styles.trophyRing, { transform: [{ scale: heroScaleAnim }] }]}>
            <View style={styles.trophyInner}>
              <Trophy size={32} color="#FBBF24" />
            </View>
          </Animated.View>

          {/* Social proof pill */}
          <View style={styles.socialProofPill}>
            <View style={styles.socialDot} />
            <Text style={styles.socialProofText}>50,000+ fans already Pro</Text>
          </View>

          <Text style={styles.heroTitle}>Miss Nothing.{'\n'}Watch Everything.</Text>
          <Text style={styles.heroSub}>
            Get access to all{' '}
            <Text style={styles.heroAccent}>Pro</Text>
            {' '}features and enjoy the best football experience
          </Text>
        </View>

        {/* Live FOMO teaser */}
        <LiveTeaserCard />

        {/* Plan cards — vertical stack with yearly first */}
        <View style={styles.plansSection} accessibilityRole="radiogroup" accessibilityLabel="Choose your subscription plan">
          {PLANS.map((plan) => {
            const selected = plan.id === selectedPlan;
            return (
              <TouchableOpacity
                key={plan.id}
                style={[styles.planCard, selected && styles.planCardSelected]}
                onPress={() => setSelectedPlan(plan.id as 'yearly' | 'monthly')}
                activeOpacity={0.8}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                accessibilityLabel={`${plan.label} plan, ${plan.price}${plan.period}, ${plan.perMonth}`}
              >
                {plan.badge && (
                  <View style={styles.planBadge}>
                    <Text style={styles.planBadgeText}>{plan.badge}</Text>
                  </View>
                )}
                <View style={styles.planLeft}>
                  <Text style={[styles.planLabel, selected && styles.planLabelSelected]}>
                    {plan.label}
                  </Text>
                  {plan.savings && (
                    <Text style={styles.planSavings}>{plan.savings}</Text>
                  )}
                </View>
                <View style={styles.planRight}>
                  <Text style={styles.planPrice}>{plan.price}</Text>
                  <Text style={styles.planPeriod}>{plan.period}</Text>
                  <Text style={styles.planPerMonth}>{plan.perMonth}</Text>
                </View>
                <View style={[styles.radio, selected && styles.radioSelected]}>
                  {selected && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feature list with staggered entrance */}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>WHAT YOU UNLOCK</Text>
          {FEATURES.map(({ Icon, color, title, subtitle }, i) => {
            const opacity = featureAnims[i];
            const translateX = featureAnims[i].interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            });
            return (
              <Animated.View
                key={title}
                style={[styles.featureRow, { opacity, transform: [{ translateX }] }]}
              >
                <View style={[styles.featureIconBg, { backgroundColor: `${color}20` }]}>
                  <Icon size={18} color={color} />
                </View>
                <View style={styles.featureTextWrap}>
                  <Text style={styles.featureTitle}>{title}</Text>
                  <Text style={styles.featureSubtitle}>{subtitle}</Text>
                </View>
              </Animated.View>
            );
          })}
        </View>

        {/* Testimonial */}
        <TestimonialStrip />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={styles.ctaArea}>
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.85}
          style={styles.ctaBtn}
          accessibilityRole="button"
          accessibilityLabel={`Start 7-Day Free Trial with ${selectedPlan} plan`}
        >
          <Text style={styles.ctaBtnText}>Start 7-Day Free Trial</Text>
        </TouchableOpacity>

        <Text style={styles.ctaDisclaimer}>
          Cancel anytime. Prices in USD. Billed through the App Store.
        </Text>

        <View style={styles.ctaLinksRow}>
          <TouchableOpacity onPress={() => console.log('Terms')}>
            <Text style={styles.ctaLink}>Terms of Use</Text>
          </TouchableOpacity>
          <Text style={styles.ctaLinkSep}>·</Text>
          <TouchableOpacity onPress={() => console.log('Privacy')}>
            <Text style={styles.ctaLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Design tokens ─────────────────────────────────────────────────────────
const GOLD = '#FBBF24';
const GOLD_DIM = 'rgba(251,191,36,0.12)';
const GOLD_BORDER = 'rgba(251,191,36,0.35)';
const BG = '#000000';
const SURFACE = '#0D1117';
const BORDER = '#30363D';
const TEXT_PRIMARY = '#E6EDF3';
const TEXT_SECONDARY = '#8B949E';
const BLUE = '#257bf4';

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BG },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  restoreText: { color: '#8B949E', fontSize: 14 },

  // Scroll
  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  // Hero
  heroSection: { alignItems: 'center', paddingTop: 12, paddingBottom: 24 },
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
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  heroSub: {
    color: TEXT_SECONDARY,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  heroAccent: { color: BLUE, fontWeight: '700' },

  // Plans section
  plansSection: { gap: 12, marginBottom: 28, paddingTop: 10 },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SURFACE,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: BORDER,
    padding: 16,
  },
  planCardSelected: {
    borderColor: GOLD,
    backgroundColor: GOLD_DIM,
    shadowColor: GOLD,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 6,
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
  planLabel: { color: TEXT_SECONDARY, fontSize: 14, fontWeight: '600' },
  planLabelSelected: { color: GOLD },
  planSavings: { color: '#00C853', fontSize: 12, fontWeight: '600', marginTop: 2 },
  planRight: { alignItems: 'flex-end', marginRight: 12 },
  planPrice: { color: TEXT_PRIMARY, fontSize: 22, fontWeight: '800' },
  planPeriod: { color: TEXT_SECONDARY, fontSize: 13 },
  planPerMonth: { color: TEXT_SECONDARY, fontSize: 12, marginTop: 2 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: BORDER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: { borderColor: GOLD, backgroundColor: GOLD_DIM },
  radioDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: GOLD },

  // Features
  featuresSection: {
    backgroundColor: SURFACE,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 20,
  },
  featuresTitle: {
    color: TEXT_SECONDARY,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 12,
    marginTop: 8,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: BORDER,
  },
  featureIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  featureTextWrap: { flex: 1 },
  featureTitle: { color: TEXT_PRIMARY, fontSize: 14, fontWeight: '600' },
  featureSubtitle: { color: TEXT_SECONDARY, fontSize: 12, marginTop: 2 },

  // CTA
  ctaArea: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 8 : 20,
    backgroundColor: 'rgba(13,17,23,0.98)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: BORDER,
  },
  ctaBtn: {
    backgroundColor: BLUE,
    borderRadius: 14,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaBtnText: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  ctaDisclaimer: {
    color: '#484F58',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
  ctaLinksRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginTop: 6,
  },
  ctaLink: {
    color: '#484F58',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  ctaLinkSep: { color: '#484F58', fontSize: 12 },
});
