import toast from 'react-hot-toast';
import { auth } from '../firebase/firabageConfig';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useGlobalContext } from '../context/GlobalContext';

export const useRegister = () => {
  const { dispatch } = useGlobalContext();

  const registerWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        dispatch({ type: 'LOGIN', payload: user });

        toast.success('Welcome ' + user.displayName);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  return { registerWithGoogle };
};
