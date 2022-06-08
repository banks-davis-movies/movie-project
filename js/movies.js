"use strict";
(function () {
    // This project's API: https://aromatic-subsequent-sun.glitch.me/movies
    // Poster API in keys file


    const URL = "https://aromatic-subsequent-sun.glitch.me/movies";

    //load available movies. Can build all the search functionality into this as well
    const callMovies = () => {
        fetch(URL)
            .then(res => res.json())
            .then(movies => {
                //console.log(movies);
                showMovies(movies);
                $(".delete").click(function () {
                    deletion($(this).attr("data-id")).then(callMovies);
                })
            })
    }
    callMovies()

    function deletion(id) {
        let options = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(`you tried to delete movie ${id}`);
        return fetch(`${URL}/${id}`, options).then(() => console.log("This movie has been deleted successfully"))
    }

//build movie cards
    function showMovies(movies) {

        $("#movie-display").empty()

        movies.forEach(movie => {


            if (movie.title !== undefined) {
                $("#movie-display").append(`
                <div class="card mx-auto flip-card col-3">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                    <img src="${movie.poster}" alt="poster" class="poster">
                </div>
                <div class="card-body flip-card-back" id="pData">
                    <h3>Title: ${movie.title}</h3>
                    <p>Rating: ${starRating(parseInt(movie.rating))}</p>
                    <p>Genre: ${movie.genre}</p>
                    <button class="edit" onclick="alert('Edit ${movie.id}?')" data-id="${movie.id}">Edit</button>
                    <button class="delete" data-id="${movie.id}">Delete</button>
                </div>
            </div>
        </div>`);
            }
        });

    }

//Title sort function for the radio button
    $("#titleRadio").click(() => {
        fetch(URL)
            .then(response => response.json())
            .then(movies => {
                movies.sort((a, b) => {
                    let titleOne = a.title.toLowerCase(),
                        titleTwo = b.title.toLowerCase();
                    if (titleOne < titleTwo) {
                        return -1;
                    } else if (titleOne > titleTwo) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                console.log(movies);
                $("#movie-display").html("");
                showMovies(movies);
            })
            .catch(() => $("#movie-display").html("Oops, something went wrong"));
    });

//Rating sort function for the radio button
    $("#ratingRadio").click(() => {
        fetch(URL)
            .then(response => response.json())
            .then(movies => {
                movies.sort((a, b) => {
                    let ratingOne = parseFloat(a.rating),
                        ratingTwo = parseFloat(b.rating);
                    return ratingTwo - ratingOne;
                });
                console.log(movies);
                $("#movie-display").html("");
                showMovies(movies);
            })
            .catch(() => $("#movie-display").html("Oops, something went wrong"));
    });

    //Genre sort function for the radio button
    $("#genreRadio").click(() => {
        fetch(URL)
            .then(response => response.json())
            .then(movies => {
                movies.sort((a, b) => {
                    let genreOne = a.genre.toLowerCase(),
                        genreTwo = b.genre.toLowerCase();
                    if (genreOne < genreTwo) {
                        return -1;
                    } else if (genreOne > genreTwo) {
                        return 1;
                    } else {
                        return 0;
                    }
                });
                console.log(movies);
                $("#movie-display").html("");
                showMovies(movies);
            })
            .catch(() => $("#movie-display").html("Oops, something went wrong"));
    });


    //Search functions - checks title and genre
    $("#submit").click((e) => {
        e.preventDefault()
        let searchBox = document.querySelector('#search')
        let searchTerm = searchBox.value.toLowerCase()
        fetch(URL)
            .then(response => response.json())
            .then(movies => movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm) || movie.genre.toLowerCase().includes(searchTerm)))
            .then(movie => showMovies(movie))
            .catch(() => $("#movie-display").html("Oops, something went wrong"));
    })


//convert rating in API call to a star display
function starRating(num) {
    if (num === 1) {
        return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                    `
    } else if (num === 2) {
        return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                    `
    } else if (num === 3) {
        return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star"></span>
                     <span class="fa fa-star"></span>
                    `
    } else if (num === 4) {
        return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star"></span>
                    `
    } else if (num === 5) {
        return `
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                     <span class="fa fa-star checked"></span>
                    `
    }
}


}())