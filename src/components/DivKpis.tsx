import { Box } from "@mui/material";
import { ReactElement } from "react"; 
import React from 'react'

interface CaixaDeKpis {
  children: ReactElement;  

const DivKpis: React.FC<CaixaDeKpis> = ({ children }) => { 
  return (
    <Box
      sx={{
        backgroundColor: "#03091288",
        width: "300px", 
        height: "100px", 
        color: "white",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      {children} 
  );
}

export default DivKpis;
