import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC4DJ-GXUdPCOUfLl6x4BSbIUrakbmT-4k",
  authDomain: "productivity-app-578ab.firebaseapp.com",
  databaseURL: "https://productivity-app-578ab.firebaseio.com",
  projectId: "productivity-app-578ab",
  storageBucket: "productivity-app-578ab.appspot.com",
  messagingSenderId: "714911551245",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);