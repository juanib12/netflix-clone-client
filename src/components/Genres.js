import axios from "axios";
import { useState, useEffect } from "react";
import "./Peliculas.css";

const Genres = () => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/genre/movie/list?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES",
    };

    axios
      .request(options)
      .then(function (response) {
        setGenres(response.data.genres);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <section className="carousel_genres">
        <div className="carousel__container">
          <h3>Géneros</h3>
          {genres.map((genero) => (
            <div className="carousel__item" key={genero.id}>
              <div className="carousel__card">
                <h2>{genero.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Genres;
