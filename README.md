# Cineworld Cinema Times

A minimal site for current film times at Cineworld


-----

select cinema

view films showing today
screening times
time to next screening

hide watched / uniterested movies

hide event films (opera, kids specific)

combine 3d / imax / 2d film duplicates

----

api doesn't support CORS, but also doesnt support dots in jsonp callback functions, blerg
unable to use angular automatic callbacks



[temporary fix](http://stackoverflow.com/questions/25400891/how-to-custom-set-angularjs-jsonp-callback-name) : an interceptor that builds the functions with the expected incorrect name and links them to the correctly named functions.