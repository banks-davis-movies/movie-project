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

    const posterCall = title => {
       return fetch(`http://www.omdbapi.com/?t=${title}&apikey=${MOVIE_API_KEY}`).then((r => r.json()));
    }

    $("#send").click(() => {
        let movie = {
            genre: $("#genre").val(),
            poster: '',
            rating: $('input[name="rating"]:checked').val(),
            title: $("#title").val(),
        }
        posterCall(movie.title).then(r => movie.poster = r.Poster).then(() => addMovie(movie)).then(callMovies)
    })
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




//rough draft code below. will need finished forms to be useful

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


}())