import { View, Text, TouchableOpacity } from 'react-native';
import { Search, CalendarDays } from 'lucide-react-native';

interface TitleBarProps {
  onSearchPress?: () => void;
  onCalendarPress?: () => void;
}

export function TitleBar({ onSearchPress, onCalendarPress }: TitleBarProps) {
  return (
    <View style={styles.container}>
      {/* Brand: icon + wordmark */}
      <View style={styles.brand}>
        <View style={styles.logoMark}>
          <Text style={styles.logoEmoji}>⚽</Text>
        </View>
        <Text style={styles.wordmarkQuick}>Quick</Text>
        <Text style={styles.wordmarkScore}>Score</Text>
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={onCalendarPress}
          activeOpacity={0.7}
          style={styles.iconBtn}
          accessibilityLabel="Open calendar"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <CalendarDays size={20} color="#8B949E" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSearchPress}
          activeOpacity={0.7}
          style={styles.iconBtn}
          accessibilityLabel="Search"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Search size={20} color="#8B949E" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#0D1117',
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
  },
  brand: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#1C1307',
    borderWidth: 1,
    borderColor: '#F9731630',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  logoEmoji: {
    fontSize: 18,
    lineHeight: 22,
  },
  wordmarkQuick: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#E6EDF3',
    letterSpacing: -0.5,
  },
  wordmarkScore: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: '#F97316',
    letterSpacing: -0.5,
  },
  actions: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 8,
  },
  iconBtn: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: '#30363D',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
} as const;
