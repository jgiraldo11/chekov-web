import { useContext } from "react"; 
import { useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

export default function LoginForm() { 

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

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                setUser(response.user);
                navigate("/");
            })
            .catch(err => alert(err.message))
    }

    return (
        <main>
        <form onSubmit={handleLogin}> 
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
            <input type="submit" value="Login" />
        </form>
        <button onClick={handleGoogle}>Login with Google</button>
        </main>
    );
}