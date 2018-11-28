# todoodles

## Project Description

Todoodles is a traditional todo web app that allows the user to strike-through a completed list item. 

Note: _you'd be crazy to actually use this app to manage your todos_...user authorization has not been set up so all users have access to, and can edit the same list.

I created this project to practice setting up a front end that consumes data from a back end API. 

View the web app here: https://todoodles.surge.sh/

<img src="https://i.imgur.com/nfcMyKs.png" width="600" alt="screengrab of app">
<img src="https://i.imgur.com/2evJ3pF.png" width="300" alt="screengrab of app mobile">


## Made With
- Node/Express server
- server hosted on Heroku
- React client
- client hosted on Surge
- axios for API calls
- PostgreSQL for database

## TODO
- Add loading spinner while user waits for Heroku server to wake up
- OR, move to a server host that doesn't sleep?
- Give users incentive to cross out todos...perhaps reveal doodles in the margins?
- Set up AUTH so that users aren't sharing their TODO list with the whole world? Firebase?
