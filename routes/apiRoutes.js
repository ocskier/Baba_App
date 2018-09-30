var db = require("../models");
// var _ = require("lodash");

module.exports = function(app) {
  // Get all Lesson Plans from a given subject and grade
  app.get("/api/lessons/:grade/:subject/", function(req, res) {
    db.Plan.findAll({
      where: {
        subject: req.params.subject,
        grade: req.params.grade
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Get all Lesson Plans saved by a User
  app.get("/api/userPlan/:userId", function(req, res) {
    console.log(req);
    db.Plan.findAll({
      include: [
        {
          model: db.User,
          where: { id: req.params.userId }
        }
      ]
    }).then(function(data) {
      res.json(data);
    });
  });

  app.post("/api/userPlan/:userId/:title", function(req, res) {
    db.Plan.findOne({
      where: {
        title: req.params.title
      }
    }).then(function(dbExample) {
      db.UserPlan.create({
        UserId: req.params.userId,
        PlanId: dbExample.id
      }).then(function(dbExample) {
        res.json(dbExample);
      });
    });
  });

  // Create a new lesson plan
  app.post("/api/lesson", function(req, res) {
    console.log(req.body);
    db.Plan.create({
      title: req.body.title,
      description: req.body.description,
      subject: req.body.subject,
      grade: req.body.grade
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  app.delete("/api/lesson/:id", function(req, res) {
    db.Plan.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  //for testing
  module.exports = function(app) {
    // Get all examples
    app.get("/api/examples", function(req, res) {
      db.Example.findAll({}).then(function(dbExamples) {
        res.json(dbExamples);
      });
    });
  };
};
