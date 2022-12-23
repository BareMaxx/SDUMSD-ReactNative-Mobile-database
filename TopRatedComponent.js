import MovieListComponent from "./MovieListComponent";

export default function TopRatedComponent({ navigation }) {
	return <MovieListComponent navigation={navigation} type={"top_rated"} />;
}
