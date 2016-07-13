import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";
import C from '../constants';

export default React => {

  const Map = (props) => {
    return (
      <section style={{height: "100%"}}>
        <GoogleMapLoader
          query={{ key: C.GOOGLE_MAPS_API_KEY, libraries: "geometry,drawing,places,visualization" }}
          containerElement={
          <div
            {...props.containerElementProps}
            style={{
              height: "100%",
            }}
          />
          }
          googleMapElement={
            <GoogleMap
              //ref={(map) => console.log(map)}
              defaultZoom={3}
              defaultCenter={{ lat: -25.363882, lng: 131.044922 }}
              onClick={props.onMapClick}
            >
            </GoogleMap>
          }
      />
      </section>
    );
  }

  return Map;
}