# Upload Cars CSV File Code Challenge

It's a NodeJS application with the following endpoints.

1. Upload the car csv file (provider name in params)
2. Retrieve the car information based in the provider Name

## Installation

Clone this repository.
Run the following commands in your root directory.

```bash
npm install
```

## Run Project

Clone this repository.
Run the following commands in your root directory.

```bash
npm start
```

## Unit Testing

Run the following commands in your root directory.

```bash
npm test
```

## CSV Files
There are different car providers file inside CSV folder.
In this moment the cars providers supported are : gmc, chevy and volvo other 
provider name will be throw an error. 

so if you upload for example the GMC file you have ti hit the endpoint with the name of that 
provider 
http://localhost:3000/api/csv/upload/:providerName 

Example in the case of gmc 
http://localhost:3000/api/csv/upload/gmc then upload the gmc.csv file inside csv folder 

Example in the case of chevy
http://localhost:3000/api/csv/upload/chevy  then upload the chevy.csv file inside csv folder 

## Postman Collection

```bash
You can see the postman collection inside the postman_collection folder 
in the current project
```
## Database information
```bash
This application is using MongoDb Memory Service Global so the db is deleted when the application is sttoped.  
Url to connect to the db, could use MongoDB Compass to see the collections using GUI app
Database URL: mongodb://127.0.0.1:46139/marlon
```
## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update the tests as appropriate.

## License

[Marlon Brenes Rights Reserved](https://github.com/mbrenes)
