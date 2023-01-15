<p align="center">
<img src="https://user-images.githubusercontent.com/38213551/212491047-ce2fa5fc-3699-4c21-987a-8cdd5c9a7825.png" alt="Lungo Logo" width="1200" height="450"/>
</p>

<p align="center">🏆A Json based database</p>

[Documentation](#documentation)
  - [Application](#application)
    - [Methods](#methods)
      - [syncAndUpdateFiles()](#syncAndUpdateFiles)
      - [create()](#create)
      - [mixList()](#mixList)
      - [findAll()](#findAll)
      - [findOne()](#findOne)
      - [insertOne()](#insertOne)
      - [insertMany()](#insertMany)
      - [writeDataFromDifferentFile()](#writeDataFromDifferentFile)

### Methods

### syncAndUpdateFiles()

This method creates a new json file. With the filesystem library. 

```ts
mondash.syncAndUpdateFiles()
```

### create()

This method creates a new elements. 
Example : 

```ts
mondash.create({ exampleName: 'utah' })
```
### mixList()

This method mixing from the current array.
Example : 

```ts
mondash.mixList()
```

### findAll()

Returns all the information from the database.

```ts
mondash.findAll({})
```

### findOne()

Returns one specific data from the database.

```ts
mondash.findOne({ name: 'can' })
```
