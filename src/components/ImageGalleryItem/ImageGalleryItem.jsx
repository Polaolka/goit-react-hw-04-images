import React from 'react';
import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';


export const ImageGalleryItem = ({ webformatURL, tags, id, onClickImg, largeImageURL }) => {
return (
  <li className={css.galleryItem} key={id} onClick={onClickImg}>
  <img
    className={css.galleryImage}
    src={webformatURL}
    alt={tags}
    data-modal={largeImageURL}
    data-tags={tags}
  />
</li>
);
};

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string,
  isImagesLoaded: PropTypes.bool,
  onClickImg: PropTypes.func.isRequired,
};
