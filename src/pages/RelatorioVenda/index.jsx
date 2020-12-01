import React from 'react'; 
import './styles.css';
import Menu from '../../components/Header/Menu';
import logo from '../../components/Header/logo.png';
import TabelaProdutos from '../../components/TabelaVendas/TabelaProdutos'
import { Link,useHistory } from 'react-router-dom';
import { BsClipboardData } from 'react-icons/bs'

export default function RelatorioVenda() {

    const token = localStorage.getItem('token');
    const history = useHistory();
    
    if(token === null){
        history.push('/');
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
        <div className="content">

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
            
                <TabelaProdutos />

            </section> 
        </div>
        </div>

        </div>
)}