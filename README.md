

## Node Initial Demo

Estructura general de un proyecto node.js. Folder y files:

- <b>\_\_tests__</b>. Folder para tests Jest. Véanse [Jest Docs](https://jestjs.io/es-ES/docs/configuration).
- <b>app</b>:
    - <b>config</b>
    - <b>controllers</b>
    - <b>crons</b>
    - <b>middleware</b>
    - <b>models</b>
    - <b>routes</b>
    - <b>tmp</b>
    - <b>app.js</b>. Entry point.
- <b>.env</b>. Environment descriptor. Véase [dotenv doc](https://www.npmjs.com/package/dotenv).
- <b>.eslintrc</b>. Linter JS, análisis estático de código. Véase [EsLint Docs](https://eslint.org/docs/user-guide/configuring/configuration-files).
- <b>.prettierignore</b>. Formatter de código. Véanse [Prettier Config](https://prettier.io/docs/en/configuration.html) y [Prettier Ignore](https://prettier.io/docs/en/ignore.html).
- <b>.ecosystem.config.js</b>. Gestor de procesos en tiempo de ejecución. Véanse [PM2 Docs](https://pm2.keymetrics.io/).
- <b>package.json</b>.

## Entrega d'exercici: Node REST Server + MongoDB/MySql + JWT
Instrucciones
Esta API se desarrolló bajo NodeJS v10.16.2 y NPM v6.14.8.

Instalación
Clonar proyecto
Ejecute npm i
Arranque el servidor con npm start, también puedes levantar el servidor con npm run dev, el cual hará uso de nodemon

### Endpoints
POST: /players : crea un jugador

PUT /players : modifica el nom del jugador

POST /players/{id}/games/ : un jugador específic realitza una tirada dels daus.

DELETE /players/{id}/games: elimina les tirades del jugador

GET /players/: retorna el llistat de tots els jugadors del sistema amb el seu percentatge mig d’èxits

GET /players/{id}/games: retorna el llistat de jugades per un jugador.

GET /players/ranking: retorna el ranking mig de tots els jugadors del sistema. És a dir, el percentatge mig d’èxits.

GET /players/ranking/loser: retorna el jugador amb pitjor percentatge d’èxit

GET /players/ranking/winner: retorna el jugador amb pitjor percentatge d’èxit

### Postman collection link
https://www.getpostman.com/collections/7f831f340032d8fd9b38
