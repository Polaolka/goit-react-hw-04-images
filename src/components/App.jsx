import { Component } from 'react';
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
import css from './App.module.css'

export class App extends Component {
  state = {
    page: 1,
    maxPage: 1,
    images: [],
    query: '',
    showModal: false,
    isImagesLoading: false,
    total: 0,
    totalPage: 0,
    showLoadMore: false,
    largeImageURL: '',
    openImgTags: '',
  };

  handleFormSubmit = searchQuery => {
    window.scrollTo(0, 0);
    if (searchQuery.trim() === '') {
      toast("Search request shouldn't be empty", {
        icon: '🚀',
      });
      return;
    }
    this.setState({ query: searchQuery, page: 1, images: [] });
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isImagesLoading: true });
        const response = await getImages(this.state.query, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response.images],
          total: response.totalImg,
          isImagesLoading: false,
          totalPage: response.totalPage,
        }));
        
        if (response.images.length === 0) toast('No images found');

        if (response.images.length > 0 && this.state.page === 1)
          toast(`found ${response.totalImg} images`);

        if (this.state.page === response.totalPage && response.totalPage > 1)
          toast(`this is the last page`);
    }
  }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleOpenModal = (e) => {
    if(e.target.nodeName === 'IMG');
    {const openImg = e.target.getAttribute("data-modal");
    const openImgDescr = e.target.getAttribute("data-tags");
    this.setState({
      largeImageURL: openImg, 
      openImgTags: openImgDescr})
    this.toggleModal();


    }
  }

  render() {
    const { images, showModal, total, isImagesLoading, page, totalPage, largeImageURL, openImgTags } =
      this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <Container>
        {total > 0 ? (
          <ImageGallery images={images} 
          onClickImg={this.handleOpenModal}/>
        ) : (
          <p className={css.empty}>So far it's empty, start searching <BsArrowUp/></p>
        )}
        {isImagesLoading && <Loader />}
        {total > 0 && page < totalPage && (
          <LoadMoreBtn onloadMore={this.handleLoadMore} />
        )}
        {showModal && <Modal onClose={this.toggleModal} largeImageURL={largeImageURL} openImgTags={openImgTags}/>}
        </Container>
        <ToastContainer autoClose={2500}/>
      </div>
    );
  }
}
