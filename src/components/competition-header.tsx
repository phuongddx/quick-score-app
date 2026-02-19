import { useRef, useEffect } from 'react';
import { TouchableOpacity, View, Text, Animated } from 'react-native';
import type { League } from '../types';

interface Props {
  league: League;
  liveCount: number;
  isExpanded: boolean;
  onToggle: () => void;
}

export function CompetitionHeader({
  league, liveCount, isExpanded, onToggle,
}: Props) {
  const chevronAnim = useRef(new Animated.Value(isExpanded ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(chevronAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isExpanded, chevronAnim]);

  const rotate = chevronAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '180deg'] });

  return (
    <TouchableOpacity
      onPress={onToggle}
      activeOpacity={0.85}
      style={{
        backgroundColor: '#161B22',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#30363D',
      }}
    >
      <Text style={{ fontSize: 16, marginRight: 8 }}>{league.flag}</Text>
      <Text style={{ color: '#8B949E', fontSize: 12, fontWeight: '600', letterSpacing: 0.5, flex: 1, textTransform: 'uppercase' }}>
        {league.name}
      </Text>
      {liveCount > 0 && (
        <View style={{ backgroundColor: '#00C853', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 2, marginRight: 8 }}>
          <Text style={{ color: '#0D1117', fontSize: 11, fontWeight: '700' }}>{liveCount}</Text>
        </View>
      )}
      <Animated.Text style={{ color: '#484F58', fontSize: 12, transform: [{ rotate }] }}>▼</Animated.Text>
    </TouchableOpacity>
  );
}
