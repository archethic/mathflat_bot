var token = null;
var classID = null;

const mathflat = {
    login: function(id, password) {
        const res = Jsoup.connect('https://api-live.mathflat.com/users/login').header("Content-Type", "application/json;charset=utf-8")
        .requestBody(JSON.stringify({"loginID":id,"loginPW":password})).ignoreContentType(true)
        var status = res.method(org.jsoup.Connection.Method.POST).execute().statusCode()
        if(status == 200) {
            token = JSON.parse(res.post().text()).token
            classID = JSON.parse(res.post().text()).classId;
            return "Login Success token: "+ token + " | id: " + classID;
        } else {
            return res.post().text();
        }
    },
    student: function() {
        //https://api-live.mathflat.com/classes/D7928/students
        if(token == null || classID == null) return "먼저 로그인을 해주세요"
        const res = Jsoup.connect('https://api-live.mathflat.com/classes/' + classID + '/students').header("Content-Type", "application/json;charset=utf-8").header("x-auth-token", token).ignoreHttpErrors(true)
        .ignoreContentType(true)
        var status = res.method(org.jsoup.Connection.Method.GET).execute().statusCode()
        if(status == 200) {
            return JSON.parse(res.get().text());
        } else {
            return res.get().text();
        }
    },
    examlist: function (studentId) {
        //https://api-live.mathflat.com/students/I275529/assigned-pieces
        if(token == null || classID == null) return "먼저 로그인을 해주세요"
        const res = Jsoup.connect("https://api-live.mathflat.com/students/"+studentId+"/assigned-pieces").header("Content-Type", "application/json;charset=utf-8").header("x-auth-token", token).ignoreHttpErrors(true)
        .ignoreContentType(true)
        var status = res.method(org.jsoup.Connection.Method.GET).execute().statusCode()
        if(status == 200) {
            return JSON.parse(res.get().text());
        } else {
            return res.get().text();
        }
    },
    examAnswer: function (examId) {
        //https://api-live.mathflat.com/assigned-pieces/8895228/marking
        if(token == null || classID == null) return "먼저 로그인을 해주세요"
        const res = Jsoup.connect("https://api-live.mathflat.com/assigned-pieces/"+examId+"/marking").header("Content-Type", "application/json;charset=utf-8").header("x-auth-token", token).ignoreHttpErrors(true)
        .ignoreContentType(true)
        var status = res.method(org.jsoup.Connection.Method.GET).execute().statusCode()
        if(status == 200) {
            return JSON.parse(res.get().text());
        } else {
            return res.get().text();
        }
    }
}

exports.mathflat = mathflat, token, classID;