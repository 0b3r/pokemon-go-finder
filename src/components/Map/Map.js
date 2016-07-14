import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import C from '../../constants';

export default React => {

  const Map = ({ lat, long, init}) => {

    const currentPositionMarker = {
      position: new google.maps.LatLng(lat, long),
      showInfo: false
    };

    if(!init){
      return <h3>Loading....</h3>
    }

    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          query={{libraries: "geometry,drawing,places,visualization" }}
          containerElement={<div style={{height: "100%",}}/>}
          googleMapElement={
            <GoogleMap
              // ref={(map) =>{
              //   map.refs.panTo(pan);
              // }}
              defaultZoom={15}
              defaultCenter={{lat, lng: long}}
            >
            <Marker {...currentPositionMarker} onRightclick={() => console.log(clicked)} />
            </GoogleMap>
          }
      />
      </section>
    );
  }

  return Map;
}