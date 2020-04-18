# Columbus Tip Jars API Server

![API CI](https://github.com/asleepysheepy/columbus_tip_jars/workflows/API%20CI/badge.svg)

API Backend for the the Can't Stop Columbus tip jar websites

## Getting Started
#### Prerequisites
* Ruby - 2.6
* Docker
* docker-compose
* bundler

#### Install dependencies
```
bundle install
```

#### Setup the databse
```
docker-compose up
bundle exec rails db:setup
```

#### Start the server
```
bundle exec rails server
```

#### To run the test suite 
```
bundle exec rspec
```

#### To run the linter
```
bundle exec rubocop
```

## Authors
* [Brandon Tolle](https://github.com/tollebrandon)
* [Corey Synder](https://github.com/coreysnyder)
* [Devin Riegle](https://github.com/deriegle)
* [Katie Macke](https://github.com/asleepysheepy)
* [Katrina Theodosopoulos](https://github.com/GreeKatrina)


This project was made by [Can't Stop Columbus](https://cantstopcolumbus.com/).