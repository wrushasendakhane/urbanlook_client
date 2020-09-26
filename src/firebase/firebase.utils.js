import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

firebase.initializeApp(firebaseConfig);


export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName, email, createdAt, ...additionalData
      })
    } catch (error) {
      console.log("Error creating user", error.message)
    }
  }
  return userRef;
}


export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();

  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
}


export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items,
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});

}

export const convertSectionsSnapshotToMap = (sections) => {
  const transformedSections = sections.docs.map(docSnapshot => {

    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    }
  });

  return transformedSections;
}

export const convertOrdersSnapshotToMap = (orders) => {
  const transformedOrders = orders.docs.map(docSnapshot => {

    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    }
  });

  return transformedOrders;
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}

export const saveUserOrderDocument = async ({ uid, ...orderData }) => {
  const ordersRef = firestore.doc(`users/${uid}`).collection("orders");
  const snapshot = await ordersRef.get();

  if (!snapshot.exists) {
    const createdAt = new Date();

    try {
      await ordersRef.add({
        createdAt, ...orderData
      })
    } catch (error) {
      console.log("Error creating order", error.message)
    }
  }
}


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;