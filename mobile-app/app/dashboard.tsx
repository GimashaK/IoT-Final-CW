import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';

import BottomNavBar from '@/components/NavBar';
import SensorCard from '@/components/SensorCard';
import { FontAwesome5 } from '@expo/vector-icons';
import { onValue, ref } from 'firebase/database';
import { database } from './firebaseConfig';

export const unstable_settings = { headerShown: false };

type BoatLocation = {
  latitude: number;
  longitude: number;
};

type SensorData = {
  turbidity: number;
  tds: number;
};

type user = {
  name: string;
}

export default function Dashboard() {
  const [boatLocation, setBoatLocation] = useState<BoatLocation>({
    latitude: 6.927155,
    longitude: 79.861255,
  });

  const [sensorData, setSensorData] = useState<SensorData>({
    turbidity: 0,
    tds: 0,
  });

    const [user, setuser] = useState<user>({
    name: '',
  });

  useEffect(() => {
    // Reference to robot location
    const locationRef = ref(database, 'robot/location');
    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setBoatLocation({
          latitude: data.latitude,
          longitude: data.longitude,
        });
      }
    });

    // Reference to robot sensors
    const sensorsRef = ref(database, 'robot/sensors');
    onValue(sensorsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setSensorData({
          turbidity: data.turbidity,
          tds: data.tds,
        });
      }
    });

    const userRef = ref(database, 'robot/user');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setuser({
          name: data.name,
        });
      }
    });
    
  }, []);

  const isTurbiditySafe = sensorData.turbidity <= 5;
  const isTDSSafe = sensorData.tds <= 500;

  const region: Region = {
    latitude: boatLocation.latitude,
    longitude: boatLocation.longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  return (
    <View style={styles.container}>
      <ImageBackground
          source={require('../assets/images/bg.jpg')}
          style={styles.statusBar}
          resizeMode="cover">
      <View style={styles.statusBar}>
        <ImageBackground
          source={require('../assets/images/bg.jpg')}
          style={styles.statusBar}
          resizeMode="cover"
        >
          <View style={styles.userdataview}>
            <Text style={styles.userdata}>Welcome</Text>
            <Text style={styles.username}>{user.name}</Text>
          </View>

          <View style={styles.mapcon}>
            <MapView style={styles.map} initialRegion={region} region={region}>
              <Marker coordinate={boatLocation}>
                <FontAwesome5 name="ship" size={32} color="#1E90FF" />
              </Marker>
            </MapView>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.content}>
        <View style={styles.cardsection}>
        <SensorCard
          iconName="water-outline"
          label="Turbidity"
          value={sensorData.turbidity}
          unit="NTU"
          isSafe={isTurbiditySafe}
        />

        <SensorCard
          iconName="chemical-weapon"
          label="TDS"
          value={sensorData.tds}
          unit="ppm"
          isSafe={isTDSSafe}
        />
        </View>
      </View>

      <BottomNavBar />
      </ImageBackground>
    </View>

//     <View style={styles.containerd}>
//       <View style={styles.containerdt}>
//         <View>

//         </View>
//         <View style={styles.userd}>
//           <Text style={styles.userdataw}>Welcome</Text>
//           <Text style={styles.usernamen}>{user.name}</Text>
//         </View>

//       </View>
//       <View style={styles.containerdm}>
//          <View style={styles.mapcon}>
//              <MapView style={styles.map} initialRegion={region} region={region}>
//                <Marker coordinate={boatLocation}>
//                  <FontAwesome5 name="ship" size={32} color="#1E90FF" />
//               </Marker>
//             </MapView>
//           </View>
//          <View style={styles.cardsection}>
//   <View style={{ flex: 1, marginRight: 10 }}>
//     <SensorCard
//       iconName="water-outline"
//       label="Turbidity"
//       value={sensorData.turbidity}
//       unit="NTU"
//       isSafe={isTurbiditySafe}
//     />
//   </View>

//   <View style={{ flex: 1 }}>
//     <SensorCard
//       iconName="chemical-weapon"
//       label="TDS"
//       value={sensorData.tds}
//       unit="ppm"
//       isSafe={isTDSSafe}
//     />
//   </View>
// </View>


//       </View>
//       <View style={styles.containerdd}>
//          <BottomNavBar />
//       </View>

//     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(178, 231, 247, 0.95)',
  },
  statusBar: {
    padding: 0,
    flex:1.8,
    justifyContent: 'flex-end',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    gap: '4%',
  },
  cardsection: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 50,
    flexDirection: 'row',
    gap: '4%',
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
    borderBottomLeftRadius: 65,
    borderBottomRightRadius: 65,
    overflow: 'hidden',
    marginBottom:20
  },
  userdata: {
    fontSize: 18,
    fontWeight: '600',
  },
  username: {
    fontSize: 28,
    fontWeight: '900',
  },
  userdataview: {
    paddingTop: 25,
    paddingRight: 25,
    paddingBottom: 15,
    paddingLeft: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.76)',
    margin: 15,
    marginTop: 25,
    borderRadius: 15,
  },
  map: {
    width: '100%',
    height: 300,
    borderRadius: 12,
  },
  mapcon: {
    backgroundColor: '#fff',
    marginTop: 70,
    borderTopLeftRadius: 65,
    borderTopRightRadius: 65,
    overflow: 'hidden',
  },

//   containerd: {
//   flex: 1,
//   flexDirection: 'column',
//   backgroundColor: '#f5fafe', // light background
// },

// containerdt: {
//   flex: 2.5,
//   backgroundColor: '#ffffff',
//   // borderBottomLeftRadius: 25,
//   // borderBottomRightRadius: 25,
//   shadowColor: '#000',
//   shadowOpacity: 0.1,
//   shadowOffset: { width: 0, height: 3 },
//   shadowRadius: 5,
//   elevation: 5,
//   justifyContent: 'flex-end'
// },

// containerdm: {
//   flex: 10,
//   backgroundColor: '#eaf4f9',
//   padding: 10,
// },

// containerdd: {
//   flex: 2,
//   backgroundColor: '#ffffff',
//   borderTopLeftRadius: 25,
//   borderTopRightRadius: 25,
//   padding: 15,
//   shadowColor: '#000',
//   shadowOpacity: 0.1,
//   shadowOffset: { width: 0, height: -3 },
//   shadowRadius: 5,
//   elevation: 5,
// },
// userd: {
//   backgroundColor: '#fff',  // Note the corrected color (missing #)
//   flex: 1,
//   margin: 0,
//   padding: 20,

//   // Shadow for iOS
//   shadowColor: '#000',
//   shadowOffset: { width: 0, height: -4 },
//   shadowOpacity: 0.15,
//   shadowRadius: 4,

//   // Elevation for Android
//   elevation: 6,

//   // Optional: create visual padding space at bottom
//   borderBottomWidth: 4,
//   borderBottomColor: '#ccc',
//   justifyContent: 'flex-end'
// },
// userdataw:{

//  fontSize: 18,
// fontWeight: '600'
// },
// usernamen:{
//   fontSize: 28,
//   fontWeight: '900'
// },
// map: {
//     width: '100%',
//     height: 500,
//     borderRadius: 12,
//   },
//   mapcon: {
//     backgroundColor: '#fff',
//     // borderTopLeftRadius: 0,
//     // borderTopRightRadius: 0,
//     overflow: 'hidden',
//     borderRadius: 15
//   },
//   cardsection:{
//     flexDirection:'row',
//     gap: 13,
//     padding: 10,
//     marginTop: -50
//   }

});
