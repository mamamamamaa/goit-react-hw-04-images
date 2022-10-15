import { useState } from 'react';
import PropTypes from 'prop-types';
import { BiSearch } from 'react-icons/bi';

import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ data }) => {
  const [input, setInput] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    const query = evt.target.searchQuery.value;
    data(query);

    setInput('');
  };

  const handleChange = e => setInput(e.target.value);

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <BiSearch size={25} />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          name="searchQuery"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={input}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchBar>
  );
};

SearchBar.propTypes = {
  data: PropTypes.func.isRequired,
};
