import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

const db = admin.firestore();

async function clearSubscriptions() {
  console.log('🗑️  Clearing all Firestore subscriptions...\n');

  try {
    const subscriptionsRef = db.collection('subscriptions');
    const snapshot = await subscriptionsRef.get();

    if (snapshot.empty) {
      console.log('✅ No subscriptions found in Firestore');
      return;
    }

    console.log(`📊 Found ${snapshot.size} subscription(s) to delete`);

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
      console.log(`   ❌ Deleting subscription: ${doc.id}`);
    });

    await batch.commit();
    console.log(`\n✅ Successfully deleted ${snapshot.size} subscription(s) from Firestore!`);
  } catch (error) {
    console.error('❌ Error clearing subscriptions:', error);
    throw error;
  }
}

// Run the script
clearSubscriptions()
  .then(() => {
    console.log('\n✅ Firestore cleanup complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Firestore cleanup failed:', error);
    process.exit(1);
  });
