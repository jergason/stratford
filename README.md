# The Stratford Times
Shakespeare has been getting a lot of reviews recently about his plays. So far he has managed to build a backend API to serve them, but he doesn't have the chops to finish out the UI. That's where you come in, your task is to build a client side app for Shakespeare's API. The design of the application is up to you.

#API Documentation

Authentication:

Authentication is done by passing your API token using the Authorization header. The value of this header will contain nothing more than just the token value.

Your authentication token is koOheljmQX

Endpoints:

Two endpoints exist for this API.

Reviews Index
GET shakespeare.podium.co/api/reviews
Response looks like the [following](https://gist.github.com/telnicky/88e98de5a165037f81fa72694d410a35)

Reviews Show
GET shakespeare.podium.co/api/reviews/:id
Response looks like the [following](https://gist.github.com/telnicky/231df61e401cb6aa2279cb2adfa05c5a)
