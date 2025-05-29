import { MaterialCommunityIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

export default function BottomNavBar() {
  const router = useRouter();
  const path = usePathname();

  return (
    <View style={styles.navbar}>
      {/* Logout */}
      <TouchableOpacity
        style={path === '/logout' ? styles.active : styles.navItem}
        onPress={() => router.push('/(tabs)/explore')} // Change this to your actual logout logic/route
      >
        <MaterialCommunityIcons
          name="logout"
          size={35}
          color="black"
        />
      </TouchableOpacity>

      {/* Home / Dashboard */}
      <TouchableOpacity
        style={path === '/dashboard' ? styles.active : styles.navItem}
        onPress={() => router.push('/dashboard')}
      >
        <MaterialCommunityIcons
          name="home"
          size={40}
          color="black"
        />
      </TouchableOpacity>

      {/* Switch / Toggle */}
      <TouchableOpacity
        style={path === '/setting' ? styles.active : styles.navItem}
        onPress={() => router.push('/setting')} // Replace '/switch' with your actual toggle page/logic
      >
        <MaterialCommunityIcons
          name="cog"
          size={35}
          color="black"
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    height: 90,
    paddingBottom: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    padding: 10,
  },
  active: {
    padding: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'black',
  },
});
