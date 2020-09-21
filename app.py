#!/usr/local/bin/python

from flask import Flask, render_template, jsonify

app = Flask(__name__, static_url_path='')
#app.debug = True

serverObject = {}

@app.route('/')
def index(name=None):
    return render_template('index.html', name=name)

@app.route("/addToObject", methods = ["POST"])
def addToObject():
    if "numberOfPresses" not in serverObject:
        serverObject["numberOfPresses"] = 1
    return jsonify(serverObject)

@app.route("/modifyObject", methods = ["PUT"])
def modifyObject():
    if "numberOfPresses" in serverObject:
        serverObject["numberOfPresses"] = serverObject["numberOfPresses"] + 1
    return jsonify(serverObject)


@app.route("/deleteFromObject", methods = ["DELETE"])
def deleteObject():
    serverObject.pop("numberOfPresses")
    return jsonify(serverObject)
