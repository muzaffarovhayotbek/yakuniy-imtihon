import { updateProfile } from "firebase/auth";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firabageConfig";
import { auth } from "../firebase/firabageConfig";

import { useGlobalContext } from "../context/GlobalContext";

import { toast } from "react-toast";

export const useStorage = () => {
  const { user, dispatch } = useGlobalContext();

  const updateImage = async (base64String) => {
    const storageRef = ref(storage, `profilePictures/${user.uid}.png`);

    try {
      await uploadString(storageRef, base64String, "data_url");
      const downloadUrl = await getDownloadURL(storageRef);
      updateProfile(auth.currentUser, {
        photoURL: downloadUrl,
      })
        .then(() => {
          toast.success("Image Updated !");
        })
        .catch((error) => {
          toast.error(error.message);
        });
      console.log(`Profile image updated successfully: `, downloadUrl);
    } catch (error) {
      toast.success(`Error uploading image: `, error.message);
    }
  };

  return { updateImage };
};
