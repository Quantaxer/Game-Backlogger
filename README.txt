Lab 2
==========

This is the second lab for CIS*3210, created by Peter Hudel, SID 1012673.

What this application does
--------------------------------

This is a basic web application with one home page. This page contains three buttons
that calls three different HTTP requests. It calls a PUT, POST and a DELETE.

On the server, there is an object. This object contains how many times a user
presses the "modify" button. By default, this object on the server does not keep
track of the number of times it is clicked. You first have to initialize this 
by clicking on the first button. Once the object is keeping track of the number
of times you click the button, you can increment the count by clicking the 
modify button. If you want to try deleting it, you can press the delete button.

There is very basic error handling. You cannot increment if the key was not created.
You cannot delete a key that doesn't exist. And you cannot create a key that already
exists. These edge cases are not shown on the server for similicity, the application
just doeesn't show it.


How to run this application
------------------------------------------

To run this application, open up a terminal in the root directory of this
project. Once the terminal is open, type the command
`flask run --host=0.0.0.0 --port=12673`. this is assuming that Flask is installed
on your machine. If it isn't, run `pip install flask`.

To run it in development mode, use 
`FLASK_APP=app.py FLASK_ENV=development flask run --host=0.0.0.0 --port=12673`
