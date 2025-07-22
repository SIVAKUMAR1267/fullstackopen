const Personalform =({addname,handleChangename,handleChangenumber,newName,newNumber}) =>{
    return(
        <div>
        <form onSubmit={addname}>
          <div>  
            name: <input value={newName}
            onChange={handleChangename} />
          </div>
          <div>number: <input value={newNumber}
          onChange={handleChangenumber}
          /></div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
        </div>
    )}
    export default Personalform