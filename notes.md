## Steps to take when starting a project from start
##### Project name: webpack-prack

Run npm init to create a package json - keep track the packages we install
Use npm to install babel/core and babel/cli (babel/cli so that we can use  commands in the command interface to run babel
         Run npm install @babel/core @babel/cli --save-dev
Node modules - Package code
Package-lock.json - Locks down different versions of the packages we are using.
Babel preset - Setup plugin that supports certain language features and we need in order to convert our code properly. 
Install the babel preset(env) and register it in .babelrc - Babel knows which preset to use when running our code
Run  npm install @babel/preset-env --save-dev
Create a .babelrc file and write
```json
{
    "presets": ["@babel/preset-env"]
}
```

So far your Package.json should be
```json
{
  "name": "webpack-prac",
  "version": "1.0.0",
  "description": "Intro to webpack and babel",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "Jane Muthoni",
  "license": "ISC",
  "devDependencies": {
    "@babel/cli": "^7.10.5",
    "@babel/core": "^7.10.5",
    "@babel/preset-env": "^7.10.4"
  }
}
```

Create a index.js file and write 
```js
const destination = (place) =>{
    console.log(` I would love to visit ${place}`);
}
destination();
```

We shall use the babel cli to write commands that convert the modern code to code that can run in older browser versions.In the package.json write the code below and in the terminal write npm run babel. 
Results: Inside the main.js you will see the output of the code.
```json
"scripts": {
    "babel": "node_modules/.bin/babel index.js -o main.js"
  },

```
Create a distribution folder (dist) that will have the index html file and assets folder that will have the converted js file, images and css files. The index html file will have a script source of the converted file. Then create a source folder (src). It will have our modern javascript files.
The index file should have : 
```html
<script src="assets/main.js"></script>
```
In the src folder create the index.js file and write: 
```js
const destination = (place) =>{
    console.log(` I would love to visit ${place}`);
}
destination('Greece');
destination('Dubai');
destination('Paris');

```
 
Using npm scripts
In the package.json file update the babel script to the code below and in your terminal write npm run babel. 
 ```json
 "babel": "node_modules/.bin/babel src/index.js -w -o dist/assets/main.js"
 ```

The -w helps to watch changes inside the index.js file and converts the code every time you save the file. Hence you run npm run babel only once and the changes will be converted automatically.

## Introduction to Webpack
### First webpack flow
Webpack is an open-source JavaScript module bundler. It is made primarily for JavaScript, but it can transform front-end assets like HTML, CSS, and images if the corresponding loaders are included.
Create a file in the root directory called webpack.config.js and write
```js
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename : 'main.js'
    }
}
```
#### install webpack and webpack-cli 
npm install webpack webpack-cli --save-dev
#### Run webpack to bundle your js scriptUpdate the package.json by writing
Exporting and importing files. 
First create a dom.js file and write the following code.
#### Method 1
```js
console.log('Dom file');
 
 const body = document.querySelector('body');
 
export const bodyStyle = ()=>{
    body.style.backgroundColor = 'peachpuff';
    body.style.textAlign = 'center';
}
 
export const titleText = (text)=>{
    const title = document.createElement('h2');
    title.textContent = text;
    body.appendChild(title);
}
```

#### Method 2
```js
console.log('Dom file');
 
const body = document.querySelector('body');
 
const bodyStyle = ()=>{
    body.style.backgroundColor = 'peachpuff';
    body.style.textAlign = 'center';
}
 
const titleText = (text)=>{
    const title = document.createElement('h2');
    title.textContent = text;
    body.appendChild(title);
}
 
 
export {bodyStyle, titleText};

```
Inside the index.js file you can import the functions used in the dom file.
```js
import {bodyStyle, titleText} from './dom';

bodyStyle();
titleText('Hello from the Dom 🔥' );
```
#### Default export -  when you are exporting one main thing from the file and can be done only once per file. Example, exporting an array of data in a file.
First create a data.js file and create an array of data and export it as default. 
```js
const preminumUsers = [
    {name: 'John', premium: false},
    {name: 'Jane', premium: true},
    {name: 'Kyle', premium: false},
    {name: 'Harry', premium: true},
    {name: 'Luke', premium: true}
];
 
const Activepremium = (users) =>{
    return users.filter(user => user.premium);
}
 
export {Activepremium, preminumUsers as default};

```

Import it in our index.js file. You don’t use curly braces because we are importing the default value. So just write the name and from where it’s been imported. 
```js
import {bodyStyle, titleText} from './dom';
import users, { premium } from './data';
 
bodyStyle();
titleText('Hello from the Dom 🔥' );
 
const results = premium(users);
console.log(users , results);

```
After importing the default value, write npm run webpack in your terminal to see the data in the console.log
Make webpack automatically get the changes by watching the files (-w)
```json
"scripts": {
    "babel": "node_modules/.bin/babel src/index.js -w -o dist/assets/main.js",
    "webpack": "node_modules/.bin/webpack -w"
  },


```


### Second webpack workflow using webpack dev server
#### Install webpack-dev-server 
Write npm install webpack-dev-server --save-dev
npm install webpack-dev-server --save-dev
#### Inside the webpack.config.js file and devServer object with contentBase and publicPath as it’s property
```js
//inbuilt method in the node library
const path = require('path');
 
module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename : 'main.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/assets/'
    }
}
```

Update your package.json file 
```json
"server" : "webpack-dev-server"
```

#### Remember that the  web dev server does not bundle up your code, instead it stores your files virtual. To solve this you have to create a production and development environment. 
First click ctrl + c to terminate the web-dev server
Update your package.json file to production and development modes.
```json
"build": "node_modules/.bin/webpack --mode production",
"server" : "webpack-dev-server --mode development"
```

#### In the terminal write npm run server to get the localhost link to your website.
i ｢wds｣: Project is running at http://localhost:8080/

## Babel and webpack together
#### Install babel loader
In your terminal write npm install babel-loader --save-dev
#### In Order for babel to run inside the imported file you have to           create an array of rules inside the webpack.config.js file.
One of the rules is to look for js files. We can do this by writing a regular expression.
```js
module: {
        rules: [{
            test : /\.js$/
        }]
}
```

Write an exclude property inside the rules object, to ensure babel does not include any javascript files from the node_modules folder.
```js
module: {
        rules: [{
            test : /\.js$/,
            exclude : /node_modules/
        }]
}
```

Specify which babel loader and preset you are using by creating a use object
```js
module: {
        rules: [{
            test : /\.js$/,
            exclude : /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
}
```




