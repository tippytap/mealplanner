import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  query,
  onSnapshot,
  collection,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  orderBy,
  where,
  doc,
  setDoc
} from 'firebase/firestore';

import { 
  getAuth, 
  signInAnonymously, 
  createUserWithEmailAndPassword, 
  getAdditionalUserInfo,
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDtlm30NsiMgjKoIZ7LweZfyLJbRWDjuwc",
  authDomain: "meal-planner-18e6f.firebaseapp.com",
  projectId: "meal-planner-18e6f",
  storageBucket: "meal-planner-18e6f.appspot.com",
  messagingSenderId: "641983342902",
  appId: "1:641983342902:web:f575145df7ccfac0c8ab97"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth();

export const fbOnAuthStateChanged = onAuthStateChanged;

// Insert given meal into Firestore
export const createMeal = async (mealName, category) => {
  const mealColRef = collection(db, 'meals');
  await addDoc(mealColRef, {
    name: mealName,
    ingredients: [],
    createdOn: new Date(),
    category: category
  });
}

// Update a meal in the Firestore
export const updateMealDoc = async (meal) => {
  const mealRef = doc(db, 'meals', meal.docId);
  await updateDoc(mealRef, { ingredients: meal.ingredients });
} 

// Asychronously delete a meal from Firestore
export const deleteMeal = async (meal) => {
  await deleteDoc(doc(db, 'meals', meal.docId))
}

// Read all meals out of Firestore
export const getMeals = async () => {
  const q = query(collection(db, 'meals'), where('name', '!=', 'undefined'));
  let snapshot = await getDocs(q);
  const meals = [];
  snapshot.forEach((doc) => {
    meals.push({
      name: doc.data().name,
      ingredients: doc.data().ingredients,
      docId: doc.id,
      createdOn: new Date(doc.data().createdOn * 1000),
      category: doc.data().category
    })
  })
  return meals;
}

export const login = (email, password) => {
  if(!auth.currentUser) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
      })
      .catch((error) => {
        console.log(error.message);
      })
  }
}

export const logout = () => {
  signOut(auth).then(() => {
    console.log(auth);
    console.log(auth.currentUser === null);
    console.log("logout successful");
  })
  .catch((error) => {
    console.log(error.message);
  })
}

export const fbAuth = auth;