import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import { UserContext } from '../screens/login-signup/UserContext';

const useUpdate = () => {
  const { userDetails, userImages, setUserImages } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
        const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus.status !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const initialValues = {
    weight: 0,
    height: 0,
    neck: 0,
    waist: 0,
  };

  const [values, setValues] = useState({
    ...initialValues,
    weight: userDetails.weight,
    height: userDetails.height,
  });

  const handleSubmit = (values) => {
    console.log(values);
  };

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        let timestamp = format(new Date(), 'dd/MM/yyyy');
        let newImage = { uri: result.uri, timestamp: timestamp };
        setUserImages((prevImages) => [...prevImages, newImage]);
      }
    } catch (err) {
      console.log('🚫', err);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      let timestamp = format(new Date(), 'dd/MM/yyyy');
      let newImage = { uri: result.uri, timestamp: timestamp };
      setUserImages((prevImages) => [...prevImages, newImage]);
    }
  };

  const handleRemoveImage = (uri) => {
    const filteredUserImages = userImages.filter((image) => image.uri !== uri);
    setUserImages(filteredUserImages);
  };

  return {
    selectImage,
    takePhoto,
    handleRemoveImage,
    handleSubmit,
  };
};

export default useUpdate;
