const API_KEY='74448a73'
export const searchMovies = async({search})=>{
    if(search==='') return
    try{
        const resposense=await  fetch(` http://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}&s=${search}`)
       const json=await resposense.json()
    
       const movies = json.Search;
       return movies?.map(movie =>( {
           id: movie.imdbID,
           title: movie.Title,
           year: movie.Year,
           poster: movie.Poster
       })) 
    } catch{
        throw new Error('error searching movies')
    }
      
    
}