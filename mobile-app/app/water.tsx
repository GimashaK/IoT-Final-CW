import MaterialCommunityIcons from '@expo/vector-icons/build/MaterialCommunityIcons';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export const unstable_settings = { headerShown: false };

export default function WaterParametersScreen() {
   const turbidity = 3.5; // NTU
  const tds = 450; // ppm

  const isTurbiditySafe = turbidity <= 5;
  const isTDSSafe = tds <= 500;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💧 Water Quality</Text>

      {/* Turbidity Card */}
      <View style={[styles.card, isTurbiditySafe ? styles.safe : styles.alert]}>
        <MaterialCommunityIcons name="water-outline" size={36} color="#3498db" />
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>Turbidity</Text>
          <Text style={styles.value}>{turbidity} NTU</Text>
        </View>
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name={isTurbiditySafe ? 'check-circle' : 'close-circle'}
            size={28}
            color={isTurbiditySafe ? '#2ecc71' : '#e74c3c'}
          />
          <Text style={[styles.statusText, { color: isTurbiditySafe ? '#2ecc71' : '#e74c3c' }]}>
            {isTurbiditySafe ? 'Good' : 'Not Good'}
          </Text>
        </View>
      </View>

      {/* TDS Card */}
      <View style={[styles.card, isTDSSafe ? styles.safe : styles.alert]}>
        <MaterialCommunityIcons name="chemical-weapon" size={36} color="#e67e22" />
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>TDS</Text>
          <Text style={styles.value}>{tds} ppm</Text>
        </View>
        <View style={styles.statusContainer}>
          <MaterialCommunityIcons
            name={isTDSSafe ? 'check-circle' : 'close-circle'}
            size={28}
            color={isTDSSafe ? '#2ecc71' : '#e74c3c'}
          />
          <Text style={[styles.statusText, { color: isTDSSafe ? '#2ecc71' : '#e74c3c' }]}>
            {isTDSSafe ? 'Good' : 'Not Good'}
          </Text>
        </View>
      </View>

      {/* Warning Message */}
      {(!isTurbiditySafe || !isTDSSafe) && (
        <Text style={styles.warningText}>
          ⚠️ Warning: Water parameters exceed safe levels!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f2f7fc',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#2c3e50',
  },
  card: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  safe: {
    borderLeftWidth: 6,
    borderLeftColor: '#2ecc71',
  },
  alert: {
    borderLeftWidth: 6,
    borderLeftColor: '#e74c3c',
  },
  label: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495e',
  },
  warningText: {
    marginTop: 20,
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statusContainer: {
    alignItems: 'center',
  },
  statusText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
});