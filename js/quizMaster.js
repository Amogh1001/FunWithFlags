/**
 * Project: Fun With Flags
 * Author: Amogh Bihani
 */

function QuizMaster(numCountries, gameMode) {
    this.numCountries = numCountries; // Number of countries in database
    this.gameMode = gameMode;
    this.numChoices = NUM_OPTIONS; // Number of choices to be given
    this.askedQuestions = new Array(); // Country ID asked
    this.choices = new Array(); // Country IDs in options
    this.question; // Country ID to be asked
    this.answer; // Correct choice ID
    this.score = 0;
    this.firstAttempt = true;
    this.numQuestions = 0;
    this.endQuiz = false;
    this.lives = 3;

    if (this.gameMode == GAME_MODE_ARCADE) {
        showCountDown(this.lives);
    }

    if (this.gameMode == GAME_MODE_TIME_TRIAL) {
        this.timeCountdown();
        showCountDown(NUM_SECONDS_TIME_TRIAL);
    }
}

QuizMaster.prototype.nextQuestion = function() {
    var tempQues;
    this.firstAttempt = true;
    if (this.gameMode == GAME_MODE_QUIZ) {
        showCountDown(NUM_QUESTIONS_IN_QUIZ - this.numQuestions);
    }
    ++this.numQuestions;
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

QuizMaster.prototype.getRandomNumber = function(maxLimit) {
    return Math.floor(Math.random() * maxLimit);
};

QuizMaster.prototype.isQuestionRecentlyAsked = function(ques) {
    for (i = 0; i < this.askedQuestions.length; ++i) {
        if (this.askedQuestions[i] == ques)
            return true;
    }
    return false;
};

QuizMaster.prototype.pushToRecentlyAskedQuestion = function(ques) {
    if (this.askedQuestions.length == 50)
        this.askedQuestions.shift();
    this.askedQuestions.push(ques);
};

QuizMaster.prototype.getChoice = function(choiceNumber) {        
    var tempChoice;
    do {
        tempChoice = this.getRandomNumber(this.numCountries);
    } while(!this.isValidChoice(tempChoice, choiceNumber));
    return tempChoice;
};

QuizMaster.prototype.isValidChoice = function(choice, choiceNumber) {
    if (choice == this.question)
        return false;

    for (var i = 0; i < choiceNumber; ++i) {
        if (choice == this.choices[i])
            return false;
    }

    return true;
};

QuizMaster.prototype.isCorrect = function(choice) {
    if (choice == this.answer) {
        if (this.firstAttempt)
            ++this.score;
        return true;
    } else {
        this.firstAttempt = false;
        if (this.gameMode == GAME_MODE_ARCADE) {
            if (this.lives > 0)
                --this.lives;
            showCountDown(this.lives);
            if (this.lives == 0)
                this.endQuiz = true;
        }
        return false;
    }
};

QuizMaster.prototype.shouldEndQuiz = function() {
    if (this.gameMode == GAME_MODE_QUIZ
            && this.numQuestions == NUM_QUESTIONS_IN_QUIZ) {
        this.endQuiz = true;
    }
    return this.endQuiz;
};

QuizMaster.prototype.timeCountdown = function() {
    var timeLeft = NUM_SECONDS_TIME_TRIAL;
    setInterval(function() {
        --timeLeft;
        if (timeLeft <= 0) {
            showFinalScore();
        } else {
            showCountDown(timeLeft);
        }
    }, 1000);
};
