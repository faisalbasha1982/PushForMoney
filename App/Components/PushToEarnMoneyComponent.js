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
} from 'react-native';

import { Container, Header, Content, Input, Item } from 'native-base';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions } from "react-navigation";
import ButtonNext from '../Components/ButtonNext';
import ButtonLogin from '../Components/ButtonLogin';
import ButtonPushWelcome from '../Components/ButtonPushWelcome';
import ButtonWelcome from '../Components/ButtonWelcome';
import LanguageButton from '../Components/LanguageButton';
import Spinner from "react-native-loading-spinner-overlay";
import DeviceInfo from 'react-native-device-info'
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';
import CompanyBanner from '../Components/CompanyBanner';
import Validation from '../Components/ButtonValidation';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PhoneInput from 'react-native-phone-input';
import Accordion from 'react-native-collapsible/Accordion';
import CollapsibleList from 'react-native-collapsible-list';
import CollapseView from "react-native-collapse-view";
import CollapsibleView from '../Components/CollapsibleView';
import { Colors } from "../Themes";
import { Images } from '../Themes';

import headerImage from '../Images/headerImage.png';
import logoHeader from '../Images/logoheader.png';
import logoNew from '../Images/NewHeaderImage.png';
import Icon from 'react-native-vector-icons/FontAwesome';

import * as AuthComponent from '../Components/AuthComponent';
import * as AesComponent from '../Components/AesComponent';
import localStorage from 'react-native-sync-localstorage';
import { MoneySelectors } from "../Redux/MoneyRedux";
import DateTimePicker from 'react-native-modal-datetime-picker';
import Picker from 'react-native-picker';


const viewPortHeight = Dimensions.get('window').height;
const viewPortWidth = Dimensions.get('window').width;

const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 2;
export const IMAGE_HEIGHT_SMALL = window.width /7;

// Styles

let cLanguage = '';

const SECTIONS = [
    {
        title: 'First',
        content: 'Correction - Contract -1'
    },
    {
        title: 'Second',
        content: 'Correction - Contract -1'
    },
    {
        title: 'Third',
        content: 'Correction - Contract -1'
    }];

let pickerData = [
        [1,2,3,4],
        [5,6,7,8]
    ];
let selectedValue = ['JANUARY', 2013];



class PushToEarnMoneyComponent extends Component {

    constructor(props)
    {
        super(props);             

        this.state = {
            language: 'NEDERLANDS',
            firstName:'',
            name:'',
            phoneNumber:'',
            validation: false,
            renderValidate: false,
            firstNameInput:'',
            lastNameInput:'',
            phoneNumberInput:'',
            buttonText: '',
            firstNameError:true,
            firstNameErrorText:'',
            lastNameError:false,
            lastNameErrorText:'',
            phoneNumberError:true,
            phoneNumberErrorText:'',
            ErrorText:'',
            EmptyErrorText:'',
            firstNameEmptyError:false,
            lastNameEmptyError:false,
            phoneNumberEmptyError:false,
            isDateTimePickerVisible: false,
            
            sections: [
                {
                    title: 'First',
                    content: 'Correction - Contract -1'
                },
                {
                    title: 'Second',
                    content: 'Correction - Contract -1'
                },
                {
                    title: 'Third',
                    content: 'Correction - Contract -1'
                }],
            months: {
                        one : 'JANUARY',
                        two : 'FEBRUARY',
                        three : 'MARCH',
                        four : 'APRIL',
                        five : 'MAY',
                        six : 'JUNE',
                        seven : 'JULY',
                        eight : 'AUGUST',
                        nine : 'SEPTEMBER',
                        ten : 'OCTOBER',
                        eleven : 'NOVEMBER',
                        twelve : 'DECEMBER',
                    },                
            currentYear:2013,
            currentMonthlyIndex: 3,
            currentYearMonth:'JUNE 2013',
            yearData:[2016,2017,2018,2019,2020],
            monthArray: ['JANUARY','FEBRUARY','MARCH',
                         'APRIL','MAY','JUNE','JULY',
                        'AUGUST','SEPTEMBER','OCTOBER',
                        'NOVEMBER','DECEMBER'
                        ],
            pickerData: [[2016,2017,2018,2019,2020],['JANUARY','FEBRUARY','MARCH',
            'APRIL','MAY','JUNE','JULY',
           'AUGUST','SEPTEMBER','OCTOBER',
           'NOVEMBER','DECEMBER'
           ]],
            selectedValue: ['JANUARY', 2013],
         
        };    
    }

    validationLastName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("last name="+name);

        if(name === '')
        {
            //this.setState({ lastNameError: true, ErrorText: 'Last Name is Required' });
            this.setState({lastNameInput: ''});

            if(this.state.language === 'NEDERLANDS')
                this.setState({ lastNameEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'ENGLISH')
                    this.setState({ lastNameEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ lastNameEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });
        }
        else
        {

            if(reg.exec(name))
            {
              this.setState({ lastNameEmptyError: false, EmptyErrorText: '',lastNameError: false, lastNameInput: name,lastNameErrorText:'' });
            }
            else
            {
                console.log("found digits");
              if(this.state.language === 'NEDERLANDS')
                  this.setState({ lastNameEmptyError: false, lastNameError: true, lastNameErrorText: LanguageSettings.dutch.LNameErrorText });
              else
                  if(this.state.language === 'ENGLISH')
                      this.setState({ lastNameEmptyError: false, lastNameError: true,lastNameErrorText: LanguageSettings.english.LNameErrorText });
                  else
                      this.setState({ lastNameEmptyError: false, lastNameError: true,lastNameErrorText: LanguageSettings.french.LNameErrorText });
            }    
        }    
    } 

    validationFirstName = (name) => {

        let reg = /^[a-zA-Z\s]+$/;

        console.log("validating First Name="+name);

        if(name === '')
        {
            console.log("First name is empty="+name);
            console.log("Language ="+this.state.language);
            this.setState({firstNameInput: ''});
            //this.setState({ firstNameError: true, ErrorText: 'First Name is Required' });
            if(this.state.language === 'NEDERLANDS')
                this.setState({ firstNameEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'ENGLISH')
                    this.setState({ firstNameEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ firstNameEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });
        }
        else
        {
            if(reg.exec(name))
            {
              this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: false, firstNameInput: name, firstNameErrorText:'' });
            }
            else
            {
              if(this.state.language === 'NEDERLANDS')
                  this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.dutch.FNameErrorText });
              else
                  if(this.state.language === 'ENGLISH')
                      this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.english.FNameErrorText });
                  else
                      this.setState({ firstNameEmptyError:false, EmptyErrorText:'', firstNameError: true, firstNameErrorText: LanguageSettings.french.FNameErrorText });
            }
        }        
    }

    validatePhone = (phone) => {

        console.log("phone="+phone);

        let phoneSub = phone.substring(1);

        console.log("phone="+phoneSub);

        let reg = /^[0-9]{12}$/;
        let regNew = /^(?=(.*\d){10})(?!(.*\d){13})[\d\(\)\s+-]{10,}$/;

        if(phone === '')
        {
            //this.setState({ phoneNumberError: true, ErrorText: 'Phone Number is Required' });
            this.setState({phoneNumberInput: ''});

            if(this.state.language === 'NEDERLANDS')
                this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.dutch.EmptyErrorText });
            else
                if(this.state.language === 'ENGLISH')
                    this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.english.EmptyErrorText });
                else
                    this.setState({ phoneNumberEmptyError: true, EmptyErrorText: LanguageSettings.french.EmptyErrorText });
        }
        else
        {
            // home phone number belgium
            let homePhone = /^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/;
            // mobile phone number belgium
            let mPhone = /^((\+|00)32\s?|0)4(60|[789]\d)(\s?\d{2}){3}$/;
    
            this.phoneText = this.state.country;
    
            if (regNew.exec(phoneSub))
              this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: false, phoneNumberInput: phone, phoneNumberErrorText: '' });
            else
                if(this.state.language === 'NEDERLANDS')
                    this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.dutch.TelephoneNumberError });
                else
                    if(this.state.language === 'ENGLISH')
                        this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.english.TelephoneNumberError });
                    else
                        this.setState({ phoneNumberEmptyError:false, EmptyErrorText:'', phoneNumberError: true, phoneNumberErrorText: LanguageSettings.french.TelephoneNumberError });
        }
    
        // if (homePhone.exec(phone))
        //   this.setState({ phoneError: false, phone: phone });
        // else
        //   this.setState({ phoneError: true });
    
    }

    PhoneNumberPickerChanged = (country, callingCode, phoneNumber) => {
        this.setState({countryName: country.name, callingCode: callingCode, phoneNo:phoneNumber});
     }

    componentWillReceiveProps(nextProps) {
        //console.log("in Form One screen language received="+nextProps.language);
        // if (this.props.navigation.state.params.language !== nextProps.language) {
        //     this.setState({ language: nextProps.language });
        //     this.setText();
        // }
    }

    componentDidMount() {
        // console.log("language from props="+this.props.navigation.state.params.language);
        // console.log("default language="+this.state.language);
        // //cLanguage = this.props.navigation.state.params.language;
        // this.setState({ language: this.props.navigation.state.params.language });
        // console.log("language="+this.state.language);
        // this.setText();
        // console.log("this.state.firstName="+this.state.firstName);
        // console.log("this.state.buttonText="+this.state.buttonText);

        this.getPerson();

        
    }

    // setText =  () => {

    //     this.setState({language: this.props.navigation.state.params.language});
    //     console.log("this.state.language="+this.state.language);

    //     if (this.props.navigation.state.params.language === 'NEDERLANDS') {
    //         console.log("setting in Nederlands");
    //         this.setState({
    //             firstName:  LanguageSettings.dutch.firstNameText,
    //             name:       LanguageSettings.dutch.lastNameText,
    //             phoneNumber: LanguageSettings.dutch.telephoneNumberText,
    //             buttonText: LanguageSettings.dutch.buttonNextText
    //         });
    //     }
    //     else
    //         if (this.props.navigation.state.params.language === 'ENGLISH') {
    //             console.log("setting in English");
    //             this.setState({
    //                 firstName:  LanguageSettings.english.firstNameText,
    //                 name: LanguageSettings.english.lastNameText,
    //                 phoneNumber: LanguageSettings.english.telephoneNumberText,
    //                 buttonText: LanguageSettings.english.buttonNextText
    //             });
    //         }
    //         else
    //           {
    //             console.log("setting in French");
    //             this.setState({
    //                 firstName:  LanguageSettings.french.firstNameText,
    //                 name: LanguageSettings.french.lastNameText,
    //                 phoneNumber: LanguageSettings.french.telephoneNumberText,
    //                 buttonText: LanguageSettings.french.buttonNextText
    //             });
    //         }
    
       
    // }

    renderNothing = () => {

    }

    renderValidation = () => {

        //if(this.state.language === 'NEDERLANDS')

        console.log("empty error text="+this.state.EmptyErrorText);
        console.log("first Name Input="+this.state.firstNameInput);
        console.log("phone Number Input="+this.state.phoneNumberInput);

        let errorString = this.state.EmptyErrorText;

        if(this.state.firstNameError===true || this.state.firstNameInput === '')
            errorString = errorString + '\n' + this.state.firstNameErrorText;

        // if(this.state.lastNameError===true)
        //     errorString = errorString + '\n' + this.state.lastNameErrorText;

        if(this.state.phoneNumberError===true || this.state.phoneNumberInput==='')
            errorString = errorString + '\n' + this.state.phoneNumberErrorText;
            
            console.log("errorString="+errorString);
        
            if(this.state.firstNameEmptyError === false  && this.state.phoneNumberEmptyError === false && this.state.firstNameError===false && this.state.lastNameError===false && this.state.phoneNumberError===false )
                return (                        
                    <View style={newStyle.validationStyle}> 
                            <Validation
                                objectParams = 
                                {{
                                    'btnText': errorString, 
                                    'language': '',
                                    'backgroundColor':'transparent'
                                }} />
                    </View>
                );
            else
                return (                        
                    <View style={newStyle.validationStyle}> 
                            <Validation
                                objectParams = 
                                {{
                                    'btnText': errorString, 
                                    'language': '',
                                    'backgroundColor': 'normal'
                                }} />
                    </View>
            );
        

        
        return;

    }

    func = (renderValidate,EmptyErrorText) => {
      this.setState({renderValidate,EmptyErrorText});
    }

    onCollapsedListToggle(collapsed)
    {
        if(collapsed)
            this.setState({ collapseButtonText: 'Show Less'});
        else
            this.setState({ collapseButtonText: 'Show More'});
    }

    getMonthNumber = (month) => {

        if(month == "JANUARY")
            return "01";
        if(month == "FEBRUARY")
            return "02";
        if(month == "MARCH")
            return "03";
        if(month == "APRIL")
            return "04";
        if(month == "MAY")
            return "05";
        if(month == "JUNE")
            return "06";
        if(month == "JULY")
            return "07";
        if(month == "AUGUST")
            return "08";
        if(month == "SEPTEMBER")
            return "09";
        if(month == "OCTOBER")
            return "10";
        if(month == "NOVEMBER")
            return "11";
        if(month == "DECEMBER")
            return "12";        
    }

    getMonth = () => {

        var month = this.state.months.one;

        if(this.state.currentMonthlyIndex === 1)
            month = this.state.months.one;
        if(this.state.currentMonthlyIndex === 2)
            month = this.state.months.two;
        if(this.state.currentMonthlyIndex === 3)
            month = this.state.months.three;
        if(this.state.currentMonthlyIndex === 4)
            month = this.state.months.four;
        if(this.state.currentMonthlyIndex === 5)
            month = this.state.months.five;
        if(this.state.currentMonthlyIndex === 6)
            month = this.state.months.six;
        if(this.state.currentMonthlyIndex === 7)
            month = this.state.months.seven;
        if(this.state.currentMonthlyIndex === 8)
            month = this.state.months.eight;
        if(this.state.currentMonthlyIndex === 9)   
            month = this.state.months.nine;
        if(this.state.currentMonthlyIndex === 10)
            month = this.state.months.ten;
        if(this.state.currentMonthlyIndex === 11)
            month = this.state.months.eleven;
        if(this.state.currentMonthlyIndex === 12)
            month = this.state.months.twelve;

         
        return month;
    }

    getPrevYearMonth = () => {

        let prevYearMonth = "";

        let currentyearmonth = this.state.currentYearMonth;
        let currentYMA = currentyearmonth.split(" ");

        let currentMonth = currentYMA[0];
        let currentYear = currentYMA[1];

        let currentMonthNumber = this.getMonthNumber(currentMonth);

        if(currentMonthNumber > 1)
            prevYearMonth = getMonth(parseInt(currentMonth,10) - 1)+"  " + currentYear;

        if(currentMonthNumber === 1)
            prevYearMonth = getMonth(12) +"  "+ (parseInt(currentYear,10)-1);

        this.setState({ currentYearMonth: prevYearMonth});
    }
   
    getNextYearMonth = () => {

        let nextYearMonth = "";

        let currentyearmonth = this.state.currentYearMonth;
        let currentYMA = currentyearmonth.split(" ");

        let currentMonth = currentYMA[0];
        let currentYear = currentYMA[1];

        let currentMonthNumber = this.getMonthNumber(currentMonth);

        if(currentMonthNumber < 12)
            nextYearMonth = getMonth(parseInt(currentMonth,10) + 1)+"  " + currentYear;

        if(currentMonthNumber === 12)
            nextYearMonth = getMonth(1) + "  " + (parseInt(currentYear,10)+1);

        this.setState({ currentYearMonth: nextYearMonth});
    }

    getCurrentYearMonth = () => {
        //this.setState({ currentYearMonth: this.state.currentMonth + " "+ this.state.currentYear });
        return this.state.currentMonth + " "+ this.state.currentYear;
    }

    getPrevYear = () =>{
        this.setState({ currentYear: this.state.currentYear - 1 });        
    }

    getNextYear = () => {
        this.setState({ currentYear: this.state.currentYear + 1});
    }

    getYear = () => {
        return this.state.currentYear;
    }

    getNextMonth = () => {

        if(this.state.currentMonthlyIndex !== 12)                
            this.setState({ currentMonthlyIndex: this.state.currentMonthlyIndex + 1 });
          
    }

    getPrevMonth = () => {

        if(this.state.currentMonthlyIndex !== 1)
            this.setState({ currentMonthlyIndex: this.state.currentMonthlyIndex - 1 });
    
    }

    getPerson = () => {
      
        let authData = AuthComponent.authenticationData("en");
        let encryptedData = AesComponent.aesCallback(authData);
        let ltoken = localStorage.getItem('token');
        this.setState({isLoading: true});
      
        let payload = {
          "AuthenticationData": encryptedData,
          "LoginAccessToken": ltoken,
          "Month" : this.state.currentMonthlyIndex,
          "Year" : this.state.currentYear,
      };
      
        (ltoken === null)? setTimeout(() => {
          ltoken = localStorage.getItem('token');
        },2000)
        :
        setTimeout(() => {
          
          payload = {
            "AuthenticationData": encryptedData,
            "LoginAccessToken": ltoken,
            "Month" : this.state.currentMonthlyIndex,
            "Year" : this.state.currentYear,
          };
      
          console.log("ltoken="+ltoken);
          this.props.getPerson(payload);
      
        },4000)
      
      }

      getMoney = () => {

        this.setState({isLoading: true});
      
        let payload = {
          "AuthenticationData": encryptedData,
          "LoginAccessToken": ltoken,
          "Month" : this.props.month,
          "Year" : this.props.year,
        };
      
        this.props.getMoney(payload);
      }


      showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

      hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    
      handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.hideDateTimePicker();
      };
      
    showPicker = () => {

        Picker.init({
            pickerData: this.state.pickerData,
            selectedValue: this.state.selectedValue,
            onPickerConfirm: data => {
                let monthNumber = this.getMonthNumber(data[1]);
                this.setState({currentMonthlyIndex: monthNumber, currentYear: data[0]});
                console.log(data);
            },
            onPickerCancel: data => {
                console.log(data);
            },
            onPickerSelect: data => {
                console.log(data);
            }   
        });
        
        Picker.show();
    }

    render() {
        const platform = Platform.OS;
        console.log("platform --->",Platform.OS);
        return (

                <View style= { newStyle.layoutBelow }>
                  
                    <View style={newStyle.endButtons}>

                        <View style={newStyle.topView}>
                            <Text style= {newStyle.topText}>           
                                    Money 
                            </Text>    
                        </View>

                        <View style= {newStyle.inputContainer}>

                            <View style={newStyle.textContainer}>
                                <Text style={newStyle.firstName}>Name LastName</Text>
                                <Text style={newStyle.backText}>Back to Overview</Text>
                            </View>

                            <View style={newStyle.borderBottom}> </View>

                            <View style={newStyle.monthlyBar}>

                                 <TouchableOpacity onPress={ () => this.showPicker()}>
                                    <Text style={newStyle.monthlyText}> {this.getCurrentYearMonth() }</Text>
                                </TouchableOpacity>                                

                            </View>
                            
                            <CollapsibleView  referrals = {this.props.referrals} />

                            <View style={newStyle.borderBottomNew}></View>
                            <View style={newStyle.totalText}>
                                    <Text style={newStyle.firstName}>Totaal</Text>
                                    <Text style={newStyle.firstName}>Totaal</Text>
                            </View>
                        </View>

                    </View>                

                </View>
        );
    }

}

const newStyle = StyleSheet.create({

    header: {
        backgroundColor: '#F5FCFF',
        padding:10,
    },

    headerText: {
        textAlign: 'center',
        fontSize: 16,
        backgroundColor: '#fff',
    },

    content: {
        padding: 20,
        backgroundColor: '#fff',
    },

    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
           
    },

    backText: {
        fontFamily: "WorkSans-Medium",
        fontSize: 13,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.54,
        textAlign: "center",   
        color: "rgb(231, 61, 80)"
        
    },

    keyboardScrollViewContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollStyle: {
        flex:1,
        margin:0,
        padding:0,
    },

    headerImage: {
        width: viewPortWidth,
        height: Platform.OS === 'ios'?viewPortHeight * 0.51:
                                      viewPortHeight * 0.29,
        flex: Platform.OS === 'ios'?2:6,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },

    dateStyle: {
        width: 200,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 10,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginLeft: 25,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    firstName: {
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15
    },

    accordionStyle:{
        width: 159,
        height: 19,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        color: 'rgb(231, 61, 80)'
    },

    collapsibleItem: {
        padding: 10,       
    },

    wrapperCollapsibleList: {
        flex: 1,
        marginTop: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderRadius: 5,
    },

    phoneNumberStyle: {
        width: 190,
        height: 22,
        fontFamily: 'WorkSans-Regular',
        fontSize: 16,
        fontWeight: '500',
        fontStyle: 'normal',
        letterSpacing: 0.67,
        textAlign: 'left',
        marginBottom: 15
    },

    nameInput: {
        width: 280,
        height: 17,
        borderBottomColor: "#353535",
        borderBottomWidth: StyleSheet.hairlineWidth,
        backgroundColor: 'white',
        marginBottom: 15,
        padding: 10,
    },

    view: {
        height:50,
        padding: 20,
        justifyContent:'center',
        backgroundColor:'#ffffff',
      },

      iconView: {
        padding: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'#ffffff',
      },

    borderBottom: {
        width: 280,
        height: 1,
        borderBottomColor: "rgb(231, 61, 80)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 20,
    },

    borderBottomNew: {
        width: 280,
        height: 1,
        borderBottomColor: "rgb(231, 61, 80)",
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginTop: 20,
        flex:2,
    },

    monthlyBar: {

        width: 280,
        height: 30,
        backgroundColor: '#353535',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "rgb(246, 246, 246)",
        marginBottom: 30,
        flexDirection: 'row'
    },

    monthlyText: {
        fontFamily: "WorkSans-Medium",
        fontSize: 13,
        fontWeight: "500",
        fontStyle: "normal",
        letterSpacing: 0.54,
        textAlign: "center",
        color: "rgb(155, 155, 155)"
    },

    totalText: {
        width: 280,
        height: 40,
        // fontFamily: "WorkSans-Regular",
        // fontSize: 16,
        // fontWeight: "500",
        // fontStyle: "normal",
        // letterSpacing: 0.67,
        // textAlign: "left",
        flex: 2,
        marginTop: 10,
    },

    buttons: {
        width: viewPortWidth,
        height: 20,
        flex: 2,
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginLeft: 15,
        marginRight: 25,
        marginBottom:  10,
        marginTop: 10,
    },

    layoutBelow: {
        flex: 4,
        flexDirection: 'row',
        backgroundColor: 'transparent'
    },

    leftButtons:{
        width: 45,        
        backgroundColor: 'white',
        shadowColor: "rgba(216, 216, 216, 0.15)",
        shadowOffset: {
          width: 1,
          height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 1,
        flex:2
  },

  leftButton: {
    width: 54,
    height: 111,
    backgroundColor: Colors.white,
    shadowColor: "rgba(216, 216, 216, 0.20)",
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
    flex: 2,
  },

  collapseView: {
    padding: 20
  },

  endButtons: {
        width: viewPortWidth * 0.81,
        height: viewPortHeight * 0.70,
        zIndex: 999,
        flex: Platform.OS === 'ios'?11:4,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',        
    },

    inputContainer: {
        backgroundColor: 'white',
        flex: Platform.OS === 'ios'?18:1,        
        justifyContent: 'flex-start',
        alignItems: 'flex-start',       
    },

    topText: {
        width: 321,
        height: 34,
        fontFamily: "WorkSans-Medium",
        fontSize: 21,
        fontWeight: "600",
        fontStyle: "normal",
        lineHeight: 34,
        letterSpacing: 0,
        textAlign: "center",
        color: "rgb(231, 61, 80)",
        marginRight: 20,
    },

    topView: {
        width: 276,
        height: 68,
        flex:2,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },

    paraView: {
        width: 276,
        height: 57,
        flex: 1,
    },

    buttonView: {
        flex: 7,
    },

    para: {
        width: 276,
        height: 57,
        fontFamily: "WorkSans-Medium",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "center",
        color: "rgb(53, 53, 53)",
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },

    iconImageStyle:{
        width: 13,
        height: 16,
        fontFamily: "FontAwesome",
        fontSize: 16,
        fontWeight: "normal",
        fontStyle: "normal",
        letterSpacing: 0.67,
        textAlign: "center",
        color: "rgb(231, 61, 80)", 
        marginTop: 30,
    },

    iconStyle: {
        width: 20,
        height: 20,
        borderRadius: 20,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 10,
    },

    validationStyle:{
        position: 'absolute',
        top: 62,
        left: 35,
        width: 60,
        height: 60,    
    },
});

const mapStateToProps = state => {
    return {
        referrals: MoneySelectors.getPerson(state),
        TotalWorkedHours: MoneySelectors.getTotalWorkedHours(state),
        TotalEarnings: MoneySelectors.getTotalEarnings(state)
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {  
      resetNavigate: navigationObject => dispatch(NavigationActions.reset(navigationObject)),
      navigate: navigationObject => dispatch(NavigationActions.navigate(navigationObject)),
      navigateBack: () => this.props.navigation.goBack(),
      getMoney:  (payload) => dispatch({type: 'GET_MONEY_MONTH', payload}),
      getPerson: (payload) => dispatch({type:'GET_PERSON_MONTH', payload})  
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(PushToEarnMoneyComponent);