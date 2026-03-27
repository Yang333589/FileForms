const express = require ("express");
const router = express.Router();
const {readFile} = require ('fs').promises;

router.get("/", async (req,res) =>{
    let chosenWords = await getWords();
    //console.log("Chosen Words: ", chosenWords);
    res.render('quiz', {chosenWords});
});

router.post("/", async (req, res) =>{
    //console.log(req.body);
    const body = req.body;
    //console.log(body);
    let {userChoice, correctDef, totalQuestions, totalCorrect} = req.body;
    let score = totalCorrect;
    let total = totalQuestions;
    let message = "";
    if (userChoice === correctDef){
        //console.log("User guessed correctly!");
        score++;
        message = "You got it right!"
    }else
        message = "Womp Womp, the correct answer is: " + correctDef;
    total++;

    //console.log("Score: ", score, "Total: ", total);

    let chosenWords = await getWords();
    res.render('quiz', {chosenWords, totalCorrect: score,  totalQuestions: total, isCorrect: message});
    //get another new set of words
    //send that set of words back with the user score
    //send some other data back?
        //send correct! if user got it correct
        //send back correct answer if user got it wrong
    //hint: sent back 6 variables
});

let getWords = async () =>{
    //console.log("Getting random part!");
    let randomPart = getRandomPart();
    //console.log("Random part:", randomPart);
    let allWords = await readFile('resources/allwords.txt', 'utf8');
    //console.log(allWords);
    let wordArray = allWords.split('\n');
    //console.log(wordArray);
    shuffle(wordArray);
    //console.log(wordArray);

    let choices = [];
    while (choices.length < 5) {
        let line = wordArray.pop();
        //let [word, part, def] = line.split('\t');
        let tokens = line.split("\t");
        let word = tokens[0];
        let part = tokens[1];
        let def = tokens[2];
        if (part === randomPart){
            choices.push(line);
        }
    } 
    return choices;
}

let getRandomPart = () =>{
    let parts = ['noun', 'verb', 'adjective'];
    let randomIndex = Math.floor(Math.random()*parts.length);
    let randomPart = parts[randomIndex];
    return randomPart;
}

let shuffle = (array) =>{
    for(let i = array.length-1; i>0; i--){
        let randomNumber = Math.floor(Math.random()*(i+1));
        [array[i], array[randomNumber]] = [array[randomNumber], array[i]];
    }
    //console.log("Array shuffled");
}



module.exports = router;