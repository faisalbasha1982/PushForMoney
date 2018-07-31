import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Dimensions } from 'react-native';
import { Button, Text, Icon } from 'native-base';
import { colors } from '../Themes/Colors';
import { NavigationActions } from "react-navigation";
import { connect } from 'react-redux';
import LanguageSettings from '../Containers/LanguageSettingsNew';
import CryptoJS from 'crypto-js';
import utf8 from 'utf8';
import Api from '../Services/Api_url';

const viewPortWidth = Dimensions.get('window').width;
const viewPortHeight = Dimensions.get('window').height;

let clanguage = '';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

randomStringIV = () => {

    let c = Math.random()*62;
    let rString = chars.substr(c,1);
 
      for(i=0;i<15;i++)
         rString = rString + chars.substr(Math.random()*62,1);
 
   return rString;
 }    

 aes = (authenticationData) =>  {
     
    const ivRandom = this.randomStringIV();
  
    // var key = CryptoJS.enc.Utf8.parse('VyhoMoGxi25xn/Tc');
    var key = CryptoJS.enc.Utf8.parse(Api.securityKey);
    var iv = CryptoJS.enc.Utf8.parse(ivRandom.toString());
    const ivFirstPart = ivRandom.substr(0,8);
    const ivLastPart = ivRandom.substring(8);
    console.log('first part='+ivFirstPart+ " Last part="+ivLastPart);
  
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(authenticationData), key,
        {
            keySize: 256 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
  
    var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
        keySize: 256 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
  
    console.log('Encrypted :' + encrypted);
    console.log('Key :' + encrypted.key);
    console.log('Salt :' + encrypted.salt);
    console.log('iv :' + encrypted.iv);
    console.log('Decrypted : ' + decrypted);
    console.log('utf8 = ' + decrypted.toString(CryptoJS.enc.Utf8));
  
    return ivFirstPart + encrypted.toString() + ivLastPart;
 }

export function aesCallback(data) {
    let encryptedData = aes(data);
    return encryptedData;    
};
