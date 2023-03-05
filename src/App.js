

import Create from "./Create";
import "bootstrap/dist/css/bootstrap.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min";
import Album from "./Album";
import {useState, useEffect} from 'react'
function App() {

  const [users, setData] = useState([]);
  // const [update, setUpdate] = useState(false)
const [title, setTitle] = useState('')
const [userId, setUserId] = useState('')
const [x, setX] = useState('')



  useEffect(() => {
    fetchData();
    console.log('useEffect used')
  }, []);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/albums")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => {
        console.log(err);
      });
  };

  const onAdd = async (title, userId) => {
    const url =  "https://jsonplaceholder.typicode.com/albums"

    await fetch(url, {
      method:"POST",
      body: JSON.stringify({
        title: title,
        userId: userId,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => {
        if (res.status !== 201) {
          return;
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setData((users) => [...users, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDelete = async (id) => {
    await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status !== 200) {
          return;
        } else {
          setData(
            users.filter((item) => {
             return item.id !== id;
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdate= async (id, title, userId)=>{
    console.log(x)
    const url=`https://jsonplaceholder.typicode.com/albums/${x}`
    await fetch(url,{
        method:'PUT',
        body: JSON.stringify({
            title: title,
            userId: userId,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
    })
    .then((res)=>res.json())
    .then((data)=>{
      const updatedUsers = users.map((user) => {
        if (user.id === id) {
          user.title = title;
          user.userId = userId;
        }

        return user;
      });
      setData((users)=>updatedUsers)
    })
    .catch((err)=>{console.log(err)})
   
}

  return (
    <div className="App bg-dark">
    
   <div className="head text-white p-4 " >
      <h1 className="title text-center">Photo Album</h1></div>
      <br />
      <h3 className="text-center bg-info p-2 ">There are total {users.length} albums </h3>
      <div className="d-flex justify-content-around">
        <Create onAdd={onAdd}  />
     
       </div>
       <h3 className="bg-dark text-white text-center p-3">React Crud Using JSONplaceholder</h3>
      
       <div className="align-content-sm-stretch rounded border-dark m-3">
        {users.map((item) => (
          
          <Album className='album bg-secondary'
            id={item.id}
            key={item.id}
            title={item.title}
            userId={item.userId}
            users={users}
            onDelete={onDelete}  
            onUpdate={onUpdate}
          />         

        )
      )}
      </div>
      

     
    </div>
  );
};

export default App;