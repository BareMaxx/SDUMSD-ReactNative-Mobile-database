import React, { useEffect, useState, useContext } from "react";
import { Text, FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import { ApiContext } from "./App";
// const API_KEY = "2cece1b402fa756eebc6a469d8563b9f";
export default function ActorListComponent({ movieID }) {
	const [movieCredits, setMovieCredits] = useState([]);
	const API_KEY = useContext(ApiContext);
	useEffect(() => {
		fetchMovieCredits(movieID);
	}, []);
	function fetchMovieCredits(id) {
		fetch(
			`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => {
				setMovieCredits(data.cast);
			});
	}
	const Item = ({ item }) => {
		return (
			<View style={styles.item}>
				<Text style={styles.title}>
					{"Character: " + item.character + "\nActor: " + item.name}
				</Text>
			</View>
		);
	};
	const renderItem = ({ item }) => <Item item={item} />;
	return (
		<SafeAreaView style={styles.view}>
			<FlatList
				data={movieCredits}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: {
		flex: 1,
	},
	item: {
		marginVertical: 8,
	},
	title: {
		color: "white",
	},
});
