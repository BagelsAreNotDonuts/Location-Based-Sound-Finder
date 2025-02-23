
import {StyleSheet, Dimensions, Appearance} from "react-native";
const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height;

//Gets color scheme to tell if light or dark mode
const colorScheme = Appearance.getColorScheme();

//Colors used in the app
export const colors = {
	purpleColorLighter: "#A42DE8",
	blueColorLighter: "#318AFF",
	blueColorDarker: "#2D3DE8",
	whiteColorTranslucent: "rgba(255,255,255,0.5)",
	blackColorTranslucentLess: "rgba(0,0,0,0.35)",
	blackColorTranslucentMore: "rgba(0,0,0,0.7)",
	"light" : {
		bgColor: "#ffffff",
		fgColor: "#800080",
		fgColorLighter: "rgba(128,0,128,0.5)",
		headerTextColor: "#ffffff"
	},
	"dark" : {
		bgColor: "#422142",
		fgColor: "#f0c4f0",
		fgColorLighter: "rgba(210,169,210,0.5)",
		headerTextColor: "#f0c4f0",
	}
};

//Initializes some colors depending on the scheme 
export const fgColor = colorScheme == "dark" ? colors.dark.fgColor : colors.light.fgColor;
export const bgColor = colorScheme == "dark" ? colors.dark.bgColor : colors.light.bgColor;
export const fgColorLighter = colorScheme == "dark" ? colors.dark.fgColorLighter : colors.light.fgColorLighter;
export const headerTextColor = colorScheme == "dark" ? colors.dark.headerTextColor : colors.light.headerTextColor;

//Initializes all the styles used throughout the app
export const styles = StyleSheet.create({
    loadingScreen: {
        fontSize: deviceWidth/14,
        fontWeight: "bold",
        color: fgColor,
        paddingLeft: deviceWidth*0.085,
        paddingTop: deviceHeight*0.02,
        backgroundColor: bgColor,
        flex: 1,
    },
	container: {
        flex: 1,
    },
    nearbyLocationSafeAreaView: {
        backgroundColor: "black",
    },
    nearbyLocationView: {
        padding: 20,
    },
    nearbyLocationText: {
        color: "white",
        lineHeight: 25
    },
    profileHeader: {
        fontSize: deviceWidth/14,
        fontWeight: "bold",
        color: fgColor,
        paddingLeft: deviceWidth*0.085,
        paddingTop: deviceHeight*0.02
    },
    profileSubHeader: {
        fontSize: deviceWidth/24,
        paddingLeft: deviceWidth*0.085,
        color: fgColor,
    },
    musicHeader: {
        fontSize: deviceWidth/14,
        fontWeight: "bold",
        color: fgColor,
        // paddingLeft: deviceWidth*0.085,
        // paddingTop: deviceHeight*0.02,
        width: deviceWidth*0.7,
    },
    musicSubheader: {
        fontSize: deviceWidth/24,
        // paddingLeft: deviceWidth*0.085,
        width: deviceWidth*0.9,
        color: fgColor,
    },
    musicStyles: {
        musicButton : {
            color: fgColor,
            radius: 1,
            backgroundColor: fgColor,
            width: "85%",
            height: "40%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10
        },
        buttonView : {
            width: "100%",
            alignItems: "center",
        },
        musicText: {
            color: "white",
            fontSize: deviceWidth/24,
            fontWeight: "bold"
        },
        topContainerOuter: {
            flexDirection: "row",
            paddingLeft: deviceWidth*0.085,
            paddingTop: deviceHeight*0.02,
            alignItems:"center"
        },
        topContainerInner: {
            flexDirection: "column",
        },
        usersContainer : {
            width: "100%",
            height: "40%",
            alignItems: "center"

        },
        usersHeaderText: {
            fontSize: deviceWidth/18,
            color: fgColor,
            fontWeight: "bold",
            width: "85%"
        },
        usersInfoContainer: {
            width: "85%", 
            marginTop: deviceHeight*0.020, 
            flexDirection: "row", 
            alignItems: "center"
        },
        usersImageContainer: {
            width: deviceWidth*0.25, 
            height: deviceWidth*0.25, 
            backgroundColor: bgColor, 
            overflow: "hidden", 
            borderRadius: (deviceWidth*25)/2, 
            borderWidth: 3, 
            borderColor: fgColorLighter
        },
        usersNameText: {
            width: "60%", 
            marginLeft: "5%", 
            fontSize: 
            deviceWidth/22,
            color: fgColor,
        }

    },
    photoStyles: {
        container: {
            marginTop: "10%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center"
        },
        photoFullView: {
            width: "85%",
            height: deviceHeight*.55,
            marginBottom: "12%",
        },
        photoEmptyView: {
            borderWidth: 3,
            borderRadius: 10,
            borderColor: fgColor,
            borderStyle: "dashed",
            height: deviceHeight*.55,
            marginBottom: "12%",
            width: "85%",
            justifyContent: "center",
            alignItems: "center"
        },
        photoFullImage: {
            width: "100%",
            height: "100%",
            borderRadius: 10,
            borderWidth: 3,
            borderColor: fgColorLighter,
            overflow: "hidden"
        },
        buttonViewImage: {
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "110%",
        },
        buttonViewNoImage: {
            flexDirection: "row",
            justifyContent: "space-around",
        },
        profileButton : {
            color: fgColor,
            radius: 1,
            backgroundColor: fgColor,
            width: "40%",
            alignItems: "center",
            borderRadius: 10
        },
        buttonText: {
            color: bgColor,
            fontSize: deviceWidth/24,
            fontWeight: "bold",
            padding: 6

        },
        textInput: {
            width: "85%",
            height: "100%",
            backgroundColor: fgColorLighter,
            justfiyContent: "center",
            alignItems: "center",
            borderRadius: 10,
            overflow: "hidden",
            color: fgColor,
            fontSize: deviceWidth/24,
            textDecoration: "none",
            textAlign: "center",
        },
        textInputView: {
            width: "100%",
            height:"6%",
            alignItems: "center"

        }
    }
    

});