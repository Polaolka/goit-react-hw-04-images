import { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';
import { IconContext } from 'react-icons';

export const Searchbar = ({ onSubmit }) => {
const [searchQuery, setSearchQuery] = useState('')

  const handleInputChange = e => {
    setSearchQuery(s => s = e.target.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery);

    setSearchQuery('');
  };

    return (
      <header className={css.searchbar}>          
            <form className={css.form} onSubmit={handleSubmit}>
              <button type="submit" className={css.button}>
                <IconContext.Provider value={{ size: '25px' }}>
                  <FcSearch />
                </IconContext.Provider>
              </button>
              <input
                className={css.input}
                type="text"
                autoComplete="off"
                placeholder="Search images and photos"
                onChange={handleInputChange}
                value={searchQuery}
              />
            </form>
          
        
      </header>
    );

}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}