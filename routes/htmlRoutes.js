var db = require("../models");

module.exports = function (app) {
  // Route for getting all Articles from the db
  app.get("/articles/js", function (req, res) {
    // TODO: Finish the route so it grabs all of the articles
    db.Article.find({})
      .then(articles => {
        console.log(articles)
        res.render("articles", {
          data: articles
        })
      })
      .catch(err => {
        console.log(err)
      })
  });

  // Route for grabbing a specific Article by id, populate it with it's note
  app.get("/article/:id", function (req, res) {
    db.Article.findById(req.params.id).populate('notes')
      .then(data => {
        res.render('notes', {
          title: data.title,
          id: data._id,
          link: data.link,
          notes: data.notes
        })
      })
      .catch(err => {
        console.log(err)
      })
  })
  // Route for saving/updating an Article's associated Note

  //Main Page
  app.get("/", function(req, res){
    res.render("index")
  })
  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};