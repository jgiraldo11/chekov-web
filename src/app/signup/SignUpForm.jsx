import { useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthContext } from "../../App";

const firebaseConfig = {
    apiKey: "AIzaSyBlwXgOqIho-W7AjS55POaYp_iiNgmdaxE",
    authDomain: "chekov-jg.firebaseapp.com",
    projectId: "chekov-jg",
    storageBucket: "chekov-jg.appspot.com",
    messagingSenderId: "995302319781",
    appId: "1:995302319781:web:c7c8b5a63679cb1cf50f4c"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

export default function SignUpForm() { 

    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth,provider)
        .then(response => {
            setUser(response.user);
            navigate("/");
    })
    .catch(err => alert(err.message))
    }

    const handleSignup = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        createUserWithEmailAndPassword(auth, email, password)
            .then(response => {
                setUser(response.user);
                navigate("/");
            })
            .catch(err => alert(err.message))
    }

    return (
        <main>
        <form onSubmit={handleSignup}> 
         <label htmlFor="email">
            Email 
            <input type="email" name="email" />
            </label>
            <br />
        <label htmalFor="password">
            Password 
            <input type="password" name="password" />
            </label>
            <br />
            <input type="submit" value="Sign Up" />
        </form>
        <button onClick={handleGoogle}>Signup with Google</button>
        </main>
    );
}