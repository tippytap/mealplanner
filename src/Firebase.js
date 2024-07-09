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
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

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

export const createCategory = async (categoryName) => {
  const categoryColRef = collection(db, 'categories');
  await addDoc(categoryColRef, {
    name: categoryName,
    createdOn: new Date()
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

/**
 * Returns promise
 */
export const getCategory = (categoryName) => {
  const q = query(collection(db, 'categories'), where('name', '==', categoryName));
  return getDocs(q);
}

export const getCategories = async () => {
  const q = query(collection(db, 'categories'), where('name', '!=', 'undefined'));
  let snapshot = await getDocs(q);
  const categories = [];
  snapshot.forEach((doc) => {
    categories.push(doc.data().name);
  })
  return categories;
}

export const getLists = async () => {
  const q = query(collection(db, 'lists'), where('id', '!=', 'undefined'));
  let snapshot = await getDocs(q);
  const lists = [];
  console.log("getLists");
  snapshot.forEach((doc) => {
    let data = doc.data();
    lists.push({
        title: data.title,
        id: data.id,
        docId: doc.id,
        items: data.items
    });
  })
  return lists;
}

export const createList = async (listTitle) => {
  const listColRef = collection(db, 'lists');
  await addDoc(listColRef, {
    title: listTitle,
    id: listTitle,
    createdOn: new Date(),
    items:[]
  });
}

export const updateListDoc = async (list) => {
  const listRef = doc(db, 'lists', list.docId);
  await updateDoc(listRef, {...list});
} 

export const deleteList = async (list) => {
  console.log("delete list");
  await deleteDoc(doc(db, 'lists', list.docId))
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