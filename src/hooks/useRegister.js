import toast from 'react-hot-toast';
import { auth } from '../firebase/firabageConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch({ type: 'LOGIN', payload: user });
        toast.success(`Welcome  ${user.displayName}!`);
        navigate('/');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`Xato: ${errorCode} - ${errorMessage}`);
      });
  };

  return { registerWithGoogle };
};
