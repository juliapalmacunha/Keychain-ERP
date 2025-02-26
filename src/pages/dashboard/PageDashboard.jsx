import React, { useState, useEffect, useContext, useRef } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Box,
  Card,
  Button,
  Typography,
  Grid,
  Grid2,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { Chart } from "chart.js/auto";
import { ClientesContext } from "../../contextos/ClientesContext";
import useHookCrud from "../../hooks/HookCrud";
import { Link } from "react-router-dom";
import DivKpis from "../../components/DivKpis";
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import RedeemIcon from '@mui/icons-material/Redeem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Filler, Title, Tooltip, Legend);

const Dashboard = () => {


  const { buscarClientes, acessarPedidosCliente } = useHookCrud();
  const { clientes, faturamento, setFaturamento } = useContext(ClientesContext);

  const [clienteDaVez, setClienteDaVez] = useState("");
  const [idDaVez, setIdDaVez] = useState("");
  const [filtro, setFiltro] = useState("quantidade");

  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);


  const [meses, setMeses] = useState([
    { nome: "Janeiro", valor: 0 },
    { nome: "Fevereiro", valor: 0 },
    { nome: "Março", valor: 0 },
    { nome: "Abril", valor: 0 },
    { nome: "Maio", valor: 0 },
    { nome: "Junho", valor: 0 },
    { nome: "Julho", valor: 0 },
    { nome: "Agosto", valor: 0 },
    { nome: "Setembro", valor: 0 },
    { nome: "Outubro", valor: 0 },
    { nome: "Novembro", valor: 0 },
    { nome: "Dezembro", valor: 0 }
  ]);


  const [cidades, setCidades] = useState([
    { id: 0, nome: "Natal", valor: 0 },
    { id: 1, nome: "Fortaleza", valor: 0 },
    { id: 2, nome: "Pipa", valor: 0 },
    { id: 3, nome: "João Pessoa", valor: 0 },
    { id: 4, nome: "Recife", valor: 0 },
    { id: 5, nome: "Porto de Galinhas", valor: 0 },
    { id: 6, nome: "São Miguel", valor: 0 }
  ]);


  const indicadores = [
    { nome: "Vendas Totais", valor: 0, icone: ShoppingCartIcon },
    { nome: "Item mais vendido", valor: 0, icone: RedeemIcon },
    { nome: "Estoque Total", valor: 0, icone: InventoryIcon },
    { nome: "Faturamento", valor: faturamento, icone: MonetizationOnIcon }
  ]



  //CONFIGURAÇÕES GRAFICO BARRA
  const [chartDataBarra, setChartDataBarra] = useState({
    labels: [],
    datasets: [{ label: "", data: [], backgroundColor: "#4ee2b5" }],
  });

  const optionsBarras = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#fff" } },
    },
    scales: {
      x: { ticks: { color: "#fff" } },
      y: { ticks: { color: "#fff" } },
    },
  };

  const [lineChartData, setLineChartData] = useState({
    labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    datasets: [
      {
        label: "Vendas por Mês",
        data: [],
        borderColor: "#4ee2b5",
        backgroundColor: "rgba(78, 226, 181, 0.2)",
        tension: 0.4,
        fill: true,
        pointBackgroundColor: "#4ee2b5",
      },
    ],
  });


  //CONFIGURAÇÕES GRAFICO LINHA
  const optionsLine = {
    responsive: true,
    plugins: {
      legend: { position: "top", labels: { color: "#fff" } },
      title: { display: true, text: "Vendas ao Longo do Tempo", color: "#fff" },
    },
    scales: {
      x: { ticks: { color: "#fff" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
      y: { ticks: { color: "#fff" }, grid: { color: "rgba(255, 255, 255, 0.1)" } },
    },
  };


  const handleChange = (event) => {
    setFiltro(event.target.value);
  };

  const buscarClientesHandler = (id, nome) => {
    setClienteDaVez(nome);
    setIdDaVez(id);
  };


  useEffect(() => {
    buscarClientes();
    console.log("BUSCANDO CLIENTES...");

  }, []);


  //MUDA DE ACORDO COM A QUANTIDADE DE CLIENTES, POIS ASSIM QUE A PAGINA CARREGA, O BUSCAR CLIENTES ACONTECE ASSIM MUDANDO O VALOR DE CLIENTES E OBRIGANDO O CARREGAMENTO DO GRAFICO COM OS NOVOS DADOS DE CLIENTES
  useEffect(() => {
    atualizarGraficoBarraLateral()
    atualizarGraficoLine()

  }, [clientes])


  useEffect(() => {
    atualizarGrafico()
  }, [clientes, filtro])




  //ATUALIZANDO GRAFICO BARRA
  const atualizarGrafico = async () => {
    const novoDadosGrafico = await Promise.all(
      clientes.map(async (cliente) => {
        const pedidosDoCliente = await acessarPedidosCliente(cliente.id);
        return pedidosDoCliente.reduce((acumulador, pedido) => {
          if (filtro === "quantidade") return acumulador + Number(pedido.quantidade);
          if (filtro === "preco") {
            const precoNumerico = parseFloat(pedido.preco.replace(/[R$\s.]/g, "").replace(",", "."));
            return acumulador + precoNumerico;
          }
          return 0;
        }, 0);
      })
    );

    {
      if (filtro === "preco") {
        const somaPrecos = novoDadosGrafico.reduce((acumulador, precoAtual) => {
          return acumulador + precoAtual;
        }, 0);
        setFaturamento(somaPrecos)
      }
    }
    setChartDataBarra({
      labels: clientes.map((cliente) => cliente.nome),
      datasets: [{ label: filtro , data: novoDadosGrafico, backgroundColor: "#4ee2b5" }],
    });
  };




  //ATUALIZANDO GRAFICO LINHA
  const atualizarGraficoLine = async () => {
    const mesesAtualizados = meses.map(mes => ({ ...mes, valor: 0 }));

    const novoDadosGrafico = await Promise.all(
      clientes.map(async (cliente) => {
        const pedidosDoCliente = await acessarPedidosCliente(cliente.id);

        pedidosDoCliente.forEach((pedido) => {
          const data = new Date(pedido.data);
          const numeroMes = data.getMonth();

          if (numeroMes >= 0 && numeroMes < 12) {
            mesesAtualizados[numeroMes].valor++;
          }
        });

        return { nome: cliente.nome };
      })
    );

    setMeses(mesesAtualizados);
    setLineChartData({
      labels: mesesAtualizados.map((mes) => mes.nome),
      datasets: [
        {
          label: "Vendas por Mês",
          data: mesesAtualizados.map((mes) => mes.valor),
          borderColor: "#4ee2b5",
          backgroundColor: "rgba(78, 226, 181, 0.2)",
          tension: 0.4,
          fill: true,
          pointBackgroundColor: "#4ee2b5",
        },
      ],
    });
  };



  //ATUALIZANDO GRAFICO BARRA LATERAL
  const atualizarGraficoBarraLateral = async () => {

    const cidadesAtualizadas = cidades.map(cidade => ({ ...cidade, valor: 0 }));

    await Promise.all(
      clientes.map(async (cliente) => {
        const cidadeDoCliente = cliente.cidade
        const pedidosDoCliente = await acessarPedidosCliente(cliente.id);
        const quantidadePedidosDoCliente = pedidosDoCliente.length
        const cidadeEncontrada = cidadesAtualizadas.find(linhaDoArray => linhaDoArray.nome === cidadeDoCliente)

        if (cidadeEncontrada) {
          cidadeEncontrada.valor += quantidadePedidosDoCliente
        }
      })
    );
    setCidades(cidadesAtualizadas)
  };



  useEffect(() => {

    const ctx = document.getElementById("myChart").getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Natal", "Fortaleza", "Pipa", "João Pessoa", "Recife", "Porto de Galinhas", "São Miguel"],
        datasets: [
          {
            label: "Votes",
            data: cidades.map((cidade) => cidade.valor),
            backgroundColor: [
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
            ],
            borderColor: [
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
              "rgba(161, 120, 241, 1)",
            ],

            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        scales: {
          x: {
            beginAtZero: true,
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "rgba(255, 255, 255, 0.8)",
            },
          },
        },
        backgroundColor: "rgba(28, 28, 28, 1)",
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [cidades]);




  return (

    <Box style={{ backgroundColor: "#121b2a", padding: "40px", paddingTop: "90px" }}>

      <Box sx={{ width: "100%", height: "100px", marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>

        {indicadores.map((indicador) => {
          const IconComponent = indicador.icone
          return <DivKpis key={indicador.nome}>
            <Box sx={{ margin: "5px 5px 5px 20px" }}>
              <p> {indicador.nome} </p>
              <p>R${indicador.valor}</p>
            </Box>
            <Box sx={{ margin: "18px 18px 6px 6px" }}>
              <IconComponent />
            </Box>
          </DivKpis>
        })}

      </Box>




      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#424242", boxShadow: 3, padding: "20px" }}>
            <Line key={JSON.stringify(lineChartData)} ref={lineChartRef} data={lineChartData} options={optionsLine} />
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#424242", boxShadow: 3, padding: "20px" }}>

            <Box sx={{ width: "100%", height: "50px", display: "flex", alignItems: "center", fontFamily: "Gilroy semibold", color: "white" }}>

              <span>Faça a análise do Ranking de Vendas por:</span>

              <FormControl variant="outlined" sx={{ height: '30px', padding: '0', margin: '0 0 0 18px', width: "130px" }}>
                <Select
                  value={filtro}
                  onChange={handleChange}
                  label=""
                  aria-label="Filtrar por"
                  sx={{
                    height: '30px',
                    padding: '0',
                    margin: '0',
                    fontSize: '14px',
                    color: "white"
                  }}
                >
                  <MenuItem value="preco">preço</MenuItem>
                  <MenuItem value="quantidade">quantidade</MenuItem>
                </Select>
              </FormControl>




            </Box>


            <Bar key={JSON.stringify(chartDataBarra)} ref={barChartRef} data={chartDataBarra} options={optionsBarras} />




          </Card>
        </Grid>

        <Grid2 sx={{ display: "flex", margin: "25px" }}>

          <Card style={{ backgroundColor: "#424242", width: "500px", height: "300px" }}>
            <canvas id="myChart" width="400" height="200"></canvas>
          </Card>

          <Card style={{  backgroundColor: "#03091288", width: "200px", height: "300px", marginLeft: "8px" }}>

          </Card>
        </Grid2>

      </Grid>





      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "30px" }}>
        <Typography variant="h6" color="white" sx={{ marginBottom: "20px" }}>
          Visualizar todos os pedidos de {clienteDaVez}
        </Typography>
        <Button variant="contained" color="primary" sx={{ marginBottom: "10px" }}>
          Visualizar
        </Button>
        <Button variant="contained" color="secondary" onClick={atualizarGraficoLine} sx={{ marginBottom: "10px" }}>
          Filtrar por Data
        </Button>
        <Button variant="contained" color="secondary" sx={{ marginBottom: "10px" }} onClick={atualizarGraficoBarraLateral}>
          Filtrar por Região
        </Button>
      </Box>





    </Box>
  );
};

export default Dashboard;
