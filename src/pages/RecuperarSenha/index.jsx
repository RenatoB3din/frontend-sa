import React from 'react';
import { GrClose } from 'react-icons/gr'

import './styles.css';

export default function RecuperarSenha(){

    function closeWin()   // Tested Code
    {
        var someIframe = window.parent.document.getElementById('myId');
        someIframe.style.display = "none";   
    }

    return(
        <div className="recSenha-container">  
        <header className="header_recSenha">
            <div className="colorHeader"></div>
        </header>
        <div className="content">
            <section>
                <button onClick={closeWin} id="btn_sair"> <GrClose/> </button>
        <div>
            <h1>Esqueceu a senha?</h1>
            <p>Preencha o campo.
            Um e-mail será enviado para a troca da senha.</p> 
        </div>

        <form>
            <fieldset>
                <legend>Email</legend>
                    <input 
                        id="recuperarSenha"
                        type="text"
                    />           
            </fieldset>

            <input id="btn_recSenha" type="submit"/>
        </form> 

            </section>  
        </div>
        </div>
    );
}