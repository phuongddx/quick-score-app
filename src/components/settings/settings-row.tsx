import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface SettingsRowProps {
  icon: React.ReactNode;
  label: string;
  // Right side -- exactly one of:
  toggle?: { value: boolean; onValueChange: (v: boolean) => void };
  value?: string;        // static text like "Dark" or "Mock"
  onPress?: () => void;  // makes row pressable; shows ChevronRight if no value
  showBorder?: boolean;  // bottom border (default true)
}

export function SettingsRow({ icon, label, toggle, value, onPress, showBorder = true }: SettingsRowProps) {
  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: showBorder ? 1 : 0,
        borderBottomColor: '#21262D',
      }}
    >
      <View style={{ marginRight: 12 }}>{icon}</View>
      <Text style={{ flex: 1, color: '#E6EDF3', fontSize: 15 }}>{label}</Text>

      {toggle && (
        <Switch
          value={toggle.value}
          onValueChange={toggle.onValueChange}
          trackColor={{ false: '#30363D', true: 'rgba(33,150,243,0.4)' }}
          thumbColor={toggle.value ? '#2196F3' : '#484F58'}
        />
      )}
      {value && (
        <Text style={{ color: '#8B949E', fontSize: 14 }}>{value}</Text>
      )}
      {onPress && !toggle && (
        <ChevronRight size={16} color="#8B949E" style={{ marginLeft: 4 }} />
      )}
    </Container>
  );
}
