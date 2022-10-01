from flask import Flask, request, jsonify
import requests
import json
import os

UPLOAD_FOLDER = 'static/images'


app = Flask(__name__)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def upload_file():
    # check if the post request has the file part
    file = request.files['banner.jpeg']
    # if user does not select file, browser also
    # submit a empty part without filename
    file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))

@app.route('/')
def hello():
    """Return a friendly HTTP greeting."""
    return app.send_static_file('base.html')


@app.route('/search', methods=["GET"])
def search_yelp():

    arg = request.args
    search_params = arg.to_dict()
    url = "https://api.yelp.com/v3/businesses/search?term={}&latitude={}&longitude={}&categories={}&radius={}".format(search_params["term"], search_params["latitude"], 
    search_params["longitude"], search_params["categories"], search_params["radius"])

    api_key = "ImP-OumcN-QgwFyJNETsAnTjpVPp1cLaDw04EbkJjd7qRkQNLyztThYMzIeVAtfJsbON6tgKNoSZx7W7aPqWvESA4E2pn0yO1l4ykM_Fbv2qchiJ2y4-yvKiPy0wY3Yx"
    headers = {'Authorization': 'Bearer %s' % api_key}

    req = requests.get(url,  headers=headers).json()

    # print(json.dumps(req))

    req = jsonify(req)
    req.headers['Access-Control-Allow-Origin'] = '*'

    return req

@app.route('/searchDetail', methods=["GET"])
def search_detail():

    arg = request.args
    search_params = arg.to_dict()
    url = "https://api.yelp.com/v3/businesses/{}".format(search_params["id"])

    api_key = "ImP-OumcN-QgwFyJNETsAnTjpVPp1cLaDw04EbkJjd7qRkQNLyztThYMzIeVAtfJsbON6tgKNoSZx7W7aPqWvESA4E2pn0yO1l4ykM_Fbv2qchiJ2y4-yvKiPy0wY3Yx"
    headers = {'Authorization': 'Bearer %s' % api_key}

    req = requests.get(url,  headers=headers).json()
    # print(json.dumps(req))
    req = jsonify(req)
    req.headers['Access-Control-Allow-Origin'] = '*'

    return req




if __name__ == "__main__":
    app.run(host='127.0.0.1', port = 8080, debug = True)