import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function ensureDb() {
  if (!db) {
    throw new Error(
      "Firebase not configured. Set NEXT_PUBLIC_FIREBASE_* environment variables."
    );
  }
}

// ===================== MATCHES =====================

export function subscribeMatches(uid, callback) {
  ensureDb();

  const matchesRef = collection(db, "users", uid, "matches");
  const q = query(matchesRef, orderBy("date", "desc"));

  return onSnapshot(q, (snap) => {
    const rows = snap.docs.map((row) => ({
      id: row.id,
      ...row.data(),
    }));
    callback(rows);
  });
}

// 🔥 FIXED FUNCTION
export async function createMatch(uid, payload) {
  try {
    ensureDb();

    console.log("📤 Sending match to Firestore:", payload);

    const matchesRef = collection(db, "users", uid, "matches");

    const docRef = await addDoc(matchesRef, {
      ...payload,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("✅ Match saved with ID:", docRef.id);

    return true; // ✅ IMPORTANT

  } catch (error) {
    console.error("❌ Firestore error:", error);
    throw error; // ✅ IMPORTANT
  }
}

// ===================== PREFERENCES =====================

export function subscribeUserPreferences(uid, callback) {
  ensureDb();

  const prefRef = doc(db, "users", uid, "preferences", "competitive");

  return onSnapshot(prefRef, (snap) => {
    callback(snap.exists() ? snap.data() : null);
  });
}

export async function saveUserPreferences(uid, payload) {
  try {
    ensureDb();

    const prefRef = doc(db, "users", uid, "preferences", "competitive");

    await setDoc(
      prefRef,
      {
        ...payload,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return true;

  } catch (error) {
    console.error("❌ Preferences error:", error);
    throw error;
  }
}

// ===================== LEADERBOARD =====================

export function subscribeLeaderboard(callback) {
  ensureDb();

  const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));

  return onSnapshot(q, (snap) => {
    callback(
      snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }))
    );
  });
}

export async function upsertLeaderboardProfile(uid, payload) {
  try {
    ensureDb();

    const profileRef = doc(db, "leaderboard", uid);

    await setDoc(
      profileRef,
      {
        ...payload,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );

    return true;

  } catch (error) {
    console.error("❌ Leaderboard error:", error);
    throw error;
  }
}