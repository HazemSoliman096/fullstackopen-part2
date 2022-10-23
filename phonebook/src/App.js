import { useEffect, useState } from 'react';
import axios from 'axios';

import { Filter, Persons, PersonForm } from './Persons';
import phoneService from './services/phoneServices';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setsearchTerm] = useState('');

  useEffect(() => {
        phoneService.getAll()
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

    if(persons.filter(p => p.name === person.name).length === 0)
    {
      phoneService.create(person)
        .then(Response => setPersons(persons.concat(Response.data)))
        .catch(console.log(`Can not add Person ${person.name}`));
    } else {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with new one.`)) {
        let oldPerson = persons.filter(p => p.name === person.name)[0];
        console.log(oldPerson);
        phoneService.updatePerson(oldPerson.id, person)
         .then(Response => setPersons(persons.map(p => p.id !== oldPerson.id ? p : Response.data)))
         .catch(console.log(`Can not update Person ${oldPerson.name}`));
      }
    }


    setNewName('');
    setNewPhone('');
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to Delete This Person?")) {
      phoneService.deletePerson(id);
    }
  }

  const filterdPersons = searchTerm === '' ? persons : persons.filter(P => P.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchTerm} handler={handlesearchTerm} />
      <Header title={'add a new'} />
      <PersonForm name={newName} phone={newPhone} handleName={handleName} handlePhone={handlePhone} action={AddPhone} />
      <Header title={'Numbers'} />
      <Persons records={filterdPersons} delHandler={handleDelete} />
    </div>
  )
}


const Header = ({title}) => <h3>{title}</h3>

export default App