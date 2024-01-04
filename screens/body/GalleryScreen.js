import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Header from '../../utils/Header';
import { UserContext } from '../login-signup/UserContext';
import img1 from '../../assets/food/banana.png';
import IconButton from '../../components/IconButton';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import GalleryCarousel from '../../components/GalleryCarousel/GalleryCarousel';

const GalleryScreen = ({ navigation }) => {
  const { userImages } = useContext(UserContext);
  const placeholderImages = [
    img1,
    'https://imgs.search.brave.com/pmBOiWyFsR_Toont6ntSsezJnW4AfpHw0BKI0_bO7t8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9leHRl/cm5hbC1wcmV2aWV3/LnJlZGQuaXQvN1R3/a21xMVM2OVVJaU5Q/TW54T0h1RXVuVUFj/VUctcW95cndpalVu/R01zOC5qcGc_d2lk/dGg9NjQwJmNyb3A9/c21hcnQmYXV0bz13/ZWJwJnM9ZTVjOWQy/Yzg3M2NlZGEwNTAz/OGM0M2NlNGU1ZWJk/YjE4MDNiMDU4Zg',
    'https://picsum.photos/200/300?random=2',
    // ... you can add more if you want
  ];

  const galleryData = [
    {
      date: 'Placeholder Date 1',
      images: [placeholderImages[0], placeholderImages[1]],
    },
    {
      date: 'Placeholder Date 2',
      images: [placeholderImages[1]],
    },
    // ... other placeholder data
    {
      date: 'Placeholder Date 3',
      images: [placeholderImages[0], placeholderImages[1]],
    },
  ];

  const images = [
    {
      uri: require('../../assets/test_img/workout1.jpg'),
    },
    {
      uri: require('../../assets/test_img/workout1.jpg'),
    },
    {
      uri: require('../../assets/test_img/workout1.jpg'),
    },
    {
      uri: require('../../assets/test_img/workout1.jpg'),
    },
  ];

  const images2 = [
    {
      uri: require('../../assets/test_img/workout1.jpg'),
    },
    {
      uri: require('../../assets/test_img/workout1.jpg'),
    },
    {
      uri: require('../../assets/test_img/workout1.jpg'),
    },
  ];

  const { width: viewportWidth } = Dimensions.get('window');

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header
        handleClose={() => {}}
        screenName='Gallery'
        rightButton={
          <IconButton
            icon={<FontAwesomeIcon icon={faHeart} size={25} color='#222' />}
            onPress={() => {}}
          />
        }
      />
      <View style={styles.root}>
        <GalleryCarousel
          images={images}
          title='Chest - Triceps'
          date='July 31'
        />
      </View>
      <View style={styles.root}>
        <GalleryCarousel
          images={images2}
          title='Back - Biceps'
          date='August 15'
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  root: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: 8,
  },
});

export default GalleryScreen;
