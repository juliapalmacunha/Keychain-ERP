import { createContext, useState } from "react";


//criando um contexto para que eu possa compartilhar meu armazenamento de clientes
export const ClientesContext = createContext()
ClientesContext.displayName = "Contexto Clientes";


export default function ClientesProvider({ children }) {

    const [clientes, setClientes] = useState([])

    const [pesquisaFiltrada, setPesquisaFiltrada] = useState([])

    const [pedidosDoCliente, setPedidosDoCliente] = useState([])

    const [faturamento, setFaturamento] = useState()
    

    return (


        <ClientesContext.Provider value={{ clientes, setClientes, pesquisaFiltrada, setPesquisaFiltrada, pedidosDoCliente, setPedidosDoCliente, faturamento, setFaturamento}} >
            {children}
        </ClientesContext.Provider>



    )


}