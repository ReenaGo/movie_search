    function renderMovie(array){
        var movieInnerHTML = array.map(movie=>{
            return (`<div class="movie">
                        <div class="imageDiv"><img src=${movie.Poster}/></div>
                        <div class="title">${movie.Title}</div>
                        <div class="releaseDate">${movie.Year}</div>
                        <button class="remove" data-id=${movie.imdbID} onclick="removeFromWatchList('${movie.imdbID}')">REMOVE</button>
                    </div>`)
        })
        return movieInnerHTML.join("")
    }
    var movieContainer = document.getElementById("movie-container")
    var watchListJSON = localStorage.getItem("watchList")
    var watchList = JSON.parse(watchListJSON)
    movieContainer.innerHTML = renderMovie(watchList)

  
    


    function removeFromWatchList(id){
        var movie = watchList.find((movie)=>{
            return id===movie.imdbID
        })        
        watchList.pop(movie)
        watchListJSON = JSON.stringify(watchList)
        localStorage.setItem("watchList", watchListJSON)
        movieContainer.innerHTML = renderMovie(watchList)

    }

 




