/* ============================================================
   FEELS TIMELESS — Firebase config
   Paste your Firebase web-app config below to switch reviews
   (and traveler photo uploads) from this-device-only storage to
   a shared cloud database everyone sees.

   Where to get it:
   1. console.firebase.google.com → Add project (e.g. "feelstimeless")
   2. Build → Firestore Database → Create database (production mode)
   3. Project overview → </> (Add web app) → register → copy the
      firebaseConfig object and paste it here.
   4. Firestore → Rules → paste the contents of firestore.rules → Publish.

   Until this is filled in, the site works exactly as before
   (reviews stay in each visitor's browser).
   ============================================================ */

window.FIREBASE_CONFIG = {
  apiKey: "AIzaSyBeFCywJnRK4QRiw-peKOMdVTLkwQiRDlg",
  authDomain: "feels-timeless.firebaseapp.com",
  projectId: "feels-timeless",
  storageBucket: "feels-timeless.firebasestorage.app",
  messagingSenderId: "848320854818",
  appId: "1:848320854818:web:eb2bcf403ef40f137d037b",
  measurementId: "G-74VRRG8CQ6"
};
