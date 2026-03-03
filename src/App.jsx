import { useState ,useEffect} from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";

function App() {
  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [showFinished,setshowFinshed] = useState(true)

  const toggle = ()=>{
    setshowFinshed(!showFinished)
  }

  useEffect(() => {
    let todostring = localStorage.getItem("todos")
    if(todostring){
      let todos = JSON.parse(todostring)
      settodos(todos)
    }
  }, [])
  

  useEffect(() => {
    if(todos.length >0){
  localStorage.setItem("todos", JSON.stringify(todos))
    }
}, [todos])

  const HandleEdit = (id) => {
    let t = todos.filter(item=>{
      return item.id === id
    })
    settodo(t[0].todo)
    let DeleteTodo = todos.filter(item=>{
      return item.id !==  id;
    })
   settodos(DeleteTodo);
   
  }
  const HandleDelete = (id) => {
    let DeleteTodo = todos.filter(item=>{
      return item.id !==  id;
    })
   settodos(DeleteTodo);
   
  }
  const HandleAdd = () => {
    settodos([...todos, {id:uuidv4() ,todo, isCompleted: false }])
    settodo("")
   
  }
  const HandleChange = (e) => {
    settodo(e.target.value)
   
  }

  const HandleCheck = (e) =>{
    let id = e.target.name;
   let index = todos.findIndex(item=>{
    return id === item.id;
   })
   let NewTodos = [...todos];
   NewTodos[index].isCompleted = !NewTodos[index].isCompleted
   settodos(NewTodos)
   
  }


  return (
    <>
      <Navbar />
      <hr />

      <div className='bg-red-700/20  mx-10 my-5 p-4 rounded-2xl h-[80vh] '>
        <div>
          <div className='font-bold text-3xl my-2'>
            Add a Todo
          </div>
          <div className='flex gap-10'>
            <input type="text" onChange={HandleChange} value={todo} className='bg-white border-2 border-black w-[20vw]' />
            <button onClick={HandleAdd} disabled={todo.length<1} className='bg-red-600 disabled:bg-red-400 px-2 py-1 rounded-xl text-white  cursor-pointer'>Add</button>
          </div>
        </div>
            <div className='font-bold text-2xl my-5'>
            Your todos
          </div>
          <input type="checkbox" onChange={toggle} checked={showFinished} />Show Finished
          {todos.length === 0 && <div>No Todos to Display</div>}

          {todos.map(item => {

           return (showFinished || !item.isCompleted) && <div key={item.id} className='mt-4'>

          <div className='flex gap-5 w-1/3 justify-between'>
          <div className='flex gap-2'>
          <input type="checkbox" onChange={HandleCheck} name={item.id} checked={item.isCompleted} id="" />
            <span className={item.isCompleted?"line-through":""}>
              {item.todo}
            </span>
            </div>
            <div className='space-x-3'>
            <button onClick={()=>HandleEdit(item.id)} className='bg-red-600 px-2 py-1 rounded-xl text-white cursor-pointer w-5'>Edit </button>
            <button onClick={()=>{HandleDelete(item.id)}} className='bg-red-600 px-2 py-1 rounded-xl text-white  cursor-pointer'>Delete</button>
            </div>

          </div>
        </div>
          })}
      </div>
    </>
  )
}

export default App
