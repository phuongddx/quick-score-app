import React, { useEffect, useRef, useState } from 'react';
import { Animated, View, Text, AccessibilityInfo } from 'react-native';

interface Props {
  minute: number;
  isHalftime?: boolean;
}

export const LiveIndicator = React.memo(function LiveIndicator({ minute, isHalftime }: Props) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.25, duration: 900, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1,    duration: 900, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [reduceMotion, pulseAnim]);

  const label = isHalftime ? 'HT' : `${minute}'`;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      <Animated.View
        style={{
          width: 8, height: 8, borderRadius: 4,
          backgroundColor: '#00C853',
          opacity: reduceMotion ? 1 : pulseAnim,
        }}
      />
      <Text style={{ color: '#00C853', fontSize: 11, fontWeight: '700' }}>{label}</Text>
    </View>
  );
});
