# HenePinMapApp

A wep app i made for practice using ReactJS and NodeJS. Map is made by MapBox and Icons are from Material-Ui.

## Screenshots

**General view of MapBox UI**
<p align="right">
  <img width="1028" height="702" src="https://github.com/HeneDev/HenePin/blob/master/img/qOa60NO.png">
</p>

**Image of a map pin added to the map**
<p align="left">
  <img width="376" height="592" src="https://github.com/HeneDev/HenePin/blob/master/img/ZoTQeju.png">
</p>

**Pins made by other users than the current user are colored different**
<p align="right">
  <img width="363" height="498" src="https://github.com/HeneDev/HenePin/blob/master/img/biv8Sbv.png">
</p>

**New pin module**
<p align="right">
  <img width="595" height="586" src="https://github.com/HeneDev/HenePin/blob/master/img/RezMkpG.png">
</p>

**Pin information shown**
<p align="right">
  <img width="446" height="480" src="https://github.com/HeneDev/HenePin/blob/master/img/0jyAgJq.png">
</p>

### Installation

#### Requirements:

- npm
- mongodb cluster

#### Cloning repository and changing directory:

```
$ git clone git@github.com:HeneDev/HenePinMapApp.git
cd HenePin
```

#### Inside the HenePin folder is server and client directories. Inside both of those directories run

```
npm i
```

#### Inside the server directory create an .env file and inside put in the following environment variables:

```
MONGO_URL = <Your MongoDB connection string>
PORT = <Your port number>
```

#### Inside the client directory create an .env file and inside put in the following environment variables:

```
REACT_APP_TOKEN=<Your MapBox Token>
```

**Note:** Make sure your **server** and **client** PORT are not running on the same port

#### Running the application

- **Inside both server and client directory, run the command**

```
npm start
```
