import pandas as pd
from flask import Flask
from flask import json, jsonify, request
from flask_cors import CORS
from youtube_api import YouTubeDataAPI
YT_KEY = 'AIzaSyBGtyUYO3gtWZVG64-s8E63sIHKzWeXfzg' 
yt = YouTubeDataAPI(YT_KEY)




songs = pd.DataFrame(yt.search(q='Jass Manak' ,max_results = 20))
songs['embd_url'] = 'https://www.youtube.com/embed/' + songs['video_id']

print(songs.keys())



