import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Search } from 'lucide-react-native';

export default function SearchScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      {/* Search bar header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={styles.backBtn}
          accessibilityLabel="Close search"
          accessibilityRole="button"
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <ArrowLeft size={22} color="#E6EDF3" />
        </TouchableOpacity>

        <View style={styles.inputRow}>
          <Search size={16} color="#484F58" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Teams, leagues, players…"
            placeholderTextColor="#484F58"
            autoFocus
            returnKeyType="search"
            style={styles.input}
          />
        </View>
      </View>

      {/* Placeholder body */}
      <View style={styles.emptyBody}>
        <Search size={48} color="#21262D" />
        <Text style={styles.emptyTitle}>Global Search</Text>
        <Text style={styles.emptySubtitle}>Coming soon — search for teams,{'\n'}players, and leagues.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = {
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#21262D',
    gap: 12,
  },
  backBtn: {
    width: 36,
    height: 36,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  inputRow: {
    flex: 1,
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    backgroundColor: '#161B22',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#30363D',
    paddingHorizontal: 12,
    height: 42,
  },
  input: {
    flex: 1,
    color: '#E6EDF3',
    fontSize: 15,
    padding: 0,
  },
  emptyBody: {
    flex: 1,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    gap: 12,
    paddingBottom: 60,
  },
  emptyTitle: {
    color: '#484F58',
    fontSize: 18,
    fontWeight: '600' as const,
    marginTop: 8,
  },
  emptySubtitle: {
    color: '#30363D',
    fontSize: 14,
    textAlign: 'center' as const,
    lineHeight: 20,
  },
} as const;
