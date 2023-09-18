import React, { ReactNode } from "react";
import Box from "@mui/material/Box";

interface SectionFeedbackProps {
  children: ReactNode;
}

const SectionFeedback: React.FC<SectionFeedbackProps> = ({ children }) => {
  return (
    <section className="grid place-content-center h-screen">
      <Box sx={{ display: "flex" }}>{children}</Box>
    </section>
  );
};

export default SectionFeedback;
