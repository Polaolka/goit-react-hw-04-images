import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsArrowUp } from 'react-icons/bs';
import { Modal } from '../components/Modal/Modal';
import { ImageGallery } from '../components/ImageGallery/ImageGallery';
import { Searchbar } from '../components/Searchbar/Searchbar';
import { Loader } from '../components/Loader/Loader';
import { getImages } from '../components/Api/Api';
import { LoadMoreBtn } from '../components/Button/Button';
import { Container } from '../components/Container/Container';
import css from './App.module.css';

export const App = () => {

  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isImagesLoading, setIsImagesLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [openImageTags, setOpenImageTags] = useState('');

  useEffect(() => {
    if (query === '')  return;

    setIsImagesLoading(true);
    
    async function fetchData() {
      const response = await getImages(query, page);
      if (response.images.length === 0) toast('No images found');
      if (response.images.length > 0 && page === 1)
        toast(`found ${response.totalImg} images`);
      setImages(s => [...s, ...response.images]);
      setTotal(response.totalImg);
      setIsImagesLoading(false);
  
      setTotalPage(response.totalPage);
      if (page === response.totalPage && response.totalPage > 1)
        toast(`this is the last page`);
    }
    fetchData();
  }, [query, page]);

  const handleFormSubmit = searchQuery => {
    window.scrollTo(0, 0);
    if (searchQuery.trim() === '') {
      toast("Search request shouldn't be empty", {
        icon: '🚀',
      });
      return;
    }
    setQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  

  const toggleModal = () => {
    setShowModal(s => (s = !showModal));
  };

  const handleLoadMore = () => {
    setPage(s => (s += 1));
  };

  const handleOpenModal = e => {
    if (e.target.nodeName === 'IMG');
    {
      const openImgBigURL = e.target.getAttribute('data-modal');
      const openImgDescr = e.target.getAttribute('data-tags');
      setLargeImageURL(openImgBigURL);
      setOpenImageTags(openImgDescr);
      toggleModal();
    }
  };
  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <Container>
        {total > 0 ? (
          <ImageGallery images={images} onClickImg={handleOpenModal} />
        ) : (
          <p className={css.empty}>
            So far it's empty, start searching <BsArrowUp />
          </p>
        )}
        {isImagesLoading && <Loader />}
        {total > 0 && page < totalPage && (
          <LoadMoreBtn onloadMore={handleLoadMore} />
        )}
        {showModal && (
          <Modal
            onClose={toggleModal}
            largeImageURL={largeImageURL}
            openImageTags={openImageTags}
          />
        )}
      </Container>
      <ToastContainer autoClose={2500} />
    </div>
  );
};
