import React, { useState, useContext } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Appearance,
  ScrollView,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useNavigation } from '@react-navigation/native';
import useUpdate from '../../hooks/useUpdate';
import { UserContext } from '../login-signup/UserContext';
import {
  faCamera,
  faImage,
  faRulerVertical,
  faShareSquare,
  faTape,
  faWeight,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import Header from '../../utils/Header';
import TextField from '../../components/TextField';
import IconButton from '../../components/IconButton';
import ProgressImage from '../../components/ProgressImage';

export default function UpdateScreen() {
  const colorScheme = Appearance.getColorScheme();
  const { userDetails, userImages, setUserImages } = useContext(UserContext);
  const [waist, setWaist] = useState(null);
  const [neck, setNeck] = useState(null);
  const [weight, setWeight] = useState(userDetails.weight);
  const [height, setHeight] = useState(userDetails.height);
  const [title, setTitle] = useState();
  const navigation = useNavigation();

  const { selectImage, takePhoto, handleRemoveImage, handleSubmit } = useUpdate();

  const colors = {
    background: colorScheme === 'dark' ? '#000' : '#fff',
    text: colorScheme === 'dark' ? '#fff' : '#000',
    header: colorScheme === 'dark' ? 'black' : 'white',
  };

  function handleClose() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={[{ backgroundColor: colors.background }, styles.container]}>
        <Header
          handleClose={handleClose}
          screenName='Add'
          rightButton={
            <IconButton
              onPress={() => {}}
              icon={
                <FontAwesomeIcon icon={faShareSquare} size={25} color='#222' />
              }
            />
          }
          onRightIconPress={() => {
            console.log('share');
          }}
        />
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          style={{ width: '100%', flexDirection: 'column' }}
        >
          <TextField
            value={weight}
            onChangeText={(text) => setWeight(text)}
            keyboardType='numeric'
            placeholder='Your weight (kg)'
            icon={<FontAwesomeIcon icon={faWeight} size={24} color='#7B6F72' />}
          />
          <TextField
            value={height}
            onChangeText={(text) => setHeight(text)}
            keyboardType='numeric'
            placeholder='Your Height (cm)'
            icon={
              <FontAwesomeIcon
                icon={faRulerVertical}
                size={24}
                color='#7B6F72'
              />
            }
          />
          <TextField
            value={neck}
            onChangeText={(text) => setNeck(text)}
            keyboardType='numeric'
            placeholder='Your Neck (cm)'
            icon={<FontAwesomeIcon icon={faTape} size={24} color='#7B6F72' />}
          />
          <TextField
            value={waist}
            onChangeText={(text) => setWaist(text)}
            keyboardType='numeric'
            placeholder='Your Waist (cm)'
            icon={<FontAwesomeIcon icon={faTape} size={24} color='#7B6F72' />}
          />
          <View style={{ marginTop: 20, borderBottomWidth: 1, width: '80%' }}>
            <TextInput
              placeholder='Title'
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={{ marginLeft: 10, width: '100%' }}
            />
          </View>

          <View
            style={{ marginTop: 20, borderWidth: 1, width: '80%', height: 100 }}
          >
            <TextInput
              placeholder='Add description (optional)'
              value={title}
              onChangeText={(text) => setTitle(text)}
              style={{ marginLeft: 10, width: '100%', paddingTop: 10 }}
            />
          </View>

          <View style={[styles.buttonContainer, { marginTop: 25 }]}>
            <Button
              onPress={takePhoto}
              icon={
                <FontAwesomeIcon
                  icon={faCamera}
                  size={20}
                  color={colors.background}
                />
              }
              title='Camera'
            />
            <Button
              onPress={selectImage}
              icon={
                <FontAwesomeIcon
                  icon={faImage}
                  size={20}
                  color={colors.background}
                />
              }
              title='Gallery'
            />
          </View>

          {userImages &&
            userImages.map((image) => {
              return (
                <ProgressImage
                  key={image.uri}
                  source={{ uri: image.uri }}
                  timestamp={image.timestamp}
                  removeImage={handleRemoveImage}
                />
              );
            })}
          <Button
            title='Save'
            onPress={() => {}}
            style={{ borderRadius: 99, height: 60, marginHorizontal: 39 }}
            width='100%'
            textStyle={{ fontSize: 24, fontWeight: 'bold' }}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '65%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 10,
  },
  cardHeader: {
    shadowColor: '#000', // This is your box shadow color
    shadowOffset: {
      width: 0, // These are your box shadow offsets
      height: 2,
    },
    shadowOpacity: 0.23, // This is your box shadow opacity
    shadowRadius: 2.62, // This is your box shadow radius
    elevation: 4, // This adds shadow to Android and needs to be used in conjunction with the above properties
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 70,
    width: '30%',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
    shadowColor: '#000', // This is your box shadow color
    shadowOffset: {
      width: 0, // These are your box shadow offsets
      height: 2,
    },
    shadowOpacity: 0.23, // This is your box shadow opacity
    shadowRadius: 2.62, // This is your box shadow radius
    elevation: 4, // This adds shadow to Android and needs to be used in conjunction with the above properties
  },
  timestampOverlay: {
    position: 'absolute',
    bottom: 30,
    right: 0,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestampText: {
    color: 'white',
    fontSize: 22,
    marginLeft: 10,
    fontWeight: '500',
  },
  logo: {
    width: 40,
    height: 40,
  },
});
