import React, { Fragment, useState, useEffect } from 'react';
import api from '../../services/api';
 
function Greeting() {
    const [mensagem, setMensagem] = useState();
    const [id, setId] = useState();
    const [query, setQuery] = useState('');
    const [url, setUrl] = useState(
        'http://localhost:8080/greeting?name=',
    );
       
        useEffect(() => {
          const fetchData = async () => {
            const result = await api.get(url);
       
            setMensagem(result.data.content);
            setId(result.data.id);
          };
       
          fetchData();
        }, [url]);
 
  return (
    <Fragment>
      <input
        type="text"
        value={query}
        placeholder="Digite seu nome"
        onChange={event => setQuery(event.target.value)}
      />
      <button
        type="button"
        onClick={() =>
          setUrl(`http://localhost:8080/greeting?name=${query}`)
        }
      >
        Search
      </button>
 
      <div>
        <p>
          Seja bem vindo, {mensagem} 
        </p>
        <p>
          Você realizou a requisição de número {id}
        </p>
      </div>
    </Fragment>
  );
}
 
export default Greeting;