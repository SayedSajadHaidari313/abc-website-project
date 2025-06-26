



import jobFeatures from "@/data/job-featured";
import {
    GoogleMap,
    MarkerClusterer,
    useLoadScript,
    InfoWindow,
  } from "@react-google-maps/api";
  import {MarkerF} from '@react-google-maps/api'
  import { useMemo, useState } from "react";
  

  
  import { Link } from "react-router-dom";
  
  const option = {
    zoomControl: true,
    disableDefaultUI: true,
    styles: [
      {
        featureType: "all",
        elementType: "geometry.fill",
        stylers: [
          {
            weight: "2.00",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "geometry.stroke",
        stylers: [
          {
            color: "#9c9c9c",
          },
        ],
      },
      {
        featureType: "all",
        elementType: "labels.text",
        stylers: [
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "all",
        stylers: [
          {
            color: "#f2f2f2",
          },
        ],
      },
      {
        featureType: "landscape",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "poi",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "all",
        stylers: [
          {
            saturation: -100,
          },
          {
            lightness: 45,
          },
        ],
      },
      {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#eeeeee",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#7b7b7b",
          },
        ],
      },
      {
        featureType: "road",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
      {
        featureType: "road.highway",
        elementType: "all",
        stylers: [
          {
            visibility: "simplified",
          },
        ],
      },
      {
        featureType: "road.arterial",
        elementType: "labels.icon",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "transit",
        elementType: "all",
        stylers: [
          {
            visibility: "off",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "all",
        stylers: [
          {
            color: "#46bcec",
          },
          {
            visibility: "on",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [
          {
            color: "#c8d7d4",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [
          {
            color: "#070707",
          },
        ],
      },
      {
        featureType: "water",
        elementType: "labels.text.stroke",
        stylers: [
          {
            color: "#ffffff",
          },
        ],
      },
    ],
    scrollwheel: true,
  };
  const containerStyle = {
    width: "100%",
    height: "100%",
  };
  export default function Map() {
    const [getLocation, setLocation] = useState(null);
  
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: "AIzaSyAAz77U5XQuEME6TpftaMdX0bBelQxXRlM",
    });
    const center = useMemo(
      () => ({ lat: 27.411201277163975, lng: -96.12394824867293 }),
      []
    );
  
    // add long & lat
    const locationHandler = (location) => {
      setLocation(location);
    };
  
    // close handler
    const closeCardHandler = () => {
      setLocation(null);
    };
  
    return (
      <>
        {!isLoaded ? (
          <p>Loading...</p>
        ) : (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={4}
            options={option}
          >
            <MarkerClusterer>
              {(clusterer) =>
                jobFeatures.slice(0, 6).map((marker) => (
                  <MarkerF
                    key={marker.id}
                    position={{
                      lat: Number(marker.lat),
                      lng: Number(marker.long),
                    }}
                    clusterer={clusterer}
                    onClick={() => locationHandler(marker)}
                  ></MarkerF>
                ))
              }
            </MarkerClusterer>
            {getLocation !== null && (
              <InfoWindow
                position={{
                  lat: getLocation.lat,
                  lng: getLocation.long,
                }}
                onCloseClick={closeCardHandler}
              >
            <div className="job-block" key={getLocation.id}>
        <div className="inner-box">
          <div className="content">
            <span className="company-logo">
              <img  src={getLocation.logo} alt="item brand" />
            </span>
            <h4>
              <Link to={`/job-single-v5/${getLocation.id}`}>{getLocation.jobTitle}</Link>
            </h4>

            <ul className="job-info">
              <li>
                <span className="icon flaticon-briefcase"></span>
                {getLocation.company}
              </li>
              {/* compnay info */}
              <li>
                <span className="icon flaticon-map-locator"></span>
                {getLocation.location}
              </li>
              {/* location info */}
              <li>
                <span className="icon flaticon-clock-3"></span> {getLocation.time}
              </li>
              {/* time info */}
              <li>
                <span className="icon flaticon-money"></span> {getLocation.salary}
              </li>
              {/* salary info */}
            </ul>
            {/* End .job-info */}

            <ul className="job-other-info">
              {getLocation?.jobType?.map((val, i) => (
                <li key={i} className={`${val.styleClass}`}>
                  {val.type}
                </li>
              ))}
            </ul>
            {/* End .job-other-info */}

            <button className="bookmark-btn">
              <span className="flaticon-bookmark"></span>
            </button>
          </div>
        </div>
      </div>
              </InfoWindow>
            )}
          </GoogleMap>
        )}
      </>
    );
  }
  