import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export function ImageGallery({ images, openModal }) {
    return (
        <ul id="gallery" className={css.gallery}>
            {images.map(image => (
                <ImageGalleryItem key={image.id} image={image} openModal={openModal} />
            ))}
        </ul>
    );
};


ImageGallery.propTypes = {
    images: PropTypes.array.isRequired,
    openModal: PropTypes.func.isRequired,
};


