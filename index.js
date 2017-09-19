var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.listen(process.env.PORT || 3000);

var request = require('request');
var cheerio = require('cheerio');

app.get("/", function (req, res) {
    request("https://www.nytimes.com", function (error, response, body) {
        if (error) {
            console.log(error);
            res.render("index", { html: "Error not found" });
        } else {
            //  console.log(body);

            const $ = cheerio.load(body);
            var story = $(body).find("h2.headline");
            story.each(function (i, e) {
                console.log($(this).text());
                //    console.log( e["attribs"]["href"]);
            });

            res.render("index", { html: story });
        }

    });


});


