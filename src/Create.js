export default function Create({onAdd}){
   
   
const handleOnSubmit = (e) => {
    e.preventDefault();
    onAdd(e.target.title.value,e.target.userId.value);
    e.target.title.value = "";
    e.target.userId.value = "";
}
    return(
        <div>
        <form onSubmit={handleOnSubmit}>
          <h3 className="text-center text-white">Add Album</h3>
          <input className="rounded p-1 m-2" placeholder="title" name="title" /><br/>
          <input className="rounded p-1 m-2" placeholder="userId" name="userId" /><br/>
          <button className="btn btn-primary rounded m-2"onSubmit={handleOnSubmit}>Add</button>
          <hr />
        </form>
      </div>
        
    )
}