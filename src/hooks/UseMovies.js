import { useState } from 'react';
import withoudResults from '../mocks/no-results.json'
export function useMovies({search}) {
    const [responseMovies,setResponseMovies]=useState([])
    const movies = responseMovies.Search;
    const mappedMovies = movies?.map(movie =>( {
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }))

    const getMovies=()=>{
        if(search){
            fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=74448a73&s=${search}`)
            .then(res=>res.json())
            .then(json=>{
                setResponseMovies(json)

            })
        }else{
            setResponseMovies(withoudResults)
        }

    }
    return { movies: mappedMovies,getMovies }
}