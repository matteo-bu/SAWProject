## Progetto

Questa applicazione permette agli utenti di esplorare e gestire una raccolta di mod e altri contenuti inerenti a minecraft con lo stile di modrinth.

## Tecnologie Utilizzate

Vite

React

Typescript

PWA (Progressive Web App (PWA)

## Requisiti

Node.js

npm

## Installazione

git clone https://github.com/matteo-bu/SAWProject.git

cd SAWProject

npm install

npm run build

npm run preview

aprire su chrome o edge http://localhost:4173

premere il pulsante install app nella schermata principale (aggiornare la pagina se non compare subito)

## Nota Sulle Notifiche

per attivare le notifiche e riceverle, serve avviare il server con il comando

node server.js

eseguito nella directory principale del progetto

ma funziona solo se il file firebase-key.json è presente nella directory principale del progetto

non sarà pubblico dato che consentirebbe il totale accesso al database

## Testing

cliccare su profile in alto a destra

crearsi un account con email e password


o se si vuole vedere un account con dei progetti già fatti:

loggare con:

-email: prova@gmail.com

-password: 123456

l'account contiene dei progetti minimali che potete modificare, cancellare o usarlo per crearne dei nuovi

## Utilizzo

**Barra in alto**:

Main page: torna alla pagina principale

<- Refresh ->, rispettivamente indietro, aggiorna la pagina, avanti

Discover content: permette di navigare fra le pagina dei contenuti

Profile:

  -se non siete loggati, vi chiederà di loggare
  
  -se siete loggati, lì vedrere solo i vostri progetti, così da poterci accedere rapidamente e poterli modificare
  
  -current name nella pagina del profilo si riferisce al nome che verrà visualizzato quando qualcuno aprirà un vostro progetto

**Discover content**:

in questa pagina potrete cercare progetti filtrandoli per nome, versione e altre caratteristiche a seconda della pagina che avete scelto. Per aggiungere dei filtri premere il + sulle icone a sinistra della barra di ricerca per aprile (e poi il - per chiuderle), cliccando un opzione dentro un'icona, questa viene aggiunta ai filtri utilizzati per filtrare i progetti, tutti i filtri attualmente in uso potete vederli sotto la barra di ricerca, cliccando le singole icone (es. 1.12, 1.7, Forge, Open Source, etc..) le rimuovete dal filtro, cliccando invece il nome della categoria a cui appartengono (es. versions, loaders, license) rimuovete tutti i filtri di quella categoria dal filtro. Appena sotto alla barra di ricerca (non nella sezione server, quella è ordinata di default per name), è anche presente un pulsante per scegliere in base a cosa ordinare i progetti.

**Modificare un progetto**:

quando cliccate su un progetto, se siete l'autore di questo, vedrete un pulsante "edit", da qui si aprirà un menù che consetirà di modificare le caratteristiche principali del vostro progetto (nome, descrizione, tags, files). Il sito non hosta davvero i file, quando create/modificate un file, ne indicate le caratteristiche, ma poi dovete mettere voi un link dove il file è hostato e devo è possibile scaricarlo.

**Scaricare il file di un progetto**:

cliccare su un progetto, andare nella sezione versions, qui vedrete i file del progetto, per scaricarne 1, premere + accanto al file a cui siete interessati, si aprirà una pagina dove potrete vedere il changelog del file e un pulsante download, premere il tasto download per andare al link di download del file.

**Server**

i server non hanno file o niente da scaricare, la funzione della pagina dei server è solo quella di permettere ai proprietari dei server di minecraft di mettere in mostra il loro server, descrivendolo, indicandone le caratteristiche e l'IP per permettere ai player di poter entrare, IP visibile (se presente) a destra della descrizione del server. 
