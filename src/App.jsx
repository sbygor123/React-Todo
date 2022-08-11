// import logo from './logo.svg';
import "./App.css";
// import FirstComponent from './Components/FirstComponent';
import { useState, useEffect } from "react";
import { BsTrash, BSBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

const API = "http://localhost:5000";

function App() {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  //Load todos a pagina de load
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      const resposta = await fetch(API + "/todos")
        .then((resposta) => resposta.json())
        .then((data) => data)
        // .cath((erro) => console.log(erro));
      setLoading(false);
      setTodos(resposta);
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todos = {
      id: Math.random(),
      title,
      time,
      done: false,
    };



    await fetch(API + "/todos", {
      method: "POST",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setTodos((prevState) =>[...prevState, todos])

    setTitle("");
    setTime("");
  };

  if(loading){
    return <p></p>
  }

  return (
    <div className="app">
      <div className="todo_header">
        <h1>React Todo</h1>
      </div>
      <div className="todo_form">
        <p>Insira seu proximo trabalho</p>
        <form onSubmit={handleSubmit}>
          <div className="todo_control">
            <label htmlFor="Title">O que o usuario deseja?</label>
            <input
              type="text"
              name="title"
              placeholder="Digite o titulo desejado"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              required
            />
          </div>
          <div className="todo_control">
            <label htmlFor="time">Duração: </label>
            <input
              type="text"
              name="time"
              placeholder="Tempo estimado (em horas)"
              onChange={(e) => setTime(e.target.value)}
              value={time || ""}
              required
            />
          </div>
          <input type="submit" value="Criar trabalho" />
        </form>
      </div>
      <div className="todo_list">
        <p>Lista de trabalhos</p>
        {todos.length === 0 && <p>Não a trabalhos!</p>}
        {todos.map((todo) => (
          <div className="todo" key={todo.id}>{todo.title}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
