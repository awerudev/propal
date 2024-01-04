import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';

const GalleryCarousel = ({ images = [], title, date }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const renderImage = (itemData) => {
    return (
      <Image source={itemData.item.uri} style={{ height: 258, width: 360 }} />
    );
  };

  const handleListSwipe = (e) => {
    const newImageIndex = Math.round(e.nativeEvent.targetContentOffset.x / 360);
    setImageIndex(newImageIndex)
  };

  return (
    <View style={styles.root}>
      <View style={styles.carouselHeader}>
        <View>
          <Text style={styles.collectionTitle}>{title}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <FontAwesomeIcon icon={faEllipsisV} size={24} />
      </View>
      <View style={{ height: 254, width: '100%' }}>
        <FlatList
          data={images}
          bounces={false}
          horizontal
          renderItem={renderImage}
          pagingEnabled
          onScrollEndDrag={handleListSwipe}
        />
      </View>
      <View style={styles.carouselDots}>
        {images.map((_, index) => (
          <View
            style={[styles.dot, index === imageIndex ? styles.active : null]}
          ></View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    height: 302,
  },
  carouselHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  collectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 12,
  },
  carouselDots: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    marginLeft: 4,
    borderRadius: 99,
    backgroundColor: '#D9D9D9',
  },
  active: {
    height: 10,
    width: 10,
    backgroundColor: '#1579FF',
  },
});

export default GalleryCarousel;
