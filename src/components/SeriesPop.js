import axios from "axios";
import { useState, useEffect } from "react";
import "./Peliculas.css";

const SeriesPop = () => {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/tv/popular?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=1",
    };

    axios
      .request(options)
      .then(function (response) {
        setSeries(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <section className="carousel">
        <div className="carousel__container">
          <h3>Series Populares</h3>
          {series.map((serie) => (
            <div className="carousel__item" key={serie.id}>
                <img src={`https://image.tmdb.org/t/p/w500/${serie.poster_path}`}
                className="item-img"/>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default SeriesPop
