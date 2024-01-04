import { View, Image, Text, StyleSheet } from 'react-native';
import IconButton from '../IconButton';
import logo from '../../assets/whiteLogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const styles = StyleSheet.create({
  imageWrapper: {
    height: 250,
    width: 360,
    marginVertical: 20,
    borderRadius: 20,
  },
  image: {
    width: 360,
    height: 250,
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 10,
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

const ProgressImage = ({ source, timestamp, removeImage }) => {
  return (
    <View style={styles.imageWrapper}>
      <Image source={source} style={styles.image} />
      <IconButton
        icon={<FontAwesomeIcon icon={faTimes} size={'100%'} />}
        style={{
          borderRadius: 99,
          padding: 5,
          position: 'absolute',
          top: 11,
          right: 17,
        }}
        onPress={() => removeImage(source.uri)}
      />
      {/* <View style={styles.timestampOverlay}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.timestampText}>{timestamp}</Text>
      </View> */}
    </View>
  );
};

export default ProgressImage;
