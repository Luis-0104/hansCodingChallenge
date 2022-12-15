# Coding challenge

## General

Your task is to create a simple web-based interface for managing users.  Users have to be saved in a relational database. Please use the following technologies for creating the app:

For front-end:
* HTML
* CSS, SCSS/SASS or less
* react + redux or mobX

For back-end:
* nodejs
* MySQL or PostgreSQL
* Optional: docker(-compose)

Please use a REST-based API for communication between front- and back-end. An authentication system (login form, logout) is not part of the task. The app should contain several pages, described in the next sections. You are free to design an appropriate database schema.

After you have completed the task, please send us a zip file with your source code, an SQL dump and a README file with instructions on how to run the project. Finally you should present your implementation within 15 minutes.

Good luck!

## Pages

### Page: Index – List of users

The index page should contain a list of users with the following columns:

* Customer number
* User name
* First name
* Last name
* Last login (format DD.MM.YYYY HH:MM:SS)
* Option to go to edit form
* Option to delete the user

There should also be a search form for finding users by a certain keyword in fields: customer number, user name, first name, last name and email address

The columns `customer number`, ` user name`, `first name`, `last name` and `last login` should be sortable (asc/desc).

Add an option to create a new user.

### Page: Add 

This page should have a form with following elements:

- Customer number (five digits)
- User name (value must be unique in the db, 3 - 30 chars, format: A-Za-z0-9)
- First name (2 - 150 chars)
- Last name (2 - 150 chars)
- Email address (valid email address, max. 300 chars)
- Date of birth (format: DD.MM.YYYY)
- Password (8 - 150 chars)
- Repeat Password

Only a valid form can be submitted. A success message should be displayed after a form submission.

### Page: Edit

This page should have a form with the following elements:

- Customer number (five digits)
- User name (read only)
- First name (2 - 150 chars)
- Last name (2 - 150 chars)
- Email address (valid email address, max. 300 chars)
- Date of birth (format: DD.MM.YYYY)
- Last login (read only, format: DD.MM.YYYY HH:MM:SS)
- Password (8 - 150 chars, field is optional)
- Repeat Password

Only a valid form can be submitted. A success message should be displayed after a form submission.

### Page: Delete
After a user has been deleted a success message should be displayed.