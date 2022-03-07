let express = require("express");
let path = require("path");
let app = express();

var session = require('express-session')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, "public")));

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1)

app.use(session({
  secret: 'terces',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false}
}))

app.get('/v1', (req, res)=> {
  res.render('v1');
});

app.post("/v1", (req, res)=> {
 
  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  let result = computeResult();

  function computeResult() {
    
    let result = [];

    for (let letter = 0; letter < 7; letter++) {
      if (guess[letter] === secretWord[letter]) {
        answer = 'correct';
      }
      else if (secretWord.includes(guess[letter])){
        answer = 'misplaced';
      }
      else {
        answer = 'incorrect';
      }
      result.push({letter: guess[letter], status: answer});
    }
    return result;
  }

  // if(guess === secretWord) {
  //   result = ['correct', 'correct', 'correct','correct','correct','correct','correct'];
  // }
  // else {
  //   result = ['correct', 'misplaced', 'incorrect','incorrect','incorrect','misplaced','misplaced'];
  // }

  console.log(result);

  // return the guess
  res.render('v1', {result: result} ) ;

});


app.get('/v2', (req, res)=> {
  
  let gameover = false;
  let msg = "";

  if(!req.session.guesses){
    req.session.guesses = [];
  }

  let guesses = req.session.guesses;
  req.session.guesses = guesses;
  res.render('v2', {result: guesses, msg, gameover});
});


app.post("/v2", (req, res)=> {
 
  let secretWord = "hebrews".toUpperCase();

  // extract the guess value from the body
  const guess = req.body.guess.toUpperCase();

  //let result = computeResult();

  function computeResult(guess, secretWord) {
    
    let result = [];
    let answer = "";

    for (let letter = 0; letter < 7; letter++) {
      if (guess[letter] === secretWord[letter]) {
        answer = 'correct';
      }
      else if (secretWord.includes(guess[letter])){
        answer = 'misplaced';
      }
      else {
        answer = 'incorrect';
      }
      result.push({letter: guess[letter], status: answer});
    }
    return result;
  }

  let result = computeResult(guess, secretWord);

  if(!req.session.guesses){
    req.session.guesses = [];
  }

  let msg = ''
  let gameover = false;

  let guesses = req.session.guesses;
  req.session.guesses = guesses;

  guesses.push(result)



  if (guess === secretWord){
    msg = "Correct!"
    gameover = true;
  }

  if (guesses.length == 7){
    if (msg === ''){
      msg = `Wrong. The word was ${secretWord.toLowerCase()} :(`;
      gameover = true;
    }
  }
  if (gameover) {
    req.session.guesses = [];
  }
  res.render('v2', {result: guesses, msg, gameover});
});


/* EXAMPLE */

let mark = { first: "Mark", last: "Hamill", age: "70" };

app.get("/example/:age", (req, res) => {
  let ageSentence = "";
  const age = parseInt(req.params.age);

  if (age > mark.age) {
    ageSentence = "You're older than Mark Hamill!";
  } else if (age < mark.age) {
    ageSentence = "You're younger than Mark Hamill!";
  } else {
    ageSentence = "You are Mark Hamill!";
  }
  const page = `<html>
                    <head> </head>
                    <body> 
                      <h1> Example </h1>
                      <p> ${ageSentence} </p>
                    </body>
                </html>`;

  //res.render('index', ageSentence);

  res.send(page);
});


app.post('/example', (req,res) => {

  let age = req.body.age;

  if (age > mark.age) {
    ageSentence = "You're older than Mark Hamill!";
  } else if (age < mark.age) {
    ageSentence = "You're younger than Mark Hamill!";
  } else {
    ageSentence = "You are Mark Hamill!";
  }
  const page = `<html>
                    <head> </head>
                    <body> 
                      <h1> Example </h1>
                      <p> ${ageSentence} </p>
                    </body>
                </html>`;

  //res.render('index', ageSentence);

  res.send(page);

});


const port = process.env.PORT || 3000;
const hostname = process.env.hostname || "localhost";

app.listen(port, () => {
  console.log(`Running server on http://${hostname}:${port}`);
});
