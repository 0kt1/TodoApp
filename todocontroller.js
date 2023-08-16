var bodyParser = require('body-parser');

var mongoose = require("mongoose");

var Todo = require("./model");


//connection to mongodb
mongoose.connect("mongodb+srv://kaustubh:kaustubh2023@cluster0.qqkt9lg.mongodb.net/?retryWrites=true&w=majority")


var urlencodedParser = bodyParser.urlencoded({extended: false})



module.exports = function(app){

    //adding new task to mongodb
    app.post("/add/task", urlencodedParser, (req, res) => {
      var newTodo = Todo(req.body).save()
      .then(
        () => {
          
          res.redirect("/home");
        }
      ).catch((err) => console.log('error'))
    })
  
    //deleting the requested task from mongodb
    app.get('/delete/:task', urlencodedParser,function(req, res){
      Todo.find({task: req.params.task.replace(/\-/g, "")}).deleteMany().then(() => {res.redirect("/home")}).catch((err) => console.log('error'))
    })
  
}