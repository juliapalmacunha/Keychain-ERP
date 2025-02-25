import React, { useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { Button, Menu, MenuItem } from "@mui/material";
import { Select, FormControl, InputLabel } from "@mui/material";

const PageTeste = () => {

  useEffect(() => {
    
    const ctx = document.getElementById("myChart").getContext("2d");

    // Armazene o gráfico em uma variável
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 205, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y", // Isso transforma o gráfico em barras horizontais
        scales: {
          x: {
            beginAtZero: true,
          },
        },
      },
    });

    // Função de limpeza para destruir o gráfico
    return () => {
      myChart.destroy();
    };
  }, []);





  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("Todos"); // Opção inicial

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Abre o menu ao clicar
  };

  const handleClose = (filter) => {
    if (filter) {
      setSelectedFilter(filter); // Atualiza a opção selecionada
    }
    setAnchorEl(null); // Fecha o menu
  };


  

  const [filtro, setFiltro] = useState("");





  return (
    <>
    <div style={{width: "700px", height: "400px"}}>
      <h2>Horizontal Bar Chart</h2>
      <canvas id="myChart" width="400" height="200"></canvas>
    </div>

    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px" }}>
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{
          backgroundColor: "#37474F", // Cinza escuro
          color: "#ECEFF1", // Azul acinzentado claro
          borderRadius: "8px", // Bordas arredondadas
          padding: "8px 20px",
          fontWeight: "bold",
          textTransform: "none", // Remove letras maiúsculas automáticas
          "&:hover": {
            backgroundColor: "#263238", // Azul escuro mais fechado
          },
        }}
      >
        Filtrar: {selectedFilter}
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose(null)}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "#455A64", // Cinza azulado
            color: "#ECEFF1", // Texto claro
            borderRadius: "8px",
          },
        }}
      >
        <MenuItem sx={{ "&:hover": { backgroundColor: "#37474F" } }} onClick={() => handleClose("Todos")}>Todos</MenuItem>
        <MenuItem sx={{ "&:hover": { backgroundColor: "#37474F" } }} onClick={() => handleClose("Aprovados")}>Aprovados</MenuItem>
        <MenuItem sx={{ "&:hover": { backgroundColor: "#37474F" } }} onClick={() => handleClose("Pendentes")}>Pendentes</MenuItem>
        <MenuItem sx={{ "&:hover": { backgroundColor: "#37474F" } }} onClick={() => handleClose("Rejeitados")}>Rejeitados</MenuItem>
      </Menu>




    </div>


    <FormControl fullWidth variant="outlined">
      <InputLabel>Filtrar por</InputLabel>
      <Select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        label="Filtrar por"
      >
        <MenuItem value="todos">Todos</MenuItem>
        <MenuItem value="aprovados">Aprovados</MenuItem>
        <MenuItem value="pendentes">Pendentes</MenuItem>
        <MenuItem value="rejeitados">Rejeitados</MenuItem>
      </Select>
    </FormControl>

    </>
  );
};

export default PageTeste;
