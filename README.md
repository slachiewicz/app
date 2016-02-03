# GM Contact Management

[![Build Status](https://travis-ci.org/FAC-GM/app.svg?branch=master)](https://travis-ci.org/FAC-GM/app)
[![Code Climate](https://codeclimate.com/github/FAC-GM/app/badges/gpa.svg)](https://codeclimate.com/github/FAC-GM/app)
[![Dependency Status](https://david-dm.org/FAC-GM/app.svg)](https://david-dm.org/FAC-GM/app)
[![codecov.io](https://codecov.io/github/FAC-GM/app/coverage.svg?branch=master)](https://codecov.io/github/FAC-GM/app?branch=master)

## What?

This application allows specified members of a team to search through
contacts stored in an ElasticSearch database.

# How?

### We use following technologies:

* HTML5, CSS3, Javascript
* [Nodejs](https://nodejs.org/en/)
* [Hapijs](http://hapijs.com/)
  * Main packages: env2, Handlebars, Inert, Vision
  * Testing: Lab, Code
* Databases:
  * [ElasticSearch](https://www.elastic.co/)
  * [Redis](http://redis.io/)

#### Database structure with example [here](https://github.com/FAC-GM/app/blob/master/DATA.md)

## Running the App *Locally*


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
# SEARCHBOX_URL=http://paas:password@eu-west-1.searchly.com # # Ask dev team for this
SEARCHBOX_URL=http://localhost:9200
PORT=8000
ES_INDEX=gmcontact
ES_TYPE=contacts
RESULTS_PER_PAGE=10
JWT_SECRET= # Ask dev team for this
BASE_URL=http://localhost:8000
# Variable with authorised emails
#Gm app
GOOGLE_CLIENT_ID= # Ask dev team for this
GOOGLE_CLIENT_SECRET= # Ask dev team for this

```
Ask a member of the dev team for the `SEARCHBOX_URL` variable if you
want to access the *hosted* ElasticSearch Database.
There are a number of other variables missing from example above which are available to the dev team.

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

### Allowing new team members access to the app
Ask the **dev team** to update the variable that restricts access.


## Functionality

A running list of the of the functionality in the app as it becomes available.

+ [Login via Google](https://github.com/dwyl/hapi-auth-github), access restricted to specific team members

+ Initials of who on the team a contact is connected to are displayed
 _(in the example below, David Dupont is connected to our current dev team - Simon L and Anita C)_

![Initials-of-who-contact-is-connected-to](wireframes/initials.png)

* 'Favourite' contact profiles by clicking the grey star in the corner of the profile page

![favouriting-a-contact-functionality](wireframes/star2.png)

+ Quickly visualise who has been favourited in the search results (denoted by a yellow star) and see a full list by clicking on the yellow star in the top right hand corner of the app

![how-favourites-appear-in-search-results](wireframes/favourite1.png)

+ Search keywords are highlighted in the search results and profile pages to facilitate quick scanning of the information

![search-keyword-highlighted-in-search](wireframes/keywords.png)

![search-keyword-highlighted-in-profile](wireframes/candidateProfile.png)

+ Symbol in search results to quickly identify if an email address is available for contact

![email-indicator-screenshot](wireframes/email-indicator-screenshot.png)

+ Searching query in following fields such as: job, fullname, location, company and skills

![query-search-field](wireframes/search.png)

You can search for multiple skills if you separate the each skill with a comma:

![query-skills](wireframes/search_skills_multiple.png)

+ Adding notes to a profile: status, company and note.

![query-skills](wireframes/note.png)

+ Status-label display on main page as well as on candidate page

![display-status](wireframes/status.png)

![display-status-candidate-view](wireframes/candidate-view-status.png)

+ Display pie-chart to indicate match-score for search results

- 75% match is shown as below:

![match-score](wireframes/match-score.png)

+ Display all connection to each user when clicking on initials 

- by clicking on initials (top right corner) as shown under:

![initials](wireframes/initials-right.png)

- list of user connections

![all-connections](wireframes/all-connections.png)

+ Dashboard for user's candidate's statuses 

![dashboard](wireframes/dash-final.png)


## Working with this repo
Our [product backlog is our list of issues](https://github.com/FAC-GM/app/issues).

We use labels to manage these. The most interesting ones are:
+ `feature idea` - added to features that are just in idea form for now rather than _definitely_ required
+ `priority...` - labels starting with 'priority' denote the priority of the task from 1 to 5, with 1 being the highest
+ `T...` - labels starting with 'T' denote time estimates for the task; these are added **by the dev team only**, e.g. `T1d` will require one day to complete
  + `m` = minutes
  + `h` = hours
  + `d` = days
+ `in progress` - denotes which tasks are currently being worked on
+ `help wanted` - used mostly internally by the dev team when outside help is required to move an issue forward
+ `technical` - used **by the dev team** to denote technical tasks

## Google Analytics

Google Analytics is enabled for all pages of the App.
If you want access to the stats, please ask a member of the dev team.
