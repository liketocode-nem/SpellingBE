import "bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";

import SpellingBENavbar from "./Components/Navbar/Navbar";
import LandingPage from "./pages/LandingPage/LandingPage";
import Home from "./pages/Home/Home";
import Test from "./pages/Test/Test";
import ScrollAnimations from "./Components/ScrollAnimations/ScrollAnimations";
import Lists from "./pages/Lists/Lists";
import { Routes, Route, redirect, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import { getFirestore } from "firebase/firestore";
import { useEffect } from "react";
import End from "./pages/End/End";
import Analytics from "./pages/Analytics/Analytics";
import Sharing from "./pages/Sharing/Sharing";
function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBwQvr_Cgebq-WkZu5oxlzMOyRUgcYU-LQ",
    authDomain: "spellingbe-7e7bf.firebaseapp.com",
    projectId: "spellingbe-7e7bf",
    storageBucket: "spellingbe-7e7bf.appspot.com",
    messagingSenderId: "717164400377",
    appId: "1:717164400377:web:09203e5b550a07be881c28",
    measurementId: "G-NTQ2CH5XH4",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const firestore = getFirestore(app);
  const [user] = useAuthState(auth);
  const page = user ? (
    <Home user={user} firestore={firestore} />
  ) : (
    <LandingPage auth={auth} user={user} />
  );

  return (
    <>
      <ScrollAnimations />
      <SpellingBENavbar auth={auth} user={user} firestore={firestore} />
      <Routes>
        <Route path="/" element={page} />

        <Route
          path="/test"
          element={<Test user={user} firestore={firestore} />}
        />
        <Route
          path="/lists"
          element={<Lists user={user} firestore={firestore} />}
        />
        <Route
          path="/end"
          element={<End user={user} firestore={firestore} />}
        />
        <Route
          path="/analytics"
          element={<Analytics user={user} firestore={firestore} />}
        />
        <Route
          path="/sharing"
          element={<Sharing user={user} firestore={firestore} />}
        />
      </Routes>
    </>
  );
}

export default App;
