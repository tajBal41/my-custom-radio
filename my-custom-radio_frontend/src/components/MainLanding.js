import React,{Component} from 'react'
import YouTube from 'react-youtube';
import ReactPlayer from 'react-player/youtube'
import axios from 'axios'
import {getSongsArtist} from './Functions'

class MainPage extends Component {

    constructor(){

        super()
        this.state = {
            artist:"",
            embd_url: [],
            img_url: [],
            opts: {
                height: '300',
                width: '300',
      playerVars: {
        autoplay: 1,
        mute:0
            }
            }

        }
        this.onEnd = this.onEnd.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onChangeSong = this.onChangeSong.bind(this)
    }

     componentDidMount() {
         this.onSubmit()
         try{
        const token = localStorage.getItem('embd_urls_songs').split(",")
        const token2 = localStorage.getItem('img_urls_songs').split(",")
        //alert(token)
        if(token === null || token2 === null || token === 'undefined'){
            throw Error;
        }
        this.setState({embd_url: token})
        this.setState({img_url: token2})
         }catch(err){
            localStorage.setItem('embd_urls_songs',["twCHVhk8iMU",
            "r2zFQos5gHw",
            "hBlO1i_WTiY",
            "4wub_PF4Oaw",
            "MiCk8UoPl1Y",
            "qk2WMmiiVFE",
            "iU7cDCmEiUw",
            "MP4aGp0ZSsA",
            "YG14QVDml1k",
            "jmigBo42low",
            "Y1zS4BApoHY",
            "zTeHgPyY9n8",
            "yIiAyoLZ9U0",
            "huh62ms0Hd4",
            "YZAFd9o3RYQ",
            "24mWq7KMSks",
            "GgmFC8y8q3k",
            "p3VF6acYG7I",
            "SSbh67Q8TXs"].join())
            localStorage.setItem('img_urls_songs',[ "https://i.ytimg.com/vi/twCHVhk8iMU/hqdefault.jpg",
            "https://i.ytimg.com/vi/r2zFQos5gHw/hqdefault.jpg",
            "https://i.ytimg.com/vi/hBlO1i_WTiY/hqdefault.jpg",
            "https://i.ytimg.com/vi/4wub_PF4Oaw/hqdefault.jpg",
            "https://i.ytimg.com/vi/MiCk8UoPl1Y/hqdefault.jpg",
            "https://i.ytimg.com/vi/qk2WMmiiVFE/hqdefault.jpg",
            "https://i.ytimg.com/vi/iU7cDCmEiUw/hqdefault.jpg",
            "https://i.ytimg.com/vi/MP4aGp0ZSsA/hqdefault.jpg",
            "https://i.ytimg.com/vi/YG14QVDml1k/hqdefault.jpg",
            "https://i.ytimg.com/vi/jmigBo42low/hqdefault.jpg",
            "https://i.ytimg.com/vi/Y1zS4BApoHY/hqdefault.jpg",
            "https://i.ytimg.com/vi/zTeHgPyY9n8/hqdefault.jpg",
            "https://i.ytimg.com/vi/yIiAyoLZ9U0/hqdefault.jpg",
            "https://i.ytimg.com/vi/huh62ms0Hd4/hqdefault.jpg",
            "https://i.ytimg.com/vi/YZAFd9o3RYQ/hqdefault.jpg",
            "https://i.ytimg.com/vi/24mWq7KMSks/hqdefault.jpg",
            "https://i.ytimg.com/vi/GgmFC8y8q3k/hqdefault.jpg",
            "https://i.ytimg.com/vi/p3VF6acYG7I/hqdefault.jpg",
            "https://i.ytimg.com/vi/SSbh67Q8TXs/hqdefault.jpg"].join())

            const token = localStorage.getItem('embd_urls_songs').split(",")
            const token2 = localStorage.getItem('img_urls_songs').split(",")
            this.setState({embd_url: token})
            this.setState({img_url: token2})
         }

        }


    onChange(e){
            localStorage.setItem('artist',e.target.value)
            this.setState({[e.target.name]:e.target.value})
    }

    onSubmit(e){
        const data_form =  {artist:localStorage.getItem('artist')}
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data_form)
        };

        fetch('songs/getSongs', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('img_urls_songs',data.img_url.join())
                localStorage.setItem('embd_urls_songs',data.embd_url.join())
                this.setState({'embd_url': data.embd_url})
                this.setState({'img_url': data.img_url})
            });

     /*  axios.post('songs/getSongs',data_form,{headers: {'Access-Control-Allow-Origin': '*',withCredentials:false}})
                    .then(response => {localStorage.setItem('embd_urls_songs',response.data.embd_url.join())
                                      localStorage.setItem('img_urls_songs',response.data.img_url.join())})
                    //.catch(error => {throw error})*/
    }

    onChangeSong(e){
    
        const index = e.target.value
        const embd_url_new = this.state.embd_url
        const img_url_new = this.state.img_url
        const embd_url_last = this.state.embd_url[this.state.embd_url.length -1]
        const img_url_last = this.state.img_url[this.state.img_url.length -1]
        const embd_url_index = this.state.embd_url[index]
        const img_url_index = this.state.img_url[index]

        embd_url_new[embd_url_new.length-1] = embd_url_new[0]
        embd_url_new[index] = embd_url_last
        embd_url_new[0] = embd_url_index

        img_url_new[img_url_new.length-1] = img_url_new[0]
        img_url_new[index] = img_url_last
        img_url_new[0] = img_url_index

        this.onEnd
        localStorage.setItem('embd_urls_songs',embd_url_new)
        localStorage.setItem('img_urls_songs',img_url_new)
        this.setState({'embd_url':embd_url_new, 'img_url':img_url_new})
    }


    onEnd(){
        const current_embd_url = this.state.embd_url[0]
        const embd_url_new = []
        const img_url_new = []
        const index_arr = []

        for(var i = 0; i < this.state.embd_url.length; i++){ index_arr.push(i)}
        index_arr.sort(() => Math.random() - 0.5)

        for(i =0; i< index_arr.length; i++){
            embd_url_new.push(this.state.embd_url[index_arr[i]])
            img_url_new.push(this.state.img_url[index_arr[i]])

        }
        if(embd_url_new[0] === current_embd_url){
            const last_url = embd_url_new[embd_url_new.length -1]
            const last_img = img_url_new[img_url_new.length -1]

            embd_url_new[embd_url_new.length -1] = embd_url_new[0]
            img_url_new[img_url_new.length -1] = img_url_new[0]
            embd_url_new[0] = last_url
            img_url_new[0] = last_img
        }
        localStorage.setItem('embd_urls_songs',embd_url_new)
        localStorage.setItem('img_urls_songs',img_url_new)
        this.setState({'embd_url':embd_url_new, 'img_url':img_url_new})

    }

    

    render(){
        //console.log(this.state.embd_url)
        return(

            <div class = "container-fluid fill homepage-bgimage" >
                <header class = "bg-primary">                        
                    <form noValidate className = "Artist" onSubmit = {this.onSubmit}>
                                <label class='form_label'> Keyword Search</label> <br/>
                                <input type = "text" name = "artist" value = {this.state.artist} onChange = {this.onChange} /> 
                                <button type = "Submit" >Go DJ!</button>
                    </form>
                    <br />
                    <button type = "Submit" variant = "primary" onClick = {this.onEnd}>Start</button>
                </header>
                <div className = "row">
                    <div className = "col-md">
                        <YouTube videoId = {this.state.embd_url[0]}  opts = {this.state.opts}  onEnd = {this.onEnd} mute = {false}/>
                    </div>  
                </div>
                <div className = "row">
                    <div className = "col-md">
                        <table class = "center">
                            <tbody>
                                <tr>
                                    <td><input type="image" src={this.state.img_url[1]} alt = "" onClick = {this.onChangeSong} name="songImg" value= "1" className="btTxt submit" id="saveForm" height = "300" length = "300"/></td>
                                    <td><input type="image" src={this.state.img_url[2]} alt = "" onClick = {this.onChangeSong} name="songImg" value= "2" className="btTxt submit" id="saveForm" height = "300" length = "300"/></td>
                                    <td><input type="image" src={this.state.img_url[3]} alt = "" onClick = {this.onChangeSong} name="songImg" value= "3" className="btTxt submit" id="saveForm" height = "300" length = "300"/></td>
                                </tr>
                                <tr>
                                    
                                    <td><input type="image" src={this.state.img_url[4]} alt = "" onClick = {this.onChangeSong} name="songImg" value= "4" className="btTxt submit" id="saveForm" height = "300" length = "300"/></td>
                                    <td><input type="image" src={this.state.img_url[5]} alt = "" onClick = {this.onChangeSong} name="songImg" value= "5" className="btTxt submit" id="saveForm" height = "300" length = "300"/></td>
                                    <td><input type="image" src={this.state.img_url[6]} alt = "" onClick = {this.onChangeSong} name="songImg" value= "6" className="btTxt submit" id="saveForm" height = "300" length = "300"/></td>
                            </tr>
                            </tbody>
                        </table>
                    </div>  

                </div>
                <script data-ad-client="ca-pub-5458292027762452" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
            </div>


        )

    }



}

export default MainPage;
