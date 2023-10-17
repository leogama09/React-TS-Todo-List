import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6TwApNTUwOL-C-pzsAqndUqNdl1Y3RTQ",
  authDomain: "react-crud2-3e263.firebaseapp.com",
  projectId: "react-crud2-3e263",
  storageBucket: "react-crud2-3e263.appspot.com",
  messagingSenderId: "46008117709",
  appId: "1:46008117709:web:44401ec24729780d9c7c84"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };