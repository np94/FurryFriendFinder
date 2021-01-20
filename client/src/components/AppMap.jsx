import React from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";

const Map = ReactMapboxGl({
    accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
});

const missingImg = new Image(20, 30);
missingImg.src = "/media/paw-print.png";

const foundImg = new Image(20, 30);
foundImg.src = "/media/wanted.png";


class AppMap extends React.PureComponent {
    state = {
      lng: 2.349014, // Default lng and lat set to the center of paris.
      lat: 48.864716,
      zoom: 12, // used for map zoom level
    };
  
    componentDidMount() {
      // Get users geo location and set it as the state so the map centers relative to the users current location. :)
      const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.setState({ lat: latitude, lng: longitude });
      };
  
      const error = () => {
        console.log("An error occured geolocating user");
      };
  
      if (!navigator.geolocation) {
        console.log("Geolocation not supported");
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    }
  
    handleClick = (selectedAnnounce) => {
      // Pass the selectedItem back to the parent.
      this.props.handleSelectAnnounce(selectedAnnounce);
    };
  
    render() {
      const missings = this.props.announces.filter(
        (announce) => announce.status[0] === "Missing"
      );
  
      const founds = this.props.announces.filter(
        (announce) => announce.status[0] === "Found"
      );
  
      const missingLayer = (
        <Layer
          type="symbol"
          id="missing"
          images={["missing-icon", missingImg]}
          layout={{ "icon-image": "missing-icon" }}
        >
          {missings.map((announce, index) => (
            <Feature
              key={index}
              onClick={(event) => this.handleClick(announce)}
              coordinates={announce.location.coordinates}
            />
          ))}
        </Layer>
      );
  
      const foundLayer = (
        <Layer
          type="symbol"
          id="found"
          images={["found-icon", foundImg]}
          layout={{ "icon-image": "found-icon" }}
        >
          {founds.map((announce, index) => (
            <Feature
              key={index}
              onClick={(event) => this.handleClick(announce)}
              coordinates={announce.location.coordinates}
            />
          ))}
        </Layer>
      );
  
      
      return (
        <Map
          // eslint-disable-next-line
          style="mapbox://styles/mapbox/light-v10"
          zoom={[12]}
          containerStyle={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
          }}
          center={[this.state.lng, this.state.lat]}
        >
          {missingLayer}
          {foundLayer}
    
        </Map>
      );
    }
  }
  
  export default AppMap;
  