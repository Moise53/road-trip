# Epic Road Trip - API

## Database Management
Avant de lancer l'api il faut créer la base de données via docker. N'oubliez pas de remplir fichier `.env` avec l'url de la base de données.
DB_URL=mysql://root:password@localhost:3310/road-trip

```sh
npx prisma migrate dev
npx prisma mirgate reset
```

## Lancer le projet

```sh
npm install ## Installer les dépendances
npm run dev ## Lancer l'api
```

