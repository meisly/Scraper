const db = require("../models");
const axios = require("axios");
const cheerio = require("cheerio");

module.exports = function (app) {
  // A GET route for scraping the echoJS website
  app.get("/scrape/js", function (req, res) {
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

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

  app.get("/scrape/tech", function (req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://medium.com/topic/technology").then(function (response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);

      // Now, we grab every h2 within an article tag, and do the following:
      $("section section").each(function (i, element) {
        // Save an empty result object
        var result = {};

        // Add the text and href of every link, and save them as properties of the result object
        result.title = $(this)
          .find("h3  a")
          .text();
        
        result.link = "http://medium.com"+ $(this)
          .find("h3 a")
          .attr("href");
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

      // Send a message to the client
      res.send("Scrape Complete");
    });
  });
  // Route for saving/updating an Article's associated Note
  app.post("/article/:id", function (req, res) {

    db.Note.create(req.body)
      .then(newNote => {
        return db.Article.findByIdAndUpdate(req.params.id, { $push: { notes: newNote._id } }, { new: false })
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

  app.delete("/article/:id?", function (req, res) {
    let id = req.body.id;

    db.Note.findByIdAndDelete(id).then(result=> {
  
    })
  });

};
