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
      // console.log('lat, lng', data.lat, data.lng);
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&language=ko&key=AIzaSyDFXZTWL3wFXgrh4dQQii_lXW0v_bsDsmQ`)
      .then(res => {return res.json()})
      .then (res => {
        addr=res.results[0].formatted_address;
        // console.log('주소', addr);
        setSigAddressState(addr);
      }).catch(error =>
        console.warn(error)
      );
      
      setSignalState({sigTime:CurrentDate(), lat:data.lat, lng:data.lng, sigFlag:true});
      
    });

    client.on('connect', function() {
      client.subscribe('kksu965', 0);
    });
  
    client.connect();
  }).catch(function(err){
    console.log(err);
  });
 
}



