import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Register from './pages/Register';
import Logon from './pages/Logon';
import CadastroProduto from './pages/CadastroProduto';
import CadastroFornecedor from './pages/CadastroFornecedor';
import InventoryMovement from './pages/InventoryMovement';
import Venda from './pages/Venda';
import Greeting from './pages/Greeting';
import RecuperarSenha from './pages/RecuperarSenha';
import Relatorio from './pages/Relatorio';
import RelatorioVenda from './pages/RelatorioVenda';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/recsenha" component={RecuperarSenha} />
                <Route path="/register" component={Register} />
                <Route path="/novoproduto" component={CadastroProduto} />
                <Route path="/novofornecedor" component={CadastroFornecedor} />
                <Route path="/newinventory" component={InventoryMovement} />
                <Route path="/venda" component={Venda} />
                <Route path="/relatorio" component={Relatorio} />
                <Route path="/greeting" component={Greeting} />
                <Route path="/relatoriovenda" component={RelatorioVenda} />

            </Switch>
        </BrowserRouter>
    );
}