//import style
import style from "./Home.module.css";
//imports cards e service pro Back
import { CardPerson } from "../User/CardPerson";
import { CardContato, Delete, Update, Insert } from "../Contato/CardContatos";
//imports Icons
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoPencil, IoSearchOutline, IoAdd } from "react-icons/io5";

import { useEffect, useState } from "react";
import { server } from "../../api/axios";


export function Home() {

  let [persons, setPersons] = useState([]);
  let [valor, setValor] = useState('');

  useEffect(() => {
    Load()
   
  }, []);

  async function Load() {
    const temp = await server.get("user/");

    Ordenar(temp.data);
  }

  function Ordenar(persons){
    const alfabeto = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z' ];
    const tempPerson = [];
    let letraUsadas = [];

    for(let i=0; i<=25; i++){
        persons.map((person => {
            if(person.name[0] === alfabeto[i]) {
                letraUsadas.push(alfabeto[i]);
                tempPerson.push(person);}
                
         }
        ));
    }
    setPersons(tempPerson);
      }

  

  async function Adicionar() {
    event.preventDefault();

    await Insert()
    Load();
  }

  async function Deletar() {
    event.preventDefault();

    await Delete();
    Load();
  }

  function Pesquisar() {
    event.preventDefault();  

    if (valor === '') { Load(); }
    else{
      console.log(`Nome procurado: ${valor}`);
      let results = [];

    persons.map((person => {
  
      if(person.name.toLowerCase().includes(valor.toLowerCase())) {
        results.push(person);
        return
      }
    }))

    console.log({results})
    setPersons(results)
    }
  }

  async function Editar() {
    event.preventDefault();

    await Update();
    Load();
  }

  return (
    <div className={style.container}>

      <CardPerson
        cover="https://www.govbr.com.br/wp-content/uploads/2020/01/Logo-GOVBR_Solu%C3%A7%C3%B5es-para-gest%C3%A3o-p%C3%BAblica_vers%C3%A3o-branca-01-300x150.png"
        avatar="https://github.com/Agaklik.png"
        name="Alexandre Gaklik"
        office='Consultor de Produto' />

      <div className={style.contatos}>
        <div className={style.controles}>
          <form >

            <div className={style.headerContatos}>
              <h1 className={style.title}>Meus contatos</h1>
              <div className={style.buttons}>
                <button className={style.buttom} onClick={Adicionar}> <IoAdd /> </button>
                <button className={style.buttom} onClick={Editar}> <IoPencil /> </button>
                <button className={style.buttom} onClick={Deletar}> <BsFillTrash3Fill /> </button>

              </div>
            </div>

            <div className={style.pesquisa}>
              <button className={style.buttomPesquisa} onClick={Pesquisar}> <IoSearchOutline /> </button>

              <input type='text' name='pesquisa' className={style.inputPesquisa} placeholder="Busque pelo nome." value={valor} onChange={() => { setValor(event.target.value) }} />
            </div>

          </form>
        </div>

        <div className={style.listaContatos}>


              {
                persons.map((person, index) => (
                   <div className={style.listaCatalogo}>
            <h1 className={style.letraCatalogo}>{person.name[0]}</h1>
            <div className={style.contatoCatalogo}>

                  <CardContato key={index}
                    avatar={person.avatar}
                    name={person.name}
                    celular={person.celular}

                    id={person.id}
                  />
                  </div>
          </div>

                ))
              }

    

        </div>
      </div>
    </div>
  );
}