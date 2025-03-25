import { auth } from "../firebase/firabageConfig";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

export const useRegister = () => {
    const { dispatch } = useGlobalContext();
    const navigate = useNavigate(); 

    const registerWithGoogle = () => {
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log(user);
                
                dispatch({ type: "LOGIN", payload: user });
                toast.success("Welcome, " + user.displayName);
                
                navigate("/"); 
            })
            .catch((error) => {
                console.error("Error during Google Sign-In:", error);
                toast.error(error.message);
            });
    };


    const RegisterWithEmail = (displayName, email, password) => {}

    return { registerWithGoogle, RegisterWithEmail };
};

