# OurSpace Backend Server

This is the backend server to run [OurSpace Web App](https://github.com/karenxiong/ourspace). Once you have successfully installed this backend server, please follow [OurSpace Web App's](https://github.com/karenxiong/ourspace) instructions on how to install the client side.

## Project setup

Use `npm` to install the project dependencies:

```bash
npm install
```

Once the project dependencies have successfully installed, use `npx` to migrate the database:

```bash
npx knex migrate:latest
```

Then, you must seed some data into the database:

```bash
npx knex seed:run
```

Now that you have installed the backend server, please visit [OurSpace Web App repository](https://github.com/karenxiong/ourspace) to follow the installation guide.

## FAQ

### How do I restart my seed data?

You must run the seed command again.

```bash
npx knex seed:run
```
