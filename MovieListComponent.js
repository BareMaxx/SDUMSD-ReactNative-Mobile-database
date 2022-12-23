import {
	SafeAreaView,
	FlatList,
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { ApiContext } from "./App";

export default function MovieListComponent({ navigation, type }) {
	const [movieData, setMovieData] = useState([]);
	const API_KEY = useContext(ApiContext);

	useEffect(() => {
		fetchMovies();
	}, []);

	function fetchMovies() {
		fetch(
			`https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => {
				setMovieData(data.results);
			});
	}

	const Item = ({ item }) => {
		let style;
		const movieID = item.id;
		const title = item.title;
		const rating = item.vote_average;
		const poster = item.poster_path;

		if (rating <= 6.5 && rating >= 4.5) {
			style = styles.rating_medium;
		} else if (rating < 4.5) {
			style = styles.rating_bad;
		} else {
			style = styles.rating_good;
		}

		return (
			<View style={styles.item}>
				<Pressable
					onPress={() => {
						navigation.navigate("Details", {
							movieID,
						});
					}}
				>
					<View style={styles.clickableDiv}>
						<Text style={styles.title}>{title}</Text>
						<Text style={style}>{rating}/10</Text>
						<Image
							style={styles.image}
							source={{
								uri: `https://image.tmdb.org/t/p/original${poster}`,
							}}
						/>
					</View>
				</Pressable>
			</View>
		);
	};

	const renderItem = ({ item }) => <Item item={item} />;

	return (
		<SafeAreaView style={styles.view}>
			<FlatList
				contentContainerStyle={styles.container}
				data={movieData}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
			/>
		</SafeAreaView>
	);
}
const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: "#232423",
	},
	container: {
		justifyContent: "center",
		margin: "auto",
	},
	item: {
		marginVertical: 8,
		backgroundColor: "black",
	},
	title: {
		textAlign: "center",
		color: "white",
		fontSize: 32,
	},
	rating_good: {
		textAlign: "center",
		color: "#02c802",
		marginBottom: 5,
	},
	rating_medium: {
		textAlign: "center",
		color: "#e79705",
		marginBottom: 5,
	},
	rating_bad: {
		textAlign: "center",
		color: "red",
		marginBottom: 5,
	},
	image: {
		width: "100%",
		height: 300,
	},
	clickableDiv: {
		display: "flex",
		flexDirection: "column",
	},
});
