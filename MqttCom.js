import React from 'react'
import MQTT from 'sp-react-native-mqtt';
import CurrentDate from './CurrentDate';

export default function  sigMqttCom(url, topic, setSigAddressState, signalState, setSignalState) {

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
      lat=data.data[2]*256*256*256 + data.data[3]*256*256+ data.data[4]*256 + data.data[5];
      lng=data.data[6]*256*256*256 + data.data[7]*256*256+ data.data[8]*256 + data.data[9];
      lat=lat/1000000
      lng=lng/1000000
      console.log('lat, lng', lat, lng);
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=AIzaSyDFXZTWL3wFXgrh4dQQii_lXW0v_bsDsmQ`)
      .then(res => {return res.json()})
      .then (res => {
        addr=res.results[0].formatted_address;
        // console.log('주소', addr);
        setSigAddressState(addr);
      }).catch(error =>
        console.warn(error)
      );
      
      setSignalState({sigTime:CurrentDate(), lat:lat, lng:lng, sigFlag:true});
      
    });

    client.on('connect', function() {
      client.subscribe('marine965', 0);
    });
  
    client.connect();
  }).catch(function(err){
    console.log(err);
  });
 
}



