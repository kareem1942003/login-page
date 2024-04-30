/* eslint-disable no-undef */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGRuD9JWaFFhFaA6-DpgqyD1FpkAJaEFI",
  authDomain: "authproject-e29e8.firebaseapp.com",
  projectId: "authproject-e29e8",
  storageBucket: "authproject-e29e8.appspot.com",
  messagingSenderId: "843949302583",
  appId: "1:843949302583:web:94fef7de062149a82eb0b2",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;
