import { SafeAreaView} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./components/Tabs";
import {colors} from "./data/themes"
export default App;

const Stack = createStackNavigator();

//IMPORTANT NOTES ABOUT THE APP, sorry for the novel down there

//Apparently for some people on the FIRST build of their apps the music doesn't play so they have to rebuild it a second time for it to work. 4

//My app SHOULD have pretty the core features implemented to an extent, so if it's not changing certain bits of the display  properly 
//(like the logo changing based on proximity to music areas) you might have to move the user location into the circles a bit more and stuff like that.

//On my computer, it takes like 2 minutes for the apis to load properly, and after a bunch of testing it seems to be a problem with MY react native being weird(?) 
//I'm not sure if you'll experience it too but if you do, please wait for the map to load with all the circles rendered before continuing with stuff.

//Changing locations through the android emulator's options is weird, I don't know if it's my code or the emulator itself, but when going 
//between areas with/without music it progressively stalls the application. In the watchposition section of Map.js uncomment the "METRO TERMINAL SPAM" console logs to see
//it happen when you change locations. It may be better to hardcode the starting location every time instead of using the emulator to change locations.


/**
     * The App layer 
	 * (API calls and states used to be here until I moved them to Tabs.js to try solve my api call duration problem, it didn't fix it, and I'm too
	 * scared to move them back in fear of breaking something by not doing it right, doesn't really make a difference though)
     * @returns {} Returns the navigation and stack components to facilitate the changing of screens in the app.
     */
function App() {

	return (
		<SafeAreaView style={{ backgroundColor: colors.purpleColorLighter, flex: 1 }}>
			<NavigationContainer>
				<Stack.Navigator
					screenOptions={{
						headerShown: false
					}}
					initialRouteName={"Tabs"}
				>
				{<Stack.Screen
							name="Tabs"
							children={props => <Tabs {...props} />}
						/>}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
);

}