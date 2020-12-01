import React, { useState, useEffect } from 'react';
import { BsUpload } from 'react-icons/bs'
import { useHistory } from 'react-router-dom';
import { GrEdit } from 'react-icons/gr';

import api from '../../services/api';
import './styles.css';

import { storage } from '../../components/Firebase/firebaseConfig';
import Menu from '../../components/Header/Menu';
import logo from '../../components/Header/logo.png';
import Modal from '../../components/Modal/Modal';
import ModalError from '../../components/Modal/ModalError';


export default function InventoryMovement() {
    const [nrNotaFiscal, setNrNotaFiscal] = useState('');                              
    const [tipoMovimento, setTipoMovimento] = useState('');
    const [dataNotaFiscal, setDataNotaFiscal] = useState('');
    const [fornecedores, setFornecedores] = useState([]);
    const [fornecedor, setFornecedor] = useState('');
    const [produtos, setProdutos] = useState([]);
    const [produto, setProduto] = useState('');
    const [qtde, setQtde] = useState('');
    const [valor, setValor] = useState('');
    const [lote, setLote] = useState('');
    const [validade, setValidade] = useState('');
    const [image, setImage] = useState(null);
    const [imagemURL, setImagemUrl] = useState("");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState("");
    const history = useHistory();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);

    const token = localStorage.getItem('token');

        if(token === null){
            history.push('/');
        }


        useEffect(() => { 
            const fetchData = async () => {
            const result = await api.get('provider/register', {
                headers: {
                    Authorization: `Bearer ${token}`,
                } 
            });

            setFornecedores(result.data);
        };
        fetchData();
        }, []);

        useEffect(() => { 
                const fetchData = async () => {
                const result = await api.get('product/register', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    } 
                 });
                
                setProdutos(result.data);
            };
        fetchData();
        }, []);





    function PreencherListaProduto() {
        if (produtos.length !== 0) {
            return produtos.map(produto => (
                <option 
                key={produto.idProduto}
                value={produto.idProduto}
                >{produto.nomeProduto}
                </option>
            )) 
        }
    }
    
    function PreencherLista() {
        if (fornecedores.length !== 0) {
            return fornecedores.map(fornecedor => (
                <option 
                    key={fornecedor.id}
                    value={fornecedor.id}
                    >{fornecedor.nomeFantasia}
                </option>
            )) 
        }
    }

    function ResetProduto() {      
        setProduto('');
        setQtde('');
        setValor('');
        setLote('');
        setValidade('');
    }

    function ResetAll(e) {      
        e.preventDefault();
        setNrNotaFiscal('');
        setTipoMovimento('');
        setDataNotaFiscal('');
        setFornecedor('');
        setProduto('');
        setQtde('');
        setValor('');
        setLote('');
        setImagemUrl('');

        document.getElementById("select_Fornecedor").disabled = false;
        document.getElementById("select_tpMov").disabled = false;
        document.getElementById("input_dtnf").disabled = false;
        document.getElementById("input_nf").disabled = false;
        document.getElementById("img_nf").disabled = false;
        document.getElementById("select_produto").disabled = true;
        document.getElementById("input_valor").disabled = true;
        document.getElementById("input_qntd").disabled = true;
        document.getElementById("input_validade").disabled = true;
        document.getElementById("input_lote").disabled = true;
    }

    const handChange = e => {
        const file = e.target.files[0];
        if(file) {
            const fileType = file["type"];
            const validImageTypes = ["image/gif", "image/jpeg", "image/png"];
            if (validImageTypes.includes(fileType)) {
                setError("");
                setImage(file);
            } else {
                setError("Favor selecionar uma imagem para Upload")
            }
        }
    };


    const handleUpdate = (e) => {
        e.preventDefault();
        if(image) {
            const uploadTask = storage.ref(`images/${image.name}`).put(image)

            uploadTask.on(
                "state_changed",
                snapshot => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100 
                    );
                    setProgress(progress);
                },
                error => {
                    setError(error);
                },
                () => {
                    storage
                        .ref("images")
                        .child(image.name)
                        .getDownloadURL().then(url => {
                            setImagemUrl(url)
                            setProgress(0);
                    })
                }
                );
        } else {
            setError("Erro, favor escolher uma imagem para Upload");
        }
    };


    function Edit(e) {      
        e.preventDefault();

        document.getElementById("select_Fornecedor").disabled = false;
        document.getElementById("select_tpMov").disabled = false;
        document.getElementById("input_dtnf").disabled = false;
        document.getElementById("input_nf").disabled = true;
        document.getElementById("img_nf").disabled = false;
        document.getElementById("select_produto").disabled = true;
        document.getElementById("input_valor").disabled = true;
        document.getElementById("input_qntd").disabled = true;
        document.getElementById("input_validade").disabled = true;
        document.getElementById("input_lote").disabled = true;

        document.getElementById("btn_confirmEditMov").disabled = false;
    }

    async function EditTpMovimento(e) {
        e.preventDefault();                 // Não atualiza a página ao dar submit

        const data = {                      // Dados armazanados via input para o POST!
            tipoMovimento,
            dataNotaFiscal,
            imagemURL,
        };

        try{
             await api.put(`stockMovement/register/${nrNotaFiscal}/${fornecedor}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });      

            document.getElementById("select_Fornecedor").disabled = true;
            document.getElementById("select_tpMov").disabled = true;
            document.getElementById("input_dtnf").disabled = true;
            document.getElementById("input_nf").disabled = true;
            document.getElementById("img_nf").disabled = true;
            document.getElementById("select_produto").disabled = false;
            document.getElementById("input_valor").disabled = false;
            document.getElementById("input_qntd").disabled = false;
            document.getElementById("input_validade").disabled = false;
            document.getElementById("input_lote").disabled = false;

            document.getElementById("btn_confirmEditMov").disabled = true;


         } catch (err) {
            alert('Erro no cadastro, tente novamente.');
         }
    }


    async function handleInventory(e) {
        e.preventDefault();                 // Não atualiza a página ao dar submit

        const data = {                      // Dados armazanados via input para o POST!
            nrNotaFiscal,
            tipoMovimento,
            dataNotaFiscal,
            imagemURL
        };



        try{
             await api.post(`stockMovement/register/provider/${fornecedor}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });  
            
            document.getElementById("select_Fornecedor").disabled = true;
            document.getElementById("select_tpMov").disabled = true;
            document.getElementById("input_dtnf").disabled = true;
            document.getElementById("input_nf").disabled = true;
            document.getElementById("img_nf").disabled = true;
            document.getElementById("select_produto").disabled = false;
            document.getElementById("input_valor").disabled = false;
            document.getElementById("input_qntd").disabled = false;
            document.getElementById("input_validade").disabled = false;
            document.getElementById("input_lote").disabled = false;

            document.getElementById("btn_tpMov").style.display = "none";
            document.getElementById("btn_editMov").style.display = "inline-block";
            document.getElementById("btn_confirmEditMov").style.display = "inline-block";

         } catch (err) {
            setIsModalErrorVisible(true)
         }
    }


    async function handleInventoryItems(e) {
        e.preventDefault();                 // Não atualiza a página ao dar submit

        const data = {                      // Dados armazanados via input para o POST!
            produto,
            valor,
            qtde,
            lote,
            validade
        };

        console.log(data);

  

        try{
            await api.post(`stockMoviment/register/moviment/${nrNotaFiscal}/product/${produto}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });     
            
            setIsModalVisible(true)
        } catch (err) {
            setIsModalErrorVisible(true)
        }

        ResetProduto();
    }



    let links = [
        { label: 'Usuário', link: '/register' },
        { label: 'Fornecedor', link: '/novofornecedor'},
        { label: 'Produtos', link: '/novoproduto'},     
        { label: 'Vendas', link: '/venda' },
        { label: 'Movimentar Inventário', link: '/newinventory', active: true },
        { label: 'Relatórios', link: '/relatorio' },
      ];

    return (
        <div>
        <header>
            <Menu links={links} logo={logo} />
        </header>
        <div className="movinventory-container">
        <div className="content">
            <section>
                <h1 className="tituloTela">MOVIMENTAÇÃO DE ESTOQUE</h1>

                {isModalVisible ? 
                    <Modal scrolling="no" onClose={() => setIsModalVisible(false) }>
                        Realizado com sucesso!
                    </Modal>
                : null}

                {isModalErrorVisible ? 
                    <ModalError scrolling="no" onClose={() => setIsModalErrorVisible(false) }>
                        Erro no cadastro, tente novamente
                    </ModalError>
                : null}

                <form onSubmit={handleInventory}>

                <fieldset>
                    <legend>Tipo de Movimento</legend>
                        <select id="select_tpMov"
                            value={tipoMovimento}
                            onChange={e => setTipoMovimento(e.target.value)}
                        >
                            <option value="" disabled ></option>

                            <option                  
                                value="MOV_COMPRA"
                                >Compra do Fornecedor
                            </option>

                            <option
                                value="MOV_DEVOLUCAO_FORNECEDOR"
                                >Devolução para o Fornecedor
                            </option>
                        </select>
                </fieldset>
                    
                <div className="input-group">
                    <fieldset style={{ width: 220 }}>
                        <legend>Número da NF</legend>
                            <input id="input_nf"
                                type="string"
                                placeholder="NF"
                                maxLength="6"
                                value={nrNotaFiscal}
                                onChange={e => setNrNotaFiscal(e.target.value)}
                            />       
                    </fieldset>

                    <fieldset style={{ width: 200 }} >
                        <legend>Data da NF</legend>
                            <input id="input_dtnf"
                                type="date" 
                                style={{ width: 280 }} 
                                value={dataNotaFiscal}
                                onChange={e => setDataNotaFiscal(e.target.value)}
                            />
                    </fieldset>

                    <fieldset>
                        <legend>Imagem NF</legend>
                            <input id="img_nf" style={{ width: 500}} type="file" name="arquivos" onChange={handChange} /> 

                            <div style={{ height: "5px" }}>
                                {progress > 0? <progress value={progress} max="100" /> : ""}
                                <p style={{color: "red" }}>{error}</p>
                            </div>
                    </fieldset>

                    <fieldset style={{ width: 0}}>
                        <button id="btn_upload" onClick={handleUpdate}> <BsUpload/> </button> 
                    </fieldset>
                </div>
                        
                    <fieldset>
                        <legend>Fornecedor</legend>
                        <select id="select_Fornecedor"
                            value={fornecedor}
                            onChange={e => setFornecedor(e.target.value)}
                        >   
                            <option value=""></option>


                            {PreencherLista()}

    
                        </select>
                    </fieldset>


                        <div className="operacaoProduto">
                            <button id="btn_tpMov" type="submit">CONFIRMAR TIPO DE MOVIMENTO</button>
                            <button id="btn_confirmEditMov" onClick={EditTpMovimento} >EDITAR TIPO DE MOVIMENTO</button>
                            <button id="btn_editMov" onClick={Edit}><GrEdit size={20}/></button>
                        </div>
                </form>




                <form onSubmit={handleInventoryItems}>

                <div className="input-group">
                    <fieldset>
                        <legend>Produto</legend>
                        <select 
                            id="select_produto"
                            disabled
                            value={produto}
                            onChange={e => setProduto(e.target.value)}
                            >
                            
                            <option value=""></option>

                            {PreencherListaProduto()}

                        </select>
                    </fieldset>

                        <fieldset style={{ width: 180 }} >
                            <legend>Quantidade de Produtos</legend>
                            <input 
                                id="input_qntd"
                                disabled
                                type="number" 
                                style={{ width: 180 }} 
                                placeholder="Quantidade"
                                value={qtde}
                                onChange={e => setQtde(e.target.value)}
                                />
                        </fieldset>
                    </div>
                        

                    <div className="input-group">
                        <fieldset>
                            <legend>Valor Unitário</legend>
                            <input 
                                id="input_valor"
                                disabled
                                type="number" 
                                placeholder="Valor: R$ 000,00"
                                value={valor}
                                onChange={e => setValor(e.target.value)}
                                /> 
                        </fieldset>

                        <fieldset style={{ width: 220 }}>
                            <legend>Lote</legend>
                            <input 
                                id="input_lote"
                                disabled
                                type="number"
                                style={{ width: 220 }} 
                                placeholder="Lote"
                                value={lote}
                                onChange={e => setLote(e.target.value)}
                                />
                        </fieldset>

                        <fieldset style={{ width: 220 }} >
                            <legend>Validade</legend>
                                <input id="input_validade"
                                    disabled
                                    type="date"
                                    style={{ width: 220 }} 
                                    value={validade}
                                    onChange={e => setValidade(e.target.value)}
                                    />
                        </fieldset>
                    </div>

                    <div className="operacaoProduto">
                            <button id="btn_add" type="submit">Confirmar Produto</button>
                            <button id="btn_cancel" onClick={ResetAll}>Novo Movimento</button>
                    </div>
                    
                </form>
             
                </section>
            </div>
        </div>
    </div>
    );
}