# HenePinMapApp

A wep app i made for practice using ReactJS and NodeJS. Map is made by MapBox and Icons are from Material-Ui.

## Screenshots

![General view of MapBox UI](https://imgur.com/a/Bs6YQk6)

![Image of a map pin added to the map](https://imgur.com/a/3SxmdCm)

![Pins made by other users than the current user are colored different](https://imgur.com/a/Ry5mVsA)

![New pin module](https://imgur.com/a/avPmfgM)

![Pin information shown](https://imgur.com/a/VwspNHH)

### Installation

- **Requirements**:
- npm
- mongodb cluster

- **Cloning repository and changing directory:**

```
$ git clone git@github.com:HeneDev/HenePinMapApp.git
cd HenePin
```

- **Inside the HenePin folder is server and client directories. Inside both of those directories run**

```
npm i
```

- **Inside the server directory create an .env file and inside put in the following environment variables:**

```
MONGO_URL = <Your MongoDB connection string>
PORT = <Your port number>
```

- **Inside the client directory create an .env file and inside put in the following environment variables:**

```
REACT_APP_TOKEN=<Your MapBox Token>
```

**Note:** Make sure your **server** and **client** PORT are not running on the same port

### Running the application

- **Inside both server and client directory, run the command**

```
npm start
```
