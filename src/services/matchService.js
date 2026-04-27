import { db } from "@/services/firebase";
import { collection, addDoc } from "firebase/firestore";

export const saveMatch = async (data) => {
  await addDoc(collection(db, "matches"), {
    ...data,
    createdAt: new Date(),
  });
};