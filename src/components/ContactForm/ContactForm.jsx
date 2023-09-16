// import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import { fetchAddContact } from 'redux/contacts/apiOperations';
import iziToast from 'izitoast';
import '/node_modules/izitoast/dist/css/iziToast.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  let nameInputId = nanoid(10);
  let numberInputId = nanoid(10);

  const handleInputName = evt => {
    setName(evt.currentTarget.value);
  };
  const handleInputNumber = evt => {
    setNumber(evt.currentTarget.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      iziToast.warning({
        title: 'Caution',
        message: `Contact with this name "${existingContact.name}" is already exists.`,
      });
      return;
    }
    evt.preventDefault();

    const contact = {
      name,
      number,
    };
    
    dispatch(fetchAddContact(contact));

    if (!existingContact) {
      reset();
    }
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
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleInputName}
      />
      <label htmlFor={numberInputId} className={css.label}>
        Number
      </label>
      <input
        className={css.input}
        id={numberInputId}
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleInputNumber}
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
