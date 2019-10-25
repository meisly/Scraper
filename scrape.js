const db = require("./models");
const axios = require("axios");
const cheerio = require("cheerio");


function getJS() {
    // First, we grab the body of the html with axios
    axios.get("http://www.echojs.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("article h2").each(function (i, element) {
            // Save an empty result object
            var result = {};

            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
            result.body = "";
            result.cat = "js"

            // console.log(JSON.stringify(result, null, 2))
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
    });
}

function getTech() {
    // First, we grab the body of the html with axios
    axios.get("https://medium.com/topic/technology").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("section section").each(function (i, element) {
            // Save an empty result object
            var result = {};

            let link = $(this)
            .find("h3 a")
            .attr("href");

            if(link.indexOf("http") == 0){
                result.link = link;
            }else{
                result.link = "http://medium.com" + link;
            }
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .find("h3  a")
                .text();

            result.body = $(this)
                .find("h3 a").eq(1)
                .text()
            result.cat = "tech";

            // console.log(JSON.stringify(result, null, 2))
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
    });
}
function getProgramming() {
    // First, we grab the body of the html with axios
    axios.get("https://medium.com/topic/programming").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        var $ = cheerio.load(response.data);

        // Now, we grab every h2 within an article tag, and do the following:
        $("section section").each(function (i, element) {
            // Save an empty result object
            var result = {};

            let link = $(this)
            .find("h3 a")
            .attr("href");

            if(link.indexOf("http") == 0){
                result.link = link;
            }else{
                result.link = "http://medium.com" + link;
            }
            // Add the text and href of every link, and save them as properties of the result object
            result.title = $(this)
                .find("h3  a")
                .text();

            result.body = $(this)
                .find("h3 a").eq(1)
                .text()
            result.cat = "programming";

            // console.log(JSON.stringify(result, null, 2))
            // Create a new Article using the `result` object built from scraping
            db.Article.create(result)
                .then(function (dbArticle) {
                    // View the added result in the console
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        });
    });
}
module.exports = {
    getJS: getJS,
    getTech: getTech,
    getProgramming: getProgramming
};