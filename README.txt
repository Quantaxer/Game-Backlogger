Lab 3
==========

This is the third lab for CIS*3210, created by Peter Hudel, SID 1012673.

What this application does
--------------------------------

This application is a simple web app that has two main features: allowing the user to log in,
as well as query a database (select, insert, update, delete).

The first part (the logging in) allows the user to enter a username and password, then submits their credentials.
The backend will open up a database of users and validate their username and password return a value.
> For the purposes of demonstrating this lab, the database has 1 user: username=bob, password=123. Use this user to test out the functionality.
Note that query sanitation is performed and should work fine.

The second part are four buttons that query nother database of videogames. Nothing exists initially. You can query for a certain game and the results
will show on the screen, as well as the result of the query. You can add one game to the database, modify a value for that game, and delete it.
Basic error handling is done.

How to run this application
------------------------------------------

To run this application, open up a terminal in the root directory of this
project. Once the terminal is open, type the command
`flask run --host=0.0.0.0 --port=12673`. this is assuming that Flask is installed
on your machine. If it isn't, run `pip install flask`. It also requires MYSQLdb for python,
so if that also isn't installed please install it.

To run it in development mode, use 
`FLASK_APP=app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=12673`
