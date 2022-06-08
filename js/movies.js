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
                console.log(movies);
                showMovies(movies);
                //add search features here to leverage the current api call
                // console.log($(".delete"));
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
                <div class="card-body flip-card-back">
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
            .catch(() => $("#movie-display").html("Oops, something went wrong :("));
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
            .catch(() => $("#movie-display").html("Oops, something went wrong :("));
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
            .catch(() => $("#movie-display").html("Oops, something went wrong :("));
    });

    // let button = document.querySelector('#submit');
// let input = document.querySelector('#search');
// button.addEventListener('click', function(e) {
//     e.preventDefault();
//     let searchTerm = input.value;
//     console.log(searchTerm);
//     fetch(URL)
//         .then((resp) => resp.json())
//         .then((movies) => {
//             //console.log(data)
//             document.querySelector('#user').innerHTML = `${movies['0']['actor'].login}`,
//                 document.querySelector('#last-push').innerHTML = `${movies['0']['created_at']}`,
//                 document.querySelector('#repo').innerHTML = `${movies['0']['repo'].name}`
//         })
//         .catch(error => console.error(error));
// })


    let button3 = document.querySelector("#submit")
    button3.addEventListener('click', function(name) {
        let divData = document.querySelector("#movie-display");
        let divList = divData.querySelectorAll("div");
        let input3 = document.querySelector('#search-text');
        let searchTerm = input3.value.toLowerCase();
        for (let x of divList) {
            if (x.innerText.includes(searchTerm.value)) {

            } else {
                x.style.backgroundColor = "#999"
            }
        }
    })

//rough draft code below. will need finished forms to be useful


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

//add movie click event
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