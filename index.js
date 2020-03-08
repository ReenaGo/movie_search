document.addEventListener("DOMContentLoaded", function (){
    function renderMovie(array){
        var movieInnerHTML = array.map(movie=>{
            return (`<div class="movie">
                        <div class="imageDiv"><img src=${movie.Poster}/></div>
                        <div class="title">${movie.Title}</div>
                        <div class="releaseDate">${movie.Year}</div>
                        <button class="add" data-id=${movie.imdbID}>ADD</button>
                    </div>`)
        })
        return movieInnerHTML.join("")
    }

    var addButtons = document.getElementsByClassName("add")
    var movieContainer = document.getElementById("movie-container")
    var form = document.getElementById("search-form")

    form.addEventListener("submit",(e)=>{
        e.preventDefault()
        var searchString = e.target.elements[0].value
        var selectOption = e.target.elements[1].value
        var searchStringToUpperCase = searchString.toUpperCase()
        var urlEncodedSearchString = encodeURIComponent(searchString)

        if(selectOption==="Title"){
            axios.get(`http://www.omdbapi.com/?apikey=36a32d34&s=${urlEncodedSearchString}`)
            .then((res)=>{
                if(searchString){
                    movieContainer.innerHTML=renderMovie(res.data.Search)
                }
            })
        }else if(selectOption==="Release Year"){
            axios.get(`http://www.omdbapi.com/?apikey=36a32d34&s=${urlEncodedSearchString}`)
            .then((res)=>{
                if(searchString){
                    movieContainer.innerHTML=renderMovie(res.data.Search)
                }
            })
        }
        
        e.target.elements[0].value=""

        for(i=0; i<addButtons.length; i++){
            addButtons[i].addEventListener('click',(e)=>{
                saveToWatchList(e.target.dataset.id)
            })
        }
    })

    function saveToWatchList(id){
        var movie = movieData.find((currentMovie)=>{
            return id===currentMovie.imdbID
        })
        var watchListJSON = localStorage.getItem("watchList")
        var watchList = JSON.parse(watchListJSON)
        if(watchList===null){
            watchList = []
        }
        watchList.push(movie)
        watchListJSON= JSON.stringify(watchList)
        localStorage.setItem("watchList", watchListJSON)
    }
})




