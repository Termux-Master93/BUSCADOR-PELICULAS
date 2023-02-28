import { useState, useRef, useMemo, useCallback} from 'react';
import { searchMovies } from '../services/movies';
export function useMovies({ search,sort }) {
    const previeAsSerch = useRef(search) //la ostia pe
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getMovies = useCallback( async ({search}) => {
            if (search === previeAsSerch.current) return
    
            try {
                setLoading(true)
                setError(null)
                previeAsSerch.current=search //checamos la llamada
                const newMovies = await searchMovies({ search })
                setMovies(newMovies)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
    
        },[])
    /*const sorteMovies=sort
     ?  [...movies].sort((a,b)=>a.title.localeCompare(b.title))
     : movies
     console.log('render',movies)*/
     const sorteMovies=useMemo(()=>{
        console.log('render')
        return sort
            ? [...movies].sort((a,b)=>a.title.localeCompare(b.title))
            : movies
     },[sort,movies])
    return { movies: sorteMovies, getMovies, loading }
}