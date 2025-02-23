import React from "react";
import { View, Image, Appearance,Text,TouchableHighlight } from "react-native";
import { SafeAreaView} from "react-native-safe-area-context";
import {styles, bgColor} from "../data/themes";
import { useState,useRef } from "react";
import { WebView } from "react-native-webview";
import icons from "../data/icons";


//Gets color scheme to tell if light or dark mode
const colorScheme = Appearance.getColorScheme();

//----> Comments which state that they take inspiraiton from the week 12 contact will use the reference below <-----
//Luscombe, M (2022). Week 12 contact. COMP2140 notion page. https://mattluscombe.notion.site/Week-12-Contact-53ca830dcd00452c80937e692b62d647


/**
     * The music screen, shows the users at a location, the location name and allows for playing of music.
     * @param {Object} nearbyLocation The state containing the information for the nearby location
     * @param {string} name The state containing the user's name
     * @param {Object} samples The state containing the samples from the api call
     * @param {Object} samplesToLocations The state containing the information correlating the samples to locations
     * @param {Object} photoState The state containing the information for the photo assigned to the user
     * @returns {} The components comprising the music screen.
     */
//Draws inspiration from week 12 contact.
function Music({nearbyLocation, name, samples, samplesToLocations, photoState}) {

    //Creates a varibale for the nearby location object for later comparisons
    const nearbyLocationCheck =  Object.keys(nearbyLocation).length !== 0 ? true : false;
    

   
    //States  for the headers and web view
    const noMusicHeader = "No Music Nearby"
    const noMusicSubheader = "It's Oh So Quiet..."
    const [header, setHeader] = useState(noMusicHeader);
    const [subHeader, setSubHeader] = useState(noMusicSubheader);
    const [ webViewState, setWebViewState ] = useState({
        loaded: false,
        actioned: false,
    });

    //constant for web view ref
    const webViewRef = useRef();

    /**
     * Sets the view view state when called.
     */
    function webViewLoaded() {
        setWebViewState({
            ...webViewState,
            loaded: true
        });
    }

    
    /**
	 * Creates an array with the information for all the samples at the current location for playback in the webview.
	 * @returns {} 
	 */
    function getLocationSamples() {
        //If there is a nearby location, then create the array containing the sample data shared at that location.
        if (nearbyLocationCheck) {
            const filteredSamplesToLocations = samplesToLocations.filter((entry) => (entry.locations_id == nearbyLocation.id));
            const sampleIDs = filteredSamplesToLocations.map((entry) => (entry.samples_id));
            const filteredSamples = samples.filter((entry) => sampleIDs.includes(entry.id));
        
            let samplesDataToPlay = [];
            filteredSamples.forEach((entry) => {
                let sampleObject = {};
                sampleObject.type = entry.type;
                sampleObject.recording_data = JSON.parse(entry.recording_data);
                samplesDataToPlay.push(sampleObject);
            })
            return samplesDataToPlay;
        } else {    
            console.log("No nearby location yet");
            return [];
        }
    }
    /**
     * Handles pressing the music button, will inject javascript into the web view to set up playing tone.js sounds accordingly
     */
    function handleActionPress() {
        if(!webViewState.actioned) {
            let samplesToPlay = JSON.stringify(getLocationSamples());
            webViewRef.current.injectJavaScript(`setupParts(${samplesToPlay})`); 
            webViewRef.current.injectJavaScript("startPlayback()");      
        }
        else {
            webViewRef.current.injectJavaScript("stopPlayback()");   
            webViewRef.current.reload();
        }
        setWebViewState({
            ...webViewState,
            actioned: !webViewState.actioned
        });
    }

    /**
     * The header section of the app
     * @returns {} The components comprising the header of the app, changes depending on if a location is nearby
     */
    function MusicHeaderSection() {
        return (
            <View style={styles.musicStyles.topContainerOuter}>
                {nearbyLocationCheck ? <Image
                        style={{height: "45%", width: "10%", marginRight: "4%"}}
                        resizeMode="contain"
                        source={colorScheme != "dark" ? icons.pinDark : icons.pinLight}
                        /> : null}
                <View style={styles.musicStyles.topContainerInner}>
                    <Text style = {styles.musicHeader
                    }>
                        {nearbyLocationCheck ? nearbyLocation.location : header}
                    </Text>
                    <Text style = {styles.musicSubheader}>
                        {nearbyLocationCheck ? nearbyLocation.suburb+", "+nearbyLocation.state : subHeader}
                    </Text>
                </View>
            </View>
        )
    }

    /**
     * The user section of the app
     * @returns {} The components comprising the users section of the app, will draw from the photoState and name states to
     * display the user's set photo and name.
     */
    function UserSection() {
        return (
            <View style = {styles.musicStyles.usersContainer}>
                <Text style = {styles.musicStyles.usersHeaderText}> Currently At This Location: </Text>

                <View style = {styles.musicStyles.usersInfoContainer}>
                    <View style = {styles.musicStyles.usersImageContainer}> 
                        <Image style = {{width: "100%", height: "100%"}}
                            resizeMode="cover"
                            source={{
                                uri: photoState.uri,
                            }}
                            />
                    </View>
                    <Text style= {styles.musicStyles.usersNameText}>
                        {name != "" ? name : "Enter Your Name"}
                    </Text>
                </View>

                <View style = {styles.musicStyles.usersInfoContainer}>
                    <View style = {styles.musicStyles.usersImageContainer}> 
                        <Image style = {{width: "100%", height: "100%"}}
                            resizeMode="cover"
                            source={colorScheme != "dark" ? icons.smileyDark : icons.smileyLight}
                            />
                    </View>
                    <Text style= {styles.musicStyles.usersNameText}>
                        And Others...
                    </Text>
                </View>

            </View>
        )
    }

    
    
    return(
        <SafeAreaView style = {{
            backgroundColor: bgColor,
            flex: 1,
            }}>

            <MusicHeaderSection/>
            
            {/* If a location is nearby, render the button and activate the webview */}
            {nearbyLocationCheck ? <>
                <View style={{paddingTop: "10%"}}>
                    <View style={styles.webViewContainer}>
                        <WebView
                            ref={ref => webViewRef.current = ref}
                            originWhitelist={["*"]}
                            source={{
                                uri: "https://wmp.interaction.courses/playback-webview/"
                            }}
                            pullToRefreshEnabled={true}
                            onLoad={webViewLoaded}
                            style={styles.webView}
                        />
                    </View>
                    {webViewState &&
                        <View style={styles.musicStyles.buttonView}>
                            <TouchableHighlight style = {styles.musicStyles.musicButton} 
                                onPress={handleActionPress} 
                                > 
                                <Text style = {styles.musicStyles.musicText}>{!webViewState.actioned ? "Play Music" : "Stop Music"}</Text>
                            </TouchableHighlight>
                        </View>
                    }
                </View>
            </> : null}
            {/* If a location nearby, render the user section */}
            {nearbyLocationCheck ? <UserSection/> : null}
            
        </SafeAreaView>
    );
}

export default Music;