import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCiNGx69_qP-hHXYKJ15irve8HtbE5hpxI",
  authDomain: "placassolares-d9d13.firebaseapp.com",
  databaseURL: "https://placassolares-d9d13-default-rtdb.firebaseio.com",
  projectId: "placassolares-d9d13",
  storageBucket: "placassolares-d9d13.appspot.com",
  messagingSenderId: "12804805087",
  appId: "1:12804805087:web:4234732c0e7dd23ec8f46a",
  measurementId: "G-DX4X63323Z",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db = getDatabase(app);
