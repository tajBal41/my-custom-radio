import axios from 'axios'
import qs from 'qs'

export const getSongsArtist = data => {

        const res = axios
            .post('songs/getSongs', {artist: data.artist},{withCredentials:false, 'Access-Control-Allow-Origin':'*'})
           /* .then(res => {
                console.log(res.data)
                localStorage.setItem('songs',res.data)
                return res.data
            })
            .catch(err => {console.log(err)})*/
        return res

}