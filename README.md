https://www.conventionalcommits.org/en/v1.0.0/



## backend 

```shell
# start 
$ npm install 
$ npm run start:dev


# AUTHORS

# add author to the database
$ curl -X POST http://localhost:3001/authors -H "Content-Type: application/json" -d '{"name": "Jane Doe", "bio": "Author of historical novels."}'

# get all the authors in the database
$ curl -X GET http://localhost:3001/authors


# BOOKS

# add book to the database
$ curl -X POST http://localhost:3001/books -H "Content-Type: application/json" -d '{"title": "Mystery of the Blue Train", "publicationYear": 1934, "authorId": "AUTHOR_ID"}'

# get all the book in the database
$ curl -X GET http://localhost:3001/books
```

<br>

## frontend

```
$ npm run dev
```