# Bitwise Beat Machine

A drum machine that creates beats by using logical operations (AND, OR, XOR, etc) to determine when different drum hits play.  
Play it [here](https://bitwise-beat-machine.thomasnakagawa.com)  

## Getting Started

Requires Node and npm 

Clone the repo and then install dependencies with

```
npm install
```

This project uses create-react-app, so the create-react-app scripts can be used.  
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
The app is all front-end, so it can be hosted as a static site.

## About
Something I was trying out in this project was creating a React app and keeping as little state as possible in the Javascript, and the rest in the URL. The source code includes only React components and some utility functions, and the only state that the React components keep is for what sound to play and weather or not the about, share and help dialogues are open. Everything else is in the URL. The UI is rendered as a function of the URL, and when the user clicks buttons to change the beat, the URL changes and UI rerenders.

This makes it so sharing beats is really simple because the URL has all the information needed. People can just send each other URL's, and they don't need to be stored in a database.

The URL encodes the entire app state by having three different sections: the first for the BPM, the second for the binary numbers, and the third for the instruments and operators of the tracks. For example in the url with

/80-10100101-10101101-kad-sxr

it has a BPM of 80, the two binary numbers are 1010010 and 10101101, and there are two tracks, the first with a _k_ for the kickdrum sound and _ad_ for the AND operator, and the second with an _s_ for the snare sound and _xr_ for the XOR operator.

The app parses the URL to determine what to show and what sounds to play.
