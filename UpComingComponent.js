import MovieListComponent from "./MovieListComponent";

export default function UpComingComponent({ navigation }) {
	return <MovieListComponent navigation={navigation} type={"upcoming"} />;
}
