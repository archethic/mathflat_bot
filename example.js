var MathClient = require('./mathflat');
var client = new MathClient("id", "pw");

client.examAnswer("examID");
client.examList("studentID");
client.studentList();
client.editAnswer('examID', [{
    "problemID": 465597,
    "result": "CORRECT"
}])