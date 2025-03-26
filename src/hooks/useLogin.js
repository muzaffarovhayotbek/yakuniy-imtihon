import { auth } from '../firebase/firabageConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useLogin = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const loginWithEmail = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      console.log('User logged in:', user);

      dispatch({ type: 'LOGIN', payload: user });

      toast.success(`Xush kelibsiz, ${user.displayName || 'Foydalanuvchi'}!`);

      navigate('/');
    } catch (error) {
      console.error('Login error:', error);

      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          toast.error('Email yoki parol noto‘g‘ri!');
          break;
        case 'auth/user-not-found':
          toast.error('Bunday foydalanuvchi mavjud emas.');
          break;
        case 'auth/invalid-email':
          toast.error('Noto‘g‘ri email manzil kiritildi.');
          break;
        case 'auth/too-many-requests':
          toast.error(
            'Ko‘p marta noto‘g‘ri urinish! Keyinroq qayta urinib ko‘ring.'
          );
          break;

        default:
          toast.error(`Kirishda xatolik yuz berdi: ${error.message}`);
      }
    }
  };

  return { loginWithEmail };
};
