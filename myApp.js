/**********************************************
* 3. FCC Mongo & Mongoose Challenges
* ==================================
***********************************************/
require('dotenv').config();
const mongoose = require('mongoose');


/** 1) Install & Set up mongoose */


let MONGOLAB_URI = process.env.MONGOLAB_URI;
let dbName ='fcc';
let collName = 'people';

var connection_options = { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true };

mongoose.connect(MONGOLAB_URI, connection_options);
var connection = mongoose.connection;
connection.once('open', ()=>{
  console.log('connected ....')
})



/** 2) Create a 'Person' Model */

const schema = mongoose.Schema;

const personSchema = new schema({
  name:{
    type: String,
    required: true
  },
  age:{
    type: Number
  },
  favoriteFoods:[ String ]
});

var Person = mongoose.model('Person', personSchema);

Person.find({}).then((people)=>{ console.log(people) })
.catch(err => res.status(400).json('Error: ' + err));



/** 3) Create and Save a Person */


var createAndSavePerson = function(done) {
    var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["vodka", "air"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

/** 4) Create many People with `Model.create()` */


var createManyPeople = function(arrayOfPeople, done) {

  Person.create( arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
   
};



/** 5) Use `Model.find()` */

var findPeopleByName = function(personName, done) {
  
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });


};

/** 6) Use `Model.findOne()` */



var findOneByFood = function(food, done) {

  Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
  
};
/** 7) Use `Model.findById()` */


var findPersonById = function(personId, done) {
  
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
  
};




/** 8) Classic Update : Find, Edit then Save */



var findEditThenSave = function(personId, done) {
  var foodToAdd = 'hamburger';
  Person.findById(personId, function(err, result) {
    if (err) return console.error(err);
    result.favoriteFoods.push(foodToAdd);
    result.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    });
    
  });
};


/** 9) New Update : Use `findOneAndUpdate()` */


var findAndUpdate = function(personName, done) {
  var ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, { $set: { age: ageToSet} },  function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};



/** 10) Delete one Person */


var removeById = function(personId, done) {
  
  Person.findByIdAndRemove(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
    
};
/** 11) Delete many People */



var removeManyPeople = function(done) {
  var nameToRemove = "Mary";
Person.remove({name: nameToRemove}, function(err, data) {
  if (err) return console.error(err);
  done(null, data)
});
};



/** 12) Chain Query helpers */


var queryChain = function(done) {
  var foodToSearch = "burrito";
  
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age:0}).exec(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};





//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
