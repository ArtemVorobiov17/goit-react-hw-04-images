import axios from "axios";

//API key: 36025567 - 5ea91224bccb9b50632c1726a

const per_page = 12;

export async function fetchImages(query, page, totalPages) {
    const BASE_URL = 'https://pixabay.com/api/';
    const API_KEY = '36025567-5ea91224bccb9b50632c1726a';
    const params = new URLSearchParams({
        //q: query,
        //page: page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
    });
    const response = await axios.get(
        `${BASE_URL}?${params}&q=${query}&page=${page}`
        
    );
    //const totalHits = response.data.totalHits;
    //const hits = response.data.hits;
    //const pageCount = totalHits / per_page;
    //return { totalHits, hits, pageCount };
    totalPages = response.data.totalHits / per_page;
    return response.data;
}