import { initializeApp } from 'firebase/app';
import { getFirestore, onSnapshot, doc, collection, setDoc, getDoc, addDoc, deleteDoc, getDocs, updateDoc, query, where, orderBy, Timestamp, arrayUnion } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA5krjBInKTGS5GkfAy6s5Hx8VrmNpHJd8",
    authDomain: "progresspalv2.firebaseapp.com",
    projectId: "progresspalv2",
    storageBucket: "progresspalv2.appspot.com",
    messagingSenderId: "682631959560",
    appId: "1:682631959560:web:3c7ac3af723e38ce89adbd",
    measurementId: "G-DLD5VJRHG6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  db,
  doc,
  collection,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  orderBy,
  Timestamp,
    arrayUnion
};

export const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    // Get a reference to the Firestore document
    const userRef = firebase.firestore().doc(`users/${user.uid}`);

    // Go and fetch a document from that location
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
        const { email } = user;
        const { firstName, lastName, height, weight, gender, dateOfBirth, profilePic } = additionalData;
        const createdAt = new Date();

        try {
            await userRef.set({
                firstName,
                lastName,
                email,
                height,
                weight,
                gender,
                dateOfBirth,
                profilePic,
                createdAt,
            });
        } catch (error) {
            console.error('Error creating user document', error);
        }
    }

    return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
    if (!uid) return null;

    try {
        const userDocument = await firebase.firestore().doc(`users/${uid}`).get();

        return {
            uid,
            ...userDocument.data(),
        };
    } catch (error) {
        console.error('Error fetching user', error);
    }
};
