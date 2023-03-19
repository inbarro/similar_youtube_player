# youtube_player
 <img src="giphy.gif" width="250" height="100" title="Youtube logo">

Welcome to Inbar's youtube Player!

### Overview ###
Using this app, you can control a YouTube playlist and watch every song on it.
Located on the left side of the screen is the playlist,
in which you can add and remove songs, as well as change their order.


### installation ###

 Clone server repository to your local machine


#### server ####

1. Open a terminal and navigate to the project's root directory
2. Install the required dependencies by running:``` npm install ```
3. Start the server by running ``` npm start ```

#### client ####

1. Open a terminal and navigate to the project's root directory
2. Navigate to the client directory by running ``` cd client ```
3. Install the required dependencies by running ``` npm install ```
4. Start the app by running ``` npm start ```

### assumptions ###

* using chrome

## About this Project ##

* We use sockets in this project to notify all clients whenever a playlist change is made.

### scalability ###
Following the instruction, several decisions have been taken to maintain scalability, including:

* on each song added, only the added dong data will be sent to the server and then notified to all clients.
* on every song removal, only its Id will be sent to the server. 
after the server has removed the song from the list,
 only the removed song Id will be passed to the clients in order to change their local songs list.

* on every order change of the playlist, only the id aof the song that has been moved will be send to the server,
together with two numbers that represent its new priority relevant gap of numbers. (mechanism that will be explained nest)

* each video's (called song in the code) index at the list represented at the a field called 'priority' in the backend.
the priority number. the gaps between each song priority is 100 at first, that can be less.
this way we can update priority for only one song when there is a change in the playlist order, instead of updating the priority for all songs(O(n)).

for Example - lets say that we have a list of videos:
 {id: 1, priority: 100}
 {id: 2, priority: 200}
 {id: 3, priority: 300}
 {id: 4, priority: 400}

in case of song with id:4 and priority:400 moved to between songs with id:1 and id:2 - 
we will be able to update only the priority of the song that moved, with id:4.
its new priority will be the middle of the gap between the two other songs,
in this case, the middle between 100 and 200 - 150.
in this way, we can still maintain the ordering of songs by their priority. and not update other songs priority.

needs to be implemented in the code - 
in case of a song that moved between two songs with following priority( the solution include one more priority update ) 

more actions that can be implemented in the code - 
 * pagination for the song list instead fetching all of it at once.
 * the song list could be save as a tree data structure.
  

 ## in terms of security ##
 
 * song list is handled from the server. each request to change from the client will be handled at the server and then the change will be notify to all clients
 * using API with API_KEY is done by the server  - youtube API that gets the title and the duration of a video.
 

 more actions that can be implemented in the code - 
 * adding rate limiting to your API endpoints to prevent abuse 
 * authentication and authorization.

in terms of consistency -  implement a version control mechanism. For example, add a version field to each song object, and require the client to provide the current version number of the songs list when making an update request. .

this project contains the client directory and the server directory.

#### small notes ####
* instead of using random to generate id - should use UUID
