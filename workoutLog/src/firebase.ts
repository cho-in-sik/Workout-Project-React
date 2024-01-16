import { initializeApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBfvEcQ71YcfFhm7p-CP5qQKqJSnWI1bM8',
  authDomain: 'healthlog-377df.firebaseapp.com',
  projectId: 'healthlog-377df',
  storageBucket: 'healthlog-377df.appspot.com',
  messagingSenderId: '821583104888',
  appId: '1:821583104888:web:d4404243a4575c418f968d',
  measurementId: 'G-KF8J7MG9NZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
