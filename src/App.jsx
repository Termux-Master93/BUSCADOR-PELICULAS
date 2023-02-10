
import './App.css'
import { Movies } from './componets/Movies'
import { useMovies } from './hooks/UseMovies'

function App() {
  const {movies: mappedMovies}=useMovies()
  
  return (
    <div className='page'>
      <h2>Buscador de peliculas</h2>
      <header>
        <form>
          <input type={'text'} placeholder="searchs" />
          <button type='submit'>Search</button>
        </form>
      </header>
      <main>
        <Movies movies={mappedMovies} />
      </main>

    </div>
  )
}

export default App
