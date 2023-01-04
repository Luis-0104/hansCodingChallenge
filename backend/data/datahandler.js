const fs = require("fs").promises;
const path = "./data/customers.json";

// Function for loading the JSON data, needed by the other funcs
async function load() {
  try {
    const data = await fs.readFile(path);
    return data;
  } catch (error) {
    console.error(
      `Got an error trying to read the file at ${path}: ${error.message}`
    );
  }
}

// function to save the data to json, needed by other funcs
const save = (data) => {
  fs.writeFile("./data/customers.json", JSON.stringify(data), function (err) {
    if (err) throw err;
  });
};



exports.load = load;
exports.save = save;
