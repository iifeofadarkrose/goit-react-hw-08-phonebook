import css from './Filter.module.css';
import { useSelector } from 'react-redux';
import { setFilterList } from 'redux/sliceFilter';
import { useDispatch } from 'react-redux';

export const Filter = () => {
  const filterList = useSelector(state => state.filter.filter);
  const dispatch = useDispatch();

  return (
    <div className={css.filter_container}>
      <label className={css.label}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={filterList}
          placeholder="Search..."
          onChange={evt => dispatch(setFilterList(evt.currentTarget.value))}
        />
      </label>
    </div>
  );
};
