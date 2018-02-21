import fire from "./fire";
import "firebase/firestore";

export const auth = fire.auth();

const db = fire.firestore();

export const userDb = db.collection("users");
