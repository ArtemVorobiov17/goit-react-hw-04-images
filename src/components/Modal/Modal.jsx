import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.keyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.keyDown);
    };

    keyDown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();;
        }
    };

    onClickBackdrop = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();;
        }
    };

    render() {
        return createPortal(
            <div onClick={this.onClickBackdrop} className={css.overlay}>
                <div className={css.modal}>
                    {this.props.children}
                </div>
            </div>,
            modalRoot
        );
    }
}


Modal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

    



