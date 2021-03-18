import pandas as pd
from flask import Flask
from flask import json, jsonify, request
from flask_cors import CORS
from youtube_api import YouTubeDataAPI
YT_KEY 'xxx' # removed

yt = YouTubeDataAPI(YT_KEY)

app = Flask(__name__)
CORS(app)




@app.route("/")
def my_index():
    return "Hello"

@app.route("/songs/getSongs", methods = ['POST'])
def getSongs():
    #print(request.get_json()['artist'])
    #return jsonify({'embd_url':'https://www.youtube.com/embed/QM2emGTpPT4'})
    artist = request.get_json()['artist']
    print(artist)
    print('good')
    songs = pd.DataFrame(yt.search(q=artist ,max_results = 20,videoEmbeddable= 'true',videoSyndicated = 'true',
                                    type = 'video',videoDuration = 'short'))
    songs['embd_url'] = songs['video_id']
    result = jsonify({'embd_url':songs['embd_url'].values.tolist(), 'img_url': songs['video_thumbnail'].values.tolist()})
    print(result)
    return result

if __name__ == '__main__':   
    app.run(debug = True, host = '0.0.0.0')

    
