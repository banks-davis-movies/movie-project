"use strict";
(function () {
    // This project's API: https://aromatic-subsequent-sun.glitch.me/movies
    // Poster API in keys file


    const URL = "https://aromatic-subsequent-sun.glitch.me/movies";

    //load available movies.
    const getMovies = () => {
        return fetch(URL)
            .then(res => res.json())
    }


//     const addMovie = (movieObj) => {
//         let options = {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(songObj)
//         }
//         return fetch(URL, options).then(res => res.json()).then(result => console.log("You've added a movie", result))
//     }

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


    //builds movie posters.
    const buildMovie = () => {
        //console.log('building movies')
        getMovies().then((data) => {
            let posterData = data.map(movie => {
                return fetch(`https://omdbapi.com/?t=${movie.title}&apikey=30f6f77b`)
                    .then(res => res.json())
                    .then((data) => {
                        //console.log(data)
                        let posterImg = data.Poster
                        console.log(posterImg)
                        return posterImg;
                    })
            })
            getMovies().then((data) => {
                let posters = data.map(movie => {
                    return `
                <div class="card mx-auto flip-card col-3">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="" alt="poster" class="poster">
                </div>
                <div class="card-body flip-card-back">
                    <h3>Title: ${movie.title}</h3>
                    <p>Rating: ${starRating(parseInt(movie.rating))}</p>
                    <p>Genre: ${movie.genre}</p>
                    <button data-id="${movie.id}">Edit</button>
                    <button data-id="${movie.id}">Delete</button>
                </div>
            </div>
        </div>
            `
                })
                //console.log(posters)
                document.querySelector("#movie-display").innerHTML = posters.join("");
            })

        })
    }
    buildMovie();

// Edit Movies
//     const changeMovie = (movie) => {
//         let options = {
//             method: "PATCH",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(movie)
//         }
//         return fetch(`${URL}/${song.id}`, options).then(resp => resp.json())
//     }
//     let updatedMovie = {
//         id: 1,
//         title: "TNT",
//     }
    //changeMovie(updatedMovie);





//Add a movie
    const addMovie = (movieObj) => {
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(movieObj)
        }
        return fetch(URL, options).then(res => res.json()).then(result => console.log("You've added a movie", result))
    }

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
//     const deleteMovie = (id) => {
//         let options = {
//             method: "DELETE",
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }
//         return fetch(`${URL}/${id}`, options).then(() => console.log("The song has been deleted successfully")).then(buildMovie)
//     }

    //deleteMovie();
//console.log(`${URL}/${id}`)




    function starRating(num) {
        if (num === 1) {
            return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                    `
        }
         else if (num === 2) {
                return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                    `
            }
            else if (num === 3) {
                    return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                    `
                }
                 else if (num === 4) {
                        return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star"></span>
                    `
                    }
                     else if (num === 5) {
                            return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                    `
                        }
                    }

    //console.log(starRating(2));


}())