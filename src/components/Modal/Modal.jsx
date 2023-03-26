import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';
import { TfiClose } from 'react-icons/tfi';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImageURL, openImgTags }) => {

  useEffect(()=>{
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    };
  }, );


  const handleKeyDown = e => {
    if (e.code === 'Escape') onClose();
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) onClose();
  };


    return createPortal(
      <div className={css.overlay} onClick={handleBackdropClick}>
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

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openImgTags: PropTypes.string,
};
