import { StyleSheet } from "react-native";
import HomeComponent from "./HomeComponent";
import MovieComponent from "./MovieComponent";

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={HomeComponent} />
				<Stack.Screen name="Movie details" component={MovieComponent} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
