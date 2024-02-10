import React, { useEffect } from "react";
import MovieListing from "../MovieListing/MovieListing";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApisKey";
import { useDispatch } from "react-redux";
import { addMovies } from "../../features/movies/movieSlice";

const Home = () => {
  const movieText = "Harry";
  const dispatch = useDispatch();
  useEffect(() => {
    const featchMovies = async () => {
      const response = await movieApi
        .get(`?apikey=${APIKey}&s=${movieText}`)
        .catch((err) => {
          console.log("Err", err);
        });
      console.log("res", response);
      dispatch(addMovies(response.data));
    };
    featchMovies();
  }, [dispatch]);
  return (
    <div>
      <div className="banner-img"></div>
      <MovieListing />
    </div>
  );
};

export default Home;
