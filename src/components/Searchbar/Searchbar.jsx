import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';
import { IconContext } from 'react-icons';

export class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInputChange = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.searchQuery);

    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={css.searchbar}>          
            <form className={css.form} onSubmit={this.handleSubmit}>
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
                onChange={this.handleInputChange}
                value={this.state.searchQuery}
              />
            </form>
          
        
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired
}