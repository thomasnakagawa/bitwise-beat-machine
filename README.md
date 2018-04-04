# Bitwise Beat Machine

A drum machine that creates beats by using logical operations (AND, OR, XOR, etc.) to determine when different peices of the drum kit are played.  
Click [here](https://bitwise-beat-machine.thomasnakagawa.com) to play.

## Getting Started

Requires Node and npm to be installed

Clone the repository and then install dependencies with

```
npm install
```

This project uses create-react-app, so that the code can use create-react-app scripts.  
Start a development server with  

```
npm run start
```

## Deployment

To create a build for deployment, run

```
npm run build
```

and find the files in /build.  
The app is entirely front-end, as such it can be hosted as a static site.

## About
A major goal of this project was to create a React app with as little state as possible in the JavaScript, and the rest in the URL. The source code only includes React components and a few utility functions. The only state that the React components keep are what sounds to play and weather or not the about, share, or help dialogues are open, all other states are in the URL. The UI is rendered as a function of the URL, and when the user clicks buttons to change the beat the URL changes while the UI rerenders.

This makes it so sharing beats is simple as the URL contains all the information about the beat state. People can send each other URLs that do not need to be stored in a database.

The URL encodes the entire app state with three different sections: the first houses the BPM, the second stores the binary numbers, and the third contains instruments and track operators. For example in the URL with

/80-10100101-10101101-kad-sxr

the BPM is 80, the two binary numbers are 1010010 and 10101101, and there are two tracks, the first with a _k_ for the kickdrum sound and _ad_ for the AND operator, and the second with _s_ for the snare sound and _xr_ for the XOR operator.

The app parses the URL data to determine what to show and what sounds to play.
