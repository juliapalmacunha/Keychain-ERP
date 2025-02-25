import React, { useState } from "react";
import { Box, TextField, Button, MenuItem } from "@mui/material";
import iconeAnimado from "/imagens/assistencia-social.gif";
import useHookCrud from "../../hooks/HookCrud";
import Rodape from "../../components/Rodape";

const CadastroProduto = () => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  const { adicionarCliente } = useHookCrud();

  const adicionandoCliente = (evento) => {
    evento.preventDefault();

    if (!nome || !telefone || !cidade || !estado) {
      alert("Todos os campos são obrigatórios!");
      return;
    }

    adicionarCliente({ nome, telefone, cidade, estado });

    setNome("");
    setTelefone("");
    setCidade("");
    setEstado("");
  };

  const estadosNordeste = [
    { nome: "Alagoas", sigla: "AL" },
    { nome: "Bahia", sigla: "BA" },
    { nome: "Ceará", sigla: "CE" },
    { nome: "Maranhão", sigla: "MA" },
    { nome: "Paraíba", sigla: "PB" },
    { nome: "Pernambuco", sigla: "PE" },
    { nome: "Piauí", sigla: "PI" },
    { nome: "Rio Grande do Norte", sigla: "RN" },
    { nome: "Sergipe", sigla: "SE" },
  ];

  const cidadesNordeste = [
    { nome: "Natal" },
    { nome: "Fortaleza" },
    { nome: "Pipa" },
    { nome: "João Pessoa" },
    { nome: "Recife" },
    { nome: "Porto de Galinhas" },
    { nome: "São Miguel do Gostoso" },
  ];

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        bgcolor="#f4f7fc"
        p={3}
        id="ACHOU"
      >
        <Box
          component="form"
          width="100%"
          maxWidth="600px"
          p={4}
          bgcolor="white"
          boxShadow={3}
          borderRadius={6}
          display="flex"
          flexDirection="column"
          gap={3}
          onSubmit={adicionandoCliente}
        >
          <TextField
            label="Nome"
            variant="outlined"
            fullWidth
            size="small"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <TextField
            label="Telefone"
            variant="outlined"
            fullWidth
            size="small"
            required
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
          />

          <TextField
            label="Cidade"
            variant="outlined"
            fullWidth
            size="small"
            required
            value={cidade}
            onChange={(e) => setCidade(e.target.value)}
            select
          >
            {cidadesNordeste.map((cidade) => (
              <MenuItem key={cidade.nome} value={cidade.nome}>
                {cidade.nome}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Estado"
            variant="outlined"
            fullWidth
            size="small"
            required
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            select
          >
            {estadosNordeste.map((estado) => (
              <MenuItem key={estado.sigla} value={estado.sigla}>
                {estado.nome}
              </MenuItem>
            ))}
          </TextField>

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#3f51b5",
              '&:hover': { backgroundColor: "#2c387e" },
              mt: 2,
              fontFamily: "Roboto, sans-serif",
              textDecoration: "none"
            }}
            type="submit"
            disabled={!nome || !telefone || !cidade || !estado}
          >
            Enviar
          </Button>

          <figure style={{ marginTop: "30px", textAlign: "center" }}>
            <img
              style={{ width: "80px", height: "80px" }}
              src={iconeAnimado}
              alt="Ícone animado"
            />
          </figure>
        </Box>


      </Box>

      <Rodape>
        <p>Fale conosco | Termos de uso | Segurança e privacidade</p>
      </Rodape>

      
    </>
  );
};

export default CadastroProduto;
