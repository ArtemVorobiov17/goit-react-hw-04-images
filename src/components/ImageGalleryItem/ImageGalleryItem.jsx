import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export function ImageGalleryItem({image, openModal}) {
    const { id, webformatURL } = image;

    return (
        <li id={id} className={css.gallery__item}>
            <img
                className={css.gallery__images}
                src={webformatURL}
                alt=""
                onClick={() => {
                    openModal(id);
                }}
            />
        </li>
    );
};


ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
    }).isRequired,
    openModal: PropTypes.func.isRequired,
};



