import { Box, Container } from "@mui/material";
import React from "react";
import FilterFilm from "../../components/FilterFilm";
import MovieList from "../../components/MovieList";

const HomePage = () => {
  return (
    <Box
      sx={{
        pt: "100px",
        bgcolor: (theme) => theme.default.bgColor,
      }}
    >
      <Container maxWidth="lg">
        <FilterFilm />
        <MovieList />
      </Container>
    </Box>
  );
};

export default HomePage;
