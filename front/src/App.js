import { useRef, useState } from 'react';
import './App.css';

function App() {
  const usuario = useRef(null);
  const senha = useRef(null);
  const [login, setLogin] = useState();

  function verificaLogin(){
    fetch('http://127.0.0.1:3001/login', 
      { 
        method: "POST", 
        body: JSON.stringify({"usuario" : usuario.current.value, "senha" : senha.current.value}),
        headers: {
          "Content-Type": "application/json",
        },
      })
    .then((data) => data.json())
    .then((json) => {
      if(json.erro){
        setLogin(undefined);
        alert(json.erro);
      }
      else{
        setLogin(json);
      } 
    });
  }

  return (
    <div className="App">
        <input type="text" ref={usuario} placeholder='Usuário'/>
        <input type="text" ref={senha} placeholder='Senha'/>
        <button onClick={verificaLogin}>Enviar</button>
      {login && 
      <>
        <h1>Usuário Logado: {login.usuario}</h1>
        <h1>Senha Logada: {login.senha}</h1>
      </>
      }
    </div>
  );
}

export default App;
