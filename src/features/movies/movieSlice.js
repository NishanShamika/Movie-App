import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApisKey";

export const featchAsyncMovies = createAsyncThunk(
  "movies/featchAsyncMovies",
  async (term) => {
    const response = await movieApi.get(
      `?apikey=${APIKey}&s=${term}&type=movie`
    );
    return response.data;
  }
);

export const fetchAsyncShows = createAsyncThunk(
  "movies/fetchAsyncShows",
  async (term) => {
    const response = await movieApi.get(
      `?apiKey=${APIKey}&s=${term}&type=series`
    );
    return response.data;
  }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id) => {
    const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
    return response.data;
  }
);

const initialState = {
  movies: {},
  shows: {},
  selectMovieOrShow: {},
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(featchAsyncMovies.pending, () => {
        console.log("loading....");
      })
      .addCase(featchAsyncMovies.fulfilled, (state, action) => {
        state.movies = action.payload;
      })
      .addCase(featchAsyncMovies.rejected, () => {
        console.log("rejected");
      })
      .addCase(fetchAsyncShows.fulfilled, (state, action) => {
        state.shows = action.payload;
      })
      .addCase(fetchAsyncMovieOrShowDetail.fulfilled, (state, action) => {
        state.selectMovieOrShow = action.payload;
      });
  },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
