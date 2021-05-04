module.exports = /** @class */ (function () {
    function mathflat(id, pw) {
        const res = Jsoup.connect('https://api-live.mathflat.com/users/login').header("Content-Type", "application/json;charset=utf-8")
        .requestBody(JSON.stringify({"loginID":id,"loginPW":pw})).ignoreContentType(true)
        var status = res.method(org.jsoup.Connection.Method.POST).execute().statusCode()
        if(status == 200) {
            this.token = JSON.parse(res.post().text()).token
            this.classID = JSON.parse(res.post().text()).classId;
            return "Login Success token: "+ this.token + " | id: " + classID;
        } else {
            return res.post().text();
        }
    }
    mathflat.prototype.studentList = function () {
        if(this.token == undefined || this.classID == undefined) return "먼저 로그인을 해주세요";
        const res = Jsoup.connect('https://api-live.mathflat.com/classes/' + this.classID + '/students')
            .header("Content-Type", "application/json;charset=utf-8")
            .header("x-auth-token", this.token)
            .ignoreHttpErrors(true)
            .ignoreContentType(true).method(org.jsoup.Connection.Method.GET).execute();
        const status = res.statusCode();
        if(status == 200) {
            return JSON.parse(res.body());
        } else {
            return res.body();
        }
    }
    mathflat.prototype.examList = function (studentId) {
        if(this.token == undefined || this.classID == undefined) return "먼저 로그인을 해주세요";
        const res = Jsoup.connect("https://api-live.mathflat.com/students/"+studentId+"/assigned-pieces")
            .header("Content-Type", "application/json;charset=utf-8")
            .header("x-auth-token", this.token)
            .ignoreHttpErrors(true)
            .ignoreContentType(true).method(org.jsoup.Connection.Method.GET).execute();
        const status = res.statusCode();
        if(status == 200) {
            return JSON.parse(res.body());
        } else {
            return res.body();
        }
    }
    mathflat.prototype.examAnswer = function (examId) {
        if(this.token == undefined || this.classID == undefined) return "먼저 로그인을 해주세요";
        const res = Jsoup.connect("https://api-live.mathflat.com/assigned-pieces/"+examId+"/marking")
            .header("Content-Type", "application/json;charset=utf-8")
            .header("x-auth-token", this.token)
            .ignoreHttpErrors(true)
            .ignoreContentType(true).method(org.jsoup.Connection.Method.GET).execute();
        const status = res.statusCode();
        if(status == 200) {
            return JSON.parse(res.body());
        } else {
            return res.body();
        }
    }
    mathflat.prototype.editAnswer = function (examID, params) {
        if(this.token == undefined || this.classID == undefined) return "먼저 로그인을 해주세요";
        if(typeof params === 'object') throw new Error("params is must json")
        const res = Jsoup.connect("https://api-live.mathflat.com/assigned-pieces/"+examID+"/marking")
            .header("Content-Type", "application/json;charset=utf-8")
            .header("x-auth-token", this.token)
            .requestBody(JSON.stringify(params))
            .ignoreContentType(true).ignoreHttpErrors(true).method(org.jsoup.Connection.Method.GET).execute();
        return res;
    }
    return mathflat;
})();