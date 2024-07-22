import { useEffect, useState } from "react"

import './style.css';
import TodoItem from "./components/todo-item";
import TodoDetails from "./components/todo-item/todo-details";
import { Skeleton } from "@mui/material";
function App() {

  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erroMsg, setErroMsg] = useState(null);
  const [todoDetails, setTodoDetails] = useState(null);
  const [openDialog, setOpenDialog] = useState(false)


  async function fetchListOfTodos() {
    try {
      setLoading()
      const apiResponse = await fetch(`https://dummyjson.com/todos`)
      const result = await apiResponse.json();

      console.log(result);
      if (result?.todos && result?.todos?.length > 0) {
        setTodoList(result?.todos);
        setLoading(false);
        setErroMsg('');
      } else {
        setTodoList([]);
        setLoading();
        setErroMsg('')
      }
    } catch (error) {
      console.log(error);
      setErroMsg('Some error occured')
    }
  }

  async function fetchDetailsOfCurrentTodo(getCurrentTodoId) {
    console.log(getCurrentTodoId);

    try {
      const apiResponse = await fetch(`https://dummyjson.com/todos/${getCurrentTodoId}`);

      const details = await apiResponse.json();
      console.log(details);

      if(details){
        setTodoDetails(details);
        setOpenDialog(true);
      }else{
        setTodoDetails(null);
        setOpenDialog(false);
      }
    } catch (error) {
      console.log(error);

    }
  }

  useEffect(() => {
    fetchListOfTodos()
  }, [])

  if (loading)
    return <Skeleton variant="rectangulr" width={650} height={650} />;

  return (
    <div className="mainWrapper">
      <h1 className="headerItem">Simple ToDo App using Material UI</h1>

      <div className="todoListWrapper">
        {
          todoList && todoList.length > 0 ?
            todoList.map((todoItem) => <TodoItem fetchDetailsOfCurrentTodo={fetchDetailsOfCurrentTodo} key={todoItem.id} todo={todoItem} />) : null
        }
      </div>
      <TodoDetails 
      setOpenDialog={setOpenDialog}
      openDialog={openDialog}
      todoDetails={todoDetails}
      setTodoDetails={setTodoDetails} />
    </div>
  )
}

export default App
