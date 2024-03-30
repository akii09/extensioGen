#!/usr/bin/env node

// Import needed packages
import inquirer from 'inquirer';
import { promises as fs } from 'fs';
import path, { dirname as pathDirname } from 'path';
import { fileURLToPath } from 'url';

// __dirname in ES Module scope
const __dirname = pathDirname(fileURLToPath(import.meta.url));

// Then you can use __dirname as before

// Paths to templates
const templates = {
  "React": path.join(__dirname, 'templates', 'react'),
  "Vue": path.join(__dirname, 'templates', 'vue'),
  "Javascript": path.join(__dirname, 'templates', 'javascript'),
};

// Ask questions
inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your project name?',
    },
    {
      type: 'list',
      name: 'template',
      message: 'Which template would you like to use?',
      choices: ['React', 'Vue', 'Javascript'],
    },
  ])
  .then((answers) => {
      // Create new directory and copy selected template
      fs.mkdirSync(answers.name);
      copy(answers.name, templates[answers.template]);
  });

// Function to perform the copy
function copy(dest, src) {
   if (fs.lstatSync(src).isDirectory()) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach((child_item_name) => {
        copy(path.join(dest, child_item_name),
          path.join(src, child_item_name));
       });
   } else {
       fs.writeFileSync(dest, fs.readFileSync(src));
   }
}