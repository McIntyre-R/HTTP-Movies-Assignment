import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, Link, useHistory  } from 'react-router-dom';
import MovieCard from './MovieCard';


function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  let history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const deleteMovie = id => {
    axios.delete(`http://localhost:5000/api/movies/${id}`)
    .then(res =>{
      history.push(`/`);
     })
    .catch(err => console.log(err))
  }


  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <Link key={movie.id} to={`/update-movie/${movie.id}`} >
      <div className='edit-button'>
        Edit
      </div>
      </Link>
      <div className='delete-button' onClick={() => deleteMovie(match.params.id)}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
