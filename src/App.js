import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import "./App.css"

class App extends React.Component {
    state = {
        isLoading: true,
        movies: []
    }

    getMovies = async () => { //async:비동기 함수, await:axious가 끝날 때까지 기다
        //const movies = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
        //console.log(movies.data.data.movies);

        const {data: {data: {movies}}} = await axios.get("https://yts-proxy.nomadcoders1.now.sh/list_movies.json");
        //console.log(movies);
        this.setState({movies: movies, isLoading: false});// this.setState({movies, isLoading: false});
    }

    //componentDidMount에서 data를 fetch하기
    componentDidMount() {
        this.getMovies();
    }

    render() {
        const {isLoading, movies} = this.state;
        return (
            <section className="container"> {/*class이기 때문에 className으로 써줘야 함*/}

                {isLoading ? (
                    <div className="loader">
                        <span className="loader_text">Loading...</span>
                    </div>
                ) : (
                    <div className="movies">
                        {movies.map(movie => (
                            <Movie
                                key={movie.id}
                                id={movie.id}
                                year={movie.year}
                                title={movie.title}
                                summary={movie.summary}
                                poster={movie.medium_cover_image}
                                genres={movie.genres}
                            />
                        ))}
                    </div>
                )}
            </section>
        );
    }
}


export default App;
