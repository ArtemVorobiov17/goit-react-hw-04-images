import { Component } from "react";
import { fetchImages } from "servises/api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import Notiflix from "notiflix";
import css from './App.module.css';


 

export class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    totalPages: 0,
    isLoading: false,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchImageArr(prevState);
    }
  };

  closeModal = () => {
    this.setState(({ showModal }) => {
      return { showModal: !showModal };
    });
  };
 

  openModal = id => {
  this.setState({ isLoading: true });
  const largeImage = this.state.images.find(image => image.id === id);

  this.setState({
    largeImageURL: largeImage.largeImageURL,
    isLoading: false,
  });

  this.closeModal();
};
  
 
  
  handleSubmit = query => {
    this.setState({ images: [], query: query, page: 1 });
    if (!query) {
      Notiflix.Notify.warning('Please, enter your request!');
    }
  };

  buttonOnClick = () => {
    this.setState({
      page: this.state.page + 1,
    });
  };

  fetchImageArr = async prevState => {
    try {
      this.setState({ isLoading: true });
      const { query, page } = this.state;
      const { totalHits, hits } = await fetchImages(query, page);
      const pageCount = totalHits / 12;
      this.setState({
        totalPages: pageCount,
      });
      if (page !== prevState.page) {
        this.setState(prevState => ({
          images: [...prevState.images, ...hits],
          isLoading: false,
        }));
      } else {
        this.setState({ images: hits, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const {
      images,
      query,
      isLoading,
      page,
      totalPages,
      showModal,
      largeImageURL
    } = this.state;

    return (
      <div className={css.container}>
        {isLoading && <Loader />}
        <Searchbar onSubmit={this.handleSubmit} />
        {query !== '' && (
          <>
            <ImageGallery images={images} openModal={this.openModal} />
            {page < totalPages && <Button onClick={this.buttonOnClick} />}
          </>
        )}
        {showModal && (
          <Modal onClose={this.closeModal}>
            <img src={largeImageURL} alt={query} />
          </Modal>
        )}
      </div>
    );
  }  
}


Notiflix.Notify.init({
  
  position: 'right-top',
  distance: '15px'
  
  
});