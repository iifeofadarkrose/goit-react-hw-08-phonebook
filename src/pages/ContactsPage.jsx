import ContactForm from '../components/ContactForm/ContactForm';
import { ContactList } from '../components/ContactList/ContactList';
import { Filter } from '../components/Filter/Filter';
import css from './ContactsPage.module.css';
import { fetchContacts } from 'redux/contacts/apiOperations';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectError, selectIsLoading, selectContacts } from 'redux/selectors';
import { ThreeDots } from 'react-loader-spinner';

const ContactsPage = () => {
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
          {isLoading && !error && <ThreeDots color='white' />}
          {contacts && <ContactList />}
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
