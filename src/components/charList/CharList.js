import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemsLoading: false,
        offset: 210,
        charEnded: false
    }
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest()
    }

    onRequest = (offset) => {
        this.onLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onLoading = () => {
        this.setState({
            newItemsLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({charList, offset}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemsLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }
    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }
    
    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

    focusOnItem = (id) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
    }

    renderItem(arr) {
        const items = arr.map((item, i) => {
        let imgStyle = {'objectFit' : 'cover'};
        if(item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
            imgStyle = {'objectFit' : 'unset'}
        }

        return (
            <li className="char__item"
            ref={this.setRef}
            key={item.id}
            onClick={() => {
                this.props.onCharSelected(item.id)
                this.focusOnItem(i)
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
    
    render() {
        const {charList, loading, error, newItemsLoading, offset, charEnded} = this.state;
        const items = this.renderItem(charList);
        
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
                    onClick={() => this.onRequest(offset)}
                    style={{'display': charEnded ? 'none' : 'block'}}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}
CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;