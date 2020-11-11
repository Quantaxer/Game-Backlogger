# Lab 10

This is the Tenth and final lab for CIS*3210, created by Peter Hudel, SID 1012673.

## What this application does

This application allows a user to search for the title of a video game on Wikipedia, and the website will return a quick summary of the video game, the categories of the Wiki article, and a link to the Wiki page. It will store the result into a table. A user can click on a row in the table to select the row, displaying the image of the game. They can then drag the row to reorder the table, or they can press a delete button to delete the row from the table. The user can also choose to use some sample input.

## How to run this application

To run this application, open up a terminal in the root directory of this project. Once the terminal is open, type the command `flask run --host=0.0.0.0 --port=12673`. this is assuming that Flask is installed on your machine. If it isn't, run `pip install flask`.

To run it in development mode, use  `FLASK_APP=app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=12673`

**THIS DOES NOT USE ANY EXTERNAL PYTHON LIBRARIES!!!**

## Sample Input

1. In the input box, enter a video game name (examples: `Witcher 3`, `hades (video game)`, `Skyrim`)
2. You can enter something that isn't a videogame, and an error will be thrown. (Example: `Albert Einstein` will throw an error above the input field)
3. If you enter something that isn't a page on wikipedia, a different error will be thrown (Example: `adfssdafre` throws "page DNE")
4. You can use some sample input by selecting a video game title in the select box.
5. You can choose how many sentences the summary is, from 1 to 3 sentences.
6. You can click on a row in the table to view the boxart of the game
7. You can click and drag a row in the table to reorder it.
