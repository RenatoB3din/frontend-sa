import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {mask} from "remask";

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.png';

import Menu from '../../components/Header/Menu';
import logo from '../../components/Header/logo.png';
import ModalError from '../../components/Modal/ModalError';


export default function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpf, setCpf] = useState('');
    const [role, setRole] = useState('');

    const history = useHistory();

    const [isModalErrorVisible, setIsModalErrorVisible] = useState(false);


    const MascararCNPJ = ev => {
        setCpf(mask(ev.target.value, ['999.999.999-99']))
    };

    async function handleRegister(e) {
        e.preventDefault(); // Não atualiza a pág ao dar submit

        const data = {
            name,
            username,
            email,
            password,
            cpf,
            role:[role]
        };

        try{
            await api.post('api/auth/signup', data);

            history.push('/');

         } catch (err) {
            setIsModalErrorVisible(true)
         }
    }

    let links = [
        { label: 'Usuário', link: '/register', active: true },
        { label: 'Fornecedor', link: '/novofornecedor'},
        { label: 'Produtos', link: '/novoproduto'},     
        { label: 'Vendas', link: '/venda' },
        { label: 'Movimentar Inventário', link: '/newinventory' },
        { label: 'Relatórios', link: '/relatorio' },
      ];

    return (
        <div>
        <header>
            <Menu links={links} logo={logo} />
        </header>
        <div className="register-container">
            <div className="content">

                {isModalErrorVisible ? 
                    <ModalError scrolling="no" onClose={() => setIsModalErrorVisible(false) }>
                        Houve um problema ao tentar efetuar o cadastro. 
                    </ModalError>
                : null}

                <section>
                    <img src={logoImg} alt="logoSa" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude-nos a crescer cada vez mais.</p>

                </section>
                
                <form onSubmit={handleRegister}>
                    <input 
                        id="usuarioNome"
                        placeholder="Nome Completo"
                        maxLength="40"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input 
                        id="usuarioUsername"
                        maxLength="25"
                        placeholder="Usuário"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        id="usuarioSenha"
                        type="password" 
                        maxLength="20"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <input 
                        id="usuarioEmail"
                        type="email" 
                        maxLength="40"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <div className="input-group">
                        <input 
                            id="usuarioCPF"
                            placeholder="CPF"
                            value={cpf}
                            onChange={MascararCNPJ}
                        />
                        <select 
                            id="usuarioPerfil"
                            name="perfil" 
                            style={{ width: 180 }}
                            value={role}
                            onChange={e => setRole(e.target.value)}
                        >

                            <option value="" disabled ></option>

                            <option
                                value="admin"
                            >Admin</option>

                            <option                  
                                value="manager"
                            >Gerente</option>

                            <option                  
                                value="role_sallesman"
                            >Vendedor</option>
                        </select>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
        </div>
    );
}