import { Box, IconButton, Tooltip } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [scrollPosition, setPosition] = useState(0);

  useEffect(() => {
    function updatePosition() {
      setPosition(window.pageYOffset);
    }
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <Box
      sx={{
        transform: scrollPosition > 90 ? "none" : "scale(0)",
        transition:
          scrollPosition > 90
            ? "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms"
            : "transform 195ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        visibility: scrollPosition > 90 ? "visible" : "hidden",

        position: "fixed",
        bottom: 92,

        right: 38,
        zIndex: 10,
      }}
      onClick={() => window.scrollTo(0, 0)}
    >
      <Tooltip title="Scroll to top" placement="top">
        <IconButton
          aria-label="scroll-to-top"
          sx={{
            color: "rgba(0, 0, 0, 0.87)",
            backgroundColor: (theme) => theme.default.purple,
            boxShadow: "rgb(0 0 0 / 50%) 0px 4px 20px",
            zIndex: 1050,
            transition:
              "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            "&:hover": {
              backgroundColor: (theme) => theme.default.lightPurple,
            },
            "& svg > path": {
              color: (theme) => theme.default.bgColor,
            },
          }}
        >
          <KeyboardArrowUpIcon color="white" />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default ScrollToTop;
