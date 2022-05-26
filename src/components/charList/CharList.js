import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

const CharList = (props) => {
    
    const [charList, setCharList] = useState([]),
          [loading, setLoading] = useState(true),
          [error, setError] = useState(false),
          [newItemsLoading, setNewItemsLoading] = useState(false),
          [offset, setOffset] = useState(210),
          [charEnded, setCharEnded] = useState(false)
    
    const marvelService = new MarvelService();

   
    useEffect(() => {
        onRequest()
    }, [])

    const onRequest = (offset) => {
        onLoading()
        marvelService.getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(onError)
    }

    const onLoading = () => {
        setNewItemsLoading(true)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(false);
        setNewItemsLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended)

    }
    const onError = () => {
        setLoading(false);
        setError(true)
    }
    
    const itemRefs = useRef([]);

    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
    }

    function renderItem(arr) {
        const items = arr.map((item, i) => {
        let imgStyle = {'objectFit' : 'cover'};
        if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'}
        }

        return (
            <li className="char__item"
            ref={el => itemRefs.current[i] = el}
            key={item.id}
            onClick={() => {
                props.onCharSelected(item.id)
                focusOnItem(i)
            }}                                      >
                <img src={item.thumbnail} alt="abyss" style={imgStyle}/>
                <div className="char__name">{item.name}</div>
            </li>
        )
        });
        
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    
    
    const items = renderItem(charList);
    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}
            <button 
                className="button button__main button__long"
                disabled={newItemsLoading}
                onClick={() => onRequest(offset)}
                style={{'display': charEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}
CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;