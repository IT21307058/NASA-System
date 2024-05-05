const mongoose = require("mongoose");


let connectionInstance;

const connectDB = async () => {
  //we are going to return a promise
  //using singelton pattern

  if (!connectionInstance) {
    try {
      connectionInstance = await mongoose.connect(
        "mongodb+srv://bhanukadayanana:0dSQUHKmnzNY4F7x@cluster0.id6m4ms.mongodb.net/nasa?retryWrites=true&w=majority&appName=Cluster0"

      ).then(() => console.log(`connection to Database established`))
      // console.log(`Connection to Database established`);
    } catch (error) {
      console.error("Error connecting to database:", error.message);
      process.exit(1); // Exit process with failure
    }
  }
  return connectionInstance;
};

//we are exporting the connectDB function so that we can use it in other files.
module.exports = connectDB;

//NOTES:

// A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise to supply the value at some point in the future.

//The then() method of a Promise object takes up to two arguments: callback functions for the fulfilled and rejected cases of the Promise . It immediately returns an equivalent Promise object, allowing you to chain calls to other promise methods.