import { useContext, useState } from "react";
import { ClientesContext } from "../contextos/ClientesContext";
import { getDocs, collection, doc, updateDoc, addDoc, deleteDoc, query, where, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase/firebaseConfig"; // ajuste o caminho do Firebase conforme necessário

// Hook personalizado com funcionalidades CRUD
export default function useHookCrud() {



    const { clientes, setClientes, pesquisaFiltrada, setPesquisaFiltrada, pedidosDoCliente, setPedidosDoCliente } = useContext(ClientesContext);



    //BUSCAR CLIENTE VIA FIRESTORE
    const buscarClientes = async () => {
        try {
            const buscandoDados = await getDocs(collection(db, "clientes"));
            const dadosCliente = buscandoDados.docs.map((cliente) => ({
                id: cliente.id,
                ...cliente.data(),
            }));

            setClientes(dadosCliente);
            

        } catch (error) {
            console.error("Erro ao buscar os dados:", error);
        }
    };




    //EDITAR CLIENTE VIA FIRESTORE
    const editarCliente = async (nome, telefone, cidade, estado, id) => {

        try {
            const IdCliente = doc(db, "clientes", id);
            const novosDados = {
                nome,
                telefone,
                cidade,
                estado,
            };

            await updateDoc(IdCliente, novosDados);

            alert("Cliente atualizado com sucesso!");
            buscarClientes();

        } catch {
            console.error("Erro ao atualizar cliente");
            alert("Erro ao atualizar cliente");
        }
    };



    //ADICIONAR CLIENTE VIA FIRESTORE
    const adicionarCliente = async ({ nome, telefone, cidade, estado }) => {

        console.log(nome, telefone, cidade, estado)

        try {
            await addDoc(collection(db, "clientes"), {
                nome,
                telefone,
                cidade,
                estado,
            });

            alert("Cliente cadastrado com sucesso!");

        } catch (e) {
            console.error("Erro ao enviar dados", e.message);
            alert(`Erro ao cadastrar cliente: ${e.message}`);
        }
    };




    //DELETAR CLIENTE
    const deletarCliente = async (id) => {

        try {
            // Referência ao cliente
            const clienteRef = doc(db, "clientes", id);

            const pedidosRef = collection(clienteRef, "pedidos");
            const pedidosSnapshot = await getDocs(pedidosRef);

            for (const pedidoDoc of pedidosSnapshot.docs) {
                await deleteDoc(doc(pedidosRef, pedidoDoc.id))
            }

            await deleteDoc(clienteRef);

            buscarClientes();

            alert("Cliente e seus pedidos foram deletados com sucesso!");

        } catch (error) {
            console.error("Erro ao deletar cliente:", error);
            alert("Erro ao deletar cliente!");
        }
    };


    //DELETAR PEDIDO ESPECIFICO DO CLIENTE
    const deletarPedido = async(idDoCliente, idDoPedido) => {


        try {

            const clienteRef = doc(db, "clientes", idDoCliente);

            const pedidosRef = doc(clienteRef, "pedidos", idDoPedido);

            await deleteDoc(pedidosRef);
            console.log("Pedido deletado com sucesso")
        }catch (error) {
            console.error("Erro ao deletar pedido:", error)
        }




    }




    //FORMATANDO PALAVRA
    const capitalizarPrimeiraLetra = (texto) => {
        if (!texto) return ""; // Verifica se o texto é vazio
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
    };



    //PROCURANDO O CLIENTE COM BASE NO NOME
    const buscarClientePorNome = async (pesquisa) => {

        try {

            if (!pesquisa.trim()) {
                setPesquisaFiltrada([]);
                return;
            }

            const pesquisaFormatada = capitalizarPrimeiraLetra(pesquisa.trim());

            const q = query(
                collection(db, "clientes"),
                where("nome", ">=", pesquisaFormatada),
                where("nome", "<=", pesquisaFormatada + "\uf8ff")
            );

            const resultado = await getDocs(q)
            const filtrandoPesquisa = resultado.docs.map((cliente) => ({
                id: cliente.id,
                ...cliente.data(),
            }))

            setPesquisaFiltrada(filtrandoPesquisa)

        } catch (error) {
            console.error("Erro ao buscar clientes por nome:", error);
            setPesquisaFiltrada([])

        }

    }






    //ENVIANDO PEDIDO PARA UMA SUBCOLEÇÃO CRIADA DE ACORDO COM O CLIENTE
    const enviarPedidoCliente = async (produto, quantidade, id) => {

        try {
            
            const clienteRef = doc(db, 'clientes', id);
            const clienteDoc = await getDoc(clienteRef);

            if (!clienteDoc.exists()) {
                alert('Cliente não encontrado');
                return;
            }

            
            const pedidosRef = collection(clienteRef, 'pedidos');
            const precoUnitario = 1.50;

           
            const pedido = {
                produto,
                quantidade,
                data: new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-'),
                preco: (quantidade * precoUnitario).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }) 
            };

        
            await addDoc(pedidosRef, pedido);
            alert('Pedido cadastrado');

        } catch (error) {
            console.error('Erro ao cadastrar o pedido: ', error);
            alert('Erro ao cadastrar o pedido');
        }
    };



    ///BUSCANDO OS PEDIDOS DO CLIENTE
    const acessarPedidosCliente = async (id) => {
        try {
            
            const clienteRef = doc(db, "clientes", id);
            
           
            const pedidosRef = collection(clienteRef, "pedidos");
            
          
            const pedidosSnapshot = await getDocs(pedidosRef);
    
           
            const pedidos = pedidosSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setPedidosDoCliente(pedidos)
            
            return pedidos;
        } catch (error) {
            console.error("Erro ao acessar pedidos do cliente:", error);
        }
    };



    
    




    return {
        buscarClientes,
        adicionarCliente,
        editarCliente,
        deletarCliente,
        deletarPedido,
        buscarClientePorNome,
        enviarPedidoCliente,
        acessarPedidosCliente,
        pesquisaFiltrada,
        setPesquisaFiltrada,
        clientes,
        setClientes,
    };
}
