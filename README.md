# iwu-aku
"Topcoder Skill Builder Competition | FinTech" solution. 

For the deployed version of this project visit [Regtech-hard](https://regtech-hard.herokuapp.com/)

### How to run this project locally

Install `concurrently` globally.

`npm install -g concurrently`

From the terminal, navigate to the 'server' directory.
`cd .\server\`

Create a .env file in the `.\server\` directory and add your env variables
```bash
SECRET_KEY=<REPLACE_WITH_YOUR_SECRET_KEY>
JWT_SECRET=<REPLACE_WITH_YOUR_JWT_SECRET>
```

Run `npm run installAll` to install the dependencies for both server and client side.

OR

`npm install && cd .. && cd client && npm install`

To start up the application run `npm run dev`

Open in your browser `http://localhost:3000`