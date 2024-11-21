import getUrl from "./getUrls"
import Movie from "../model/Movies"

const adminUploadMovie = async (info) => {
    const response = await getUrl(info.movieUrl)

    const newMovie = await Movie.create({
        instagramUrl: info.instagramUrl,
        movieUrl: response.slice(0, 3),
        coverImgUrl: response[3],
        movieName: response[4]
    });
    console.log(newMovie)

    if (newMovie) {
        console.log('yaratildi')
    } else {
        console.log("xatolik bor")
    }

}


adminUploadMovie()

