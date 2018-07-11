import { Dimensions, PixelRatio } from 'react-native';

const widthPercentageToDp = widthPercent => {
    const screenWidth = Dimensions.get('window').width;

    //convert string to decimal number
    const elemWidth = parseFloat(widthPercent);

    return PixelRatio.roundToNearestPixel(screenWidth * elemWidth / 100);
};

const heightPercentageToDp = heightPercent => {
    const screenHeight = Dimensions.get('window').height;

    // convert string to decimal number
    const elemHeight = parseFloat(heightPercent);

    return PixelRatio.roundToNearestPixel(screenHeight * elemHeight / 100);
};

export {
    widthPercentageToDp,
    heightPercentageToDp
}