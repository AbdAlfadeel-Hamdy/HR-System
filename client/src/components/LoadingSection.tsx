import React from "react";
import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

const LoadingSection: React.FC = () => {
  return (
    <section className="grid place-content-center h-screen">
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    </section>
  );
};

export default LoadingSection;
