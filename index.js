#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
const apiLink = "https://opentdb.com/api.php?amount=6&category=18&difficulty=easy&type=multiple";
let fetchData = async (data) => {
    let fetchQuiz = await fetch(data);
    let res = await fetchQuiz.json();
    return res.results;
};
let data = await fetchData(apiLink);
let startQuiz = async () => {
    let score = 0;
    // for username
    let name = await inquirer.prompt({
        type: "input",
        name: "yourName",
        message: "What is your name ?"
    });
    for (let i = 1; i <= 5; i++) {
        let answers = [...data[i].incorrect_answers, data[i].correct_answer];
        let ans = await inquirer.prompt({
            type: "list",
            name: "quiz",
            message: data[i].question,
            choices: answers.map((val) => val),
        });
        if (ans.quiz == data[i].correct_answer) {
            ++score;
            console.log(chalk.bold.blue("Correct"));
        }
        else {
            console.log(`correct answer is ${chalk.bold.red(data[i].correct_answer)}`);
        }
    }
    console.log(`Dear ${chalk.green.bold(name.yourName)}, 
      Your score is ${chalk.red.bold(score)} out of ${chalk.red.bold("5")}`);
};
startQuiz();
