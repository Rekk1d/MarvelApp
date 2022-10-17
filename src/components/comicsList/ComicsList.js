import { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './comicsList.scss';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { func } from 'prop-types';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]),
          [newItemsLoading, setNewItemsLoading] = useState(false),
          [offset, setOffset] = useState(0),
          [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initital) => {
        initital ? setNewItemsLoading(false) : setNewItemsLoading(true)
        getAllComics(offset)
            .then(onComicsLoaded)
    }
    
    const onComicsLoaded = (newComicsList) => {
        let ended = false
        if(newComicsList.length < 8) {
            ended = true
        }
        setComicsList(comicsList => [...comicsList, ...newComicsList])
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li 
                className="comics__item"
                key={i}>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(comicsList)
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemsLoading? <Spinner/> : null
    

    return (
        
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
            disabled={newItemsLoading}
            onClick={() => onRequest(offset)}
            style={{'display': comicsEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;