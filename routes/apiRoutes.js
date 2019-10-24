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
    // TODO
    // ====
    // save the new note that gets posted to the Notes collection
    // then find an article from the req.params.id
    // and update it's "note" property with the _id of the new note
    db.Note.create(req.body)
      .then(newNote => {
        return db.Article.findByIdAndUpdate(req.params.id, { $push: { notes: newNote._id } }, { new: true })
      })
      .then(result => {
        res.json(result)
      })
      .catch(function (err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  });

};
