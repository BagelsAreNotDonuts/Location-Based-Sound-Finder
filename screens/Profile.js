import React from "react";
import { View, Dimensions, Text, KeyboardAvoidingView, ImageBackground, TouchableHighlight, TextInput, ScrollView} from "react-native";
import {styles, bgColor, fgColor, deviceWidth, deviceHeight} from "../data/themes";
import { useState} from "react";
import {
    launchImageLibrary
} from "react-native-image-picker";


//----> Comments which state that they take inspiraiton from the week 12 contact will use the reference below <-----
//Luscombe, M (2022). Week 12 contact. COMP2140 notion page. https://mattluscombe.notion.site/Week-12-Contact-53ca830dcd00452c80937e692b62d647


/**
     * The profile screen
     * @param {Function} photoState The state containing the information for the photo assigned to the user
     * @param {string} setPhotoState The function that sets the state of the photo state
     * @param {Function} name The state containing the name of the user
     * @param {Function} setName The function that allows for setting of the name state
     * @returns {} The components comprising the profile screen
     */
//Many parts of this component draw inspiration from the week12 contact
function Profile({photoState, setPhotoState, name, setName}) {

    //State for the placeHolder text
    const [placeholderText, setPlaceholderText] = useState("Enter Your Name");

    /**
     * Handles when the add/change photo buttons are pressed, launches the image library sets states accordingly
     */
    async function handleChangePress() {
        const result = await launchImageLibrary();
        if (result.didCancel) {
            console.log("Image picker cancelled");
        }
        else if(typeof result.assets[0] == "object") {
            console.log("Result is an object");
            const photoState = result.assets[0]
            setPhotoState(photoState);
        } else {
            console.log("Result not an object");
        }
    }

    //Boolean to check whether or not the photoState is set to anything.
    const hasPhoto = typeof photoState.uri != "undefined";


    /**
     * The photo "frame" which displays the photo the user has selected from their image library
     * @returns {} The components comprising the photo frame, including the button to change what's displayed
     */
    function Photo() {
        if(hasPhoto) {
            return (
                <View style={styles.photoStyles.photoFullView}>
                    <ImageBackground
                        style={styles.photoStyles.photoFullImage}
                        resizeMode="cover"
                        source={{
                            uri: photoState.uri,
                            width: deviceWidth,
                            height: deviceHeight / 2
                        }}
                    > 
                    <View style={styles.photoStyles.buttonViewImage}>
                        <TouchableHighlight style = {styles.photoStyles.profileButton} 
                            onPress={handleChangePress}
                            > 
                            <Text style = {styles.photoStyles.buttonText}>Change Photo</Text>
                        </TouchableHighlight>
                    </View>
                    </ImageBackground>
                </View>
            );
        }
        else {
            return (
                <View style={styles.photoStyles.photoEmptyView}>
                    <View style={styles.photoStyles.buttonViewNoImage}>
                        <TouchableHighlight style = {styles.photoStyles.profileButton}
                            onPress={handleChangePress}
                            > 
                            <Text style = {styles.photoStyles.buttonText}>Add Photo</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                
            );        
        }
    }

    /**
     * The profile header components
     * @returns {} The components comprising the header
     */
    function ProfileHeader() {
        const header = "Edit Profile"
        const subHeader = "Mirror, Mirror On The Wall..."
        return (
            <>
                <Text style = {styles.profileHeader
                }>
                    {header}
                </Text>
                <Text style = {styles.profileSubHeader}>
                    {subHeader}
                </Text>
            </>
        )
    }

    
    return(
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: bgColor }}
            enabled>
            <ScrollView>

                <ProfileHeader/>

                <View style={styles.photoStyles.container}>
                    <Photo/> 
                </View>

                {/* The text input for inputting the user's name, on focus will remove the placeholder text*/}
                <View 
                    behavior={"height"}
                    style = {styles.photoStyles.textInputView}>
                        
                        <TextInput 
                            onFocus={() => setPlaceholderText('')}
                            KeyboardAvoidingView={true}
                            underlineColorAndroid="transparent"
                            placeholderTextColor = {fgColor}
                            style = {styles.photoStyles.textInput}
                            onChangeText = {setName}
                            value = {name}
                            placeholder= {placeholderText}/>
                    
                </View>

            </ScrollView>

        </KeyboardAvoidingView>


    );
    
}

export default Profile;