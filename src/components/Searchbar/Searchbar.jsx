import PropTypes from 'prop-types';
import { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';



export const Searchbar =({onSubmit})=> {

    const [value, setValue] = useState('');

    const onChange = event => {
        setValue(event.currentTarget.value.toLowerCase().trim())
    };

    const handleOnSubmit = event => {
        event.preventDefault();
        onSubmit(value);
        
        event.currentTarget.reset();
        setValue('');
    };

    return (

        <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleOnSubmit}>
                <button type="submit" className={css.button}>
                    <BiSearch size="20" />
                </button>

                <input
                    className={css.input}
                    onChange={onChange}
                    name="search"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );           
}


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};