import "./Peliculas.css";
import axios from "axios";
import { useState, useEffect } from "react";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/upcoming?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=1",
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

  return (
    <div>
      <section className="carousel">
        <div className="carousel__container">
          <h3>Proximamente</h3>
          {movies.map((mov) => (
            <div className="carousel__item" key={mov.id}>
              <img src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`} className="item-img"/>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default UpcomingMovies;
