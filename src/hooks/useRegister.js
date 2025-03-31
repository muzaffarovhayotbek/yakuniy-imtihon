import { auth } from '../firebase/firabageConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useGlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export const useRegister = () => {
  const { dispatch } = useGlobalContext();
  const navigate = useNavigate();

  const registerWithEmail = async (
    username,
    email,
    password,
    confirmPassword
  ) => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error('Barcha maydonlarni to‘ldiring!');
      return null;
    }

    if (password !== confirmPassword) {
      toast.error('Parollar mos kelmadi!');
      return null;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, { displayName: username });

      console.log('User registered:', user);

      dispatch({ type: 'REGISTER', payload: user });

      toast.success(`Xush kelibsiz, ${username}!`);
      navigate('/login');

      return user;
    } catch (error) {
      console.error('Register error:', error);

      switch (error.code) {
        case 'auth/email-already-in-use':
          toast.error('Bu email allaqachon ro‘yxatdan o‘tgan.');
          break;
        case 'auth/invalid-email':
          toast.error('Noto‘g‘ri email manzil kiritildi.');
          break;
        case 'auth/weak-password':
          toast.error('Parol juda oddiy. Iltimos, murakkabroq parol tanlang.');
          break;
        default:
          toast.error(`Ro‘yxatdan o‘tishda xatolik: ${error.message}`);
      }

      return null;
    }
  };

  return { registerWithEmail };
};
