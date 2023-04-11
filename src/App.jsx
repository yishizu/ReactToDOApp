import {useEffect, useState} from 'react'
import "./styles.css";
import { NewForm } from './NewForm';
import { TodoList } from './TodoList';


export default function App() {
  
  const [todos, setTodos] = useState(()=>{
    const localValues = localStorage.getItem('Item')
    if(localValues=== null) return []
    return JSON.parse(localValues)
  })
  useEffect(() =>{
    localStorage.setItem('Item', JSON.stringify(todos))
  },[todos])

  function addTodo(title){
    setTodos(currentTodos=>{
      return[...currentTodos,{id:crypto.randomUUID(),title, completed:false}]
    })

  }


  function toggleTodo(id, completed){
    setTodos(currentTodos =>{
      return currentTodos.map(todo => {
        if(todo.id === id){
          return{...todo, completed: completed}
        }
        return todo
      })
    })
  }

  function deleteTodo(id){
    setTodos(currentTodos =>{
      return currentTodos.filter(todo => todo.id !== id);
      
    })
  }
  console.log(todos)

  return (
    
      <><NewForm onSubmit={addTodo} />
      <TodoList todos ={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      </>
 
  );
}
