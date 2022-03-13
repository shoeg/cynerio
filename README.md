# Cynerio backend assignment

###Description
The server enables our team members to checkin/checkout on tasks they are working on and thus we
can understand the efforts we invest in every task

###Assumptions
 - Users cannot checkin to a task when a previous task is already in checkin status by them.
 - There is no task name validation, so any task can be worked on by any user multiple times.
 - report will return only completed tasks that were checked-out.
 - mySQL DB was used for persistence.

## Running
1. Download & install "MySQL Community Server" from  https://dev.mysql.com/downloads/
2. Navigate into project folder in terminal and run `npm install`
3. Add in your own database details inside the `.env` file
4. To start and run the server, simply run the following command in your root directory:
```
npm start
```

## endpoints

### API
 - `/checkin` - Mark that work on a specific assignment has begun
 - `/checkout/:user` - Mark that current active assignment is no longer being worked on
 - `/report` - Get report of all users and time invested in each task

### Examples
- checkin
```
curl --location --request POST 'http://localhost:3000/checkin' \
--header 'Content-Type: application/json' \
--data-raw '{
    "user": "Bob",
    "task": "Sample assignment 1"
}'
```

- checkout
```
curl --location --request POST 'http://localhost:3000/checkout/bob' \
--data-raw ''
```

- report
```
curl --location --request GET 'http://localhost:3000/report'
```
