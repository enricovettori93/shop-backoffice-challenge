# React + TypeScript + Vite

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

- Prerequisito: avere installato docker
- run `docker-compose build`
- run `docker-compose up`

## Tests
É stato scelto cypress per eseguire la suite di test di tipologia e2e: non avendo controllo sulla parte backend le chiamate http sono state mockate.

Per lanciare la suite di test:
- creare un file cypress.config.ts partendo da cypress.config.example.ts inserendo i valori BASE_URL, DEFAULT_STORE (lo stesso del .env) e DEFAULT_PRODUCT (un ID di un prodotto esistente)
- run `npm run dev` in un terminale
- quando vite ha eseguito correttamente il webserver
- run `npm run cy:run` in un altro terminale per eseguire cypress in modalitá headless

## Improvements
- migliorare la gestione delle variabili d'ambiente usando .env.dev / altri ambienti
- la ui é stata creata senza uso di librerie di terze parti, é davvero basilare
- tests
  - dockerizzare la suite
  - scriverli in ts
  - togliere un pó di copia / incolla
  - estendere la suite includendo anche il form di creazione prodotto con il trigger dei validatori d'errore / payload
- modificare il compilerOptions di ts inserendo i path per avere tutti import assoluti
