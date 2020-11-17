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

const url='mqtt://broker.hivemq.com:1883';
//const url='mqtt://test.mosquitto.org:1883';
const topic='server965';
let initflag=false;
let signalTime;

export function CurrentDate () {
 
  var date = new Date();
  var date = new Date().getDate(); //To get the Current Date
  var month = new Date().getMonth() + 1; //To get the Current Month
  var year = new Date().getFullYear(); //To get the Current Year
  var hours = Number(new Date().getHours()); //To get the Current Hours
  
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds
  return  (year+'.'+month+'.'+date+'. '+hours+'시'+min+'분'+sec+'초');
}

const App = () => {
  const [addressState, setAddressState]= useState('');
  const [signalTimeState, setSignalTimeState]= useState('');
  const [signalState, setSignalState] = useState({currentTime:0, latitude:0, longitude:0});
 
  let lat=36.396314, lng=127.352202, addr;

  function setAddress() {
    if(initflag===true) {
      return;
    }
    initflag=true;
    setSignalTimeState(CurrentDate());
    setInterval(()=> {
       setSignalState({...signalState, currentTime: CurrentDate()})
    }, 1000);
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=ko&key=AIzaSyDFXZTWL3wFXgrh4dQQii_lXW0v_bsDsmQ`)
    .then(res => {return res.json()})
    .then (res => {
      addr=res.results[0].formatted_address;
      setAddressState(addr);
    }).catch(error =>
      console.warn(error)
    );

  }
  
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
        <View style={{flexDirection:'row', marginTop:10, justifyContent:'flex-end'}}>
        <Text style={{fontSize:10}}>현재시간: {signalState.currentTime}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:30, justifyContent:'center'}}>
           <Text style={{fontSize:20}}>재난 앱  </Text>
         </View>
        
        <Text style={{fontSize:12,  marginTop:20, marginLeft:10}}>신호: {signalTimeState}</Text>
        <Text style={{fontSize:12,marginLeft:10}}>좌표: {lat}, {lng}</Text>
        <Text style={{fontSize:12,marginLeft:10}}>주소: {addressState}</Text>
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
      {setAddress()}
    </View>
  );
};

export default App;