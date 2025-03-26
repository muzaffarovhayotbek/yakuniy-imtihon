import { auth } from '../firebase/firabageConfig';
import { 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    updateProfile 
} from "firebase/auth";
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useRegister = () => {
    const { dispatch } = useGlobalContext();
    const navigate = useNavigate(); 

    // Google orqali ro‘yxatdan o‘tish
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

    // Email va parol orqali ro‘yxatdan o‘tish
    const registerWithEmail = (displayName, email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                
                // Foydalanuvchi profilini yangilash
                updateProfile(user, { displayName })
                    .then(() => {
                        dispatch({ type: "LOGIN", payload: { ...user, displayName } });
                        toast.success("Account created successfully! Welcome, " + displayName);
                        navigate("/");
                    })
                    .catch((error) => {
                        console.error("Error updating profile:", error);
                        toast.error(error.message);
                    });
            })
            .catch((error) => {
                console.error("Error during registration:", error);
                toast.error(error.message);
            });
    };

    return { registerWithGoogle, registerWithEmail };
};
