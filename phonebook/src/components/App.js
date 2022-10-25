import { useEffect, useState } from 'react';

import { Filter, Persons, PersonForm } from './Persons';
import { Notification } from './Notification';
import phoneService from '../services/phoneServices';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [searchTerm, setsearchTerm] = useState('');
  const [message, setMessage] = useState(null);
  const [style, setStyle] = useState('');

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

    let oldPerson = persons.filter(p => p.name === person.name)[0];
    if(persons.filter(p => p.name === person.name).length === 0)
    {
      phoneService.create(person)
        .then(Response => {
          setPersons(persons.concat(Response.data));
          setMessage(`Added ${person.name}`)
          setStyle('success');
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        })
        .catch(error => {
          setMessage(`Can not add Person ${person.name}`);
          setStyle('error');
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        });
    } else {
      if (window.confirm(`${person.name} is already added to phonebook, replace the old number with new one.`)) {
        phoneService.updatePerson(oldPerson.id, person)
         .then(Response => {
          setPersons(persons.map(p => p.id !== oldPerson.id ? p : Response.data));
          setMessage(`Updated ${person.name}`);
          setStyle('success');
          setTimeout(() => {
            setMessage(null);
          }, 5000);
         })
         .catch(error => {
          setMessage(`Can not update Person ${oldPerson.name}`);
          setStyle('error');
          setTimeout(() => {
            setMessage(null);
          }, 5000);
         });
      }
    }


    setNewName('');
    setNewPhone('');
  }

  const handleDelete = (id) => {
    if (window.confirm("Do you really want to Delete This Person?")) {
      phoneService.deletePerson(id);
      setPersons(persons.filter(p => p.id !== id));
    }
  }

  const filterdPersons = searchTerm === '' ? persons : persons.filter(P => P.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification msg={message} style={style} />
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