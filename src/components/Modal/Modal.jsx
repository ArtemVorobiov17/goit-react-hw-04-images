import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, children}) => {
    
    return createPortal(
        <div onClick={onClose} className={css.overlay}>
            <div className={css.modal}>
                {children}
            </div>
        </div>,
        modalRoot
    );
}



Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

    



