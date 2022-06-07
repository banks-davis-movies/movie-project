"use strict";
(function () {

    // This project's API: https://aromatic-subsequent-sun.glitch.me/movies
    // Poster API in keys file
    const URL = "https://aromatic-subsequent-sun.glitch.me/movies";

    //load available movies. Needs edit to add data to page
    const getMovies = () => {
        return fetch(URL)
            .then(res => res.json())
            .then(results => console.log(results))
            .catch(error => console.error(error))
    }
    //getMovies()


//pulls movie by ID number
    const SelectById= (id) => {
        //console.log(`${URL}/${id}`)
        return fetch(`${URL}/${id}`).then(res => res.json()).then(res => console.log(res));
    }
    SelectById(260);



    const addMovie = (movieObj) => {
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songObj)
        }
        return fetch(URL, options).then(res => res.json()).then(result => console.log("You've successfully created a new song!", result))
    }


    //builds movie posters. Needs work
    const buildMovie = () => {
        getMovies().then((data) => {
            let posters = data.map(movie => {
                return `
            <div>
            <h3>Title: ${movie.title}</h3>
            <p>Artist: ${movie.director}</p>
            <p>Genre: ${movie.genre}</p>
            <p>Rating: ${movie.rating}</p>
            <button data-id="${movie.id}">Edit</button>
            <button data-id="${movie.id}">Delete</button>
            </div>
            `
            })
            document.getElementById("ENTERLOCATION").innerHTML = posters.join("");
        })
    }
    //buildMovie();


//add movie
    //document.getElementById("ENTERLOCATION").addEventListener("click", function (e) {
    //     e.preventDefault();
    //     let newMovie = {
    //         title: document.getElementById("title").value,
    //         artist: document.getElementById("artist").value
    //     }
    //     addMovie(newMovie).then((res) => {
    //         console.log(res)
    //         buildMovie()
    //     })
    // })


//delete a movie
    const deleteMovie = (id) => {
        let options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        return fetch(`${URL}/${id}`, options).then(() => console.log("The song has been deleted successfully")).then(buildMovie)
    }

    //deleteMovie();
//console.log(`${URL}/${id}`)

}())