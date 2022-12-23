import PopularComponent from "./PopularComponent";
import TopRatedComponent from "./TopRatedComponent";
import UpComingComponent from "./UpComingComponent";
import MovieDetailsComponent from "./MovieDetailsComponent";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image, Text } from "react-native";
import React, { createContext } from "react";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ApiContext = createContext("");
export { ApiContext };

const API_KEY = "2cece1b402fa756eebc6a469d8563b9f";

export default function App() {
	if (API_KEY === "") {
		return <Text style={{ color: "red" }}>ERROR: No API KEY</Text>;
	}

	return (
		<ApiContext.Provider value={API_KEY}>
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={{
						headerStyle: {
							backgroundColor: "black",
							borderBottomColor: "black",
						},
						headerTintColor: "#fff",
						tabBarStyle: {
							backgroundColor: "black",
							borderTopColor: "black",
						},
					}}
				>
					<Tab.Screen
						name="Popular"
						options={{
							headerTitle: "MovieInf - Popular movies",
							tabBarIcon: ({ size }) => {
								return (
									<Image
										style={{
											width: size,
											height: size,
										}}
										source={require("./assets/trend.png")}
									/>
								);
							},
						}}
					>
						{() => (
							<Stack.Navigator
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen
									name="Popular movies"
									component={PopularComponent}
								/>
								<Stack.Screen
									name="Details"
									component={MovieDetailsComponent}
									screenOptions={{
										headerShown: false,
									}}
								/>
							</Stack.Navigator>
						)}
					</Tab.Screen>
					<Tab.Screen
						name="Top Rated"
						options={{
							headerTitle: "MovieInf - Top rated movies",
							tabBarIcon: ({ size }) => {
								return (
									<Image
										style={{
											width: size,
											height: size,
										}}
										source={require("./assets/white-star.png")}
									/>
								);
							},
						}}
					>
						{() => (
							<Stack.Navigator
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen
									name="Top Rated"
									component={TopRatedComponent}
								/>
								<Stack.Screen
									name="Details"
									component={MovieDetailsComponent}
									screenOptions={{
										headerShown: false,
									}}
								/>
							</Stack.Navigator>
						)}
					</Tab.Screen>
					<Tab.Screen
						name="Up Coming"
						options={{
							headerTitle: "MovieInf - Up coming movies",
							tabBarIcon: ({ size }) => {
								return (
									<Image
										style={{
											width: size,
											height: size,
										}}
										source={require("./assets/upcoming.png")}
									/>
								);
							},
						}}
					>
						{() => (
							<Stack.Navigator
								screenOptions={{
									headerShown: false,
								}}
							>
								<Stack.Screen
									name="Up Coming"
									component={UpComingComponent}
								/>
								<Stack.Screen
									name="Details"
									component={MovieDetailsComponent}
									screenOptions={{
										headerShown: false,
									}}
								/>
							</Stack.Navigator>
						)}
					</Tab.Screen>
				</Tab.Navigator>
			</NavigationContainer>
		</ApiContext.Provider>
	);
}
