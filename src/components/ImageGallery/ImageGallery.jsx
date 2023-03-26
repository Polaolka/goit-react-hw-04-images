import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import css from '../ImageGallery/ImageGallery.module.css';

export const ImageGallery = ({isImagesLoaded, onClickImg, images}) => {
  return (
<div className={css.container}>
        <ul className={css.gallery}>
          {isImagesLoaded && <p>loaded...</p>}
          {images &&
            images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
              largeImageURL={largeImageURL}
                onClickImg={onClickImg}
                key={id}
                id={id}
                webformatURL={webformatURL}
                target="_blank"
                rel="noreferrer noopener"
                tags={tags}
              />
            ))}
        </ul>

      </div>
  );
};


ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired, 
      webformatURL: PropTypes.string.isRequired, 
      largeImageURL: PropTypes.string.isRequired, 
      tags: PropTypes.string,
    })
  ),
  isImagesLoaded: PropTypes.bool,
  onClickImg: PropTypes.func.isRequired,
}