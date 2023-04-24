const inquirer = require("inquirer");
const fs = require("fs");
const path = require("path");
const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

var html = `
<!DOCTYPE html>
<html>

<head>
    <title>Team Profile Generator</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" type="text/css" href="style.css" />

</head>

<body>
    <header>
        <h1>My Team</h1>
    </header>
    <main>
        <div class="card-container">

`;

const questions = [
  {
    type: "list",
    name: "options",
    message: "What would you like to do?",
    choices: ["Engineer", "Intern", "Finish building my team"],

  },
  {
    type: "input",
    name: "engineerName",
    message: "What is your engineer's name?",
    when: (answers) => answers.options === "Engineer"
  },
  {
    type: "input",
    name: "engineerId",
    message: "What is your engineer's id?",
    when: (answers) => answers.options === "Engineer"
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "What is your engineer's email?",
    when: (answers) => answers.options === "Engineer"
  },
  {
    type: "input",
    name: "engineerGithub",
    message: "What is your engineer's github?",
    when: (answers) => answers.options === "Engineer"
  },
  {
    type: "input",
    name: "internName",
    message: "What is your intern's name?",
    when: (answers) => answers.options === "Intern"
  },
  {
    type: "input",
    name: "internId",
    message: "What is your intern's id?",
    when: (answers) => answers.options === "Intern"
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is your intern's email?",
    when: (answers) => answers.options === "Intern"
  },
  {
    type: "input",
    name: "internSchool",
    message: "What is your intern's school?",
    when: (answers) => answers.options === "Intern"
  },




];
inquirer.prompt([
  {
    type: "input",
    name: "Manager",
    message: "Please enter the team mangaer's name",

  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",

  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",

  },
  {
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",

  }
]).then((answers) => {
  const e = new Manager(answers.Manager, answers.id, answers.email, answers.officeNumber);
  console.log(e.getOfficeNumber());
  var appendManager = `
  <div class="card">
    <div class="card-header">
      <h2>${e.getRole()}</h2>
      <h3>${e.getName()}</h3>
    </div>
    <div class="card-body">
      <p>ID: ${e.getId()}</p>
      <p>Email: <a href="mailto:${e.getEmail()}">Click Here</a></p>
      <p>Office Number: ${e.getOfficeNumber()}</p>
    </div>
  </div>
  `;
  html = html + appendManager;
  if (e.getOfficeNumber !== undefined) {
    promptQuestions();
  }
});


async function promptQuestions() {
  let shouldExit = false;

  while (!shouldExit) {
    const answers = await inquirer.prompt(questions);

    if (answers.options === "Finish building my team") {
      const filePath = path.join(__dirname, 'dist', 'index.html');

      fs.writeFile(filePath, html, function (err) {
        if (err) {
          return console.log(err);
        }

      });

      console.log('You chose to exit.');
      shouldExit = true;
      console.log('Exiting...');
    }



    else {
      console.log(`You chose ${answers.options}`);

      if (answers.options === "Engineer") {
        const e = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub);
        console.log(e.getGithub());
        var appendEngineer = `
        <div class="card">
          <div class="card-header">
            <h2>${e.getRole()}</h2>
            <h3>${e.getName()}</h3>
          </div>
          <div class="card-body">
            <p>ID: ${e.getId()}</p>
            <p>Email: <a href="mailto:${e.getEmail()}">Click Here</a></p>
            <p>Github: <a href="https://www.github.com/${e.getGithub()}">Click Here</a></p>
          </div>
        </div>
        `;
        html = html + appendEngineer;
      }

      if (answers.options === "Intern") {
        const i = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool);
        console.log(i.getSchool());
        var appendIntern = `
        <div class="card">
          <div class="card-header">
            <h2>${i.getRole()}</h2>
            <h3>${i.getName()}</h3>
          </div>
          <div class="card-body">
            <p>ID: ${i.getId()}</p>
            <p>Email: <a href="mailto:${i.getEmail()}">Click Here</a></p>
            <p>School: ${i.getSchool()}</p>
          </div>
        </div>
        `;
        html = html + appendIntern;
      }

  }
}

const filePath = path.join(__dirname, 'dist', 'index.html');

fs.writeFile(filePath, html, function (err) {
  if (err) {
    return console.log(err);
  }

});



// inquirer
//   .prompt(questions)
//   .then(answers => {
//     console.log(`Hello ${answers.name}, your email address is ${answers.email}`);
//   })
//   .catch(error => {
//     console.error(error);
//   });

//   // Define an array of objects containing information for each card
//   const cardsData = [
//     { title: "Card 1", text: "This is the first card" },
//     { title: "Card 2", text: "This is the second card" },
//     { title: "Card 3", text: "This is the third card" },
//   ];

//   // Get a reference to the card container element
//   const cardContainer = document.getElementById("card-container");

//   // Loop through the cards data and generate a card for each object
//   cardsData.forEach((card) => {
//     // Create a new div element to hold the card
//     const cardElement = document.createElement("div");

//     // Add a class to the card element for styling purposes
//     cardElement.classList.add("card");

//     // Set the innerHTML of the card element to the card data
//     cardElement.innerHTML = `
//       <h2>${card.title}</h2>
//       <p>${card.text}</p>
//     `;

//     // Append the card element to the card container
//     cardContainer.appendChild(cardElement);
//   });


// const f = new Employee("Allice");
// console.log(f.getName());



// const testValue = "GitHubUser";
// const e = new Engineer("Foo", 1, "test@test.com", testValue);

// console.log(e.getGithub())
}
