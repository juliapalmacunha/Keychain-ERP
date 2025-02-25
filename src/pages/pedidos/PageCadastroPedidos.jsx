import React, { useContext, useState } from "react";
import { Box, TextField, Button, MenuItem, Paper, List, ListItem, ListItemText, Grid, Typography } from "@mui/material";
import useHookCrud from "../../hooks/HookCrud";


const Pedidos = () => {

  const { buscarClientePorNome, enviarPedidoCliente, acessarPedidosCliente, pesquisaFiltrada, setPesquisaFiltrada } = useHookCrud();

  const [pesquisaCliente, setPesquisaCliente] = useState("");
  const [produto, setProduto] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [idCliente, setIdCliente] = useState("");

  const TiposDeProdutos = [
    { nome: "Chaveiros Times", id: 1 },
    { nome: "Chaveiros Letras", id: 2 },
    { nome: "Abridores", id: 3 },
  ];

  const buscandoClientePorNome = (e) => {
    setPesquisaCliente(e.target.value);
    buscarClientePorNome(e.target.value);
  };

  const preenchendoInput = (nomeCliente, idCliente) => {
    setIdCliente(idCliente);
    setPesquisaCliente(nomeCliente);
    setPesquisaFiltrada([]);
  };


  const enviandoPedidoCliente = (evento) => {
    evento.preventDefault();
    enviarPedidoCliente(produto, quantidade, idCliente);
    acessarPedidosCliente(idCliente);

    setPesquisaCliente("");
    setProduto("");
    setQuantidade("");
    setIdCliente("");
  };

  

  return (

    <>

    <Box sx={{ width: 350, mx: "auto", mt: 5, p: 3, borderRadius: 4, boxShadow: 3, bgcolor: "#f5f5f5", marginTop: "250px" }} component="form" onSubmit={enviandoPedidoCliente}>

    <Typography sx={{
          color: "black",
          fontFamily: "Gilroy semibold",
          marginBottom: "16px"
        }}>Cadastre o pedido aqui:</Typography>


      <TextField label="Pesquisar Cliente" fullWidth size="small" value={pesquisaCliente} onChange={buscandoClientePorNome} placeholder="Nome do cliente..." autoComplete="off" />
      {pesquisaFiltrada.length > 0 && (
        <Paper sx={{ mt: 1, maxHeight: 150, overflowY: "auto", borderRadius: 2 }}>
          <List>
            {pesquisaFiltrada.map(({ id, nome }) => (
              <ListItem key={id} onClick={() => preenchendoInput(nome, id)}>
                <ListItemText primary={nome} />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      <TextField label="Produto" fullWidth size="small" select value={produto} onChange={(e) => setProduto(e.target.value)} sx={{ mt: 2 }} required>
        {TiposDeProdutos.map(({ id, nome }) => (
          <MenuItem key={id} value={nome}>{nome}</MenuItem>
        ))}
      </TextField>

      <TextField label="Quantidade" type="number" fullWidth size="small" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} sx={{ mt: 2 }} placeholder="Quantidade" />
      <Button variant="contained" type="submit" sx={{ mt: 3, bgcolor: "#043b71", ':hover': { bgcolor: '#03254c' } }} disabled={!pesquisaCliente || !produto || !quantidade}>
        Enviar
      </Button>

    </Box>


  


    <Grid sx={{backGroundColor: "pink"}}>

    </Grid>

    </>

  );
};

export default Pedidos;
