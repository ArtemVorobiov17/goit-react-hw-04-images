import PropTypes from 'prop-types';
import css from './Button.module.css';

export function Button ({onClick}) {
    return <button className={css.button__load} onClick={onClick}>Load more</button>
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};