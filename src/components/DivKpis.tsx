import { Box } from "@mui/material";
import { ReactElement } from "react"; 
import React from 'react'

// Definindo a interface para as props
interface CaixaDeKpis {
  children: ReactElement;  // Tipando o children como ReactElement
}

const DivKpis: React.FC<CaixaDeKpis> = ({ children }) => { // Tipando o componente com a interface
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
      {children} {/* O conteúdo do children será renderizado aqui */}
    </Box>
  );
}

export default DivKpis;
