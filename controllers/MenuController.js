const inquirer = require('inquirer');
const ContactController = require("./ContactController");

module.exports = class MenuController {
  constructor(){
    this.mainMenuQuestions = [
     {
      type: "list",
       name: "mainMenuChoice",
       message: "Please choose from an option below: ",
       choices: [
         "Add new contact",
         "Get todays date and time",
         "Exit"
       ]
     }
   ];
   this.book = new ContactController();
  }
  getDate(){
    var currentDate = new Date();
    var dateTime = "DateTime " + currentDate.getDate() + "/"
                + (currentDate.getMonth()+1)  + "/"
                + currentDate.getFullYear() + " @ "
                + currentDate.getHours() + ":"
                + currentDate.getMinutes() + ":"
                + currentDate.getSeconds();
    console.log(dateTime);

  }

  addContact(){
   this.clear();
   inquirer.prompt(this.book.addContactQuestions).then((answers) => {
      this.book.addContact(answers.name, answers.phone).then((contact) => {
        console.log("Contact added successfully!");
        this.main();
      }).catch((err) => {
        console.log(err);
        this.main();
      });
    });
 }

 remindMe(){
   return "Learning is a life-long pursuit"
 }

  exit(){
   console.log("Thanks for using AddressBloc!");
   process.exit();
 }

  main(){
    console.log(`Welcome to AddressBloc!`);
    inquirer.prompt(this.mainMenuQuestions).then((response) => {
      switch(response.mainMenuChoice){
        case "Add new contact":
          this.addContact();
          break;
        case "Get todays date and time":
          this.getDate();
          break;
        case "Exit":
          this.exit();
        default:
          console.log("Invalid input");
          this.main();
      }
    })
    .catch((err) => {
      console.log(err);
    });
    }

  clear(){
  console.log("\x1Bc");
  }
}
