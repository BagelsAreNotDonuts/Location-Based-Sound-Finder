//cd C:\Users\Miguel\Documents\COMP2140\a3\nativeApp
import React from "react";
import { useState, useEffect } from "react";
import { View, Image, StyleSheet, Dimensions, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LinearGradient from 'react-native-linear-gradient';

import Map from "../screens/Map";
import Music from "../screens/Music";
import Profile from "../screens/Profile";

import { colors, fgColor, bgColor, fgColorLighter, colorScheme, styles } from "../data/themes";
import icons from "../data/icons";

//Gets the width and height of the current device
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height;


//----> Comments which state that they take inspiraiton from the week 10 contact will use the reference below <-----
//Luscombe, M (2022). Week 10 contact. COMP2140 notion page. https://mattluscombe.notion.site/Week-10-Contact-e24a128d8a5247b3bda318982253c7c1

/**
     * Creates the icons used in the three tabs of the app.
     * @param {boolean} focused The state which denotes whether or not the tab is focused or not
     * @param {Object} icon The icon used by the tab
     * @param {string} title The name of the tab
     * @param {Object} nearbyLocationState The object information of the nearby location
     * @returns {} The components comprising the tab icons
     */
    //Inspiration from week 10 contact
function TabIcon({ focused, icon, title, nearbyLocationState }) {
    return (
        // Depending on the title of the icon, some styling will be different, more specifically if the title is music.
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
                height: deviceHeight*0.093,
                width: title == "Music" ? deviceWidth*0.45 : deviceWidth*0.18,
                backgroundColor: focused ? colors.blackColorTranslucentLess : "",
            }}
        >
            <Image
                source={icon}
                resizeMode="contain"
                style={{
                    width: "100%",
                    height: nearbyLocationState.location != undefined && title == "Music" ? "35%" : "42%",
                    tintColor: focused ? bgColor : colors.whiteColorTranslucent
                }}
            />
            
            {/* If the title of the tab is music and there is a nearby location, then add text to the music tab icon*/}
            {(nearbyLocationState.location != undefined) && title == "Music" ? <Text style = {{
                    fontSize: deviceWidth/24,
                    fontWeight: "bold",
                    color: focused ? bgColor : colors.whiteColorTranslucent,
                    padding: 0,
                    backgroundColor: "none",
                    margin: 0,
                }}>There's Music Nearby</Text> : null}
        </View>
    );
}

//Creates the BottomTabNavigatior for reference
const Tab = createBottomTabNavigator();

/**
     * Creates the icons used in the three tabs of the app.
     * @param {Object} icon The icon used by the tab
     * @param {string} title The name of the tab
     * @param {Object} nearbyLocationState The object information of the nearby location
     * @returns {} The components comprising the tab icons
     */
    //Inspiration from week 10 contact
function tabOptions(icon, title, nearbyLocationState) {
    return {
        tabBarShowLabel: false,
        tabBarIcon: ({ focused }) => <TabIcon focused={focused} icon={icon} title={title} nearbyLocationState = {nearbyLocationState} />,
        tabBarActiveTintColor: fgColor,
        tabBarInactiveTintColor: fgColorLighter,
        tabBarStyle: {
            height: deviceHeight*0.093, 
        },

    };
}

/**
     * Initializes the tab bars, also does api calls and passes their info through into the different screens.
     * @param {Object} navigation Prop which allows for navigation between tabs.
     * @returns {} The components comprising the tab bar screens and navigation
     */
    //Inspiration from week 10 contact
function Tabs({ navigation}) {
    //Use states for api information, etc
	const [samplesToLocations, setSamplesToLocations] = useState([]);
	const [locations, setLocations] = useState([]);
    const [samples, setSamples] = useState([]);
	const [nearbyLocationState, setNearbyLocation ] = useState({});
    const [photoState, setPhotoState ] = useState({});
    const [name, setName] = useState("");


	/**
	 * Updates the locations useState by making an api call and setting it to the state
	 * @returns {} 
	 */
	async function getLocations() {
		const response = await fetch("http://wmp.interaction.courses/api/v1/?apiKey=CnGp1NRD&mode=read&endpoint=locations");
        const json = await response.json();
		const retrievedLocations = json.locations;
		setLocations(retrievedLocations);
	  }

	/**
	 * Updates the samplesToLocations useState by making an api call and setting it to the state
	 * @returns {} 
	 */
	async function getSamplesToLocations() {
		const response = await fetch("http://wmp.interaction.courses/api/v1/?apiKey=CnGp1NRD&mode=read&endpoint=samples_to_locations");
        const json = await response.json();
		const retrievedSamplesToLocations = json.samples_to_locations;
		setSamplesToLocations(retrievedSamplesToLocations);
	}

        /**
     * Updates the samples useState by making an api call and setting it to the state
     * @returns {} 
     */
    async function getSamples() {
        const response = await fetch("http://wmp.interaction.courses/api/v1/?apiKey=CnGp1NRD&mode=read&endpoint=samples");
        const json = await response.json();
        const retreivedSamples = json.samples;
        setSamples(retreivedSamples);
    }

	useEffect(() => {
		getLocations();
        getSamplesToLocations();
        getSamples();
	},[]);

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarBackground: () => (
            <LinearGradient colors={[colors.purpleColorLighter, colors.blueColorDarker]} style = {StyleSheet.absoluteFill} />),
            tabBarHideOnKeyboard: true
            }}>
            {/* If the locations state is not populater, then present a "loading screen" until it is populated, then will render the map with everything in it*/}
            <Tab.Screen
                name = "Map"
                children={() => locations[0] !== undefined ? <Map navigation={navigation} locations = {locations} setLocations = {setLocations} 
                nearbyLocationState = {nearbyLocationState} setNearbyLocation = {setNearbyLocation} />
                : <Text style = {styles.loadingScreen}>
                    Loading, please wait...
                </Text>}
                options={() => tabOptions(colorScheme == "dark" ? icons.mapDark : icons.mapWhite, "Map", nearbyLocationState)}
            />
            <Tab.Screen
                name = "Music"
                children={() => <Music navigation={navigation} nearbyLocation = {nearbyLocationState} name = {name} samples = {samples} samplesToLocations = {samplesToLocations} photoState = {photoState}/>}
                options={() => tabOptions(colorScheme == "dark" ? icons.logoDark : icons.logoWhite, "Music", nearbyLocationState)}
            />
            <Tab.Screen
                name = "Profile"
                children={() => <Profile navigation={navigation} photoState = {photoState} setPhotoState = {setPhotoState} name = {name} setName = {setName} />}
                options={() => tabOptions(colorScheme == "dark" ? icons.profileDark : icons.profileWhite, "Profile", nearbyLocationState)}
            />
        </Tab.Navigator>
    );

}

export default Tabs;