/*
npm install npm install react-native-maps --save
npm install styled-components/native --save
npm install  react react-live-clock --save
npm install react-moment --save
npm install moment-timezone --save
*/

import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native'
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Clock from 'react-live-clock';

//import {CurrentDate} from './HeaderMenu';
const url='mqtt://broker.hivemq.com:1883';
//const url='mqtt://test.mosquitto.org:1883';
const topic='server965';

//let currentTime=0;
// const Container = Styled.View`
//     flex: 1;
// `;
export function CurrentDate () {
  
  var date = new Date();
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  var hours = Number(new Date().getHours()); //To get the Current Hours
  
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds
  return  (year+'.'+month+'.'+date+'. '+hours+':'+min+':'+sec);
}

const App = () => {
  const [signalState, setSignalState]= useState({currentTime:0, signalTime:'', latitude:0, longitude:0, address:''});
  let lat=36.396314, lng=127.352202, addr, signalTime;;

  useEffect(() => {
    setSignalState({signalTime:CurrentDate()});
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=AIzaSyDFXZTWL3wFXgrh4dQQii_lXW0v_bsDsmQ`)
    .then(res => {return res.json()})
    .then (res => {
      addr=res.results[0].formatted_address;
      setSignalState({...signalState, address:addr});
      console.log("addr", addr, "signal Addr", signalState.address);
    }).catch(error =>
      console.warn(error)
    );
    setInterval(()=> {
        setSignalState({...signalState, currentTime: CurrentDate()})
      }, 1000);

  },[]);
  
  let markers= [
    {
      coordinates: {
        latitude: 36.396314,
        longitude: 127.352202,
      },
      title: "에세텔",
      description: "경도:36.396314, 위도:127.352202",
      
    },
    // {
    //   coordinates: {
    //     latitude: 36.394946,
    //     longitude: 127.353644,
    //   },
    //   title: "현대블루핸즈 자운점",
    //   description: "경도:36.394946, 위도:127.353644",
      
    // },
    // {
    //   coordinates: {
    //     latitude: 36.391319,
    //     longitude: 127.346937,
    //   },
    //   title: "오일뱅크",
    //   description: "경도:36.391319, 위도:127.346937",
      
    // },
    // // {
    //   coordinates: {
    //     latitude: 45.521016,
    //     longitude: -122.6561917,
    //   },
    //   title: "Fourth Best Place",
    //   description: "This is the fourth best place in Portland",
      
    // },
  ]

 
  return (
     <View style={{flex:1}}>
       {/* {signalMqttCom(url, topic, sendMsg, signalState, setSignalState)} */}
      <View style={{flex:1}}>
        <View style={{flexDirection:'row',marginTop:30}}>
          <View style={{flex:2, marginLeft:150}}> 
            <Text style={{fontSize:20}}>재난 앱  </Text>
          </View>
          <View style={{flex:1, alignItems:'flex-start'}}> 
            <Text style={{fontSize:13}}>현재시간: {signalState.currentTime}</Text>
          </View>
        </View>
        
        <Text style={{fontSize:13,  marginTop:30, marginLeft:10}}>신호: {signalState.signalTime}</Text>
        <Text style={{fontSize:13,marginLeft:10}}>좌표: {lat}, {lng}</Text>
        <Text style={{fontSize:13,marginLeft:10}}>주소: {signalState.address}</Text>
      </View>
      <MapView
        style={{flex: 3, marginLeft:5}}
        initialRegion={{
          latitude: 36.396314,
        longitude: 127.352202,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
          {markers.map((marker, index) => (
          <MapView.Marker key={index}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.description}
          />
          ))}
        {/* <Marker
          coordinate={{latitude: 37.78825, longitude: -122.4324}}
          title="this is a marker"
          description="this is a marker example"
        /> */}
      </MapView>
      {/* {setAddress()} */}
    </View>
  );
};

export default App;