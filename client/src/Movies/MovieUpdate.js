import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';


function Movie(props) {
    const [movie, setMovie] = useState(null);
    const match = useRouteMatch();
    let history = useHistory();

    console.log(props)
    const handleChanges = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }
    const handleActor = e => {
        console.log(e)
        let tempArr = movie.stars
        tempArr[e.target.name] = e.target.value

        console.log(tempArr)

        setMovie({...movie, stars: tempArr })
    }

    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err.response));
    };
    const postMovie = movie => {
       axios
       .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
       .then(res => {
        history.push(`/movies/${movie.id}`);
       })
       .catch(err => console.log(err))
    }
    console.log(movie)

    useEffect(() => {
        fetchMovie(match.params.id);
    }, [match.params.id]);

    if (!movie) {
        return <div>Loading movie information...</div>;
    }

    return (

        <div className="movie-card">
            <h2>{movie.title}</h2>
            <div className="movie-director">
                Director: <em>{movie.director}</em>
            </div>
            <div className="movie-metascore">
                Metascore: <strong>{movie.metascore}</strong>
            </div>
            {movie.stars.map(star => (
             <div key={star} className="movie-star">
             {star}
            </div>
             ))}

            <div>
                <input type='text' name='title' value={movie.title} onChange={handleChanges} placeholder='Title' />
                <input type='text' name='director' value={movie.director} onChange={handleChanges} placeholder='Director' />
                <input type='text' name='metascore' value={movie.metascore} onChange={handleChanges} placeholder='Metascore' />
                {movie.stars.map( (e,i) =>{
                    return(
                        <input type='text' name={i} value={e} onChange={handleActor} placeholder='actor' />
                    )
                })}
                
                
                <button onClick={()=> postMovie(movie) }>Edit</button>
            </div>
        </div>
    );
}

export default Movie;
