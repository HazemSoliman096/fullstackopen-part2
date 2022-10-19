import { useEffect, useState } from 'react';
import axios from 'axios';

import { Filter, Persons, PersonForm } from './Persons';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

  useEffect(() => {
    axios
        .get('http://localhost:3001/persons')
        .then(Response => setPersons(Response.data));
  }, []);

  const handleName = (event) => {
    setNewName(event.target.value);
  }

  const handlePhone = (event) => {
    setNewPhone(event.target.value);
  }

  const handlesearchTerm = (event) => {
    setsearchTerm(event.target.value);
  }

  const AddPhone = (event) => {
    event.preventDefault();
    const person = {
      name: newName,
      number: newPhone
    };
    setPersons(persons.concat(person));
    setNewName('');
    setNewPhone('');
  }

  const filterdPersons = searchTerm === '' ? persons : persons.filter(P => P.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} handler={handlesearchTerm} />
      <Header title={'add a new'} />
      <PersonForm name={newName} phone={newPhone} handleName={handleName} handlePhone={handlePhone} action={AddPhone} />
      <Header title={'Numbers'} />
      <Persons records={filterdPersons} />
    </div>
  )
}


const Header = ({title}) => <h3>{title}</h3>

export default App