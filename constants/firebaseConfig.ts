// constants/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {

    apiKey: "AIzaSyAoTFl1x-UQ1203zszAOdyM8vwr4o3u5UA",
  
    authDomain: "gesa-iot.firebaseapp.com",
  
    databaseURL: "https://gesa-iot-default-rtdb.firebaseio.com",
  
    projectId: "gesa-iot",
  
    storageBucket: "gesa-iot.firebasestorage.app",
  
    messagingSenderId: "119713991521",
  
    appId: "1:119713991521:web:3903c3bb52877d18b05320",
  
    measurementId: "G-CP3TN41REH"
  
  };
  

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
