Note: Run commands below use `yarn run`, but you can also use `npm run`.


# Testing

## Unit testing

`yarn run test` runs tests with mocha.

`yarn run test:watch` runs tests and watches for changes.

## E2E testing

`yarn run test:e2e:setup` to set up for e2e testing.

`yarn run test:e2e` to run e2e tests using nightwatch.

# Routes

### Gloats

- `/gloats`: current user's feed
- `/gloats/recent`: gloats sorted by created_at desc
- `/gloats/popular`: gloats sorted by admirer count
- `/gloats/admired`: gloats admired by current user (requires user)
- `/gloats/stalked`: gloats by users stalked by current user (requires user)

### Users
- `/users`: users sorted by stalker count
- `/users/stalked`: users stalked by current user (requires user)
- `/users/:username`: user information and gloats for user with :username

### Auth
- `/login`: login form (requires no user)
- `/signup`: signup form (requires no user)

TODO

1. Add login
  ✓ actions
  ✓ reducers
  ✓ login component
  - popover component
  ✓ add token to api requests
2. Add signup
  - /signup
  ✓ redux form
  - signup form component
3. Add gloating
  - ✓ Authorization
  - /gloats
4. Add users
  - /users
  - /users/[:username]
5. Add admiring
  - /gloats/admired
6. Add stalking
  - /gloats/stalked
  - /users/stalked
7. Docker
