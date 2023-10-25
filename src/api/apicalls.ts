const apikey:string = '9a151c441c4dac823c0ffc0ca7f2baaf'
export const baseImagePath = (size: string, path: string) => {
    return `https://image.tmdb.org/t/p/${size}/${path}`
}
export const nowPlayingMovie : string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`
export const upcomingMovie : string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`
export const movieDetail = (id : number) => {
    return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`
}
export const searchMovie = (keyword: string) => {
    return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`
}
export const moviePerformerDetails = (id: number) => {
    return `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikey}`
}
export const movieVideo = (id: number) => {
    return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apikey}`
}

export const recommendMovie = (id: number, genreId: number) => {
    return `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}&with_genres=${genreId}`
}
// console.log(movieVideo(614479))
// console.log(movieDetail(615656))
// console.log(nowPlayingMovie)
// console.log(recommendMovie(614479, 28))