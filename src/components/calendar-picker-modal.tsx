import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { X } from 'lucide-react-native';

interface Props {
  visible: boolean;
  selectedDate: string; // ISO "YYYY-MM-DD"
  onDateSelect: (date: string) => void;
  onClose: () => void;
}

const THEME = {
  backgroundColor: '#161B22',
  calendarBackground: '#161B22',
  textSectionTitleColor: '#8B949E',
  selectedDayBackgroundColor: '#F97316',
  selectedDayTextColor: '#fff',
  todayTextColor: '#F97316',
  dayTextColor: '#E6EDF3',
  textDisabledColor: '#30363D',
  dotColor: '#F97316',
  selectedDotColor: '#fff',
  arrowColor: '#F97316',
  monthTextColor: '#E6EDF3',
  textMonthFontWeight: '700' as const,
  textDayFontSize: 14,
  textMonthFontSize: 16,
  textDayHeaderFontSize: 12,
};

export function CalendarPickerModal({ visible, selectedDate, onDateSelect, onClose }: Props) {
  const markedDates = {
    [selectedDate]: { selected: true, selectedColor: '#F97316' },
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* Backdrop */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Date</Text>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              accessibilityLabel="Close calendar"
              accessibilityRole="button"
            >
              <X size={20} color="#8B949E" />
            </TouchableOpacity>
          </View>

          <Calendar
            current={selectedDate}
            markedDates={markedDates}
            onDayPress={(day) => {
              onDateSelect(day.dateString);
              onClose();
            }}
            theme={THEME}
            enableSwipeMonths
          />

          {/* Today shortcut */}
          <TouchableOpacity
            style={styles.todayBtn}
            onPress={() => {
              onDateSelect(new Date().toISOString().split('T')[0]!);
              onClose();
            }}
          >
            <Text style={styles.todayBtnText}>Jump to Today</Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = {
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center' as const,
    paddingHorizontal: 20,
  },
  sheet: {
    backgroundColor: '#161B22',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#30363D',
    overflow: 'hidden' as const,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    color: '#E6EDF3',
    fontSize: 16,
    fontWeight: '700' as const,
  },
  todayBtn: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#21262D',
    borderWidth: 1,
    borderColor: '#30363D',
    alignItems: 'center' as const,
  },
  todayBtnText: {
    color: '#F97316',
    fontSize: 14,
    fontWeight: '600' as const,
  },
} as const;
