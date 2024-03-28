README last updated on *August 11, 2023*

Developers:
- Xavier Akers

## Using git & GitHub
There is a file named git-commands.txt that has a list of commands and a short description. Hopefully it should be enough information to start out. In the file, the commands are listed in somewhat chronological order of how they would be used the first time.

## API Structure
With the data networked through json structure, the key is used as a variable name and the data as the values. Hoping this will ease the process of integrating the client. You will have to take a look at the values passed to make sure the data is being used correctly. For routes like login and register, if the user is already logged in, it sends a json with {"url":url}, and this will pass a new route name that can be used to call the correct route. 
# ALL USERS WILL NOW HAVE A TOKEN 


## Database
Database uses Google Firebase Realtime database.

### List of External Python Packages
**This should be updated as soon as you install a module**
- flask
- pyrebase4


### List of React Native Modules installed
**This should be updated as soon as you install a module**
- react-native-datepicker
- react-navigation-stack
- react-navigation
- asyncstorage
 - for storing tokens locally --  stay signed in
- react-navigation/native-stack
- react-navigation/native

## Starting the API
To run the api, move into the api directory and run
```
python run.py
```
As of right now it is running on port 5000 but this can always be changed.
The server is also accesible from a device on your local network

**Data sent between the api and the client is in json format**



Functions Added:

Login Route
- Can log in with either username or email
- Cannot log in to an account if a user is already logged in
- Trying to access this route while logged in return {"url":"/home"}

Logout Route
- Cannot be accessed unless logged in

Register Route
- Requires input of username, first name, last name, email, age, and password
- Returns {"register":"true"} if account is successfully made
- Returns {"register":"false"} if account is not made
- Trying to access this route while logged in return {"url":"/home"}

Account Info Route
- Cannot be accessed unless logged in
- Can view and edit account information based on the HTTP method

Home Route
- Cannot be accessed unless logged in
- Currently only sends back the logged in user's username


Venv Install Scripts
- Added Windows and MacOS/Linux scripts to install venv
- Will also install the necessary api requisites

Group Table in Database
- Initialized Groups
- Create Member and Admin status for Users in Groups using many to many relationships

Create Group Route
- Creates group
- Title of group is required
- Bio is optional during creation
- The current_user is automatically set as admin status
- An 8 digit code is assigned to the group to identify

Join Group Route
- Requires the 8 digit code with key 'code'
- Adds the current_user as a member to respective group
- Adding the 'admin' key with any value that is not 0 will set the current_user as admin status
- ie. {"admin":1}, {"admin":"true"}, {"admin":69}

Group Info Route
- Requires the 8 digit code
- Can view or edit information based on HTTP method

Leave Group Route
- Requires the 8 digit code
- Removes current_user from the group
- If current_user is the only admin, then they cannot leave the group
- Must always have one admin

Group Members Route
- Requires the 8 digit code
- Return the admins and members of a group

User's Groups Route
- Returns the 8 digit codes of the groups the user is in
- Separates the codes by admin status and member status

Implmentation of Google Firebase
- Utilize Firebase Authenticaion
- Utilize Firebase Realtime Database
- Utilizes User session tokens to keep the app always signed in
- Session will last for up to 1 hour before the reresh token route must be ran
- All User Routes have been updated -- check routes.py for proper data input and output
- Updates show below as well
- Mosts routes now require the users token in format "token":"(str token)"
  - Adds layer of security
  - The user token must be saved within the React Native Client as a variable

Implemented success and error codes in all returns

Register Route
- No change on calling
- Returns token

Login Route
- No change on calling route
- Now returns the users token

Logout Route
- Requires user token upon calling function
- Returns same as before

Account Route
- GET protocol
  - requires user token upon calling
  - Only returns data that is stored in database
  - ie. if users bio is null, will not return a key value pair for bio
  - this optimizes speed by not sending uncessary data
- PUT protocal
  - requires user token upon calling
  - Does not require every key, if the key value pair is null, key does not need to be sent to optimize networking
  - Returns same as before

Refresh Token Route
- Firebase only allow tokens to last 60 minutes per session, thus requiring tokens to be refreshed
- Accepts token and returns token

Create Group Route
- Accepts token, title, and bio


Group Routes
- Firebase has not been implement into the group routes yet
- Currently all commented out

Deleted unnecessary clutter

Optimized networking

Seperated routes by category

# Zephyr UI/UX Updates

## Update 1:
Created simple navigation between Login/Register and Home

All UI needs to be done, only the bare minimum has been done and its hella ugly

All data fetched from the api is printed in the console

Implemented Authorization
- Login
- Logout
- Register

Networking
- LoginScreen and RegisterScreen provide examples how to send data to the server
- HomeScreen and SettingsScreen provide examples how to receive data from the server

AuthContext
- Helper class to store the user session token

fetchApiData
- Function to retrieve data
- Parameters are ("token", "url")
- Returns data in json

RegisterScreen
- Need birthday option implemented
