#!/usr/local/bin/python

from flask import Flask, render_template, jsonify

import MySQLdb

db = None
cur = None


app = Flask(__name__, static_url_path='')
#app.debug = True

serverObject = {"name": "serverObject"}

@app.route('/')
def index(name=None):

    try:
        db = MySQLdb.connect(host="dursley.socs.uoguelph.ca",
            user="phudel",
            passwd="1012673",
            db="phudel"
        )

        cur = MySQLdb.cursor()
        cur.execute("CREATE TABLE `users` (`key` INT NOT NULL AUTO_INCREMENT, `username` VARCHAR(255) NOT NULL, `password` VARCHAR(255) NOT NULL;")
    except:
        print("Error conencting and initializing the db")


    return render_template('index.html', name=name)

@app.route("/showObject", methods = ["GET"])
def get_db():
    return jsonify(serverObject)

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
