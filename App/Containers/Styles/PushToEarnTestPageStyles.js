import {Platform, StyleSheet, Dimensions } from 'react-native';
const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const newStyle = StyleSheet.create({
    
    container: {
    
                flex: 1,
                backgroundColor: 'white',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
    
    },
    
    topHeader: {
    
                flex: 3,
                backgroundColor: 'transparent',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
    
    },
    
    bottomLayout: {
    
                flex: 6,
                width: viewPortWidth,
                height: viewPortHeight * .34,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
    
    },
    
    iconStyle: {
    
        width: 54,
        height: viewPortHeight * .14,
        borderRadius: 0,
        backgroundColor: 'transparent',
        marginTop: viewPortHeight / 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 0,
    
    },
    
    leftButton: {
    
        width: 54,
        height: viewPortHeight * .34,
        backgroundColor: 'white',
        shadowColor: "rgba(216, 216, 216, 0.15)",
        shadowOffset: {
          width: 1,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        marginBottom: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    
      },
    
    leftButtons: {
    
        width: Platform.OS==='ios'?54:57,
        height: Platform.OS==='ios'?viewPortHeight * .67:viewPortHeight*0.69,
        backgroundColor: 'rgb(246, 246, 246)',
        elevation: Platform.OS ==='ios'?1:1,
        shadowColor: "rgba(216, 216, 216, 0.15)",
        shadowOffset: {
          width: 1,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        marginBottom: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    
      },
    
      leftButtonSelected: {
    
        width: 54,
        height: viewPortHeight * .34,
        backgroundColor: "rgb(246, 246, 246)",
        shadowColor: "rgba(216, 216, 216, 0.15)",
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        marginBottom: 5,
        marginRight: 5,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    
      },
    
      iconImageStyle:{
    
        backgroundColor: 'black',
        width: 54,
        height: viewPortHeight * .14,
        justifyContent: 'center',
        alignItems: 'center'
    
      },
       
      pageElement: {
            
            backgroundColor: 'transparent',
            flex: 6,
            alignItems: 'center',
            justifyContent: 'center'
    
        }
    
    });

    export default newStyle;