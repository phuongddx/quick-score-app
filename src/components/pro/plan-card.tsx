import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface PlanCardProps {
  planType: 'yearly' | 'monthly';
  price: string;           // "$39.99/year" or "$4.99/month"
  selected: boolean;
  badgeText?: string;      // "BEST VALUE" for yearly
  savingsText?: string;    // "Save 33%" for yearly
  onSelect: () => void;
}

export function PlanCard({ planType, price, selected, badgeText, savingsText, onSelect }: PlanCardProps) {
  const planLabel = planType === 'yearly' ? 'Yearly' : 'Monthly';

  return (
    <TouchableOpacity
      onPress={onSelect}
      activeOpacity={0.8}
      style={{
        borderRadius: 16,
        padding: 16,
        overflow: 'visible',
        borderWidth: selected ? 2 : 1,
        borderColor: selected ? '#257bf4' : '#334155',
        ...(selected && {
          shadowColor: '#257bf4',
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.3,
          shadowRadius: 12,
          elevation: 8,
        }),
      }}
    >
      {/* BEST VALUE badge — absolute top-right, overflows card bounds */}
      {badgeText && (
        <View
          style={{
            position: 'absolute',
            top: -10,
            right: 12,
            backgroundColor: '#257bf4',
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 3,
            zIndex: 1,
          }}
        >
          <Text style={{ color: '#FFFFFF', fontSize: 10, fontWeight: '700' }}>{badgeText}</Text>
        </View>
      )}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {/* Radio circle */}
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: selected ? '#257bf4' : '#64748b',
            backgroundColor: selected ? '#257bf4' : 'transparent',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {selected && (
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#FFFFFF' }} />
          )}
        </View>

        {/* Plan info */}
        <View style={{ flex: 1 }}>
          <Text style={{ color: '#E6EDF3', fontSize: 16, fontWeight: '700' }}>{planLabel}</Text>
          <Text style={{ color: '#8B949E', fontSize: 14 }}>{price}</Text>
          {savingsText && (
            <View
              style={{
                alignSelf: 'flex-start',
                backgroundColor: 'rgba(37,123,244,0.15)',
                borderRadius: 99,
                paddingHorizontal: 8,
                paddingVertical: 2,
                marginTop: 4,
              }}
            >
              <Text style={{ color: '#257bf4', fontSize: 12, fontWeight: '600' }}>{savingsText}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}
