import { auth } from '../firebase/firabageConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const loginWithEmail = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        dispatch({ type: 'LOGIN', payload: user });
        toast.success('Welcome back, ' + user.displayName);

        navigate('/');
      })
      .catch((error) => {
        console.error('Error during email login:', error);
        toast.error(error.message);
      });
  };

  return { loginWithEmail };
};
