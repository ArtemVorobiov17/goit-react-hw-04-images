import { useEffect, useState } from "react";
import { fetchImages } from "servises/api";
import { Searchbar } from "components/Searchbar/Searchbar";
import { Modal } from "components/Modal/Modal";
import { Loader } from "components/Loader/Loader";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import { Button } from "components/Button/Button";
import Notiflix from "notiflix";
import css from './App.module.css';



export const App = () => {
  
  const [images, setImages] = useState('');
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImage, setLargeImage] = useState('');
 

  const openModal = id => {
    setIsLoading(true);
    const largeImage = images.find(image => image.id === id);
    setLargeImage(largeImage.largeImageURL);
    setIsLoading(false);
    setShowModal(true);
    window.addEventListener('keydown', keyDown);
  };
  
  const removeEvent = () => {
    setShowModal(false);
    window.removeEventListener('keydown', keyDown);
  };

  const keyDown = event => {
    if (event.code === 'Escape') {
      removeEvent();
    }
  };

  const onClickBackdrop = event => {
    if (event.currentTarget === event.target) {
      removeEvent();
    }
  };
  
  const fetchImageArr = async (query, page) => {
    setIsLoading(true);
    const { totalHits, hits } = await fetchImages(query, page);
    const pageCount = totalHits / 12;
    setTotalPages(pageCount);
    return hits;
  };

  const handleSubmit = demand => {
    setImages([]);
    setQuery(demand);
    setPage(1);
    if (!demand) {
      Notiflix.Notify.warning('Please, enter your request!');
    } else {
      fetchImageArr(demand, 1).then(hits => setImages(hits));
      setIsLoading(false);
    }
  };

  const buttonOnClick = event => {
    event.preventDefault();
    setPage(prevPage => prevPage + 1);
    
    fetchImageArr(query, page + 1).then(hits =>
      setImages(prevState => [...prevState, ...hits])
    );
    setIsLoading(false);
  };

  useEffect(() => {
    if (!query) {
      setQuery('');
      setImages([]);
      return;
    }
  }, [query, page]);



    return (
      <div className={css.container}>
        {isLoading && <Loader />}
        <Searchbar onSubmit={handleSubmit} />
        {query !== '' && (
          <>
            <ImageGallery images={images} openModal={openModal} />
            {page < totalPages && <Button onClick={buttonOnClick} />}
          </>
        )}
        {showModal && (
          <Modal onClose={onClickBackdrop}>
            <img src={largeImage} alt={query} />
          </Modal>
        )}
      </div>
    );
}  


Notiflix.Notify.init({
  
  position: 'right-top',
  distance: '15px'
  
  
});