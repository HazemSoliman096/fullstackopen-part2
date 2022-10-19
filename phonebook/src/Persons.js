const Filter = ({ value, handler }) => {
  return (
    <>
      <label htmlFor="search">First name:</label>
      <input type={"text"} id="search" value={value} onChange={handler} />
    </>
  );
}

const Persons = ({ records }) => { return records.map(p => <Person record={p} />) }

const Person = ({ record }) => <p>{record.name} {record.number}</p>

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