# User interface for GM

[![Build Status](https://travis-ci.org/FAC-GM/app.svg?branch=master)](https://travis-ci.org/FAC-GM/app)
[![Code Climate](https://codeclimate.com/github/FAC-GM/app/badges/gpa.svg)](https://codeclimate.com/github/FAC-GM/app)
[![Dependency Status](https://david-dm.org/FAC-GM/app.svg)](https://david-dm.org/FAC-GM/app)
[![codecov.io](https://codecov.io/github/FAC-GM/app/coverage.svg?branch=master)](https://codecov.io/github/FAC-GM/app?branch=master)

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


## Functionality

* visual indicator of whom on the team is connected to specific candidates

![Wireframes](https://github.com/FAC-GM/app/blob/master/wireframes/initials.png)

* favourite candidate profiles 

Users can favourite profile by going into the candidate profile view and by clicking the grey star in the top right corner.

![Wireframes](https://github.com/FAC-GM/app/blob/master/wireframes/star2.png)

Users can quickly see which profiles have been saved into the favourite list.

![Wireframes](https://github.com/FAC-GM/app/blob/master/wireframes/star.png)

Users can also navigate to the favourite list page by clicking the link in the top right corner.

![Wireframes](https://github.com/FAC-GM/app/blob/master/wireframes/favourite1.png)

* highlight search keywords on the home page and on the candidate profile page

Home page view: 

![Wireframes](https://github.com/FAC-GM/app/blob/master/wireframes/keywords.png)

Candidate profile view:

![Wireframes](https://github.com/FAC-GM/app/blob/master/wireframes/candidateProfile.png)


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
