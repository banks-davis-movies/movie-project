"use strict";
(function () {

    // This project's API: https://aromatic-subsequent-sun.glitch.me/movies
    // Poster API in keys file
    const URL = "https://aromatic-subsequent-sun.glitch.me/movies";

    //load available movies. Needs edit to add data to page
    const getMovies = () => {
        return fetch(URL)
            .then(res => res.json())
        // return fetch(URL)
        //     .then(res => res.json())
        //     .then(results => console.log(results))
        //     .catch(error => console.error(error))
    }
    //getMovies()


//pulls movie by ID number
//     const SelectById = (id) => {
//         //console.log(`${URL}/${id}`)
//         return fetch(`${URL}/${id}`).then(res => res.json()).then(res => console.log(res));
//     }
    //SelectById(2);

//add movies to databsase
    const addMovie = (movieObj) => {
        let options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(songObj)
        }
        return fetch(URL, options).then(res => res.json()).then(result => console.log("You've added a movie", result))
    }


    //builds movie posters. Needs work
    const buildMovie = () => {
        //console.log('building movies')
        getMovies().then((data) => {
            let posters = data.map(movie => {
                return `
                <div class="card mx-auto flip-card col-3">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="img/practiceposer.jpg" alt="poster" class="poster">
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
            console.log(posters)
            document.querySelector("#movie-display").innerHTML = posters.join("");
        })
    }
    buildMovie();


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