var moment = require('moment');
// Jan 1st 1970 00:00:00 UTC - Unix epic

// var date = moment();
// date.add(1, 'years').subtract(11, 'months')
// console.log(date.format('MMMM Do YYYY, h:mm:ss a'))

var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);

var createdAt = 1234;
var date = moment(createdAt);
var time = date.format('h:mm a');
console.log(time)