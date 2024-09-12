const express = require("express");
const axios = require("axios");
const app = express();

// Set the view engine to EJS
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null, unit: 'imperial' });
});

app.get("/weather", async (req, res) => {
  // Get the city and unit from the query parameters
  const city = req.query.city;
  const unit = req.query.unit || 'imperial'; // Default to Fahrenheit
  const apiKey = "41ec28fe0e65c9513af7ce1705e49185";
  
  // Determine the appropriate unit label
  const unitLabel = unit === 'metric' ? 'Celsius' : 'Fahrenheit';
  
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
  
  // Render the index template with the weather data and error message
  res.render("index", { weather, error, unit: unitLabel });
});

// Start the server and listen on port 3000 or the value of the PORT environment variable
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
