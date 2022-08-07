import React, {useState, useEffect } from "react"
import "./App.css";
import Axios from "axios";
import Card from "./components/cards/card";
import "./components/cards/card.css";

function App() {
  const [values, setValues] = useState();
  const [listPessoa, setListPessoa] = useState();
  const reloadPage = () => {
    window.location.reload();
  };
  console.log(listPessoa)
  const handleChangeValues = (value) => {
    setValues(prevValue=>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }))
  };

  const handleRegisterPessoa = () =>{
    Axios.post("http://localhost:3001/register",{
      name: values.name,
      cpf: values.cpf,
      birth: values.birthDate,
      registerDate: values.registerDate,
      ativo: values.userVisits,
    }).then((response)=>{
      console.log(response);
    });
    reloadPage();
  };

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListPessoa(response.data);
    });
  }, []);

  return (
    <div className="app--container container">
      <header>
        <h1><a href="#">Sistema CRUD</a></h1>
      </header>
      
      <div className="nome--alunos">
        <h2>Alunos</h2>
        <p>Gustavo Ávila</p>
        <p>Gilberto Navarro</p>
      </div>

      <div className="register--container">
        <h1 className="register--title">Cadastro</h1>

          <input 
          type="text" 
          name="name" 
          placeholder="Nome" 
          className="register--input"
          onChange={handleChangeValues}
          />

          <input 
          type="text" 
          name="cpf" 
          placeholder="CPF" 
          className="register--input"
          onChange={handleChangeValues}
          />

          <input 
          type="date" 
          name="birthDate" 
          placeholder="Data de nascimento" 
          className="register--input"
          onChange={handleChangeValues}
          />

          <input 
          type="date" 
          name="registerDate" 
          placeholder="Data de cadastro" 
          className="register--input"
          onChange={handleChangeValues}
          />
          
          <div className="radio--input">
            <p className="question">Usuário Ativo?</p>
            <input
            type="radio"
            id="active"
            name="userVisits"
            value="S"
            onChange={handleChangeValues}
            />
            <label htmlFor="active">Sim</label>
            
            <input
            type="radio"
            id="no-active"
            name="userVisits"
            value="N"
            onChange={handleChangeValues}
            />
            <label htmlFor="no-active">Não</label>
          </div>

          <button className="register--button" 
          onClick={() => handleRegisterPessoa()}>Cadastrar</button>
          
          <footer>
            <p>Copyright &copy; 2022 <a href="https://www.instagram.com/gus__avila/" target="_blank" rel="noreferrer">Gustavo Ávila</a> and <a href="https://www.instagram.com/gil.navarro1/" target="_blank" rel="noreferrer">Gilberto Navarro</a></p>
          </footer>
      </div>

      {typeof listPessoa !== "undefined" && listPessoa.map((value) => {
        return (
        <Card
         key={value.id} 
         listCard={listPessoa} 
         setListCard={setListPessoa}
         id={value.IDPessoa}
         name= {value.Nome}
         cpf=  {value.CPF}
         birth= {new Date(value.DataNascimento).toLocaleDateString()}
         registerDate= {new Date(value.DataCadastro).toLocaleDateString()}
         ativo= {value.Ativo}
         ></Card>
         );
      })}
    </div>
  );
}

export default App;
