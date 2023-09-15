import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import css from './App.module.css';
import { fetchContacts } from 'redux/apiOperations';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading, selectContacts } from 'redux/selectors';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className={css.container}>
      <div className={css.phonebook}>
        <h1 className={css.heading}>Phonebook</h1>
        <ContactForm />
        <h2 className={css.heading}>Contacts</h2> 
        <div className={css.filterContainer}>
          <Filter />
          {isLoading && !error && <b>Request in progress...</b>}
          {contacts && <ContactList />}
        </div>
      </div>
    </div>
  );
};

export default App;
