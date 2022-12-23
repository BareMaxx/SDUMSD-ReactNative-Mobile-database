import MovieListComponent from "./MovieListComponent";

export default function PopularComponent({ navigation }) {
	return <MovieListComponent navigation={navigation} type={"popular"} />;
}
