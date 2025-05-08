import React, { useContext, useState } from "react";
import { Box, TextField, Button, MenuItem, Paper, List, ListItem, ListItemText, Typography, InputLabel } from "@mui/material";
import useHookCrud from "../../hooks/HookCrud";
import { ClientesContext } from "../../contextos/ClientesContext";


const Pedidos = () => {

  const { buscarClientePorNome, enviarPedidoCliente, buscarProdutoNoEstoquePorNome } = useHookCrud();
  const { pesquisaFiltrada, setPesquisaFiltrada, pesquisaFiltradaProduto, setPesquisaFiltradaProduto } = useContext(ClientesContext)

  const [pesquisaCliente, setPesquisaCliente] = useState("");
  const [pesquisaProduto, setPesquisaProduto] = useState("")
  const [quantidade, setQuantidade] = useState("");
  const [idCliente, setIdCliente] = useState("");



  const buscandoClientePorNome = (e) => {
    setPesquisaCliente(e.target.value);
    buscarClientePorNome(e.target.value);
  };


  const buscandoProdutoPorNome = (e) => {
    setPesquisaProduto(e.target.value)
    buscarProdutoNoEstoquePorNome(e.target.value);
  }

  const preenchendoInputNome = (nomeCliente, idCliente) => {
    setIdCliente(idCliente);
    setPesquisaCliente(nomeCliente);
    setPesquisaFiltrada([]);
  };


  const preenchendoInputProduto = (nomeProduto) => {
    setPesquisaProduto(nomeProduto)
    setPesquisaFiltradaProduto([])
  }




  const enviandoPedidoCliente = (evento) => {
    evento.preventDefault();
    enviarPedidoCliente(pesquisaProduto, quantidade, idCliente);


    setPesquisaCliente("");
    setPesquisaProduto("");
    setQuantidade("");
    setIdCliente("");
  };


  const testando = (e) => {
    console.log(e)
  }



  return (

    <>




      <Box sx={{
        width: 480,
        height: 400,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        p: 4,
        alignItems: "center",
        mx: "auto",
        mt: 5,
        borderRadius: "10px",
        bgcolor: "#ffffff",
        marginTop: 18,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      }}
        component="form"
        onSubmit={enviandoPedidoCliente}>

        <Typography
          sx={{
            color: "#2d2d2f",
            fontFamily: "Poppins semibold",
            textAlign: "center",
            fontSize: 24,
            marginBottom: 3
          }}
        >
          Cadastre um Novo {" "}
          <span style={{ color: "#3441b1" }}>Pedido</span> no Sistema:
        </Typography>

        <InputLabel
          htmlFor="cliente-input"
          sx={{
            color: "black",
            mb: "8px",
            fontFamily: "Poppins regular",
            fontSize: 16,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%"
          }}
        >
          Cliente:
        </InputLabel>
        <Box sx={{ width: "100%", position: "relative", mb: "25px" }}>
          <TextField
            id="cliente-input"
            fullWidth
            size="small"
            value={pesquisaCliente}
            onBlur={() => setPesquisaFiltrada([])}
            onFocus={() => {
              if (pesquisaFiltrada.trim() !== "") {
                buscandoClientePorNome({ target: { value: pesquisaCliente } });
              }
            }}
            autoComplete="off"
            slotProps={{
              inputLabel: { shrink: false }
            }}
            onChange={buscandoClientePorNome}
            placeholder="Cliente"
            autoComplete="off"
            slotProps={{
              inputLabel: { shrink: false }
            }}
            sx={{
              "& .MuiInputLabel-root": {
                color: "black",
                fontFamily: "Poppins regular"
              },
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
                "& fieldset": {
                  borderRadius: 2,
                  borderWidth: "1.5px",
                  borderColor: "#b7b4b4",
                },
              }
            }}
          />
          {pesquisaFiltrada.length > 0 && (
            <Paper sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 10,
              maxHeight: 150,
              overflowY: "auto",
              borderRadius: 2,
              mt: "4px"
            }}>
              <List>
                {pesquisaFiltrada.map((item) => (
                  <ListItem
                    key={item.id}
                    onMouseDown={() => preenchendoInputNome(item.nome)}
                    onClick={() => preenchendoInputNome(item.nome, item.id)}
                    sx={{ cursor: "pointer" }}
                  >
                    <ListItemText primary={item.nome} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>


        <InputLabel
          htmlFor="produto-input"
          sx={{
            color: "black",
            mb: "8px",
            fontFamily: "Poppins regular",
            fontSize: 16,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "100%"
          }}
        >
          Produto:
        </InputLabel>

        <Box sx={{ width: "100%", position: "relative", mb: "25px" }}>
          <TextField
            id="produto-input"
            fullWidth
            size="small"
            value={pesquisaProduto}
            onChange={buscandoProdutoPorNome}
            placeholder="Produto"
            onBlur={() => setPesquisaFiltradaProduto([])}
            onFocus={() => {
              if (pesquisaProduto.trim() !== "") {
                buscandoProdutoPorNome({ target: { value: pesquisaProduto } });
              }
            }}
            autoComplete="off"
            slotProps={{
              inputLabel: { shrink: false }
            }}
            sx={{
              "& .MuiInputLabel-root": {
                color: "black",
                fontFamily: "Poppins regular"
              },
              "& .MuiOutlinedInput-root": {
                bgcolor: "white",
                "& fieldset": {
                  borderRadius: 2,
                  borderWidth: "1.5px",
                  borderColor: "#b7b4b4",
                },
              }
            }}
          />
          {pesquisaFiltradaProduto.length > 0 && (
            <Paper sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              zIndex: 10,
              maxHeight: 150,
              overflowY: "auto",
              borderRadius: 2,
              mt: "4px"
            }}>
              <List>
                {pesquisaFiltradaProduto.map((item) => (
                  <ListItem
                    key={item.id}
                    onMouseDown={() => preenchendoInputProduto(item.produto)}
                    onClick={() => preenchendoInputProduto(item.produto)}
                    sx={{ cursor: "pointer" }}
                  >
                    <ListItemText primary={item.produto} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>



        <InputLabel htmlFor="quantidade-input" sx={{ color: "black", mb: "8px", fontFamily: "Poppins regular", fontSize: 16, display: "flex", justifyContent: "flex-start", alignItems: "flex-start", width: "100%" }}>
          Quantidade:
        </InputLabel>
        <TextField
          id="quantidade-input"
          type="number"
          fullWidth
          size="small"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          placeholder="Quantidade"
          sx={{
            mb: "25px",
            "& .MuiOutlinedInput-root": {
              bgcolor: "white",
              "& fieldset": {
                borderRadius: 2,
                borderWidth: "1,5px",
                borderColor: "#b7b4b4",
              },
            }
          }}
        />

        <Button
          variant="contained"
          type="submit"
          sx={{
            mt: 3,
            '&.Mui-disabled': {
              bgcolor: "#3441b1",
              color: "#ffffff",
              fontFamily: "Poppins semibold",
              fontSize: 16,
              pointerEvents: "auto",
              '&:hover': { bgcolor: '#2b305c' },
              width: "80%",
              borderRadius: "8px"
            }
          }}
          disabled={!pesquisaCliente || !pesquisaProduto || !quantidade}>
          Enviar
        </Button>
      </Box>






    </>

  );
};

export default Pedidos;
