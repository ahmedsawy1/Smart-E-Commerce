import React from 'react';
import {
  Circle,
  ClipPath,
  Defs,
  Ellipse,
  G,
  Path,
  Rect,
  Svg,
  LinearGradient,
  Stop,
} from 'react-native-svg';

import {Text, TSpan} from 'react-native-svg';

import Colors, {PixelPerfect} from '../../styles/stylesConstants';

export const ChevronRight = () => (
  <Svg width="7.416" height="12" viewBox="0 0 7.416 12">
    <Path
      id="keyboard_arrow_left_-_material"
      data-name="keyboard_arrow_left - material"
      d="M7.416,10.608,6,12,0,6,6,0,7.416,1.416,2.808,6Z"
      transform="translate(7.416 12) rotate(180)"
      fill="#b7b7b7"
    />
  </Svg>
);
export const ChevronLeft = () => (
  <Svg width="7.416" height="12" viewBox="0 0 7.416 12">
    <Path
      id="keyboard_arrow_left_-_material"
      data-name="keyboard_arrow_left - material"
      d="M7.416,10.608,6,12,0,6,6,0,7.416,1.416,2.808,6Z"
      fill="#b7b7b7"
    />
  </Svg>
);

export const MinusIcon = ({height, width}: any) => (
  <Svg
    width={width ? width : 14}
    height={height ? height : 2}
    viewBox="0 0 14 2">
    <Path
      id="ic_remove_24px"
      d="M19,13H5V11H19Z"
      transform="translate(-5 -11)"
      fill="#fff"
    />
  </Svg>
);

export const EditIcon = ({props}: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13.868}
    height={13.868}
    viewBox="0 0 13.868 13.868"
    {...props}>
    <G id="edit" transform="translate(0 -0.004)">
      <G
        id="Group_12780"
        data-name="Group 12780"
        transform="translate(0 0.994)">
        <G id="Group_12779" data-name="Group 12779">
          <Path
            id="Path_10962"
            data-name="Path 10962"
            d="M11.391,40.08a.5.5,0,0,0-.5.5v4.953a.5.5,0,0,1-.5.5H1.486a.5.5,0,0,1-.5-.5V35.623a.5.5,0,0,1,.5-.5H7.429a.5.5,0,1,0,0-.991H1.486A1.486,1.486,0,0,0,0,35.623v9.905a1.486,1.486,0,0,0,1.486,1.486H10.4a1.486,1.486,0,0,0,1.486-1.486V40.576A.5.5,0,0,0,11.391,40.08Z"
            transform="translate(0 -34.137)"
            fill="#fff"
          />
        </G>
      </G>
      <G
        id="Group_12782"
        data-name="Group 12782"
        transform="translate(2.972 0.004)">
        <G id="Group_12781" data-name="Group 12781" transform="translate(0 0)">
          <Path
            id="Path_10963"
            data-name="Path 10963"
            d="M112.749.559a1.9,1.9,0,0,0-2.682,0l-6.524,6.523a.5.5,0,0,0-.119.194l-.991,2.972a.5.5,0,0,0,.47.652.5.5,0,0,0,.157-.025l2.972-.991a.5.5,0,0,0,.194-.12l6.524-6.524A1.9,1.9,0,0,0,112.749.559Zm-.7,1.981L105.61,8.979l-1.924.642.64-1.921,6.441-6.439a.9.9,0,1,1,1.281,1.279Z"
            transform="translate(-102.409 -0.004)"
            fill="#fff"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export const TrashIcon = ({props}: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12.81}
    height={14.021}
    viewBox="0 0 12.81 14.021"
    {...props}>
    <G
      id="Group_106"
      data-name="Group 106"
      transform="translate(-30.25 -29.25)">
      <G id="trash-2" transform="translate(31 30)">
        <Path
          id="Shape"
          d="M0,0H11.31"
          transform="translate(0 2.504)"
          fill="none"
          stroke="#e53838"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
        <Path
          id="Shape-2"
          data-name="Shape"
          d="M7.54,12.521H1.257A1.256,1.256,0,0,1,0,11.269V2.5H1.885V1.252A1.256,1.256,0,0,1,3.142,0H5.655A1.256,1.256,0,0,1,6.911,1.252V2.5H8.8v8.765A1.256,1.256,0,0,1,7.54,12.521Z"
          transform="translate(1.257 0)"
          fill="none"
          stroke="#e53838"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
        <Path
          id="Shape-3"
          data-name="Shape"
          d="M0,0V3.756"
          transform="translate(4.398 5.635)"
          fill="none"
          stroke="#e53838"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
        <Path
          id="Shape-4"
          data-name="Shape"
          d="M0,0V3.756"
          transform="translate(6.912 5.635)"
          fill="none"
          stroke="#e53838"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={1.5}
        />
      </G>
    </G>
  </Svg>
);

export const PlusIcon = ({color, size}: any) => (
  <Svg
    width={size ? size : '14'}
    height={size ? size : '14'}
    viewBox="0 0 14 14">
    <Path
      id="ic_add_24px"
      d="M19,13H13v6H11V13H5V11h6V5h2v6h6Z"
      transform="translate(-5 -5)"
      fill={color ? color : '#fff'}
    />
  </Svg>
);

export const RatingStarIcon = ({size, color}: any) => (
  <Svg
    width={size ? size : '8.473'}
    height={size ? size : '8.473'}
    viewBox="0 0 8.473 8.473">
    <Path
      id="Path_12"
      data-name="Path 12"
      d="M58.237,70.811l2.618,1.662-.693-3.135,2.311-2.108-3.047-.275L58.237,64l-1.19,2.955L54,67.231l2.311,2.108-.693,3.135Z"
      transform="translate(-54 -64)"
      fill={color ? color : '#fff'}
    />
  </Svg>
);

export const CompareIcon = ({color}: any) => (
  <Svg width="15.854" height="15" viewBox="0 0 15.854 20.148">
    <G id="sync" transform="translate(-9.074)">
      <Path
        id="Path_10950"
        data-name="Path 10950"
        d="M37.932,15l-.976,1.054a6.533,6.533,0,0,1-3.932,11.994l.258-.271h-.015l.977-1.025-.9-.861L31.4,27.924h0l-.836.878.9.86h0L33.5,31.6l.836-.878-1.316-1.254A7.952,7.952,0,0,0,37.932,15Z"
        transform="translate(-16.409 -11.451)"
        fill={color}
      />
      <Path
        id="Path_10951"
        data-name="Path 10951"
        d="M10.574,9.061a6.535,6.535,0,0,1,6.814-5.509l-.258.271h.015l-.977,1.025.9.861,1.937-2.034h0l.836-.878-.9-.86h0L16.909,0l-.836.878,1.316,1.254A7.952,7.952,0,0,0,12.48,16.6l.976-1.054A6.545,6.545,0,0,1,10.574,9.061Z"
        fill={color}
      />
    </G>
  </Svg>
);

export const ShareIcon = () => (
  <Svg width="19.823" height="21.098" viewBox="0 0 19.823 21.098">
    <Path
      id="Path_33"
      data-name="Path 33"
      d="M15.538,13.227a3.583,3.583,0,0,0-2.884,1.457L7.026,11.808a3.586,3.586,0,0,0-.117-2.356l5.9-3.544a3.571,3.571,0,1,0-.613-1.026L6.281,8.435a3.585,3.585,0,1,0,.22,4.447l5.612,2.868a3.586,3.586,0,1,0,3.425-2.523m0-12.032a2.39,2.39,0,1,1-2.39,2.39,2.393,2.393,0,0,1,2.39-2.39M3.586,13.187a2.39,2.39,0,1,1,2.39-2.39,2.393,2.393,0,0,1-2.39,2.39M15.538,19.2a2.39,2.39,0,1,1,2.39-2.39,2.393,2.393,0,0,1-2.39,2.39"
      transform="translate(0.35 0.35)"
      fill="#c1c1c1"
      stroke="#c1c1c1"
      stroke-width="0.7"
    />
  </Svg>
);

export const XIcon = ({size, color}: any) => (
  <Svg
    width={size ? size : '14'}
    height={size ? size : '14'}
    viewBox="0 0 14 14">
    <Path
      id="close"
      d="M12.335,13.721l0,0L7,8.306,1.668,13.72h0A.971.971,0,0,1,.985,14,.992.992,0,0,1,0,13a1,1,0,0,1,.276-.694h0L5.5,7,.343,1.758A1,1,0,0,1,0,1,.993.993,0,0,1,.985,0a.969.969,0,0,1,.681.279l0,0L7,5.695,12.332.28h0A.971.971,0,0,1,13.015,0,.993.993,0,0,1,14,1a1,1,0,0,1-.276.694h0L8.5,7l5.157,5.24A1.006,1.006,0,0,1,14,13a.993.993,0,0,1-.985,1A.97.97,0,0,1,12.335,13.721Z"
      fill={color ? color : '#c1c1c1'}
    />
  </Svg>
);

export const LockIcon = () => (
  <Svg width="13.36" height="17.5" viewBox="0 0 13.36 17.5">
    <Path
      id="lock_-_material"
      data-name="lock - material"
      d="M11.68,17.5h-10A1.652,1.652,0,0,1,.5,17.02,1.553,1.553,0,0,1,0,15.86V7.5A1.556,1.556,0,0,1,.5,6.34a1.655,1.655,0,0,1,1.18-.48H2.5V4.18a4.109,4.109,0,0,1,.56-2.1A4.178,4.178,0,0,1,4.58.56a4.219,4.219,0,0,1,4.2,0A4.169,4.169,0,0,1,10.3,2.08a4.11,4.11,0,0,1,.561,2.1V5.86h.82a1.655,1.655,0,0,1,1.18.48,1.558,1.558,0,0,1,.5,1.16v8.36a1.555,1.555,0,0,1-.5,1.16A1.652,1.652,0,0,1,11.68,17.5Zm-5-7.5A1.669,1.669,0,0,0,5.5,12.86a1.643,1.643,0,0,0,2.36,0A1.68,1.68,0,0,0,6.68,10Zm0-8.4a2.5,2.5,0,0,0-1.28.35,2.62,2.62,0,0,0-.95.95A2.517,2.517,0,0,0,4.1,4.18V5.86H9.259V4.18A2.514,2.514,0,0,0,8.91,2.9a2.606,2.606,0,0,0-.95-.95A2.5,2.5,0,0,0,6.68,1.6Z"
      fill="#c1c1c1"
    />
  </Svg>
);

export const ThreeDotsIcon = ({color}: any) => (
  <Svg
    width={PixelPerfect(70)}
    height={PixelPerfect(20)}
    viewBox="0 0 22.75 6.75">
    <G id="more" transform="translate(8.75 0.75)">
      <Rect
        id="Rectangle-path"
        width="5.25"
        height="5.25"
        rx="2.625"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
      <Rect
        id="Rectangle-path-2"
        data-name="Rectangle-path"
        width="5.25"
        height="5.25"
        rx="2.625"
        transform="translate(8)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
      <Rect
        id="Rectangle-path-3"
        data-name="Rectangle-path"
        width="5.25"
        height="5.25"
        rx="2.625"
        transform="translate(-8)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
    </G>
  </Svg>
);

export const DepartmentsIcon = ({color}: any) => (
  <Svg width={PixelPerfect(45)} height={PixelPerfect(45)} viewBox="0 0 15 15">
    <G id="grid" transform="translate(0.75 0.75)">
      <Rect
        id="Rectangle-path"
        width="5.25"
        height="5.25"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
      <Rect
        id="Rectangle-path-2"
        data-name="Rectangle-path"
        width="5.25"
        height="5.25"
        transform="translate(8.25)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
      <Rect
        id="Rectangle-path-3"
        data-name="Rectangle-path"
        width="5.25"
        height="5.25"
        transform="translate(8.25 8.25)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
      <Rect
        id="Rectangle-path-4"
        data-name="Rectangle-path"
        width="5.25"
        height="5.25"
        transform="translate(0 8.25)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.5"
      />
    </G>
  </Svg>
);

export const PhoneIcon = ({props}: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13.073}
    height={18.676}
    viewBox="0 0 13.073 18.676"
    {...props}>
    <Path
      id="download_1_"
      data-name="download (1)"
      d="M223.677,141.06H212.472a.935.935,0,0,0-.934.934V158.8a.935.935,0,0,0,.934.934h11.206a.935.935,0,0,0,.934-.934V141.994A.935.935,0,0,0,223.677,141.06Zm-5.6,17.742a.934.934,0,1,1,.934-.934A.935.935,0,0,1,218.075,158.8Zm4.669-3.176a.374.374,0,0,1-.375.375h-8.588a.374.374,0,0,1-.375-.375V143.3a.374.374,0,0,1,.375-.375h8.591a.374.374,0,0,1,.375.375v12.327Z"
      transform="translate(-211.538 -141.06)"
      fill="#c1c1c1"
    />
  </Svg>
);

export const ProfileIcon = ({color}: any) => (
  <Svg
    width={PixelPerfect(50)}
    height={PixelPerfect(50)}
    viewBox="0 0 14.49 16.025">
    <G id="user" transform="translate(0.85 0.85)">
      <Path
        id="Shape"
        d="M12.79,4.775V3.183A3.19,3.19,0,0,0,9.592,0H3.2A3.19,3.19,0,0,0,0,3.183V4.775"
        transform="translate(0 9.55)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.7"
      />
      <Ellipse
        id="Oval"
        cx="3.197"
        cy="3.183"
        rx="3.197"
        ry="3.183"
        transform="translate(3.197 0)"
        fill="none"
        stroke={color}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="1.7"
      />
    </G>
  </Svg>
);

export const MicIcon = ({props, height, width}: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={width ? width : 16.94}
    height={height ? height : 22.416}
    viewBox="0 0 16.94 22.416"
    {...props}>
    <Path
      id="mic"
      d="M140.33,14.319h-1.507a7,7,0,0,1-13.565,0H123.75a8.45,8.45,0,0,0,7.536,6.749v1.541h-.754a.754.754,0,0,0,0,1.507h3.014a.754.754,0,1,0,0-1.507h-.754V21.068A8.451,8.451,0,0,0,140.33,14.319Zm-8.29,3.768a5.275,5.275,0,0,0,5.275-5.275V7.275a5.275,5.275,0,1,0-10.551,0v5.536A5.275,5.275,0,0,0,132.04,18.087ZM128.272,7.275a3.768,3.768,0,1,1,7.536,0v5.536a3.768,3.768,0,1,1-7.536,0Z"
      transform="translate(-123.57 -1.85)"
      fill="#fff"
      stroke="#fff"
      strokeWidth={0.3}
    />
  </Svg>
);

export const HomeIcon = ({props, hasLinear, background}: any) => (
  <Svg
    id="action_icon-round-button"
    data-name="action/icon-round-button"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={PixelPerfect(150)}
    height={PixelPerfect(150)}
    viewBox="0 0 70 70"
    {...props}>
    <Defs>
      <ClipPath id="clip-path">
        <Circle id="round" cx={35} cy={35} r={35} fill="red" />
      </ClipPath>
      {hasLinear && (
        <LinearGradient
          id="linear-gradient"
          x1={1.01}
          y1={0.5}
          x2={0}
          y2={0.5}
          gradientUnits="objectBoundingBox">
          <Stop offset={0} stopColor="#d5b745" />
          <Stop offset={1} stopColor="#ae7513" />
        </LinearGradient>
      )}

      <ClipPath id="clip-path-2">
        <Rect
          id="Rectangle_14"
          data-name="Rectangle 14"
          width={29.902}
          height={29.905}
          fill="#fff"
        />
      </ClipPath>
    </Defs>
    <Circle
      id="round-2"
      data-name="round"
      cx={35}
      cy={35}
      r={35}
      fill={hasLinear ? 'url(#linear-gradient)' : '#C1C1C1'}
    />
    <G
      id="action_icon-round-button-2"
      data-name="action/icon-round-button"
      clipPath="url(#clip-path)">
      <G
        id="Color_white"
        data-name="Color/\uD83C\uDFA8white"
        transform="translate(0.5)">
        <Rect
          id="BG"
          width={70}
          height={70}
          rx={35}
          transform="translate(0 -0.28)"
          fill={hasLinear ? 'url(#linear-gradient)' : '#C1C1C1'}
        />
      </G>
      <G
        id="Group_179"
        data-name="Group 179"
        transform="translate(20.5 17.269)">
        <G id="Group_178" data-name="Group 178" clipPath="url(#clip-path-2)">
          <Path
            id="Path_98"
            data-name="Path 98"
            d="M29.1,13.007l0,0L16.9.807A2.752,2.752,0,0,0,13,.807L.812,13,.8,13.011A2.752,2.752,0,0,0,2.632,17.7c.028,0,.056,0,.085,0H3.2v8.977a3.226,3.226,0,0,0,3.222,3.222H11.2a.876.876,0,0,0,.876-.876V21.991a1.472,1.472,0,0,1,1.47-1.47h2.815a1.471,1.471,0,0,1,1.47,1.47v7.038a.876.876,0,0,0,.876.876h4.773A3.226,3.226,0,0,0,26.7,26.683V17.706h.451a2.753,2.753,0,0,0,1.949-4.7m-1.241,2.653a1,1,0,0,1-.708.293H25.824a.876.876,0,0,0-.876.876v9.853a1.472,1.472,0,0,1-1.47,1.47h-3.9V21.991a3.226,3.226,0,0,0-3.222-3.222H13.544a3.226,3.226,0,0,0-3.223,3.222v6.162h-3.9a1.472,1.472,0,0,1-1.47-1.47V16.83a.876.876,0,0,0-.876-.876h-1.3l-.041,0a1,1,0,0,1-.689-1.707h0l12.2-12.2a1,1,0,0,1,1.415,0l12.2,12.2.006.006a1,1,0,0,1,0,1.414"
            transform="translate(0 0)"
            fill="#fff"
          />
        </G>
      </G>
    </G>
  </Svg>
);

export const HomeIcon2 = ({props, isActive}: any) => (
  <Svg
    id="action_icon-round-button"
    data-name="action/icon-round-button"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={PixelPerfect(150)}
    height={PixelPerfect(150)}
    viewBox="0 0 70 70"
    {...props}>
    <Defs>
      <ClipPath id="clip-path">
        <Circle id="round" cx={35} cy={35} r={35} fill="red" />
      </ClipPath>

      <ClipPath id="clip-path-2">
        <Rect
          id="Rectangle_14"
          data-name="Rectangle 14"
          width={29.902}
          height={29.905}
          fill="#fff"
        />
      </ClipPath>
    </Defs>
    <Circle
      id="round-2"
      data-name="round"
      cx={35}
      cy={35}
      r={35}
      fill={isActive ? 'black' : '#C1C1C1'}
    />
    <G
      id="action_icon-round-button-2"
      data-name="action/icon-round-button"
      clipPath="url(#clip-path)">
      <G
        id="Color_white"
        data-name="Color/\uD83C\uDFA8white"
        transform="translate(0.5)">
        <Rect
          id="BG"
          width={70}
          height={70}
          rx={35}
          transform="translate(0 -0.28)"
          fill={isActive ? 'url(#linear-gradient)' : '#C1C1C1'}
        />
      </G>
      <G
        id="Group_179"
        data-name="Group 179"
        transform="translate(20.5 17.269)">
        <G id="Group_178" data-name="Group 178" clipPath="url(#clip-path-2)">
          <Path
            id="Path_98"
            data-name="Path 98"
            d="M29.1,13.007l0,0L16.9.807A2.752,2.752,0,0,0,13,.807L.812,13,.8,13.011A2.752,2.752,0,0,0,2.632,17.7c.028,0,.056,0,.085,0H3.2v8.977a3.226,3.226,0,0,0,3.222,3.222H11.2a.876.876,0,0,0,.876-.876V21.991a1.472,1.472,0,0,1,1.47-1.47h2.815a1.471,1.471,0,0,1,1.47,1.47v7.038a.876.876,0,0,0,.876.876h4.773A3.226,3.226,0,0,0,26.7,26.683V17.706h.451a2.753,2.753,0,0,0,1.949-4.7m-1.241,2.653a1,1,0,0,1-.708.293H25.824a.876.876,0,0,0-.876.876v9.853a1.472,1.472,0,0,1-1.47,1.47h-3.9V21.991a3.226,3.226,0,0,0-3.222-3.222H13.544a3.226,3.226,0,0,0-3.223,3.222v6.162h-3.9a1.472,1.472,0,0,1-1.47-1.47V16.83a.876.876,0,0,0-.876-.876h-1.3l-.041,0a1,1,0,0,1-.689-1.707h0l12.2-12.2a1,1,0,0,1,1.415,0l12.2,12.2.006.006a1,1,0,0,1,0,1.414"
            transform="translate(0 0)"
            fill="#fff"
          />
        </G>
      </G>
    </G>
  </Svg>
);

// export const HomeIcon = ({props, background}) => (
//   <Svg
//     id="home"
//     width={60.497}
//     height={60.497}
//     viewBox="0 0 60.497 60.497"
//     {...props}>
//     <Defs>
//       <ClipPath id="clip-path">
//         <Circle id="round" cx={30.249} cy={30.249} r={30.249} fill="none" />
//       </ClipPath>
//       <ClipPath id="clip-path-2">
//         <Rect
//           id="Rectangle_227"
//           data-name="Rectangle 227"
//           width={25.843}
//           height={25.845}
//           fill="#fff"
//         />
//       </ClipPath>
//     </Defs>
//     <Rect
//       id="bounds_copy"
//       data-name="bounds copy"
//       width={60.497}
//       height={60.497}
//       fill="#50a1ff"
//       opacity={0}
//     />
//     <G id="action_icon-round-button" data-name="action/icon-round-button">
//       <Circle
//         id="round-2"
//         data-name="round"
//         cx={30.249}
//         cy={30.249}
//         r={30.249}
//         fill="none"
//       />
//       <G
//         id="action_icon-round-button-2"
//         data-name="action/icon-round-button"
//         clipPath="url(#clip-path)">
//         <G id="Color_white" data-name="Color/\uD83C\uDFA8white">
//           {/* ///// */}
//           <Rect id="bg" width={60.497} height={60.497} fill={background} />
//         </G>
//         <G
//           id="Group_12731"
//           data-name="Group 12731"
//           transform="translate(18.169 14.925)">
//           <G
//             id="Group_12730"
//             data-name="Group 12730"
//             clipPath="url(#clip-path-2)">
//             <Path
//               id="Path_10952"
//               data-name="Path 10952"
//               d="M25.149,11.242l0,0L14.6.7a2.379,2.379,0,0,0-3.365,0L.7,11.234l-.01.011A2.378,2.378,0,0,0,2.275,15.3c.024,0,.049,0,.073,0h.42v7.758a2.788,2.788,0,0,0,2.785,2.785H9.678a.757.757,0,0,0,.757-.757V19.005a1.272,1.272,0,0,1,1.271-1.27h2.433a1.272,1.272,0,0,1,1.271,1.27v6.083a.757.757,0,0,0,.757.757h4.125a2.788,2.788,0,0,0,2.785-2.785V15.3h.39a2.38,2.38,0,0,0,1.684-4.061m-1.072,2.293a.86.86,0,0,1-.612.253H22.318a.757.757,0,0,0-.757.757v8.515a1.272,1.272,0,0,1-1.27,1.27H16.923V19.005a2.788,2.788,0,0,0-2.785-2.785H11.706A2.788,2.788,0,0,0,8.92,19.005v5.326H5.553a1.272,1.272,0,0,1-1.27-1.27V14.545a.757.757,0,0,0-.757-.757H2.4l-.036,0a.864.864,0,0,1-.6-1.475h0L12.311,1.768a.864.864,0,0,1,1.223,0l10.54,10.54,0,0a.867.867,0,0,1,0,1.222"
//               transform="translate(0 0)"
//               fill="#fff"
//             />
//           </G>
//         </G>
//       </G>
//     </G>
//   </Svg>
// );

export const CartIcon = ({color}: any) => (
  <Svg
    width={PixelPerfect(53)}
    height={PixelPerfect(53)}
    viewBox="0 0 18.071 16.554"
    fill={color}>
    <G id="shopping-cart" transform="translate(0.1 -21.605)">
      <G
        id="Group_12712"
        data-name="Group 12712"
        transform="translate(11.92 33.603)">
        <G id="Group_12711" data-name="Group 12711">
          <Path
            id="Path_10945"
            data-name="Path 10945"
            d="M343.775,362.612A2.228,2.228,0,1,0,346,364.84,2.231,2.231,0,0,0,343.775,362.612Zm0,3.119a.891.891,0,1,1,.891-.891A.892.892,0,0,1,343.775,365.731Z"
            transform="translate(-341.547 -362.612)"
            fill={color}
            stroke={color}
            strokeWidth={0.2}
          />
        </G>
      </G>
      <G
        id="Group_12714"
        data-name="Group 12714"
        transform="translate(0 21.705)">
        <G id="Group_12713" data-name="Group 12713" transform="translate(0 0)">
          <Path
            id="Path_10946"
            data-name="Path 10946"
            d="M17.727,24.992a.668.668,0,0,0-.526-.256H4.126l-.6-2.517a.669.669,0,0,0-.65-.513H.668a.668.668,0,1,0,0,1.337H2.347l2.172,9.089a.668.668,0,0,0,.65.513h10.4a.668.668,0,0,0,.649-.508l1.626-6.573A.67.67,0,0,0,17.727,24.992Zm-2.676,6.316H5.7L4.445,26.072h11.9Z"
            transform="translate(0 -21.705)"
            fill={color}
            stroke={color}
            strokeWidth={0.2}
          />
        </G>
      </G>
      <G
        id="Group_12716"
        data-name="Group 12716"
        transform="translate(3.832 33.603)">
        <G id="Group_12715" data-name="Group 12715">
          <Path
            id="Path_10947"
            data-name="Path 10947"
            d="M112.034,362.612a2.228,2.228,0,1,0,2.228,2.228A2.231,2.231,0,0,0,112.034,362.612Zm0,3.119a.891.891,0,1,1,.891-.891A.892.892,0,0,1,112.034,365.731Z"
            transform="translate(-109.806 -362.612)"
            fill={color}
            stroke={color}
            strokeWidth={0.2}
          />
        </G>
      </G>
    </G>
  </Svg>
);
export const EyeIcon = () => (
  <Svg width="18.36" height="12.5" viewBox="0 0 18.36 12.5">
    <Path
      id="remove_red_eye_-_material"
      data-name="remove_red_eye - material"
      d="M9.18,12.5A9.806,9.806,0,0,1,2.09,9.51,9.72,9.72,0,0,1,0,6.26a9.855,9.855,0,0,1,18.36,0,9.719,9.719,0,0,1-2.09,3.25A9.806,9.806,0,0,1,9.18,12.5Zm0-10.42a4.116,4.116,0,0,0-2.1.56A4.174,4.174,0,0,0,5.56,4.16a4.219,4.219,0,0,0,0,4.2A4.174,4.174,0,0,0,7.08,9.88a4.218,4.218,0,0,0,4.2,0A4.174,4.174,0,0,0,12.8,8.36a4.219,4.219,0,0,0,0-4.2,4.174,4.174,0,0,0-1.52-1.52A4.116,4.116,0,0,0,9.18,2.08Zm0,6.68A2.435,2.435,0,0,1,7.94,8.42,2.555,2.555,0,0,1,7.02,7.5a2.429,2.429,0,0,1,0-2.479,2.545,2.545,0,0,1,.92-.92,2.431,2.431,0,0,1,2.48,0,2.545,2.545,0,0,1,.92.92,2.429,2.429,0,0,1,0,2.479,2.555,2.555,0,0,1-.92.921A2.435,2.435,0,0,1,9.18,8.76Z"
      transform="translate(0)"
      fill="#D7D8DA"
    />
  </Svg>
);

export const DeleteIcon = ({props}: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={12.31}
    height={13.521}
    viewBox="0 0 12.31 13.521"
    {...props}>
    <G id="trash-2" transform="translate(0.5 0.5)">
      <Path
        id="Shape"
        d="M0,0H11.31"
        transform="translate(0 2.504)"
        fill="none"
        stroke="#939393"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
      <Path
        id="Shape-2"
        data-name="Shape"
        d="M7.54,12.521H1.257A1.256,1.256,0,0,1,0,11.269V2.5H1.885V1.252A1.256,1.256,0,0,1,3.142,0H5.655A1.256,1.256,0,0,1,6.911,1.252V2.5H8.8v8.765A1.256,1.256,0,0,1,7.54,12.521Z"
        transform="translate(1.257 0)"
        fill="none"
        stroke="#939393"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
      <Path
        id="Shape-3"
        data-name="Shape"
        d="M0,0V3.756"
        transform="translate(4.398 5.635)"
        fill="none"
        stroke="#939393"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
      <Path
        id="Shape-4"
        data-name="Shape"
        d="M0,0V3.756"
        transform="translate(6.912 5.635)"
        fill="none"
        stroke="#939393"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1}
      />
    </G>
  </Svg>
);

export const BigMic = ({props}: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={164}
    height={164}
    viewBox="0 0 164 164"
    {...props}>
    <Defs>
      <LinearGradient
        id="linear-gradient"
        x1={1.01}
        y1={0.5}
        x2={0}
        y2={0.5}
        gradientUnits="objectBoundingBox">
        <Stop offset={0} stopColor="#d5b745" />
        <Stop offset={1} stopColor="#ae7513" />
      </LinearGradient>
    </Defs>
    <G
      id="Group_12759"
      data-name="Group 12759"
      transform="translate(0.341 0.418)">
      <Rect
        id="BG"
        width={164}
        height={164}
        rx={82}
        transform="translate(-0.341 -0.418)"
        fill="url(#linear-gradient)"
      />
      <Path
        id="mic"
        d="M198.294,57.387h-6.777c-3.083,13.577-15.986,23.719-30.5,23.719s-27.412-10.141-30.5-23.719H123.75c2.992,16.261,17.155,28.835,33.884,30.343v6.929h-3.388a3.388,3.388,0,0,0,0,6.777H167.8a3.388,3.388,0,0,0,0-6.777H164.41V87.73C181.139,86.222,195.3,73.648,198.294,57.387ZM161.022,74.329A23.719,23.719,0,0,0,184.741,50.61V25.719a23.719,23.719,0,0,0-47.437,0V50.61A23.719,23.719,0,0,0,161.022,74.329ZM144.08,25.719a16.942,16.942,0,1,1,33.884,0V50.61a16.942,16.942,0,1,1-33.884,0Z"
        transform="translate(-80.308 32.45)"
        fill="#fff"
        stroke="#fff"
        strokeWidth={0.3}
      />
    </G>
  </Svg>
);

export const RedX = () => (
  <Svg id="close" width="18" height="18" viewBox="0 0 18 18">
    <Path
      id="close-2"
      data-name="close"
      d="M-1844.142,17.642l0,0L-1851,10.679l-6.852,6.962h0a1.249,1.249,0,0,1-.878.36A1.276,1.276,0,0,1-1860,16.714a1.291,1.291,0,0,1,.355-.892h0L-1852.928,9l-6.631-6.737a1.293,1.293,0,0,1-.441-.975A1.276,1.276,0,0,1-1858.734,0a1.247,1.247,0,0,1,.875.358l0,0L-1851,7.322l6.853-6.962h0a1.249,1.249,0,0,1,.878-.36A1.276,1.276,0,0,1-1842,1.286a1.291,1.291,0,0,1-.355.892h0L-1849.073,9l6.631,6.737a1.293,1.293,0,0,1,.441.975A1.276,1.276,0,0,1-1843.266,18,1.247,1.247,0,0,1-1844.142,17.642Z"
      transform="translate(1860)"
      fill="#e53838"
    />
  </Svg>
);

export const SearchIcon = ({color}: any) => (
  <Svg
    width={PixelPerfect(40)}
    height={PixelPerfect(40)}
    viewBox="0 0 15.581 15.581">
    <G id="search" transform="translate(1 1)">
      <Circle
        id="Oval"
        cx="5.486"
        cy="5.486"
        r="5.486"
        fill="none"
        stroke={color ? color : '#000'}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
      <Path
        id="Shape"
        d="M3.8,3.8,0,0"
        transform="translate(9.363 9.363)"
        fill="none"
        stroke={color ? color : '#000'}
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
    </G>
  </Svg>
);

export const TickMarkIcon = () => (
  <Svg width="54.551" height="39.694" viewBox="0 0 54.551 39.694">
    <Path
      id="Path_19"
      data-name="Path 19"
      d="M52.953,60.385,24.175,89.161a5.461,5.461,0,0,1-7.721,0L1.6,74.3a5.459,5.459,0,0,1,7.72-7.721l11,11L45.231,52.664a5.46,5.46,0,0,1,7.721,7.721Z"
      transform="translate(0 -51.065)"
      fill="#fff"
    />
  </Svg>
);

export const TicTokIcon = props => (
  <Svg
    width={PixelPerfect(40)}
    height={PixelPerfect(40)}
    viewBox="0 0 512 512"
    id="icons"
    fill={Colors.black}
    xmlns="http://www.w3.org/2000/svg"
    {...props}>
    <Path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z" />
  </Svg>
);

export const SmallTick = ({props}: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={10.111}
    height={7.772}
    viewBox="0 0 10.111 7.772"
    {...props}>
    <G id="tick" transform="translate(0.75 0.75)">
      <G id="Group_12628" data-name="Group 12628" transform="translate(0 0)">
        <Path
          id="Path_10820"
          data-name="Path 10820"
          d="M8.414,68.123a.427.427,0,0,0-.6,0L2.695,73.238.728,71.272a.427.427,0,1,0-.6.6l2.268,2.268a.427.427,0,0,0,.6,0l5.418-5.418A.427.427,0,0,0,8.414,68.123Z"
          transform="translate(0 -67.997)"
          fill="#c1c1c1"
          stroke="#fff"
          strokeWidth={1.5}
        />
      </G>
    </G>
  </Svg>
);

export const EmailIcon = () => (
  <Svg width="16.64" height="12.463" viewBox="0 0 16.64 12.463">
    <G id="email" transform="translate(0 -64.267)">
      <Path
        id="Path_10943"
        data-name="Path 10943"
        d="M10.429,70.413a1.64,1.64,0,0,0,1.631,0h0l7.406-4.937a1.8,1.8,0,0,0-1.695-1.209H4.718a1.8,1.8,0,0,0-1.695,1.209l7.406,4.937h0Z"
        transform="translate(-2.925)"
        fill="#c1c1c1"
      />
      <Path
        id="Path_10944"
        data-name="Path 10944"
        d="M9.677,140.136h0a2.609,2.609,0,0,1-2.713,0h0L0,135.494v8.355a1.8,1.8,0,0,0,1.793,1.793H14.847a1.8,1.8,0,0,0,1.793-1.793v-8.355Z"
        transform="translate(0 -68.912)"
        fill="#c1c1c1"
      />
    </G>
  </Svg>
);

export const LeftArrowIcon = () => (
  <Svg width="20.833" height="17.142" viewBox="0 0 20.833 17.142">
    <G id="arrow" transform="translate(19.833 15.727) rotate(180)">
      <Path
        id="Shape"
        d="M0,0H18.833"
        transform="translate(0 7.157)"
        fill="none"
        stroke="#c1c1c1"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
      <Path
        id="Shape-2"
        data-name="Shape"
        d="M0,14.313,7.062,7.157,0,0"
        transform="translate(11.771)"
        fill="none"
        stroke="#c1c1c1"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
    </G>
  </Svg>
);

export const SortIcon = () => (
  <Svg width="12" height="9.5" viewBox="0 0 12 9.5">
    <Path
      id="sort"
      d="M0,8H0ZM0,4H0ZM0,0H0Z"
      transform="translate(0 0.75)"
      fill="none"
      stroke="#7b4e31"
      stroke-linecap="round"
      stroke-width="1.5"
    />
  </Svg>
);

export const FilterIcon = () => (
  <Svg width="12.513" height="12.5" viewBox="0 0 12.513 12.5">
    <G id="filter" transform="translate(0.256 0.25)">
      <Path
        id="filter-2"
        data-name="filter"
        d="M11.95,7.331a.455.455,0,0,0-.4-.238H.45a.445.445,0,0,0-.388.231.464.464,0,0,0,0,.462l3.779,6.738v4.108a.456.456,0,0,0,.447.462H7.269a.456.456,0,0,0,.447-.462V14.547L11.927,7.8A.478.478,0,0,0,11.95,7.331ZM6.9,14.162a.5.5,0,0,0-.075.254V18.17H4.735V14.4a.481.481,0,0,0-.06-.231L1.225,8.016h9.51Z"
        transform="translate(-0.001 -7.093)"
        fill={Colors.medGray}
        stroke={Colors.medGray}
        stroke-width="0.5"
      />
    </G>
  </Svg>
);

export const ChevronDown = ({color}: any) => (
  <Svg width="10.618" height="7.708" viewBox="0 0 7.618 4.708">
    <Path
      id="keyboard_arrow_left_-_material"
      data-name="keyboard_arrow_left - material"
      d="M4.708.884,3.809,0,0,3.809,3.809,7.618l.9-.9L1.783,3.809Z"
      transform="translate(0 4.708) rotate(-90)"
      fill={color ? color : Colors.medGray}
    />
  </Svg>
);

export const RightArrowIcon = () => (
  <Svg width="20.833" height="17.142" viewBox="0 0 20.833 17.142">
    <G id="arrow" transform="translate(1 1.414)">
      <Path
        id="Shape"
        d="M0,0H18.833"
        transform="translate(0 7.157)"
        fill="none"
        stroke="#c1c1c1"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
      <Path
        id="Shape-2"
        data-name="Shape"
        d="M0,14.313,7.062,7.157,0,0"
        transform="translate(11.771)"
        fill="none"
        stroke="#c1c1c1"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-miterlimit="10"
        stroke-width="2"
      />
    </G>
  </Svg>
);

export const CloseIcon = props => (
  <Svg
    height="512px"
    id="Layer_1"
    style={{
      enableBackground: 'new 0 0 512 512',
    }}
    viewBox="0 0 512 512"
    width="512px"
    xmlSpace="preserve"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}>
    <Path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
  </Svg>
);
