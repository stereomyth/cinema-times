# Cineworld Cinema Times

A minimal site for current film times at Cineworld



## Marquee

Angular frontend

- app icon
- name?
- url
- interface icons
	- settings gear
	- hide/show eyes
- webapp ios / android package
- options
	- poster or screenshot
	- compact list
	- auto hide 3d / imax
	- start-time or real start-time
- comming soon
	- hide
- responsive
- time to next screening
- intro wizard
- highlight time on click
- time till next? 
- empty states


## Projectionist 

Node server api

# Back

- learn node 
- call cineworld api
	- use jsonp
	- store data as usefull json
		- combine 3d / imax / 2d film duplicates
		- film > days > screenings
- serve api requests to frontent
	- only send relevant films and times
	- gzip

# Front

- simplify frontend
	- remove jsonp hackery
	- hidden still local
		- same json structure as films and extend objects

# v2 

- hide event films (opera, kids specific)?
- call other api for film lengths?
	- create front end viewing order system 
