import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import Clientes from './pages/cliente/PageClientes.jsx'
import Dashboard from './pages/dashboard/PageDashboard.jsx'
import Pedidos from './pages/pedidos/PageCadastroPedidos.jsx'
import CadastroProduto from "./pages/cadastro/PageCadastro.jsx"
import ClientesProvider from './contextos/ClientesContext.jsx'
import Testes from './pages/testes/PageTeste.jsx'
import PedidoClienteIndividual from './pages/pedidoCliente/PagePedidoDoCliente.jsx'
import CadastroEstoque from './pages/cadastroEstoque/PageEstoqueCadastro.jsx'



const router = createBrowserRouter(
  
  [

  {path: '/', element: <Dashboard/>, children: 
    [
      {path: 'cadastro',element:  <CadastroProduto/> },
      {path: 'clientes',element: <Clientes/>},
      {path: 'dashboard',element: <Dashboard/>},
      {path: 'pedidos',element: <Pedidos/>},
      {path: 'testes',element: <Testes/>},
      {path: 'pedidoDoCliente/:id/:nome',element: <PedidoClienteIndividual/>},
      {path: 'estoque',element: <CadastroEstoque/>},


    ]
  }

]
)

createRoot(document.getElementById('root')).render(


  <StrictMode>
    <ClientesProvider>
    <RouterProvider router={router}/>
    </ClientesProvider>
  </StrictMode>,

);
