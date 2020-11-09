#!/usr/local/bin/python

from flask import Flask, render_template, jsonify, request, redirect, url_for, session, make_response
import secrets

import MySQLdb

# My API functions
from api import *

# CHANGE THIS EVENTUALLY ONCE NEED TO LOG IN
alwaysLoggedIn = True

"""try:
    db = MySQLdb.connect(host="dursley.socs.uoguelph.ca",
        user="phudel",
        passwd="1012673",
        db="phudel"
    )

    cur = db.cursor()
    cur.execute("create table if not exists users(username varchar(255) not null, password varchar(255) not null, constraint unique_name unique(username), primary key(username));")
    cur.execute("create table if not exists videogames(id int auto_increment primary key, name varchar(255) not null, summary varchar(1024) not null, ranking int not null, user varchar(255) not null, constraint unique_name unique(name), FOREIGN KEY(user) REFERENCES users(username) ON DELETE CASCADE);")
    print("Successfully created tables")
except:
    print("Error connecting and initializing the db")

try:
    cur.execute("insert into users (username, password) values ('bob', '123');")
except:
    print("bob already exists")"""


app = Flask(__name__, static_url_path='')

app.secret_key = secrets.token_urlsafe(16)

#app.debug = True

@app.route('/')
def index():
    if 'isCreatingUser' not in session:
        session['isCreatingUser'] = False
    
    if alwaysLoggedIn:
        return render_template('index.html', logged_in=alwaysLoggedIn, username="bobbyboi", create_user=session['isCreatingUser'])
    else:
        if 'logged_in' in session:
            return render_template('index.html', logged_in=session['logged_in'], username=session['username'], create_user=session['isCreatingUser'])
        else:
            return render_template('index.html', logged_in=False, username='', create_user=session['isCreatingUser'])

@app.route("/login", methods = ["POST"])
def get_db_credentials(name=None):
    status = ""
    username = request.form['username']
    password = request.form['password']

    try:
        cur.execute("select * from users where username = %s and password = %s;", (username,password,))
        result = cur.fetchall()
        if (cur.rowcount == 1):

            status = "Successfully logged in"
            session['logged_in'] = True
            session['username'] = result[0][0]
        else:
            status = "Error logging in: Please check username and password"
    except Exception as e:
        print(e)
        status = "Some unknown error occurred"

    return jsonify(status=status)

@app.route("/switchCreateUserState", methods = ["GET"])
def switch_create_state():
    session['isCreatingUser'] = not session['isCreatingUser']
    return "True"

@app.route("/logout", methods = ["GET"])
def logout():
    session.pop('username', None)
    session.pop('logged_in', None)
    return "True"

@app.route("/register", methods = ["POST"])
def register_user(name=None):
    status = ""
    username = request.form['username']
    password = request.form['password']
    confirmation = request.form['confirm']

    if (not password == confirmation):
        return jsonify(status="Passwords do not match")

    try:
        cur.execute("insert into users (username, password) values (%s, %s);", (username, password,))
        db.commit()
        status = "Created new user"
    except Exception as e:
        print(e)
        status = "User already exists"

    return jsonify(status=status)


@app.route("/query", methods = ["GET"])
def queryObject():
    status = ""
    try:
        cur.execute("select * from videogames where name='Witcher 3' and user='bob';")
        status = "Selected " + str(cur.rowcount) + " row(s) from the database"
        print(status)
    except Exception as e:
        print(e)
        status = "Failed querying: check server code"
    if (cur.rowcount > 0):
        return jsonify(res=cur.fetchall(), status=status, numrows=cur.rowcount)
    else:
        return jsonify(res={}, status=status, numrows=cur.rowcount)


@app.route("/add", methods = ["POST"])
def addToObject():
    status = ""
    try:
        cur.execute("insert into videogames (name, summary, ranking, user) values ('Witcher 3', 'A really good game', 1, 'bob');")
        db.commit()
        status = "inserted " + str(cur.rowcount) + " row(s) into the database"
    except Exception as e:
        print(e)
        status = "Error adding row in database: already exists"
        db.rollback()

    return jsonify(res={}, status=status)

@app.route("/modify", methods = ["PUT"])
def modifyObject():
    status = ""
    try:
        cur.execute("update videogames set ranking='2' where name='Witcher 3' and user='bob';")
        db.commit()
        status = "modified " + str(cur.rowcount) + " row(s) in the database"
    except Exception as e:
        print(e)
        status = "Error modifying row in database"
        db.rollback()
    return jsonify(res={}, status=status)

@app.route("/delete", methods = ["DELETE"])
def deleteObject():
    status = ""
    try:
        cur.execute("delete from videogames where user='bob' and name='Witcher 3';")
        db.commit()
        status = "Deleted " + str(cur.rowcount) + " row(s) from the database"
    except Exception as e:
        print(e)
        status = "Failed deleting from database"
        db.rollback()
    return jsonify(res={}, status=status)

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
