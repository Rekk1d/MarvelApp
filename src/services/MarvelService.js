import {useHttp} from '../hooks/http.hook';

const  useMarvelService = () => {
    const {loading, error, clearError, request} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=adaf9752804023f088d1eb53f9af34a5';
    const _baseCharOffset = 210;
    
    const getAllCharacters = async (offset = _baseCharOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformChar)
    }
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformChar(res.data.results[0])
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformComics)
    }
    
    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformComics(res.data.results[0])
    }

    const _transformChar = (char) => {
        return  {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0, 210) + '...' : 'No information' ,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }
    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description ? comics.description : 'No information',
            pageCount: comics.pageCount ? `${comics.pageCount} р.` : 'No information about the number of pages',
            language: comics.textObjects.language || 'en-us',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }
    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics, getComic}
}

export default useMarvelService;