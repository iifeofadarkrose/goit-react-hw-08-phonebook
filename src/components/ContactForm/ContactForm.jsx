// import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { fetchAddContact } from 'redux/apiOperations';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  let nameInputId = nanoid(10);
  let numberInputId = nanoid(10);

  const handleInputChange = evt => {
    const { name, value } = evt.currentTarget;

    const fieldHandlers = {
      name: setName,
      number: setNumber,
    };

    const fieldHandler = fieldHandlers[name];

    if (fieldHandler) {
      fieldHandler(value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
       alert(`You allready have this contact!`);
      return;
    }
    const contact = { name, phone: number };
    dispatch(fetchAddContact(contact));
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor={nameInputId} className={css.label}>
        Name
      </label>
      <input
        className={css.input}
        id={nameInputId}
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleInputChange}
      />
      <label htmlFor={numberInputId} className={css.label}>
        Number
      </label>
      <input
        className={css.input}
        id={numberInputId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleInputChange}
      />
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};

// ContactForm.propTypes = {
//   submit: PropTypes.func.isRequired,
// };

export default ContactForm;
