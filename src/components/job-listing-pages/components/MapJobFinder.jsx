

import Map from "@/components/common/Map";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Alwys set the container height explicitlya
    <><Map/></>

    // <GoogleMapReact
    //   bootstrapURLKeys={{ key: "" }}
    //   defaultCenter={defaultProps.center}
    //   defaultZoom={defaultProps.zoom}
    // >
    //   <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
    // </GoogleMapReact>
  );
}
