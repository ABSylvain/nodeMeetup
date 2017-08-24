let express = require('express');
let app = express();
let mustache = require('mustache');
let fs = require('fs');
let tabEvent = [{
    name: "test",
    content: "ceci est un test"
}];
app.use(express.static("public"));

app.get("/test", function(req, res) {
    res.render("index", {
        name: tabEvent[0].name,
        content: tabEvent[0].content
    })
})
app.engine("html", function(path, options, callback) {
    fs.readFile(path, function(err, content) {
        if (err) {
            console.error("fail to open template:", err);
            return callback(err);
        }
        let str = mustache.render(content.toString(), options);
        return callback(null, str);
    })
});
app.listen(9000, function(err) {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Server Ok');

});

app.set('views', './template');
app.set('view engine', "html");