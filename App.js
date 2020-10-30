/*
npm install npm install react-native-maps --save
npm install styled-components/native --save
*/

import React from 'react';
import Styled from 'styled-components/native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const Container = Styled.View`
    flex: 1;
`;

const App = () => {
  let markers= [
    {
      coordinates: {
        latitude: 36.396314,
        longitude: 127.352202,
      },
      title: "에세텔",
      description: "경도:36.396314, 위도:127.352202",
      
    },
    {
      coordinates: {
        latitude: 36.394946,
        longitude: 127.353644,
      },
      title: "현대블루핸즈 자운점",
      description: "경도:36.394946, 위도:127.353644",
      
    },
    {
      coordinates: {
        latitude: 36.391319,
        longitude: 127.346937,
      },
      title: "오일뱅크",
      description: "경도:36.391319, 위도:127.346937",
      
    },
    // {
    //   coordinates: {
    //     latitude: 45.521016,
    //     longitude: -122.6561917,
    //   },
    //   title: "Fourth Best Place",
    //   description: "This is the fourth best place in Portland",
      
    // },
  ]
  return (
    <Container>
      <MapView
        style={{flex: 1}}
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
    </Container>
  );
};

export default App;