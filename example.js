var mfClient = require('./mathflat');
var client = new mfClient("id", "pw");

client.examAnswer("examID");
client.examList("studentID");
client.studentList();