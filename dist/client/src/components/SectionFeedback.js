import React from "react";
import Box from "@mui/material/Box";
const SectionFeedback = ({ children }) => {
    return (<section className="grid place-content-center h-screen">
      <Box sx={{ display: "flex" }}>{children}</Box>
    </section>);
};
export default SectionFeedback;
