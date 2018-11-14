const mongoose = require('mongoose');
const data = require('./data.js');
const Recipe = require('./models/Recipe.js')

// Conect Database
mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
    Recipe.collection.drop()
      .then(() => {
        // Create One recipe
        return Recipe.create({
          title: 'Asian Glazed Chicken Thighs',
          level: 'Amateur Chef',
          ingredients: ['1/2 cup rice vinegar', '5 tablespoons honey', '1/3 cup soy sauce (such as Silver Swan®)', '1/4 cup Asian (toasted) sesame oil', '3 tablespoons Asian chili garlic sauce', '3 tablespoons minced garlic', 'salt to taste', '8 skinless, boneless chicken thighs'],
          cuisine: 'Asian',
          dishType: ['Dish'],
          image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
          duration: 40,
          creator: 'Chef LePapu'
        })
      })
      .then(recipe => {
        console.log(`The Recipes is saved and its value is:${recipe} and title ${recipe.title} `)
        // Create Several Recipes from data
        return Recipe.insertMany(data);
      })
      .then(recipes => {
        recipes.forEach(el => {
          console.log(`The Recipes are saved and there title is ${el.title} `)
        })
        return Recipe.updateOne({title: "Rigatoni alla Genovese" }, {duration: 100});
      })
      .then(resultUpdate => {
        console.log(resultUpdate);
        return  Recipe.deleteOne({title: "Carrot Cake" });
      })
      .then(resultDelete=>{
        console.log(resultDelete);
        return mongoose.disconnect();
      })
      .then(disconnectResult=>{
        console.log('Disconnected')
      })
      .catch(err => {
        console.log('An error happened:', err)
      });;
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });