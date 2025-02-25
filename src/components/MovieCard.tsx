import React from 'react'

// In the props of the function call the prop you're passing and tell it which elements will use in other brackets so you can use that directly
const MovieCard = ({movie: {title, vote_average, poster_path, release_date, original_language}}) => {
  return (
    <div className='bg-dark-100 p-5 rounded-2xl text-white gap-1'>
      <img src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}`: '/no-movie.png'} alt={title} />
      <div className='mt-4'>
        <h3>{title}</h3>
        <div className='content flex flex-row gap-2'>
            <div className='rating'>
                {/* To fixed is just to round the number (builtin javascript) */}
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            <span> • </span>
            <p className='lang'> {original_language}</p>
            <span> • </span>
            <p className='year'> {release_date ? release_date : "No date"}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCard