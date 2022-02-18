// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC0IM4310RG1b6R7FEs3wXrOs5Kf15I3vA',
  authDomain: 'instagram2-37911.firebaseapp.com',
  projectId: 'instagram2-37911',
  storageBucket: 'instagram2-37911.appspot.com',
  messagingSenderId: '966300191712',
  appId: '1:966300191712:web:a0e355375e56448e15f985',
}

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()

const db = getFirestore()
const storage = getStorage()

export { app, db, storage }
