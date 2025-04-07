import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey:import.meta.env.VITE_ApiKey,
    authDomain:import.meta.env.VITE_AuthDomain,
    projectId:import.meta.env.VITE_ProjectId,
    storageBucket:import.meta.env.VITE_StorageBucket,
    messagingSenderId:import.meta.env.VITE_MessagingSenderId,
    appId:import.meta.env.VITE_AppId,
    measurementId:import.meta.env.VITE_MeasurementId
  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };