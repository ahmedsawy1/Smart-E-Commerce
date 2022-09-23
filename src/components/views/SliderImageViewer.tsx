import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {CloseIcon} from '../../assets/svg/icons';
import Colors, {PixelPerfect} from '../../styles/stylesConstants';
import GestureRecognizer from 'react-native-swipe-gestures';

const SliderImageViewer = ({
  imageViewrVisiable,
  onRequestClose,
  images,
}: any) => {
  const [indexState, setIndex] = useState(0);

  return (
    // <GestureRecognizer
    //   style={{flex: 1, }}
    //   // onSwipeUp={() => this.setModalVisible(true)}
    //   onSwipeDown={onRequestClose}>
    <Modal
      animationType="slide"
      visible={imageViewrVisiable}
      onRequestClose={onRequestClose}>
      <Pressable
        style={[
          {
            marginLeft:
              Platform.OS == 'ios' ? PixelPerfect(90) : PixelPerfect(50),
            position: 'absolute',
            marginTop:
              Platform.OS == 'ios' ? PixelPerfect(140) : PixelPerfect(70),
            zIndex: 3,
            padding: PixelPerfect(20),
          },
        ]}
        onPress={onRequestClose}>
        <CloseIcon
          height={PixelPerfect(36)}
          width={PixelPerfect(36)}
          fill={Colors.black}
        />
      </Pressable>
      <ImageViewer
        onSwipeDown={onRequestClose}
        backgroundColor="white"
        onChange={(i: any) => setIndex(i)}
        imageUrls={images}
        index={indexState}
      />
      <View
        style={{
          marginBottom:
            Platform.OS == 'ios' ? PixelPerfect(70) : PixelPerfect(40),
        }}>
        <FlatList
          data={images}
          horizontal
          contentContainerStyle={{padding: 16}}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <Pressable
              style={{
                marginHorizontal: 8,
                padding: 4,
                borderWidth: 1,
                borderColor: index == indexState ? '#c1c1c1' : 'white',
                borderRadius: 4,
              }}
              onPress={() => setIndex(index)}>
              <Image
                style={{height: 70, width: 70, borderRadius: 4}}
                // blurRadius={index == indexState ? 1 : 2}
                source={{uri: item.url}}
                resizeMode="stretch"
              />
            </Pressable>
          )}
        />
      </View>
    </Modal>
    // </GestureRecognizer>
  );
};

export default SliderImageViewer;

const styles = StyleSheet.create({});
