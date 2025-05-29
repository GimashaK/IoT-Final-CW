import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

export default function BatteryGauge({ percentage = 0 }) {
  return (
    <View style={styles.container}>
      <AnimatedCircularProgress
        size={150}
        width={15}
        fill={percentage}
        tintColor={percentage > 20 ? '#2ecc71' : '#e74c3c'}
        backgroundColor="#eee"
      >
        {() => (
          <Text style={styles.text}>
            {percentage}%
          </Text>
        )}
      </AnimatedCircularProgress>
      <Text style={styles.label}>Battery</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', margin: 20, },
  text: { fontSize: 32, fontWeight: 'bold', color: '#34495e' },
  label: { marginTop: 10, fontSize: 18, color: '#7f8c8d' },
});
