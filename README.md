App is live (with seed data) on heroku at (https://gloater.herokuapp.com)[https://gloater.herokuapp.com/].

You can create your own account or login with email `user@example.com` and password `password`.

# Overview

The server application (in `/server`) is a Rails api. It's a pretty basic json api.

The client (in, you guessed it, `/client`) is a React application that uses redux for state management and a few other libraries like react-router.

More, but still not enough, information about each app can be found in their respective READMEs.

Features that work (in twitter language): tweeting, following, favoriting, sign up, login.

# Known issues

User authorization tokens are not saved across refreshes. I was planning to save that bit of state to session storage and initialize the store with it on load, but I had to draw the line somewhere.

# Running locally

## Server

You need to install gems, create the database, run migrations, and add seed data. Of coure, you don't *have* to seed the database. But I'm assuming you don't want to experience an application completely devoid of meaningful content. Then again it is a twitter implementation. (Zing.)

Anyway, here are quick copy/paste bash commands you're here for:

```
cd server
bundle install
bin/rails db:create db:migrate db:seed
bin/rails s
```

## Client

You need to install dependencies and run it. I like `yarn`, but feel free to substitute `npm` if you like long installs.

```
cd client
yarn
yarn start
```

# Deploying

There are a couple of funny things about deploying to heroku.

The server and client are separate applications, and heroku wants one application. So we need to first build the client app (`yarn run build`), then copy the contents of the build directory (`client/build`) to the public directory of the server application (`server/public`). Then we push the server application to heroku and we sneak in two applications. Take that, heroku!

But wait! Because you're a savvy heroku user, you're already thinking, "Heroku expects the app to be in the root of the project, and the app we want to deploy is in `server`! Whoever built this application is a fool!" Well, that's a mean thing to think. Shame on you. Besides, there's a simple solution (well, a solution) for our problem: `git subtree`. We can push the server directory to heroku using `git subtree push --prefix server heroku master`. That way, we'll hide the rest of our repo from heroku, and it'll think we only have a server application. Sneaky.

In summary:

```
cd client
yarn run build
cp -r build/* ../server/public/
cd ..
git subtree push --prefix server heroku master
```

# Apidoc

You can generate an embarrassingly small amount of documentation for the api using apidoc. From the root directory (not `client` or `server`), run:

```
yarn
yarn run apidoc
```

That'll generate what little documentation there is and store it in the `apidoc` directory. Open `apidoc/index.html` it in a browser to marvel at just how poorly it is documented. Once I got apidoc working, I sort of ran out of motivation. But it would be useful to document a real project!
