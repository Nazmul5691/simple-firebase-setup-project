import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.init";
import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState([])
    
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider()
    // const githubProvider = new GithubAuthProvider()


    const handleGoogleSignIn = () => {
       signInWithPopup(auth, googleProvider)
       .then(result => {
        const loggedInUser = result.user;
        console.log(loggedInUser);
        setUser(loggedInUser)
       })

       .catch(error => {
        console.log('error:', error.message);
       })


    }

    // const handleGithubSignIn = () =>{
    //     signInWithPopup(auth, githubProvider)
    //     .then(result => {
    //         const loggedUser = result.user;
    //         console.log(loggedUser);
    //         setUser(loggedUser)
    //     })
    //     .catch(error =>{
    //         console.log(error);
    //     })
    // }

    const handleSignOut = () =>{
        signOut(auth)
        .then(result => {
            console.log(result);
            setUser(null)
        })
        .catch(error =>{
            console.log(error);
        })

    }


    return (
        <div>


           { 
            user ?
            <button onClick={handleSignOut}>Sign Out</button> :
            <>
                <button onClick={handleGoogleSignIn}>Google Login</button>
                {/* <button onClick={handleGithubSignIn}>Github Login</button> */}
            </>
            }

            {user && 
            <div>
                <h2>user : {user.displayName}</h2>
                <p>email : {user.email}</p>
                <img src={user.photoURL} alt="" />
            </div>}
        </div>
    );
};

export default Login;