import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Crown, X, Star, Ban, TrendingUp, Bell, Monitor } from 'lucide-react-native';
import { PlanCard } from '@/components/pro/plan-card';
import { FeatureItem } from '@/components/pro/feature-item';

const FEATURES = [
  { Icon: Ban, color: '#ef4444', title: 'Ad-free Experience', subtitle: 'Enjoy uninterrupted scores' },
  { Icon: TrendingUp, color: '#22c55e', title: 'Advanced Stats & xG', subtitle: 'Deep analytics and expected goals' },
  { Icon: Bell, color: '#f59e0b', title: 'VIP Push Notifications', subtitle: 'Instant alerts for your teams' },
  { Icon: Monitor, color: '#8b5cf6', title: '4K/HD Highlights', subtitle: 'Watch key moments in high quality' },
];

export default function ProPlansScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState<'yearly' | 'monthly'>('yearly');

  const handleContinue = () =>
    Alert.alert('Coming Soon', 'Subscription billing is coming soon. Stay tuned!');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#000000' }} edges={['top', 'bottom']}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{ width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
          activeOpacity={0.7}
        >
          <X size={22} color="#8B949E" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => Alert.alert('Restore Purchases', 'No previous purchases found.')}
          style={{ paddingHorizontal: 8, paddingVertical: 8 }}
        >
          <Text style={{ color: '#8B949E', fontSize: 14 }}>Restore</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero */}
        <View style={{ alignItems: 'center', paddingTop: 12, paddingBottom: 28 }}>
          {/* Crown card with glow + sparkle stars */}
          <View style={{ position: 'relative' }}>
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 24,
                backgroundColor: '#1a1a2e',
                alignItems: 'center',
                justifyContent: 'center',
                shadowColor: '#257bf4',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.45,
                shadowRadius: 18,
                elevation: 12,
              }}
            >
              <Crown size={32} color="#257bf4" />
            </View>
            <View style={{ position: 'absolute', top: -8, right: -12 }}>
              <Star size={12} color="#257bf4" fill="#257bf4" />
            </View>
            <View style={{ position: 'absolute', bottom: -6, left: -14 }}>
              <Star size={8} color="#f59e0b" fill="#f59e0b" />
            </View>
          </View>

          <Text
            style={{
              color: '#E6EDF3',
              fontSize: 24,
              fontWeight: '800',
              textAlign: 'center',
              marginTop: 20,
              lineHeight: 30,
            }}
          >
            Unlock the Full Experience
          </Text>
          <Text
            style={{
              color: '#8B949E',
              fontSize: 15,
              textAlign: 'center',
              marginTop: 8,
              lineHeight: 22,
              paddingHorizontal: 12,
            }}
          >
            Get access to all{' '}
            <Text style={{ color: '#257bf4', fontWeight: '700' }}>Pro</Text>
            {' '}features and enjoy the best football experience
          </Text>
        </View>

        {/* Plan cards */}
        <View style={{ gap: 12, marginBottom: 28, paddingTop: 10 }}>
          <PlanCard
            planType="yearly"
            price="$39.99/year"
            selected={selectedPlan === 'yearly'}
            badgeText="BEST VALUE"
            savingsText="Save 33%"
            onSelect={() => setSelectedPlan('yearly')}
          />
          <PlanCard
            planType="monthly"
            price="$4.99/month"
            selected={selectedPlan === 'monthly'}
            onSelect={() => setSelectedPlan('monthly')}
          />
        </View>

        {/* Feature list */}
        <View
          style={{
            backgroundColor: '#0D1117',
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 4,
          }}
        >
          {FEATURES.map(({ Icon, color, title, subtitle }) => (
            <FeatureItem
              key={title}
              icon={<Icon size={20} color={color} />}
              title={title}
              subtitle={subtitle}
            />
          ))}
        </View>
      </ScrollView>

      {/* Sticky CTA */}
      <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 }}>
        <TouchableOpacity
          onPress={handleContinue}
          activeOpacity={0.85}
          style={{
            backgroundColor: '#257bf4',
            borderRadius: 14,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 17, fontWeight: '700' }}>Continue</Text>
        </TouchableOpacity>

        <Text style={{ color: '#484F58', fontSize: 12, textAlign: 'center', marginTop: 10 }}>
          Cancel anytime. Prices in USD. Billed through the App Store.
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 16, marginTop: 6 }}>
          <TouchableOpacity
            onPress={() => Alert.alert('Terms of Use', 'Terms coming soon.')}
          >
            <Text style={{ color: '#484F58', fontSize: 12, textDecorationLine: 'underline' }}>
              Terms of Use
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert('Privacy Policy', 'Privacy policy coming soon.')}
          >
            <Text style={{ color: '#484F58', fontSize: 12, textDecorationLine: 'underline' }}>
              Privacy Policy
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
