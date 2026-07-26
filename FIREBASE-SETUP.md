# Connect Firebase (shared reviews + traveler photos)

The site already contains everything it needs — you only have to create a free
Firebase project and paste its config. Takes about 5 minutes.

## 1. Create the project
1. Go to https://console.firebase.google.com and sign in.
2. **Add project** → name it `feelstimeless` → (Analytics optional) → Create.

## 2. Enable Firestore
1. In the left menu: **Build → Firestore Database → Create database**.
2. Choose **Production mode**, pick a location (e.g. `eur3` or `us-central1`), Done.

## 3. Publish the security rules
1. Firestore → **Rules** tab.
2. Delete what's there, paste the entire contents of [`firestore.rules`](firestore.rules), **Publish**.
   - These rules let anyone read reviews and create a well-formed review
     (max 3 photos, capped field sizes), but nobody can edit or delete
     from the website — only you, from the console.

## 4. Register the web app & paste the config
1. Project overview → click the **`</>`** (web) icon → nickname `feelstimeless-site` → Register.
2. Copy the `firebaseConfig = { ... }` object it shows you.
3. Open [`assets/js/firebase-config.js`](assets/js/firebase-config.js) and replace
   `window.FIREBASE_CONFIG = null;` with:
   ```js
   window.FIREBASE_CONFIG = { /* the object you copied */ };
   ```
4. Commit + push (or ask Claude to). Done — reviews and photos are now shared
   by every visitor on every device.

## Notes
- **Photos** are compressed in the visitor's browser (~max 300 KB each, up to 3)
  and stored inside the review document, so the free Spark plan is enough —
  no Cloud Storage or billing needed.
- Until the config is pasted, the site silently falls back to per-device
  reviews (localStorage), exactly as before.
- To moderate: Firestore → Data → `reviews` collection → delete any document.
