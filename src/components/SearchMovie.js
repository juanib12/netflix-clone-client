import axios from "axios";
import { useState, useEffect } from "react";
import "./Peliculas.css";
import { Formik, Form, Field } from "formik";

const SearchMovie = () => {
  const [search, setSearch] = useState([]);

  return search.length === 0 ? (
    <div className="search_container">
      <Formik
        initialValues={{ search: "" }}
        onSubmit={async (values) => {
          const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/search/movie?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES&query=${values.search}&page=1&include_adult=false`,
          };

          axios
            .request(options)
            .then(function (response) {
              setSearch(response.data.results);
            })
            .catch(function (error) {
              console.error(error);
            });
        }}
      >
        <Form className="form-search">
          <Field
            name="search"
            placeholder="Buscar..."
            className="field"
          ></Field>
        </Form>
      </Formik>
    </div>
  ) : search ? (
    <div className="search_container">
      <Formik
        initialValues={{ search: "" }}
        onSubmit={async (values) => {
          const options = {
            method: "GET",
            url: `https://api.themoviedb.org/3/search/movie?api_key=01864e118c53cc6ab3c40e90d03443b0&language=es-ES&query=${values.search}&page=1&include_adult=false`,
          };

          axios
            .request(options)
            .then(function (response) {
              setSearch(response.data.results);
            })
            .catch(function (error) {
              console.error(error);
            });
        }}
      >
        <Form className="form-search">
          <Field
            name="search"
            placeholder="Buscar..."
            className="field"
          ></Field>
        </Form>
      </Formik>

      <section className="carousel">
        <div className="carousel__container">
          <h3>Busqueda</h3>
          {search.map((buscar) => (
            <div className="carousel__item" key={buscar.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${buscar.poster_path}`}
                className="item-img"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  ) : (
    <p className="message">Error, no se puede realizar la busqueda</p>
  );
};

export default SearchMovie;
