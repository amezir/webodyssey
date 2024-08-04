# Installation WebOdyssey

## En Local

### mise en place de l'environnement

Dans un premier temps, récupéré le projet depuis le GitHub suivant :

https://github.com/NoamSeb/WebOdyssey.git

Et cloner le projet
Utiliser un invite de commande afin de vous déplacer au niveau de votre projet.

##### Base de donnée

Utiliser un logiciel vous permettant d'avoir un server local (ex: XAMPP ou Docker)

Récuperez la sauvegarde de la base de données et l'importer dans phpMyAdmin dans les deux cas suivants.

###### Docker

Dans le cas où vous utilisez Docker, veuillez récupéré le fichier `docker-compose.yml`disponible sur la branche develop du répository GitHub et le mettre à la racine du projet.

Initier le conteneur Docker avec la commande `docker compose up -d` .

###### Logiciel FTP

Démarrer le server local pour accéder à phpMyAdmin

### Lancer l'application

Dans deux terminaux différents :

#### back-end

```
cd back
npm install
node app.js
```

#### front-end

```
cd front
npm install
npm run dev
```

## Sur server

### back-end

Importer les fichier `app.js`, `package.json`, `package-lock.json`, `template.html` et le dossier `pdf` dans un dossier dédié sur le serveur

Utiliser une application spécifique pour NodeJS implémenter dans le server (dans le cas de o2switch, Setup NodeJS App) pour installer les dépendances et lancer l'app Node.

### front-end

Dans un premier temps, pensez à bien remplacer les liens d'appel API par le lien du server.

Si vous partez du repository GitHub et en assumant que vous avez déjà cloner le projet sur votre ordinateur, vous devrez faire `cd répertoire/du/projet` aller sur la branche `prod` à l'aide de la commande `git checkout prod`.

Une fois cela fait, vous devrez rentre le site static avec la commande `npm run build`.
Un dossier static devrait apparaitre à la racine du projet.

Une fois le site rendu static, connecter-vous a votre panel admin de l'hébergeur.

Configurez votre domaine et faites un répertoire dans le dossier `public_html`.
Importez le contenu du dossier static dans le nouveau répertoire que vous venez de créer.

Une fois votre domaine configuré et votre contenu importer, le site devrait pouvoir se lancer si vous contacter le domaine.
