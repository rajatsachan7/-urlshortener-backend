const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

const app = express();
const port = process.env.PORT || 3000 ;

mongoose.connect(
    "mongodb+srv://admin:admin@guvi.jkxrp.mongodb.net/urlshortner-backend?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    (err) => {
      if (!err) console.log("Database connection succeeded.");
      else
        console.log(
          "Error in DB connection : " + JSON.stringify(err, undefined, 2)
        );
    }
  );
  
  mongoose.connection.on("connected", () => {
    console.log("connected to db" + config.database);
  });
  

  
  const users = require("./routes/users");
  

  
  app.use(cors());
  
  app.use(express.static(path.join(__dirname, "public")));
  
  app.use(bodyParser.json());
  
  app.use(passport.initialize());
  app.use(passport.session());
  
  require("./config/passport")(passport);
  
  app.use("/users", users);
  
  app.get("/", (req, res) => {
    res.send("invalid");
  });
  
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "public/index.html"));
//   });
  
  app.listen(process.env.PORT || 3000, () => {
    console.log(`server running on port ${port}`);
  });