import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  async function updatePost() {
    const hardCodedId = "NlQvTRfxX3XlyV3E3MwM";
    const postRef = doc(db, "posts", hardCodedId);
    const post = await getPostById(hardCodedId);
    console.log(post);
    const newPost = {
      ...post,
      title: "Land a £400k job"
    };
    console.log(newPost);
    updateDoc(postRef, newPost)
  }

  function deletePost() {
    const hardCodedId = "NlQvTRfxX3XlyV3E3MwM";
    const postRef = doc(db, "posts", hardCodedId);
    deleteDoc(postRef);
  }

  function createPost() {
    const post = {
      title: "Finish Interview section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  async function getAllPosts() {
    const data = await getDocs(collection(db, "posts"));
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(posts);
  }

  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }

  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const data = await getDocs(postCollectionRef);
    const posts = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(posts);
  }

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
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
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "loading..." : user.email}
      <button onClick={createPost}>Create Post</button>
      <button onClick={getAllPosts}>Get All Posts</button>
      <button onClick={getPostById}>Get Post By Id</button>
      <button onClick={getPostByUid}>Get Post By Uid</button>
      <button onClick={updatePost}>Update Post</button>
      <button onClick={deletePost}>Delete Post</button>
    </div>
  );
}

export default App;

{
  /* <button onClick={login}>Login</button>
<button onClick={register}>Register</button>
<button onClick={logout}>Logout</button> */
}
