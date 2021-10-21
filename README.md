# Matan's Cemeneto assignment

The goal of the assignment is to create an endpoint that you know how to handle with a weekly event that will hit the endpoint.

## Tech stack
1. Node with express
2. Docker
3. Webpack for using ES6 with Node environment

## endpoints:
```
GET /api/v1/status - server health check
```

```
POST /api/v1/events/callback - handle cemento's events (in prodaction we'll need a cron job that will hit this endpoint)
```

## Usage
```sh
# clone the repo
cd $YOUR_LOCAL_PATH
git clone https://github.com/matany90/cemento-exam.git

# install dependencies
cd cemento-exam
npm install

# run local cemento's server
npm run dev

# or alternatively, build docker image
make docker-build

# run docker image after build
make docker-run
```

## Test the callbacl endpoint:
```sh
cd cemento-exam
bash ./tests/callback.sh
```
