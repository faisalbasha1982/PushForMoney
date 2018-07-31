import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { colors } from '../Themes/Colors';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import LanguageSettings from '../Containers/LanguageSettingsNew';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

let clanguage = '';

export function getUTCDate() 
{
    //2018-04-30 11:30:12

    var date, day, month, year;
    var today = new Date();

    day = parseInt(today.getUTCDate())>10?today.getUTCDate():('0'+today.getUTCDate().toString());
    month = parseInt(today.getUTCMonth()+1)>10?parseInt(today.getUTCMonth()+1):('0'+parseInt(today.getUTCMonth()+1));
    year = today.getUTCFullYear().toString();

    // let currentDate = year + '-' + month>10?month:('0'+month) + '-' + day>10?day:('0'+day);
    let currentDate = year + '-'+month+'-'+ day;

    // Creating variables to hold time.
    var date, TimeType, hour, minutes, seconds, fullTime;
    
    // Getting current hour from Date object.
    hour = today.getUTCHours(); 

    if(hour < 10)
      hour = '0' + today.getUTCHours();

    // Getting the current minutes from date object.
    minutes = today.getUTCMinutes();
 
    // // Checking if the minutes value is less then 10 then add 0 before minutes.
    if(minutes < 10)
      minutes = '0' + minutes.toString();
 
    //Getting current seconds from date object.
    seconds = today.getUTCSeconds();
 
    // // If seconds value is less than 10 then add 0 before seconds.
    if(seconds < 10)
      seconds = '0' + seconds.toString();
 
    // Adding all the variables in fullTime variable.
    fullTime = hour.toString() + ':' + minutes.toString() + ':' + seconds.toString();

    //var utcDate = new Date(Date.UTC(year,month-1,day,hour,minutes,seconds));
   
  //   Alert.alert('Day & Time UTC', currentDate+' '+fullTime);

    return currentDate+' '+fullTime;
  }


  export function authenticationData(language) 
  {
        let AuthData = "{'Lang':"+" '"+language+"',"+"  'AuthID': 'JS#236734', 'Data':'FormSignUp', 'D' :"+" '"+getUTCDate()+"'"+","+  " 'R' : 'er3rss'}";
        return AuthData;
  };

