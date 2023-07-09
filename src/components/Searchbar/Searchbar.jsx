import PropTypes from 'prop-types';
import { Component } from 'react';
import { BiSearch } from 'react-icons/bi';
import css from './Searchbar.module.css';



export class Searchbar extends Component {
    state = {
        value: '',
    };

    onChange = event => {
        this.setState({ value: event.currentTarget.value.toLowerCase().trim() })
    };

    onSubmit = event => {
        event.preventDefault();
        this.props.onSubmit(this.state.value);
        this.setState({ value: '' });
        event.currentTarget.reset();
    };

    render() {
        return (

            <header className={css.searchbar}>
                <form className={css.form} onSubmit={this.onSubmit}>
                    <button type="submit" className={css.button}>
                        <BiSearch size="20" />
                    </button>

                    <input
                        className={css.input}
                        onChange={this.onChange}
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
}


Searchbar.propTupes = {
    onSubmit: PropTypes.func.isRequired,
};