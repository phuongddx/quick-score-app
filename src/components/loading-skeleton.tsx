import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

function SkeletonBox({ width, height = 16 }: { width: string | number; height?: number }) {
  const shimmer = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 1,   duration: 800, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0.4, duration: 800, useNativeDriver: true }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [shimmer]);

  return (
    <Animated.View
      style={{
        width, height, borderRadius: 4,
        backgroundColor: '#21262D',
        opacity: shimmer,
      }}
    />
  );
}

function MatchCardSkeleton() {
  return (
    <View style={{ backgroundColor: '#161B22', paddingHorizontal: 16, paddingVertical: 14, marginBottom: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
          <SkeletonBox width={28} height={28} />
          <SkeletonBox width={100} />
        </View>
        <SkeletonBox width={48} height={22} />
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1, justifyContent: 'flex-end' }}>
          <SkeletonBox width={100} />
          <SkeletonBox width={28} height={28} />
        </View>
      </View>
    </View>
  );
}

export function LoadingSkeleton({ count = 6 }: { count?: number }) {
  return (
    <View>
      {Array.from({ length: count }).map((_, i) => (
        <MatchCardSkeleton key={i} />
      ))}
    </View>
  );
}
