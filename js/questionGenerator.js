/**
 * Project: Fun With Flags
 * Author: Amogh Bihani
 */

function QuestionGenerator(numCountries, numChoices) {
    this.numCountries = numCountries; // Number of countries in database
    this.numChoices = numChoices; // Number of choices to be given
    this.askedQuestions = new Array(); // Country ID asked
    this.choices = new Array(); // Country IDs in options
    this.question; // Country ID to be asked
    this.answer; // Correct choice ID
    this.score = 0;
    this.firstAttempt = true;
}

QuestionGenerator.prototype.nextQuestion = function() {
    var tempQues;
    this.firstAttempt = true;
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

QuestionGenerator.prototype.getRandomNumber = function(maxLimit) {
    return Math.floor(Math.random() * maxLimit);
};

QuestionGenerator.prototype.isQuestionRecentlyAsked = function(ques) {
    for (i = 0; i < this.askedQuestions.length; ++i) {
        if (this.askedQuestions[i] == ques)
            return true;
    }
    return false;
};

QuestionGenerator.prototype.pushToRecentlyAskedQuestion = function(ques) {
    if (this.askedQuestions.length == 50)
        this.askedQuestions.shift();
    this.askedQuestions.push(ques);
};

QuestionGenerator.prototype.getChoice = function(choiceNumber) {        
    var tempChoice;
    do {
        tempChoice = this.getRandomNumber(this.numCountries);
    } while(!this.isValidChoice(tempChoice, choiceNumber));
    return tempChoice;
};

QuestionGenerator.prototype.isValidChoice = function(choice, choiceNumber) {
    if (choice == this.answer)
        return false;

    for (var i = 0; i < choiceNumber; ++i) {
        if (choice == this.choices[i])
            return false;
    }

    return true;
};

QuestionGenerator.prototype.isCorrect = function(choice) {
    if (choice == this.answer) {
        if (this.firstAttempt)
            ++this.score;
        return true;
    } else {
        this.firstAttempt = false;
        return false;
    }
};
