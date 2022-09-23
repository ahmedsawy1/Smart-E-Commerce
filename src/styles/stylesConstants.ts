import {Dimensions, NativeModules, StyleSheet} from 'react-native';

export const phoneHeight = Dimensions.get('window').height;
export const phoneWidth = Dimensions.get('window').width;
const {height, width} = Dimensions.get('window');

enum Colors {
  mainBack = '#FFFFFF',
  darkWhite = '#FBFBFB',
  black = '#000000',
  lightGray = '#C1C1C1',
  lightGray2 = '#ECECEC',
  blueGray = '#E6E8EA',
  medGreen = '#52AC52',
  medGray = '#939393',
  darkGray = '#686868',
  red = '#E53838',
  socialBackground = '#E6E0D3',
}
export default Colors;

export enum Fonts {
  Bold = 'IBMPlexSansArabic-Bold',
  ExtraLight = 'IBMPlexSansArabic-ExtraLight',
  Light = 'IBMPlexSansArabic-Light',
  Medium = 'IBMPlexSansArabic-Medium',
  Regular = 'IBMPlexSansArabic-Regular',
  SemiBold = 'IBMPlexSansArabic-SemiBold',
  Thin = 'IBMPlexSansArabic-Thin',
}

export enum ScreenOptions {
  StatusBarHeight = NativeModules.StatusBarManager.HEIGHT,
  HalfScreen = width / 2 - 15,
  CURRENT_RESOLUTION = Math.sqrt(height * height + width * width),
  DesignResolution = {
    width: 750,
    height: 1624,
  } as any,
}
/**
 * create PerfectPixel fnction from psd or xd workflow size
 * @param designSize uor psd or xd workflow size
 * @returns function to use in PixelPerfect
 */
export const createPerfectPixel = (designSize = {width: 750, height: 1624}) => {
  if (
    !designSize ||
    !designSize.width ||
    !designSize.height ||
    typeof designSize.width !== 'number' ||
    typeof designSize.height !== 'number'
  ) {
    throw new Error(
      'react-native-pixel-perfect | create function | Invalid design size object! must have width and height fields of type Number.',
    );
  }
  const DESIGN_RESOLUTION = Math.sqrt(
    designSize.height * designSize.height + designSize.width * designSize.width,
  );
  const RESOLUTIONS_PROPORTION =
    ScreenOptions.CURRENT_RESOLUTION / DESIGN_RESOLUTION;
  return (size: number) => RESOLUTIONS_PROPORTION * size;
};
/**
 * Get perfect pixel for current resolution
 * @param pixel design size pixel
 * @returns Perfect pixel for current resolution 😄
 */
export const PixelPerfect = (pixel: number) => {
  const Perfect = createPerfectPixel(ScreenOptions.DesignResolution as any);
  return Perfect(pixel);
};
/**
 * create color with opacity
 * @param hex color
 * @param opacity decimal value
 * @returns new color with opacity 👏
 */
export const ColorWithOpacity = (
  hex: Colors | string,
  opacity: number,
): string => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  let color;
  if (result) {
    color = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
  } else {
    return hex;
  }
  return `rgba(${color.r},${color.g},${color.b},${opacity})`;
};
