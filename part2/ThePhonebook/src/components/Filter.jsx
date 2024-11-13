const Filter =({newfilter,handleChangefilter}) =>{
    return (
      <div>
        <h2>Phonebook</h2>
        <div>
        filter shown with:<input value={newfilter}
        onChange={handleChangefilter}/>
        </div>
    </div>
  )}
export default Filter