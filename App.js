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
import sigMqttCom from './MqttCom'
import CurrentDate from './CurrentDate';

const url='mqtt://broker.hivemq.com:1883';
//const url='18.185.228.239:1883';

//const url='mqtt://test.mosquitto.org:1883';
const topic='server965';
let initflag=false;
var markers=[];

const App = () => {
  const [signalState, setSignalState]= useState({sigTime:'', lat:0, lng:0, sigFlag:false});
  const [sigAddressState, setSigAddressState]= useState('');
  const [currentTimeState, setCurrentTimeState] = useState(0);
  // const [coordinateState, setCoordinateState] = useState({lat:0, lng:0});
 
  let lat=36.396314, lng=127.352202, addr;
 
  function setAddress() {
    if(initflag===true) {
      return;
    }
    initflag=true;
    sigMqttCom(url, topic, setSigAddressState, signalState, setSignalState);

    setInterval(()=> {
      setCurrentTimeState(CurrentDate())
    }, 1000);
    // markers.unshift({
    //     coordinate: {latitude:signalState.lat, longitude:signalState.lng},
    //     title: sigAddressState,
    //     description: `경도:${signalState.lat}, 위도:${signalState.lng}`,
    //   })
  }
  useEffect(() => {
    sigMqttCom(url, topic, setSigAddressState, signalState, setSignalState);
    setInterval(()=> {
      setCurrentTimeState(CurrentDate());
    }, 1000);
  }, []);
  //console.log('markers', markers, 'sigFlag', signalState.sigFlag);

  if(signalState.sigFlag){
    markers.push({
      coordinates: {
        latitude: signalState.lat,
        longitude: signalState.lng,
      },
      title: sigAddressState,
      description: `경도:${signalState.lat}, 위도:${signalState.lng}`, 
    });
    setSignalState({...signalState, sigFlag:false});
    //console.log('markers', markers);
  }
  
 
  // let markers= [
  //   {
  //     coordinates: {
  //       latitude: signalState.lat,
  //       longitude: signalState.lng,
  //     },
  //     title: sigAddressState,
  //     description: `경도:${signalState.lat}, 위도:${signalState.lng}`,
      
  //   },
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
  
  //]
 
  return (
     <View style={{flex:1}}>
 
      {/* {signalMqttCom(url, topic, signalState, setSignalState)}  */}
      <View style={{flex:1}}>
        <View style={{flexDirection:'row', marginTop:10, justifyContent:'flex-end'}}>
        <Text style={{fontSize:10}}>현재시간: {currentTimeState}</Text>
        </View>
        <View style={{flexDirection:'row',marginTop:30, justifyContent:'center'}}>
           <Text style={{fontSize:20}}>해상 안전 앱  </Text>
         </View>
        
        <Text style={{fontSize:12,  marginTop:20, marginLeft:10}}>신호: {signalState.sigTime}</Text>
        <Text style={{fontSize:12,marginLeft:10}}>좌표: {signalState.lat}, {signalState.lng}</Text>
        <Text style={{fontSize:12,marginLeft:10}}>주소: {sigAddressState}</Text>
      </View>
      {signalState.lat ? (
        <MapView
          style={{flex: 3, marginLeft:5}}
          initialRegion={{
            latitude: signalState.lat,
            longitude: signalState.lng,
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
        </MapView>) : ( 
          <MapView
            loadingEnabled={true}
            showsMyLocationButton={true}
            provider={PROVIDER_GOOGLE}
          >
          </MapView>
        )
      }
      {/* {setAddress()} */}
    </View>
  );
};

export default App;