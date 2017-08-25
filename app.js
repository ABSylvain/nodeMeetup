let express = require('express');
let app = express();
let mustache = require('mustache');
let fs = require('fs');
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

let tabEvent = [{
    name: "test",
    content: "ceci est un test"
}];

app.use("/", express.static("public"));

app.post("/event/add", function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

app.get("/index", function(req, res) {
    res.render("index", {
        name: tabEvent[0].name,
        content: tabEvent[0].content
    });
});

// ####### Djaafar #######
app.post("/user/add", function(req, res) {
    console.log(req.body);
    res.send(req.body);
});

// ####### Djaafar #######

app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("fail to open template:", err);
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    });
});
app.listen(9000, function(err) {
    if (err) {
        console.log(err);
        return;
    };
    console.log('Server Ok');

});

app.set('views', './template');
app.set('view engine', "html");