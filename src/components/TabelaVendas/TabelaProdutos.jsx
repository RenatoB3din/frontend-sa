import React, {useState, useEffect} from 'react'; 
import api from '../../services/api';
import { useHistory } from 'react-router-dom';
import './TabelaProdutos.css'

export default props => {
    const [vendasItems, setVendasItems] = useState([]);
    const history = useHistory();
    const token = localStorage.getItem('token');

    if(token === null){
        history.push('/');
    }

    // useEffect(() => { 
    //     const fetchData = async () => {
    //     const result = await api.get('sales/register', {
    //         headers: {
    //             Authorization: `Bearer ${token}`,
    //         } 
    //      });
    //      setVendas(result.data);
    //     console.log(result.data);
    //     };
    // fetchData();
    // }, []);


    useEffect(() => { 
        const fetchData = async () => {
        const result = await api.get('salesItem/register', {
            headers: {
                Authorization: `Bearer ${token}`,
            } 
         });
         setVendasItems(result.data);
        console.log(result.data);
        };
    fetchData();
    }, []);




    function getLinhas() {
        if (vendasItems.length!==0){
            return vendasItems.map((vendaItem, i) => { 
                    return (
                        <tr key={vendaItem.idVenda} className={i % 2 === 0 ? 'Par' : 'Impar'}>
                            <td>{vendaItem.clientevenda}</td>
                            <td>{vendaItem.vendedorvenda}</td>
                            <td>{vendaItem.cupomfiscalVenda}</td>
                            <td>{vendaItem.nomeproduto}</td>
                            <td>{vendaItem.qtde}</td>
                            <td>R$ {vendaItem.valorUnitario.toFixed(2).replace('.',',')}</td>
                            <td>R$ {vendaItem.valorDesconto.toFixed(2).replace('.',',')}</td>
                            <td>R$ {vendaItem.valorTotal.toFixed(2).replace('.',',')}</td>
                            <td>{vendaItem.tipopagamento}</td>
                            <td>{vendaItem.dataVenda}</td>
                        </tr>
                    )
            })
        }
    }




    return (
        <div className="TabelaProdutos">
            <h2>{props.titulo}</h2>
            <table>
                <thead>
                    <tr>
                        <th>CLIENTE</th>
                        <th>VENDEDOR</th>
                        <th>CUPOM FISCAL</th>
                        <th>PRODUTO</th>
                        <th>QUANTIDADE</th>
                        <th>VALOR UNIDADE</th>
                        <th>DESCONTO</th>
                        <th>TOTAL</th>
                        <th>TIPO</th>
                        <th>DATA VENDA</th>
                    </tr>
                </thead>
                <tbody>
                        {getLinhas()}
                </tbody>
            </table>
        </div>
    )
}