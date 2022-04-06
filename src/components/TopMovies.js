import "./Peliculas.css";
import { useState, useEffect } from "react";
import axios from "axios";

const TopMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/top_rated?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=1",
    };

    axios
      .request(options)
      .then(function (response) {
        setMovies(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  console.log(movies);

  return (
    <div>
      <section className="carousel">
        <div className="carousel__container">
          <h3>Las más valoradas</h3>
          {movies.map((mov) => (
            <div className="carousel__item" key={mov.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                className="item-img"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TopMovies;
