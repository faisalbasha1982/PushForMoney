import React, { Component } from 'react'
import {
    ScrollView,
    Text,
    Image,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
    TextInput,
    PixelRatio,
    Alert,
    Platform,    
    findNodeHandle,
    AsyncStorage
} from 'react-native';

import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import languageSettingsPFM from '../Containers/LanguageSettingsPFM';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactsWrapper from 'react-native-contacts-wrapper';
import newStyle from './Styles/PushToEarnAddFriendLastComponentStyles';

const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

let cLanguage = '';

class PushToEarnAddFriendLastComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {

            language: '',
            buttonText: '',
            text:{},
            languageCode: ''

        };
    }

    componentWillMount() {

        console.log("inside FLP componentWillMount.....");
        this.getAsyncStorageToken();

    }

    getAsyncStorageToken = async () => {

        await AsyncStorage.getItem('language').then((language) => {
            this.setState({ language: language});
        });        

        this.setLanguage();

        await AsyncStorage.getItem('token').then((token) => {
            this.setState({ token: token});
        });

    }

    componentWillReceiveProps(nextProps) {

        console.log("inside FLP componentWillReceiveProps....");

        if(this.props !== nextProps)
            this.getAsyncStorageToken();
    }

    setLanguage = () => {

        console.log("inside FLP language="+this.state.language);

        if(this.state.language === 'Dutch')
            this.setState({ text: languageSettingsPFM.Dutch, languageCode:'nl' });
        else
            if(this.state.language === 'English')
                this.setState({ text: languageSettingsPFM.English, languageCode:'en' });
        else
            if(this.state.language === 'French')
                this.setState({ text: languageSettingsPFM.French, languageCode:'fr' });
   }

    componentDidMount() {

        // let language = localStorage.getItem('language');
        // console.log('local storage language='+language);

        this.getAsyncStorageToken();

    }

    telephoneBook = () => {

        ContactsWrapper.getContact()
        .then((contact) => {
            // Replace this code
            console.log(contact);
            this.props.menu(7,contact.name,contact.phone,contact.email,this.state.language);
        })
        .catch((error) => {
            console.log("ERROR CODE: ", error.code);
            console.log("ERROR MESSAGE: ", error.message);
        });

    }

    renderNothing = () => {

    }

    render() {

        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        console.log("inside render of FLP");

        return (

                <View style= { newStyle.layoutBelow }>
                    <View style={newStyle.endButtons}>

                        <View style={newStyle.topView}>
                        <View style={{ marginLeft:15,backgroundColor:'transparent',width:40,justifyContent:'center', alignItems:'flex-end' }}>
                                    <TouchableOpacity
                                            onPress={() => { this.props.menu(14,'','','',this.state.language);
                                                                                               
                                          }}
                                            activeOpacity={0.5}
                                            style={{
                                                width: 30,
                                                height: 30, 
                                                backgroundColor: 'transparent',
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-start'
                                            }}>
                                            <Icon
                                                containerStyle={newStyle.iconImageStyle}
                                                name='arrow-circle-left'
                                                type='font-awesome'
                                                color='#E73D50'
                                                size = {20} />
                                    </TouchableOpacity>
                                </View>
                            <View style={{ backgroundColor: 'transparent', justifyContent:'center', alignItems:'center', marginLeft: 12, paddingTop:3,  }}>
                                <Text style= {newStyle.topText}>
                                        {this.state.text.addFriendsButton}
                                </Text>
                            </View>
                        </View>

                         <View style={newStyle.buttonView}>
                                <TouchableOpacity
                                    onPress={() => { this.telephoneBook() } }
                                    activeOpacity={0.5}
                                    style={{
                                        width: 290,
                                        height: 57,
                                        marginBottom: 10,
                                        marginLeft: 0,
                                        borderRadius: 8,
                                        backgroundColor: '#E73D50',
                                        marginTop: viewPortHeight / 30,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            width: 333,
                                            height: 19,
                                            fontFamily: 'WorkSans-Regular',
                                            fontWeight: '500',
                                            fontStyle: 'normal',
                                            color: '#ffffff',
                                            marginTop: 0,
                                            letterSpacing: 0.67,
                                            textAlign: 'center'}}
                                    > {this.state.text.addFriendPhoneButton} </Text>
                                </TouchableOpacity>
                        </View>                    

                        <View style={newStyle.buttonViewBottom}>
                                <TouchableOpacity
                                    onPress={() => { 
                                        this.props.menu(7,'','','',this.state.language); 
                                        //this.props.menu(13); 
                                    }}
                                    activeOpacity={0.5}
                                    style={{
                                        width: 290,
                                        height: 57,
                                        marginBottom: 10,
                                        marginLeft: 0,
                                        borderRadius: 8,
                                        backgroundColor: '#E73D50',
                                        marginTop: viewPortHeight / 30,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            width: 333,
                                            height: 19,
                                            fontFamily: 'WorkSans-Regular',
                                            fontWeight: '500',
                                            fontStyle: 'normal',
                                            color: '#ffffff',
                                            marginTop: 0,
                                            letterSpacing: 0.67,
                                            textAlign: 'center'}}
                                    > {this.state.text.addFriendsButton} </Text>
                                </TouchableOpacity>                               
                        </View>
                    </View>
                </View>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnAddFriendLastComponent);