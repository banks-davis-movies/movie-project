"use strict";
(function () {

    // This projects API: https://aromatic-subsequent-sun.glitch.me/movies
    // Poster API in keys file

    const getMovies = () => {
        const URL = "https://aromatic-subsequent-sun.glitch.me/movies";
        return fetch(URL)
            .then(res => res.json())
            .then(results => console.log(results))
            .catch(error => console.error(error))
    }
    getMovies()









}())