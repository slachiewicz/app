# User interface for GM

[![Build Status](https://travis-ci.org/FAC-GM/app.svg?branch=master)](https://travis-ci.org/FAC-GM/app)
[![Code Climate](https://codeclimate.com/github/FAC-GM/app/badges/gpa.svg)](https://codeclimate.com/github/FAC-GM/app)
[![Dependency Status](https://david-dm.org/FAC-GM/app.svg)](https://david-dm.org/FAC-GM/app)
[![Test Coverage](https://codeclimate.com/github/FAC-GM/app/badges/coverage.svg)](https://codeclimate.com/github/FAC-GM/app/coverage)

## Why?

## What?

This application allows people to search through
contact data stored in an ElasticSearch database.

# How?

## We use following technologies:

* [Nodejs](https://nodejs.org/en/)
* [Hapijs](http://hapijs.com/)
  * Main packages: env2, Handlebars, Inert, Vision
  * Testing: Lab, Code
* Databases:
  * [ElasticSearch](https://www.elastic.co/)
  * [Redis](http://redis.io/)


### Run the App *Locally*

Clone the Git repository from GitHub:

```sh
git clone git@github.com:FAC-GM/app.git && cd app
```

### ElasticSearch (*our primary database*)

You will need to have ***ElasticSearch*** running on your local
machine for this to work.  
If you are on Linux/Mac and ***don't want*** to install the Java Runtime
*because* [***Java*** *is* ***insecure***](https://goo.gl/cqEhN4)  
we *recommend* you use [***Vagrant***](https://github.com/dwyl/learn-vagrant)
to run ElasticSearch in a Virtual Machine.  

We have included a `Vagrantfile` with the *bare minimum* you need to
get ElasticSearch up and running. Provided you already have
Vagrant and VirtualBox installed on your machine, you can boot the ES VM
with:

```sh
vagrant up
```


### `.env` file

you will also need to have a `.env` file in the root of your project
with the following variables:

```sh
# SEARCHBOX_URL=http://paas:password@eu-west-1.searchly.com # ask Simon for this
SEARCHBOX_URL=http://localhost:9200
PORT=8000
ES_INDEX=gmcontact
ES_TYPE=contacts
RESULTS_PER_PAGE=10
```
Ask a member of the dev team for the `SEARCHBOX_URL` variable if you
want to access the *hosted* ElasticSearch Database.

### Install *node.js* dependencies

```sh
npm install
```

### Run the Unit Tests

```sh
npm test
```

### Boot the App

```sh
npm start
```

Now visit http://localhost:8000 in your browser to view the site.


# Wireframes

![Wireframes](https://github.com/FAC-GM/app/blob/master/wireframes/mobile-first.png)

![Wireframes](https://github.com/FAC-GM/app/blob/master/wireframes/desktop-view.png)
