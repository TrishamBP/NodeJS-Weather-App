const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const publicDirectoryPath = path.join(__dirname, "../public");
console.log(publicDirectoryPath);
const partialPath = path.join(__dirname, "../views/partials");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Trisham",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Trisham",
    about: "lelelele",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Trisham",
    heading: "Help",
    help: "This is some helpful text",
  });
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Must provide a search term",
    });
  }

  console.log(req.query);

  res.send({
    products: [],
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide an address",
    });
  } else {
    geocode(req.query.address, (error, data) => {
      if (error) {
        return res.send({
          error: "Error",
        });
      }
      const { latitude, longitude, location } = data;

      forecast(latitude, longitude, (error, forecast) => {
        if (error) {
          return res.send({
            error: "Invalid data",
          });
        }
        res.send({
          location: location,
          forecast: forecast,
        });
      });
    });
  }
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Trisham",
    errorMessage: "Page not found.",
  });
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});
