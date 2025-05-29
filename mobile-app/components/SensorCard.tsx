// components/SensorCard.tsx
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type SensorCardProps = {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  value: number;
  unit: string;
  isSafe: boolean;
};

const SensorCard: React.FC<SensorCardProps> = ({
  iconName,
  label,
  value,
  unit,
  isSafe,
}) => {
  return (
    <View style={[styles.card, isSafe ? styles.safe : styles.alert]}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={iconName} size={40} color="#3498db" />
      </View>

      <View style={styles.dataContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {value} {unit}
        </Text>
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name={isSafe ? 'check-circle' : 'close-circle'}
            size={18}
            color={isSafe ? '#2ecc71' : '#e74c3c'}
          />
          <Text style={[styles.statusText, { color: isSafe ? '#2ecc71' : '#e74c3c' }]}>
            {isSafe ? 'Good' : 'Not Good'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SensorCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: 200,
    height: 170,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: '#ddd',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  dataContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    // justifyContent: 'center',
  },
  statusText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  safe: {
    borderLeftWidth: 6,
    borderLeftColor: '#2ecc71',
  },
  alert: {
    borderLeftWidth: 6,
    borderLeftColor: '#e74c3c',
  },
});
