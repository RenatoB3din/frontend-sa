import React, { useState } from 'react';
import Iframe from 'react-iframe';
import { useHistory } from 'react-router-dom';
import './styles.css';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import projetoSaImg from '../../assets/projetosa.png';

export default function Logon(){
    const [username, setUsername ] = useState('');
    const [password, setPassword ] = useState('');
    const history = useHistory();

    
    function changeStuff(e) {
        e.preventDefault();                 // Não atualiza a página ao dar submit

        const myIframe = document.getElementById('myId');
        myIframe.style.display = "block";
    }

    async function handleLogin(e) {
        e.preventDefault();

        try{
          const response = await api.post('api/auth/signin', { username, password });
          
          localStorage.setItem('userId', response.data.id);
          localStorage.setItem('userName', username);
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('tokenType', response.data.tokenType);

          history.push('/newinventory');
        } catch (err) {
            alert('Usuário e/ou senha inválidos');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="logoSa" />
                
                <Iframe url="/recsenha"
                    display="none"
                    frameBorder="0"
                    position="absolute"
                    scrolling="no"
                    width="100%"
                    height="315px"
                    id="myId"
                    allow="fullscreen"
                    className="myClassname"
                />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        id="loginUsername"
                        placeholder="Usuário" 
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                    <input 
                        id="loginSenha"
                        placeholder="Senha" 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <div className="rec_senha">
                        <button id="esquecisenha" className="back-link" onClick={changeStuff}>Esqueceu sua senha?</button>
                    </div>
                    <button id="loginBotao" className="button" type="submit">Entrar</button>

                </form>
            </section>

            <img src={projetoSaImg} alt="projetoSa" />
        </div>
    );
}