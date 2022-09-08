import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMoviesApi } from "../../apis/Movies";
import MovieItem from "../MovieItem";

const MovieList = () => {
  const isAuthenticated = useSelector((state) => state.Auth.authenticated);
  const [allMovie, setAllMovie] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesApi()
      .then(({ response }) => {
        if (response) {
          setAllMovie(response?.movies);
          setMovies(response?.movies?.slice(0, 8));
        }
      })
      .catch((err) => console.log(err));
  }, [isAuthenticated]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        parseInt(window.innerHeight + document.documentElement.scrollTop) ===
        document.documentElement.offsetHeight
      ) {
        const isNearlyAllData = movies.length + 8 > allMovie.length;
        if (isNearlyAllData) {
          setMovies(allMovie);
        } else
          setMovies([
            ...movies,
            ...allMovie.slice(movies.length, movies.length + 8),
          ]);
      }
    };

    if (movies.length === allMovie.length) {
      return;
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [allMovie, movies]);

  return (
    <Box sx={{ pb: 1 }}>
      <Typography
        sx={{
          fontSize: "20px",
          fontWeight: "bold",
          mb: 1,
          color: "white",
        }}
      >
        PHIM ĐỀ CỬ
      </Typography>
      <Divider sx={{ bgcolor: (theme) => theme.default.lightPurple, mb: 1 }} />
      <Grid container spacing={2}>
        {movies.map((movie, i) => (
          <MovieItem key={i} movie={movie} />
        ))}
      </Grid>
    </Box>
  );
};

export default MovieList;
