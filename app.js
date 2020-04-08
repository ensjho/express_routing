const express = require("express");
const ExpressError = require("./expressError")
const app = express();



app.get("/mean", function(req, res, next){

  if (!req.query.nums){
    throw new ExpressError("You must put in nums, and the list of integers after the query", 400)
  }

  let numsList = req.query.nums.split(',');


  //validating numsList inputs (check if they are integers)
  for(let i = 0; i < numsList.length; i++){

    if (isNaN(parseInt(numsList[i]))){
      throw new ExpressError(`Invalid input : ${numsList[i]} must be a valid integer`, 400)
    }

    let integer = parseInt(numsList[i]);
    numsList[i] = integer;
  }

  //calculating the mean of the list of numbers

  result = numsList.reduce((accumulator, currentValue) => accumulator + currentValue) / numsList.length

  let response = {
    operation: "mean",
    value: result
  }

  return res.send(response);
})

app.get("/median", function(req, res, next){

  if (!req.query.nums){
    throw new ExpressError("You must put in nums, and the list of integers after the query", 400)
  }

  let numsList = req.query.nums.split(',');


  //validating numsList inputs (check if they are integers)
  for(let i = 0; i < numsList.length; i++){

    if (isNaN(parseInt(numsList[i]))){
      throw new ExpressError(`Invalid input : ${numsList[i]} must be a valid integer`, 400)
    }

    let integer = parseInt(numsList[i]);
    numsList[i] = integer;
  }

  //sort the numbers in the array in order.

  numsList.sort(function (a, b) {return a.value - b.value})

  let result;

  if(numsList.length % 2 === 0){
    let position = numsList.length / 2;
    result = (numsList[position-1] + numsList[position])/2;
  } else {
    result = numsList[Math.floor(numsList.length/2)-1]
  }

  let response = {
    operation: "median",
    value: result
  }

  return res.send(response);
})


app.listen(3000,function(){
  console.log("server at 3000")
})