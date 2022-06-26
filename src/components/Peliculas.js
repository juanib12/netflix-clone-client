import axios from "axios";
import { useState, useEffect } from "react";
import "./Peliculas.css";
import { useMovieContext } from "./MovieContext";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";

const Peliculas = () => {
  const [movie, setMovie] = useState([]);
  const [movieSelect, setMovieSelect] = useState({
    id: "",
  });
  const {
    getDetailsMovie,
    movieID,
    movieCredits,
    getCreditsMovie,
    getSimilarMovie,
    movieSimilar,
    getRecommendationMovie,
    movieRecom,
  } = useMovieContext();
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const seleccionarMovie = async (id) => {
    try {
      if (id === "") {
        console.log("Error");
      } else {
        setMovieSelect(id);
        await getDetailsMovie(id);
        await getCreditsMovie(id);
        await getSimilarMovie(id);
        await getRecommendationMovie(id);
        await handleOpen();
        // console.log(id);
        // console.log(movieID);
        // console.log(movieCredits);
        console.log(movieSimilar);
        console.log(movieRecom);
      }
    } catch {
      console.log("Error 2");
    }
  };

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://api.themoviedb.org/3/movie/popular?api_key=01864e118c53cc6ab3c40e90d03443b0&language=en-US&page=1",
    };

    axios
      .request(options)
      .then(function (response) {
        setMovie(response.data.results);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

    // const first5artist = movieCredits.cast?.slice(0, 5);

  return (
    <div>
      <section className="carousel">
        <div className="carousel__container">
          <h3>Populares</h3>
          {movie.map((mov) => (
            <div className="carousel__item" key={mov.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${mov.poster_path}`}
                className="item-img"
                onClick={() => seleccionarMovie(mov.id)}
              />
            </div>
          ))}
        </div>
      </section>
      {movieID === null &&
      // first5artist === null &&
      movieSimilar === null &&
      movieRecom === null ? (
        console.log("Error")
      ) : (
        <Modal
          open={open}
          onClose={handleClose}
          style={{
            marginLeft: 350,
            marginRight: 350,
            marginTop: 50,
            backgroundColor: "#121212",
            overflowY: "auto",
            width: 800,
            maxWidth: 800,
          }}
        >
          <div className="modal_container">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movieID.poster_path}`}
              width="350"
              height="450"
            />
            <h1>{movieID.title}</h1>
            <div className="modal_content">
              <div className="modal_dates">
                <h3 className="dates">{movieID.release_date}</h3>
              </div>
              <div className="modal_types">
                <div className="modal_genres">
                  <h4>Géneros:</h4>
                  {movieID.genres.map((map) => (
                    <p key={map.id}>{map.name},</p>
                  ))}
                </div>
                <div className="modal_elenco">
                  <h4>Elenco:</h4>
                  {/* {first5artist?.map((credits) => (
                    <div key={credits.id}>
                      <p>{credits.name},</p>
                    </div>
                  ))} */}
                </div>
                <div className="modal_pop">
                  <h4>Popularidad:</h4>
                  <p>{movieID.popularity}</p>
                </div>
              </div>
            </div>
            <div className="modal_sinopsis">
              <p>{movieID.overview}</p>
            </div>
          </div>
          <div className="modal_movies">
            {movieSimilar.map((similiar) => (
              <p>{similiar.title}</p>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Peliculas;
