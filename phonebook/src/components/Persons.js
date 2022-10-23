const Filter = ({ value, handler }) => {
  return (
    <>
      <label htmlFor="search">First name:</label>
      <input type={"text"} id="search" value={value} onChange={handler} />
    </>
  );
}

const Persons = ({ records, delHandler }) => { return records.map(p => <Person record={p} handler={delHandler} />) }

const Person = ({ record, handler }) => {
  return (
    <div>
      {record.name} {record.number} <button onClick={() => handler(record.id)}>Delete</button>
    </div>
  );
}

const PersonForm = ({ name, phone, handleName, handlePhone, action }) => {
  return (
    <form>
      <div>
        name: <input type={'text'} value={name} onChange={handleName} />
      </div>
      <div>
        number: <input type={'number'} value={phone} onChange={handlePhone} />
      </div>
      <div>
        <button type="submit" onClick={action}>add</button>
      </div>
    </form>
  );
}

export { Filter, Persons, PersonForm };