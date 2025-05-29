// firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBVorCL6a2qACMB04BxEDQTmgoYUY2LRpo",
  authDomain: "iot-cw-f803e.firebaseapp.com",
  databaseURL: "https://iot-cw-f803e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-cw-f803e",
  storageBucket: "iot-cw-f803e.appspot.com",
  messagingSenderId: "1024942139800",
  appId: "1:1024942139800:android:f3674740a8283af91323ed"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };

