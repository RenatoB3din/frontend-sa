import React, { useState, useEffect } from 'react'
import api from '../../services/api';
import './TabelaProdutos.css'

export default props => {

    const [produtos, setProdutos] = useState([]);

    useEffect(() => {
        api.get('inventorytemporary')
        .then(response => {
            setProdutos(response.data);
        })
    })

    const { nome, qntd, lote, validade, preco } = produtos

    function getLinhas() {
        return produtos.map((produto, i) => {
            return (
                <tr key={produto.id} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                    <td>{produto.nome}</td>
                    <td>{produto.qntd}</td>
                    <td>{produto.lote}</td>
                    <td>{produto.validade}</td>
                    <td>R$ {produto.preco.toFixed(2).replace('.',',')}</td>
                </tr>
            )
        })
    }

    return (
        <div className="TabelaProdutos">
            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Lote</th>
                        <th>Validade</th>
                        <th>Valor total</th>
                    </tr>
                </thead>
                <tbody>
                        {getLinhas()}
                </tbody>
            </table>
        </div>
    )
}