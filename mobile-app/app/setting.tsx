import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavBar from '../components/NavBar'; // Adjust the path if needed

export default function Setting() {
  const handleGoToArea = () => {
    alert('Robot is going to the area...');
  };

  const handleUnload = () => {
    alert('Robot is unloading...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Robot Control</Text>

        <TouchableOpacity style={styles.button} onPress={handleGoToArea}>
          <MaterialCommunityIcons name="map-marker-path" size={30} color="#fff" />
          <Text style={styles.buttonText}>Go to Area</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleUnload}>
          <MaterialCommunityIcons name="robot-industrial" size={30} color="#fff" />
          <Text style={styles.buttonText}>Unload</Text>
        </TouchableOpacity>
      </View>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f0ff',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#1a1a1a',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: '90%',
    marginBottom: 20,
    justifyContent: 'space-between',
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
