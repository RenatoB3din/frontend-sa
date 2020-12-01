import React, {useState, useEffect} from 'react'; 
import api from '../../services/api';
import { Link,useHistory } from 'react-router-dom';
import { BsClipboardData } from 'react-icons/bs'

// import produtos from '../../data/produtos';

import Card from '../../components/Layout/Card'
import './styles.css';
import Menu from '../../components/Header/Menu';
import logo from '../../components/Header/logo.png';

export default function Relatorio() {
    const [produtos, setProdutos] = useState([]);

    const history = useHistory();
    const token = localStorage.getItem('token');

    if(token === null){
        history.push('/');
    }

    useEffect(() => { 
        const fetchData = async () => {
        const result = await api.get('product/register', {
            headers: {
                Authorization: `Bearer ${token}`,
            } 
         });
        
        setProdutos(result.data);
        console.log(result.data);
        };
    fetchData();
    }, []);

    

    function getCards() {
        if (produtos.length !== 0) {
            return produtos.map((produto, i) => {
                return (
                    <Card key={produto.idProduto} titulo={produto.nomeProduto.toUpperCase()} preco={produto.valorVenda} url={produto.imagemURL} cdgProduto={produto.cdgProduto} quantidade={produto.qtdEstoqueAtual} descricao={produto.descricaoProduto} idCodigo={produto.idProduto} color="#E8B71A"/>
                )
            })
        }
    }

    let links = [
        { label: 'Usuário', link: '/register' },
        { label: 'Fornecedor', link: '/novofornecedor'},
        { label: 'Produtos', link: '/novoproduto'},     
        { label: 'Vendas', link: '/venda' },
        { label: 'Movimentar Inventário', link: '/newinventory' },
        { label: 'Relatórios', link: '/relatorio', active: true },
      ];

    return (
        <div>
        <header>
            <Menu links={links} logo={logo} />
        </header>

        <div className="relatorio-container">
        <div className="content-relatorio">
            <section>
            <section className="menuRelatorio">
            <div className="headerMenu">
                <p>RELATÓRIOS</p>
            </div>

            <div className="spanlink">
            <Link className="LinkProdutos" to="/relatorio">
                <BsClipboardData size={25}/>
                <p>Relatório de Produtos</p>
            </Link>


            <Link className="LinkVendas" to="/relatoriovenda">
                <BsClipboardData size={25}/>
                <p>Relatório de Vendas</p>
            </Link>
            </div>
            </section>
            
            <div className="Cards">
                {getCards()}
            </div>   

            </section> 
        </div>
        </div>

        </div>
)}