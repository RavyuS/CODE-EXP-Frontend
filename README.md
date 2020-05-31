# CODE_EXP Team Stonks' Frontend

Running a Expo template based on React-Native with basic Redux implemented using [Redux Toolkit](https://redux-toolkit.js.org/introduction/quick-start)

## Getting Started
Read up on [Redux Toolkit](https://redux-toolkit.js.org/introduction/quick-start) to understand how store, action, and reducers have been implemented. Example of a slice can be found [here](features/account/accountSlice.js). 

1. Git Clone this repository
2. run `npm install` in the root of this project to pull dependencies
3. Run `npm start` to start the webserver that allows you to push the application to your phone/web
    - You need to unblock ports 19000 to 19006 to access the servers through LAN

Note that logging in requires backend to be running too. It is [currently hardcoded](features/account/loginForm.js) so you will need to edit it to run a local instance. Will change to the EC2 server URL once that is up. But for testing, please take note.

