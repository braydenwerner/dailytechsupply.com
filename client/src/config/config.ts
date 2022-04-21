import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export type User = firebase.User | null
export const auth = firebase.auth()
export const analytics = firebase.analytics

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const facebookAuthProvider = new firebase.auth.FacebookAuthProvider()
export const microsoftAuthProvider = new firebase.auth.OAuthProvider(
  'microsoft.com'
)
microsoftAuthProvider.setCustomParameters({
  prompt: 'consent',
  tenant: '096a46d9-84f3-48ef-a75b-8f470dfb1b6b',
})

export const dev = process.env.NODE_ENV !== 'production'
export const serverURL = dev
  ? process.env.NEXT_PUBLIC_SERVER_DEVELOPMENT_URL
  : process.env.NEXT_PUBLIC_SERVER_PRODUCTION_URL
