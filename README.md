# Lab 8

This is the Eighth lab for CIS*3210, created by Peter Hudel, SID 1012673.

## What this application does

This application allows a user to search for the title of a video game on Wikipedia, and the website will return a quick summary of the video game, as well as the main picture associated with it. The user can also choose to use some sample input, and they can view all the categories associated with the wikipedia page. 

## How to run this application

To run this application, open up a terminal in the root directory of this project. Once the terminal is open, type the command `flask run --host=0.0.0.0 --port=12673`. this is assuming that Flask is installed on your machine. If it isn't, run `pip install flask`. It also requires MYSQLdb for python, so if that also isn't installed please install it.

To run it in development mode, use  `FLASK_APP=app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=12673`

## Sample Input

1. Log into the app with Username=bob Password=123 (or create a user)
2. In the input box, enter a video game name (examples: `Witcher 3`, `hades (video game)`, `Skyrim`)
3. Notice that a quick summary of the game shows up in addition to the boxart.
4. You can enter something that isn't a videogame, and an error will be thrown. (Example: `Albert Einstein` will throw an error above the input field)
5. If you enter something that isn't a page on wikipedia, a different error will be thrown (Example: `adfssdafre` throws "page DNE")
6. You can check the "categories" button to see the top 10 categories onthe wikipedia page
7. You can use some sample input by selecting a video game title in the select box.
