import React from 'react'
import MQTT from 'sp-react-native-mqtt';
import {CurrentDate} from './App';
import Geocoder from 'react-native-geocoding';  

// import { useSelector,useDispatch } from "react-redux";
// const dataStore = useSelector(state => state);
// const dispatch = useDispatch();

export function  MqttCom(url, topic, parmSettingValue, dataSource, setDataSource, parmSelId1, setCurrentValue) {

  MQTT.createClient({
    uri: url,
    clientId: 'your_client_id'
      }).then(function(client) {

    client.on('closed', function() {
      console.log('mqtt.event.closed');
    });
  
    client.on('error', function(msg) {
      console.log('mqtt.event.error', msg);
    });
  
    client.on('message', function(msg) {
      //console.log('mqtt.event.message', msg.data);
      let tmpItem = Array.from(dataSource);
      //console.log('parmselid1:', parmSelId1, 'receved data:', msg.data, tmpItem);
      tmpItem[parmSelId1].value=msg.data;
      setDataSource(tmpItem);
      setCurrentValue(parmSettingValue);
    });

    client.on('connect', function() {
      // console.log('connected', client);
      // console.log('send Msg:', parmSettingValue);
      client.subscribe('kksu965', 0);
      client.publish(topic, parmSettingValue, 0, false);
     
         
    });
  
    client.connect();
  }).catch(function(err){
    console.log(err);
  });
 
}

export function  signalMqttCom(url, topic, sendMsg, signalState, setSignalState) {

  MQTT.createClient({
    uri: url,
    clientId: 'your_client_id'
      }).then(function(client) {

    client.on('closed', function() {
      console.log('mqtt.event.closed');
    });
  
    client.on('error', function(msg) {
      console.log('mqtt.event.error', msg);
    });
  
    client.on('message', function(msg) {
      console.log('mqtt.event.message', JSON.parse(msg.data));
      const data = JSON.parse(msg.data);
      switch(data.msgId) {
        case 10:
          data.lat=36.396314;
          data.lon=127.352202;
          Geocoder.from(36.396314, 127.352202).then(json => {
            var address = json.results[0].address_components[0];
            console.log(address);
          }).catch(error =>
            console.warn(error)
          );
    
          setSignalState({signalDate:CurrentDate(), lat:data.lat ,lon:data.lon, address:address});
          break;
        case 11:
          console.log('login11', data.error)
          setLoginState({...chargeState, error:data.error})
          break;
      }
    });

    client.on('connect', function() {
      // console.log('connected', client);
      // console.log('send Msg:', parmSettingValue);
      client.subscribe('kksu965', 0);
      //client.publish(topic, parmSettingValue, 0, false);
    });
  
    client.connect();
  }).catch(function(err){
    console.log(err);
  });
 
}

export function  sendChargeMqttCom(url, topic, sendMsg, chargeState, setLoginState) {

  MQTT.createClient({
    uri: url,
    clientId: 'your_client_id'
      }).then(function(client) {

    client.on('closed', function() {
      console.log('mqtt.event.closed');
    });
  
    client.on('error', function(msg) {
      console.log('mqtt.event.error', msg);
    });
  
    client.on('message', function(msg) {
      console.log('mqtt.event.message', JSON.parse(msg.data));
      const data = JSON.parse(msg.data);
      switch(data.msgId) {
        case 110:
          setLoginState({...chargeState, currentTime:CurrentDate(), chargeRate:data.chargeRate+'%', power:data.power, voltage:data.voltage, current:data.current});
          break;
        case 111:
          console.log('login11', data.error)
          setLoginState({...chargeState, error:data.error})
          break;
      }
    });

    client.on('connect', function() {
      // console.log('connected', client);
      // console.log('send Msg:', parmSettingValue);
      client.subscribe('kksu965', 0);
      client.publish(topic, parmSettingValue, 0, false);
     
         
    });
  
    client.connect();
  }).catch(function(err){
    console.log(err);
  });
 
}


export function sendLoginMqttCom(url, topic, sendMsg, loginState, setLoginState) {

  MQTT.createClient({
    uri: url,
    clientId: 'your_client_id'
      }).then(function(client) {
    client.on('closed', function() {
      console.log('mqtt.event.closed');
    });
    client.on('error', function(msg) {
      console.log('mqtt.event.error', msg);
    });
    client.on('message', function(msg) {
      console.log('mqtt.event.message', JSON.parse(msg.data));
      const data = JSON.parse(msg.data);
      switch(data.msgId) {
        case 10:
          if (data.login===0) {
            setLoginState({...loginState, loginOk:true});
          } else if (data.login===1) {
            setLoginState({...loginState, loginOk:false});
            setLoginState({...loginState, loginError:'Passwd Incorrect!'});
          } else {
            setLoginState({...loginState, loginOk:false});
            setLoginState({...loginState, loginError:'Login Not Found!'});
          }
          break;
        case 11:
          console.log('login11', data.login)
          setLoginState({...loginState, login:data.login})
          if(data.login==='') {
            setLoginState({...loginState, loginCheckResult:'존재하지 않은 LoginId 입니다.'})
          } else {
            let result='Login ID: '+ data.login;
            setLoginState({...loginState, loginCheckResult: result})
          }
          break;
        case 12:
          console.log('result12', data.result)
          if(data.result==='nok') {
            setLoginState({...loginState, loginCheckResult:'존재하지 않은 LoginId 입니다.'})
          } else {
            setLoginState({...loginState, login:'', passwd:'', newPasswd:'',loginCheckResult: 'Passwd가 변경되었습니다'})
          }
          break;
        case 13:
          console.log('login13', data.result)
          if(data.result===0) {
            setLoginState({...loginState, isChecked:false, loginCheckResult: '회원가입이 완료되었습니다.'})
          }
          break;
        case 14:
          console.log('login14', data.result)
          if(data.result===0) {
            setLoginState({...loginState,  isChecked:true, loginCheckResult: 'Login ID Ok!'})
          }else if(data.result===1) {
            setLoginState({...loginState,  isChecked:false, loginCheckResult: '존재하는 Login ID 입니다.'})
          }
          break;
      }
    });
    client.on('connect', function() {
        // console.log('connected', client);
      console.log('send Msg:', sendMsg);
      client.subscribe('kksu965', 0);
      client.publish(topic, JSON.stringify(sendMsg), 0, false);
    });
    client.connect();
    }).catch(function(err){
      console.log(err);
    }
  );
}