#!/usr/local/bin/python

from flask import Flask, render_template, jsonify, request, redirect, url_for, session, make_response
import secrets

import MySQLdb

# My API functions
from api import *

app = Flask(__name__, static_url_path='')

app.secret_key = secrets.token_urlsafe(16)

#app.debug = True

@app.route('/')
def index():
    return render_template('index.html')
    
@app.route("/searchTheWiki", methods = ["POST"])
def searchTheWiki():
    queryTitle = request.form['title']
    numSentences = request.form['sentences']
    summary = ""
    image = ""
    status = ""
    try:
        title = searchForPage(queryTitle)
        title = title[0]
        
        if (isVideoGame(title)):
            summary = getPageSummary(title, numSentences)
            image = getPageImage(title)
            url = getURL(title)
            status="Success"
            categories = getCategories(title)
            return jsonify(title=title, summary=summary, image=image, status=status, categories=categories, url=url)
        else:
            status = "ERROR: That is not a video game! (If it is, please add `(video game)` to the end of the title"
    except Exception as e:
        print(e)
        status = "Page does not exist"
    return jsonify(status=status)
