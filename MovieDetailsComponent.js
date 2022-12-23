import {
	View,
	Pressable,
	Text,
	StyleSheet,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ActorListComponent from "./ActorListComponent";
import { ApiContext } from "./App";

export default function MovieDetailsComponent({ navigation, route }) {
	const movieID = route.params.movieID;
	const [movieData, setMovieData] = useState([]);
	const [rating, setRating] = useState("");
	const API_KEY = useContext(ApiContext);

	useEffect(() => {
		fetchMovie(movieID);
	}, []);

	function fetchMovie(id) {
		fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
		)
			.then((response) => response.json())
			.then((data) => {
				setMovieData(data);
			});
	}

	useEffect(() => {
		const vote = parseFloat(movieData.vote_average);
		setRating(vote.toFixed(1));
	}, [movieData]);

	return (
		<SafeAreaView style={styles.view}>
			<Pressable
				style={styles.goBackButton}
				onPress={() => navigation.goBack()}
			>
				<Text style={styles.goBackText}>Go Back</Text>
			</Pressable>
			<Image
				source={{
					uri: `https://image.tmdb.org/t/p/original${movieData.poster_path}`,
				}}
				style={styles.image}
				resizeMode={"contain"}
			/>
			<ScrollView style={styles.div}>
				<View style={styles.div2}>
					<Text style={{ color: "#dedede", fontWeight: "bold" }}>
						{"Title: \n"}
					</Text>
					<Text style={styles.text}>{movieData.title + "\n"}</Text>
					<Text style={styles.fatText}>{"Rating: \n"}</Text>
					<Text style={styles.text}>{rating + "/10" + "\n"}</Text>
					<Text style={styles.fatText}>{"Description: \n"}</Text>
					<Text style={styles.text}>{movieData.overview + "\n"}</Text>
					<Text style={styles.fatText}>{"Actors:"}</Text>
					<ActorListComponent movieID={movieID} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	view: {
		flex: 1,
		backgroundColor: "#232423",
	},
	image: {
		width: "100%",
		height: 300,
	},
	text: {
		color: "#dedede",
	},
	fatText: {
		marginTop: 15,
		color: "#dedede",
		fontWeight: "bold",
	},
	div2: {
		backgroundColor: "#181818",
		margin: 8,
		padding: 20,
	},
	div: {
		margin: "auto",
		flex: 1,
		maxWidth: 500,
	},
	goBackButton: {
		borderRadius: 3,
		backgroundColor: "rgb(24, 24, 24)",
		padding: 6,
		height: 30,
		width: 80,
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
		alignSelf: "left",
		marginBottom: 15,
	},
	goBackText: {
		color: "#dedede",
		fontWeight: "bold",
	},
});
