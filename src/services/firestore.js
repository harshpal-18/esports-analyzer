import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "./firebase";

function ensureDb() {
  if (!db) throw new Error("Firebase not configured.");
}

// ── MATCHES ─────────────────────────────────────────────────────────────────

export function subscribeMatches(uid, callback) {
  ensureDb();
  const q = query(
    collection(db, "users", uid, "matches"),
    orderBy("date", "desc")
  );
  return onSnapshot(q, (snap) =>
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
}

export async function createMatch(uid, payload) {
  ensureDb();
  const ref = await addDoc(collection(db, "users", uid, "matches"), {
    ...payload,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return ref.id;
}

export async function deleteMatch(uid, matchId) {
  ensureDb();
  await deleteDoc(doc(db, "users", uid, "matches", matchId));
}

// ── PREFERENCES ─────────────────────────────────────────────────────────────

export function subscribeUserPreferences(uid, callback) {
  ensureDb();
  return onSnapshot(
    doc(db, "users", uid, "preferences", "competitive"),
    (snap) => callback(snap.exists() ? snap.data() : null)
  );
}

export async function saveUserPreferences(uid, payload) {
  ensureDb();
  await setDoc(
    doc(db, "users", uid, "preferences", "competitive"),
    { ...payload, updatedAt: serverTimestamp() },
    { merge: true }
  );
}

// ── LEADERBOARD ──────────────────────────────────────────────────────────────

export function subscribeLeaderboard(callback) {
  ensureDb();
  const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
  return onSnapshot(q, (snap) =>
    callback(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  );
}

export async function upsertLeaderboardProfile(uid, payload) {
  ensureDb();
  await setDoc(
    doc(db, "leaderboard", uid),
    { ...payload, updatedAt: serverTimestamp() },
    { merge: true }
  );
}