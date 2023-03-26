import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';
import { TfiClose } from 'react-icons/tfi';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) this.props.onClose();
  };

  render() {
    const { onClose, largeImageURL, openImgTags } = this.props;
    return createPortal(
      <div className={css.overlay} onClick={this.handleBackdropClick}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={openImgTags} className={css.largeImage} />
          <button
            type="button"
            className={css.btnClose}
            aria-label="Close"
            onClick={onClose}
          >
            <TfiClose />
          </button>
          <div className={css.tagsBox}>{openImgTags}</div>
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openImgTags: PropTypes.string,
};
