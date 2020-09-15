# Lab 1

This is the first lab for CIS*3210, created by Peter Hudel, SID 1012673.

## What this application does

This is a simple web-based application that uses the template that was provided for the first lab. It uses Flask as a backend, and JQuery and default CCSS+HTML.

This application simply displays a base home screen with a bit of interactivity. This screen has Link: an interactive friend to play with. You can press a button to make him play an animation, in addition to another button which shows an alert.

## How to run this application

To run this application, open up a terminal in the root directory of this project. Once the terminal is open, type the command `flask run --host=0.0.0.0 --port=12673`.

> Note that this application was installed using a venv. If you do not have Flask installed on the machine (which shouldn't be the case because of the socs servers), simply switch to the venv by running the command `.\venv\Scripts\activate` if on Windows, and if on Linux, run `source venv/Scripts/activate`. Then run the Flask command above on the specified port.
