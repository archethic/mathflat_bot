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
        var status = res.method(org.jsoup.Connection.Method.POST).execute().statusCode()
        if(status == 200) {
            return JSON.parse(res.post().text());
        } else {
            return res.post().text();
        }
    }
}

exports.mathflat = mathflat, token, classID;