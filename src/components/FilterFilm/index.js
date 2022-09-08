import { Grid, Typography } from "@mui/material";
import React from "react";
import FilterMenu from "../FilterMenu";

const FilterFilm = () => {
  const filterTitleSx = {
    fontweight: "bold",
    marginBottom: "16px",
    color: "white",
  };
  return (
    <Grid
      container
      sx={{
        bgcolor: (theme) => theme.default.secondBgColor,
        borderRadius: "8px",
        p: "16px",
        mb: 4,
      }}
      spacing={1}
    >
      <Grid item xs={6} sm={4} md={2}>
        <Typography sx={filterTitleSx}>Loại phim:</Typography>
        <FilterMenu />
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Typography sx={filterTitleSx}>Thể loại:</Typography>
        <FilterMenu />
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Typography sx={filterTitleSx}>Quốc gia:</Typography>
        <FilterMenu />
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Typography sx={filterTitleSx}>Năm:</Typography>
        <FilterMenu />
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Typography sx={filterTitleSx}>Thời lượng:</Typography>
        <FilterMenu />
      </Grid>
      <Grid item xs={6} sm={4} md={2}>
        <Typography sx={filterTitleSx}>Sắp xếp:</Typography>
        <FilterMenu />
      </Grid>
    </Grid>
  );
};

export default FilterFilm;
