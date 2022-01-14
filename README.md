# Argent-bank

## Description

13th project of curriculum "JavaScript React developper" from OpenClassrooms

## Getting started

- clone this repository
- check the README.md of the back-end (you need to have nodejs and mongodb installed)

### From the back-end readme
- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

### Install dependencies

Go to both "argent-bank-back" and "argent-bank-front"
And run `npm install`

### Populate database

In order to create the accounts for the login API you need to go to the "argent-bank-back" folder
And run `npm run populate-db`

Only do this step the first time you set up this project on your computer

## Run the project

From a terminal
Go to the "argent-bank-back" folder
And run `npm run server`

You should see various output and at the end the message "Database successfully connected"

From another terminal
Go to the "argent-bank-front"
And run `npm run dev`

You should see this output :

````bash
vite v2.6.11 dev server running at:

> Local: http://localhost:3000/
> Network: use `--host` to expose

ready in 755ms.
````

You can now open your browser at "http://localhost:3000/"

To find the login credentials for the two account look at the back-edn README