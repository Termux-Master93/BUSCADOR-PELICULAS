import { useState, useRef } from 'react';
import { searchMovies } from '../services/movies';
export function useMovies({ search }) {
    const previeAsSerch = useRef(search) //la ostia pe
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const getMovies = async () => {
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

    }
    return { movies, getMovies, loading }
}