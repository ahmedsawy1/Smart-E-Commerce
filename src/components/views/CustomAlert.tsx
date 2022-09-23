import {Modal, StyleProp, View, ViewStyle, Pressable} from 'react-native';
import React, {FC} from 'react';
import {CloseIcon} from '../../assets/svg/icons';
import Colors, {PixelPerfect} from '../../styles/stylesConstants';

interface Props {
  onClosePress: () => void;
  children: JSX.Element | JSX.Element[] | any;
  styleWhiteView?: StyleProp<ViewStyle>;
  styleCont?: StyleProp<ViewStyle>;
  hasXIcon?: boolean;
  canCloseOnSpaceTotch?: boolean;
}

const CustomAlert: FC<Props> = ({
  onClosePress,
  children,
  styleWhiteView,
  styleCont,
  hasXIcon = true,
  canCloseOnSpaceTotch = true,
}) => {
  const doNothing = () => console.log('Cant Close');

  return (
    <Modal onRequestClose={onClosePress} transparent>
      <View
        style={[
          {
            backgroundColor: 'rgba(113, 113, 113, 0.6)',
            zIndex: 2,
            flex: 1,
            width: '100%',
          },
          styleCont,
        ]}>
        <Pressable
          onPress={canCloseOnSpaceTotch ? onClosePress : doNothing}
          style={{flex: 1}}
        />
        <View style={{flexDirection: 'row'}}>
          <Pressable
            onPress={canCloseOnSpaceTotch ? onClosePress : doNothing}
            style={{flex: 1}}
          />

          <View
            style={[
              {
                backgroundColor: Colors.mainBack,
                paddingTop: PixelPerfect(40),
                paddingBottom: PixelPerfect(10),
                paddingHorizontal: PixelPerfect(46),
                borderRadius: 10,
                zIndex: 3,
                width: '90%',
                alignItems: 'center',
                alignSelf: 'center',
              },
              styleWhiteView,
            ]}>
            {hasXIcon && (
              <Pressable
                style={[
                  {
                    left: PixelPerfect(5),
                    position: 'absolute',
                    top: PixelPerfect(5),
                    zIndex: 3,
                    padding: PixelPerfect(20),
                  },
                ]}
                onPress={onClosePress}>
                <CloseIcon
                  height={PixelPerfect(36)}
                  width={PixelPerfect(36)}
                  fill={'#9093A3'}
                />
              </Pressable>
            )}

            {children}
          </View>
          <Pressable
            onPress={canCloseOnSpaceTotch ? onClosePress : doNothing}
            style={{flex: 1}}
          />
        </View>

        <Pressable
          onPress={canCloseOnSpaceTotch ? onClosePress : doNothing}
          style={{flex: 1}}
        />
      </View>
    </Modal>
  );
};

export default CustomAlert;
