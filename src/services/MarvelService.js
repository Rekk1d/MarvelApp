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
    return {loading, error, clearError, getAllCharacters, getCharacter}
}

export default useMarvelService;