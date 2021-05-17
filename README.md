# Poseidon - Frontend 

## Introduction

Frontend application to manage docker resources such as images and containers.

You can find the backend application from this aplication [here](https://github.com/fePremazzi/poseidon-bff).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.3 and [NodeJS](https://nodejs.org/en/) version 14.3.0.

## Main components

* [NodeJS](https://nodejs.org/en/) - NodeJS version 14.3.0
* [Angular](https://github.com/angular/angular-cli) - Framework used to build the application from version 10.0.3.
* [Ngx Custom Validators](https://www.npmjs.com/package/ngx-custom-validators) - Package to use custom validators


## Deployment 

### Docker approach

First of all, you must have Docker installed on your machine. If you use Linux than [click here](https://docs.docker.com/engine/install/ubuntu/) and read the Docker documentation on how install Docker and docker-compose on linux or [click here](https://docs.docker.com/docker-for-windows/install/) if you are a Windows user to install Docker Desktop for Windows.

After installing docker you can deploy this application by using the following docker command on the project root folder:

```
docker run -d -p 4201:4200 fepremazzi/poseidon-front
```

This command will download frontend image and initialize its container and expose the web application on ``http://localhost:4201``.

### Npm build approach

* Download and install Node 14.3.0 available on <https://nodejs.org/pt-br/download/releases/> 
* Then install angular cli by running the command ``npm install -g @angular/cli@10.0.3``
* You can check the installation by running a ``ng --version`` command on your terminal.
* Clone this repository
* Navigate to the root folder of your project and run the ``npm install`` to install all project dependencies.
* Run the application by running the ``ng serve --open`` command.
* It will be espose on port 4201 at ``http://localhost:4201``.