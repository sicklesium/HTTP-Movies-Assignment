import React, { useState, useEffect } from "react"
import axios from "axios"

const UpdateMovie = props => {
    const [movie, setMovie] = useState({
        id: 0,
        title: "",
        director: "",
        metascore: 0,
        stars: []
    })

    // GET movie details
    const { id } = props.match.params
    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie({ ...movie, ...res.data })
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    // Handlers

    const changeHandler = event => {
        if (event.target.name === "stars") {
            setMovie({
                ...movie,
                stars: event.target.value.split(",")
            })
        } else if (event.target.name === "metascore") {
            setMovie({ ...movie, metascore: Number(event.target.value) })
        } else {
            setMovie({
                ...movie,
                [event.target.name]: event.target.value
            })
        }
    }

    const submitHandler = event => {
        event.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(res)
                if (id) {
                    props.history.push(`/movies/${id}`)
                }
            })
            .catch(err => {
                console.log(err)
                console.log(movie)
            })
    }

    return (
        <div className="save-wrapper">
            <div className="update-movie">
                <h1>Edit Movie</h1>
                <form onSubmit={submitHandler} className="update-form">
                    <label htmlFor="title">
                        Title:
            <input
                            type="text"
                            name="title"
                            placeholder="title"
                            onChange={changeHandler}
                            value={movie.title}
                        />
                    </label>
                    <label htmlFor="director">
                        Director:
            <input
                            type="text"
                            name="director"
                            placeholder="Francis Ford Coppola"
                            onChange={changeHandler}
                            value={movie.director}
                        />
                    </label>
                    <label htmlFor="metascore">
                        Metascore:
            <input
                            type="number"
                            name="metascore"
                            placeholder="score"
                            onChange={changeHandler}
                            value={movie.metascore}
                        />
                    </label>
                    <label htmlFor="metascore">
                        Stars:
            <input
                            type="text"
                            name="stars"
                            placeholder="stars"
                            onChange={changeHandler}
                            value={movie.stars}
                        />
                    </label>
                    <button className="edit-button" type="submit">
                        Edit
          </button>
                </form>
            </div>
        </div>
    )
}

export default UpdateMovie;