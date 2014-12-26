/**
 * Project: Fun With Flags
 * Author: Amogh Bihani
 */

function FlagQuiz(numCountries, numChoices) {
    this.numCountries = numCountries; // Number of countries in database
    this.numChoices = numChoices; // Number of choices to be given
    this.askedQuestions = new Array(); // Country ID asked
    this.choices = new Array(); // Country IDs in options
    this.question; // Country ID to be asked
    this.answer; // Correct choice ID
}

FlagQuiz.prototype.nextQuestion = function() {
    var tempQues;
    do {
        tempQues = this.getRandomNumber(this.numCountries);
    } while(this.isQuestionRecentlyAsked(tempQues));
    this.pushToRecentlyAskedQuestion(tempQues);
    this.question = tempQues;

    this.answer = this.getRandomNumber(this.numChoices);

    for (var i = 0; i < this.numChoices; ++i) {
        if (i == this.answer) {
            this.choices[i] = this.question;
            continue;
        }
        this.choices[i] = this.getChoice(i);
    }
};

FlagQuiz.prototype.getRandomNumber = function(maxLimit) {
    return Math.floor(Math.random() * maxLimit);
};

FlagQuiz.prototype.isQuestionRecentlyAsked = function(ques) {
    for (i = 0; i < this.askedQuestions.length; ++i) {
        if (askedQuestions[i] === ques)
            return true;
    }
    return false;
};

FlagQuiz.prototype.pushToRecentlyAskedQuestion = function(ques) {
    if (this.askedQuestions.length === 50)
        this.askedQuestions.shift();
    this.askedQuestions.push(ques);
};

FlagQuiz.prototype.getChoice = function(choiceNumber) {        
    var tempChoice;
    do {
        tempChoice = this.getRandomNumber(this.numCountries);
    } while(!this.isValidChoice(tempChoice, choiceNumber));
    return tempChoice;
};

FlagQuiz.prototype.isValidChoice = function(choice, choiceNumber) {
    if (choice === this.answer)
        return false;

    for (var i = 0; i < choiceNumber; ++i) {
        if (choice === this.choices[i])
            return false;
    }

    return true;
};
