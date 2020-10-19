# Lab 6

This is the Sixth lab for CIS*3210, created by Peter Hudel, SID 1012673.

## What this application does

This application is a simple web app that has two main features: allowing the user to log in, as well as query a database (select, insert, update, delete).

The first part (the logging in) allows the user to enter a username and password, then submits their credentials. The backend will open up a database of users and validate their username and password return a value. From there, the server will set a cookoie on the browser letting the server know that the user has successfully authenticated, and will then display the other part of this application.

> For the purposes of demonstrating this lab, the database has 1 user: username=bob, password=123. Use this user to test out the functionality. Note that query sanitation is performed and should work fine.

The second part are four buttons that query nother database of videogames. Nothing exists initially. You can query for a certain game and the results will show on the screen, as well as the result of the query. You can add one game to the database, modify a value for that game, and delete it. Basic error handling is done.

## How to run this application

### venv stuff

Note this is only if you need to initialize a venv for it to work.

1. Create the venv by typing `python3 -m venv ./venv`
2. `cd venv/bin`
3. `source ./activate`
4. `cd ..`, then `cd ..`
5. In root directory, `pip3 install -r requirements.txt`

### How to run the actual app

Now that you have all the required packages, you can follow the next steps.

To run this application, open up a terminal in the root directory of this project. Once the terminal is open, type the command `flask run --host=0.0.0.0 --port=12673`. this is assuming that Flask is installed on your machine. If it isn't, run `pip install flask`. It also requires MYSQLdb for python, so if that also isn't installed please install it.

To run it in development mode, use  `FLASK_APP=app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=12673`

## Sample Input

1. Log into the app with Username=bob Password=123 (or create a user)
2. In the input box, enter a video game name (examples: `Witcher 3`, `hades (video game)`, `Skyrim`)
3. Notice that a quick summary of the game shows up in addition to the boxart.
4. You can enter something that isn't a videogame, and an error will be thrown. (Example: `Albert Einstein` will throw an error above the input field)
5. If you enter something that isn't a page on wikipedia, a different error will be thrown (Example: `adfssdafre` throws "page DNE") 
