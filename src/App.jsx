
import './App.css'
import { useCallback, useRef } from 'react'
import debounce from 'just-debounce-it'
import { useState,useEffect } from 'react'
import { Movies } from './componets/Movies'
import { useMovies } from './hooks/UseMovies'

function useSearch(){
  const [search,updateSeacrch]=useState('');
  const [error,setError]=useState(null);
  const isFirtsInput=useRef(true)
  useEffect(()=>{
    if(isFirtsInput.current ){
        isFirtsInput.current= search ===''
        return
    }
    if(search===''){
      setError('no se puede buscar una pelicula vacia')
      return
    }
      if(search.match(/^\d+$/)){
        setError('no puede buscar una pelicula con un numero')
        return
      }
    if(search.length<3){
      setError('la pelicula buscada debe ser de 3 a mas caracteres')
      return
    }
    setError(null)
  } ,[search])
  return {search,updateSeacrch,error}
}

function App() {
  const [sort,setSort]=useState(false)
  const {search,updateSeacrch,error}=useSearch();
  const {movies: mappedMovies,loading,getMovies}=useMovies({search,sort});

  //Ordenar las peliculas
  const handleSort=()=>{
    setSort(!sort) //change the status
  } 
const debounceGetMovies=useCallback(
  debounce(search=>{
    console.log('seacrh',search)
    getMovies({search})
  },300)
  ,[getMovies]
)
  const handleSubmit=(event)=>{
    event.preventDefault()
    getMovies({search})
  }
  const handleChanged=(event)=>{
    event.preventDefault();
    const newSearch=event.target.value;
    updateSeacrch(event.target.value)
    debounceGetMovies(newSearch)
   
  }
 
  return (
    <div className='page'>
      <h2>Buscador de peliculas</h2>
      <header>
        <form onSubmit={handleSubmit}>
          <input style={{border: '2px solid transparent', borderColor: error ? 'red': 'transparent' }} value={search} onChange={handleChanged} type={'text'} placeholder="searchs" />
          <input  type={'checkbox'} onChange={handleSort} checked={sort}/>
          <button type='submit'>Search</button>
        </form>
        <p style={{color: 'red'}}>{error}</p>
      </header>
      <main>
        {
          loading 
            ? <p>Cargando...</p>
            :
            <Movies movies={mappedMovies} />
        }
      </main>

    </div>
  )
}

export default App
