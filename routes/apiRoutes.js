const db = require("../models");
const scrape = require("../scrape");

module.exports = function (app) {
  // A GET route for scraping the echoJS website
  app.get("/scrape/js", function (req, res) {
    scrape.getJS();
    res.send("tah-dah!");
  });

  app.get("/scrape/tech", function (req, res) {
    scrape.getTech();
    res.send("tah-dah!");
  });
  
  app.get("/scrape/programming", function (req, res) {
    scrape.getProgramming();
    res.send("tah-dah!");
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
