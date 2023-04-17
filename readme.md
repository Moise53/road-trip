# Epic Road Trip


## Lancer le projet

Pour lancer le projet il faut lancer la base de données et le serveur depuis docker :
```sh
docker-compose up -d ## Lancer les conteneurs
```
Ensuite, le serveur sera disponible en local : 
```
http://localhost:5000
```


## Commandes Docker
```sh
docker-compose up -d ## Lancer les conteneurs
docker-compose down ## Fermer les conteneurs
docker exec -ti mysql-db sh ## Ouvrir le shell du conteneur
```
