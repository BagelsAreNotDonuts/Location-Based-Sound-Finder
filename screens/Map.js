import React, { useState, useEffect } from "react";
import { PermissionsAndroid, Appearance} from "react-native";

// Import React Native Maps
import MapView, {Circle } from "react-native-maps";

import {styles } from "../data/themes";

// Import React Native Geolocation
import Geolocation from "@react-native-community/geolocation";
import { getDistance } from "geolib";

//Gets color scheme to tell if light or dark mode
const colorScheme = Appearance.getColorScheme();

//----> Comments which state that they take inspiraiton from the week 11 contact will use the reference below <-----
//Luscombe, M (2022). Week 11 contact. COMP2140 notion page. https://mattluscombe.notion.site/Week-11-Contact-77e6cd76475f4c03bb7f5ecdf2a0a8c4


/**
     * The map screen component
     * @param {Object} locations The state which has all the locations information in it
     * @param {Object} nearbyLocationState The state containing the information of the nearby location
     * @param {Function} setNearbyLocation The function which allows for the setting of the nearby location
     * @returns {} The components comprising the map, the map view itself and the circles rendered over it.
     */
//Draws inspiration from the week11 contact
function Map({locations, nearbyLocationState, setNearbyLocation}) {
  

    //Adds a prop to the locations in the data denoting the coordinates
    const updatedLocations = locations.map(location => {
        const latlong = location.latlong.split(", ");
        location.coordinates = {
            latitude: parseFloat(latlong[0]),
            longitude: parseFloat(latlong[1])
        };
        return location;
    });

    //Initial map data state
    const initialMapState = {
        locationPermission: false,
        locations: updatedLocations,
        userLocation: {
            latitude: -27.497939,
            longitude: 153.017885,
            // Starts at "Uq lakes Bus Station"
        },
        nearbyLocation: {}
    };
    const [mapState, setMapState ] = useState(initialMapState);


    // Gets and verifies various permissions pertaining to map usage
    useEffect(() => {
        async function requestAndroidLocationPermission() {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: "Location Permission",
                        message: "This app will put your location on the map.",
                        buttonNeutral: "Can't Be Bothered, Later Please",
                        buttonNegative: "Nah",
                        buttonPositive: "Yee"
                    }
                );
                if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                    setMapState({
                        ...mapState,
                        locationPermission: true
                    });
                }
            }
            catch(error) {
                console.warn(error);
            }
        };
        
        if(Platform.OS === "android") {
            requestAndroidLocationPermission();
        }
        else {
            setMapState({
                ...mapState,
                locationPermission: true
            });
        }

        if(Platform.OS === "android") {
            requestAndroidLocationPermission();
        }
        else {
            setMapState({
                ...mapState,
                locationPermission: true
            });
        }


    }, []);


    /**
     * Function to retrieve location nearest to current user location
     * @param {Object} userLocation The object containig the lat and long of the user's position
     * @returns {Object} The nearest location information
     */
    function calculateDistance(userLocation) {
        const nearestLocations = mapState.locations.map(location => {
            const metres = getDistance(
                userLocation,
                location.coordinates
            );
            location["distance"] = {
                metres: metres, 
                nearby: metres <= 100 ? true : false
            };
            return location;
        }).sort((previousLocation, thisLocation) => {
            return previousLocation.distance.metres - thisLocation.distance.metres;
        });
        //shift is the same as pop.
        const nearestLocation = nearestLocations.shift();
        return nearestLocation;
    }

    // Only watch the user's current location when device permission granted
    if(mapState.locationPermission) {
        Geolocation.watchPosition(
            position => {
                const userLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                if (mapState.locations[0] !== undefined) {
                    const nearbyLocation = calculateDistance(userLocation);
                    setMapState({
                        ...mapState,
                        userLocation,
                        nearbyLocation: nearbyLocation
                    });

                    //Sets the nearby location state if the nearest location is within 100m
                    if (nearbyLocation.distance.nearby) {
                        if (nearbyLocation.location != nearbyLocationState.location) {
                            setNearbyLocation(nearbyLocation);
                            //console.log("METRO TERMINAL SPAM");
                        }
                    } else {
                        if (nearbyLocationState.location !== undefined ) {
                            setNearbyLocation({});
                            //console.log("METRO TERMINAL SPAM");
                        }
                        
                    }
                } else {
                    console.log("Map state locations not initialized");
                }
            },
            error => console.log(error)
        );
    }
		

    

    return(
        <>
            {<MapView 
            camera={{
                center: mapState.userLocation,
                pitch: 0, 
                heading: 0, 
                altitude: 3000, 
                zoom: 15 
            }}
            showsUserLocation={mapState.locationPermission}
            style = {styles.container}>
                {/* Only render the circles if locations is populated properly */}
                {mapState.locations[0] !== undefined ? mapState.locations.map(location => {
                        return <Circle
                            key={location.id}
                            center={location.coordinates}
                            radius={100}
                            strokeWidth={3}
                            strokeColor="#A42DE8"
                            fillColor={colorScheme == "dark" ? "rgba(128,0,128,0.5)" : "rgba(210,169,210,0.5)"}
                        />
                    }): console.log("CIRCLES NO EXIST")}

            </MapView>}
        </>
    );
}

export default Map;