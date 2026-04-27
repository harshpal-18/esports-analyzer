import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { subscribeAuth } from "@/services/auth";

export function subscribeAuth(callback) {
  if (!hasFirebaseConfig || !auth) {
    callback(null);
    return () => undefined;
  }

  return onAuthStateChanged(auth, async (user) => {
    if (!user) {
      try {
        const cred = await signInAnonymously(auth);
        callback(cred.user);
      } catch {
        callback(null);
      }
      return;
    }
    callback(user);
  });
}
