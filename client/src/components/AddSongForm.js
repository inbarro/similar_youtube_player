import React, { useState, useContext } from 'react';
import classes from './AddSongForm.Module.css'
import playerContext from '../context/playerContext';


function AddSongForm() {
    const [url, setUrl] = useState('');
    const { addSong } = useContext(playerContext);


    const handleSubmit = async (event) => {
        event.preventDefault();
        addSong(url);
        setUrl('');
    };

    const handleChange = event => {
        setUrl(event.target.value)
    };

    const handeKeyDown = event => {
        if (event.keyCode === 13) {
            handleSubmit(event);
        }
    };

    return (
        <form className={classes.form} onSubmit={handleSubmit}>
            <input className={classes.input}
                type="text"
                id='url'
                placeholder={'Enter Video Id'}
                value={url}
                onChange={handleChange}
                onKeyDown={handeKeyDown}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddSongForm;
