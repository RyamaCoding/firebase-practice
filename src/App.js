import React from "react";
import "./App.css";
import { auth } from "./firebase/init";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [loggedIn, setLoggedIn] = React.useState();
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user.email[0].toUpperCase());
      if (user) {
        setUser(user);
      }
    });
  }, []);

  function register() {
    console.log("register");
    createUserWithEmailAndPassword(auth, "email@email.com", "test123")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "test123")
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }

  return (
    <div className="nav">
    <figure>
      <img
        src="https://frontendsimplified.com/_nuxt/img/Frontend%20Simplified%20Logo.853fbda.png"
        className="nav__img"
        alt="logo"
      />
    </figure>
    <div className="btns__wrapper">
      {user.email ? (
        <button className="nav__btn" onClick={logout}>{user.email[0].toUpperCase()}</button>
      ) : (
          <div className="nav__btns">
            <button className="nav__btn--log" onClick={login}>Login</button>
            <button className="nav__btn--reg" onClick={register}>Register</button>
          </div>
      )}
    </div>
      </div>
  );
}

export default App;

{
  /* <button onClick={login}>Login</button>
<button onClick={register}>Register</button>
<button onClick={logout}>Logout</button> */
}
