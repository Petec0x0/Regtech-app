# iwu-aku
"Topcoder Skill Builder Competition | FinTech" solution. 

### How to run this project locally
Create .env file in the backend directory and add your env variable
```bash
SECRET_KEY=<REPLACE_WITH_YOUR_SECRET_KEY>
JWT_SECRET=<REPLACE_WITH_YOUR_JWT_SECRET>
```
Install `concurrently` globally.
`npm install -g concurrently`

From the terminal, navigate to the 'server' directory.
`cd .\server\`

Run `npm run installAll` to install the dependencies for both server and client side.

OR

`npm install && cd .. && cd client && npm install`