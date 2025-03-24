import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDBT-TCgaqHygvslkFABJRQI39Y9Jkteh8',
  authDomain: 'exam-splash.firebaseapp.com',
  projectId: 'exam-splash',
  storageBucket: 'exam-splash.firebasestorage.app',
  messagingSenderId: '1072978935781',
  appId: '1:1072978935781:web:f3f3dd9fdb5f6e9b61790c',
  measurementId: 'G-VQH964B8P8',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export  const auth  = getAuth() 