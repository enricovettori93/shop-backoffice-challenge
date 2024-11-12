# React + TypeScript + Vite

TODO
- tests cypress
- tanstack query error handling
- error handling

## Stack tecnologico
- React
- TypeScript
- Tanstack Query
- Tailwind
- React router dom
- Vite

## Installazione
- Prerequisito: avere installato NVM nel sistema operativo
- Creare un file .env a partire da .env.example
- run `nvm use`
- run `npm install`
- run `npm run dev`

Da qui verrá eseguito il webserver con vite e sará raggiungibile all'indirizzo http://localhost:5173/

## Docker
É presente il Dockerfile e il compose per poter eseguire l'app in modalitá produzione con la sua build.
É richiesta sempre la creazione del file .env come scritto sopra.

- come prerequisito é aver installato docker
- run `docker-compose build`
- run `docker-compose up`
