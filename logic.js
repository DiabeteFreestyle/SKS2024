
function choseTopic() {
    var div = document.createElement('div');
    div.innerHTML = "<h2>Выберите тему</h2>";
    div.innerHTML += "<a onclick='setQuiz(testLike,testLike.length)' style='color:green;font-weight:bold;'>Как на экзамене (рандом выборка 25 штук)</a><hr>";
    div.innerHTML += "<a onclick='setQuiz(data,10)' style='color:green;font-weight:bold;'>Все вопросы</a><hr>";
    document.getElementById("entrance").innerHTML += div.innerHTML;

}
var locShuffled;
var historyChoices = [];

var quiz;

function setQuiz(topic, number = 10) {
    if (number == 10) {
        quiz = getMultipleRandom(topic, topic.length);
    } else {
        quiz = topic;
    }
    document.getElementById("container-lg").style = "";
    document.getElementById("entrance")
    var elem = document.getElementById("entrance");
    elem.parentNode.removeChild(elem);
    loadQuestion();
    displayAnswerOptions();
}
var quiz = getMultipleRandom(data, 10);


var currentQuestion = 0;
var backCurrentQuestion = -1;
var score = 0;
var askingQuestion = true;

function back() {

    loadBackQuestion();
}

function loadBackQuestion() {
    askingQuestion = false;
    var radioButton;

    //clear out radio buttons from previous question
    document.getElementById('content').innerHTML = "";
    var localCurrentQuestion = currentQuestion + backCurrentQuestion;
    var localCorrectIndex;
    if (localCurrentQuestion < 0) {
        localCurrentQuestion = 0;
    }
    //loop through choices, and create radio buttons
    for (var i = 0; i < quiz[localCurrentQuestion]["choices"].length; i++) {

        radioButton = document.createElement('input');
        radioButton.type = 'radio';
        radioButton.name = 'quiz';
        radioButton.id = 'choice' + (i + 1);
        radioButton.value = quiz[localCurrentQuestion]["choices"][i];

        //create label tag, which hold the actual text of the choices
        var label = document.createElement('label');
        label.setAttribute('for', 'choice' + (i + 1));
        label.innerHTML = quiz[localCurrentQuestion]["choices"][i];

        //create a <br> tag to separate options
        var br = document.createElement('br');

        //attach them to content. Attach br tag, then label, then radio button
        document.getElementById('content').insertBefore(br, null);
        document.getElementById('content').insertBefore(label, br);
        document.getElementById('content').insertBefore(radioButton, label);
    }

    //load the question
    document.getElementById('question').innerHTML = quiz[localCurrentQuestion]["question"];
    document.getElementById('score').innerHTML = '<p>Счёт: ' + score + ' правильных из ' + quiz.length + ' возможных. ' + String(parseInt(localCurrentQuestion) + parseInt(1)) + '/' + quiz.length + '</p>';
    var radios = document.getElementsByName('quiz');
    for (var i = 0; i < radios.length; i++) {

        if (radios[i].value == quiz[localCurrentQuestion]["correct"]) {
            localCorrectIndex = i;

        }
    }
    document.getElementsByTagName('label')[localCorrectIndex].style.color = "green";
    document.getElementsByTagName('label')[localCorrectIndex].style.fontWeight = "bold";
    backCurrentQuestion--;
}

function loadQuestion() {
    //set temporary variable for creating radio buttons
    var radioButton;

    //clear out radio buttons from previous question
    document.getElementById('content').innerHTML = "";

    //loop through choices, and create radio buttons
    locShuffled = getMultipleRandom(quiz[currentQuestion]["choices"], quiz[currentQuestion]["choices"].length)
    for (var i = 0; i < quiz[currentQuestion]["choices"].length; i++) {

        radioButton = document.createElement('input');
        if (quiz[currentQuestion]["correct"].length === 1){
        radioButton.type = 'radio';
        radioButton.name = 'quiz';
        radioButton.id = 'choice' + (i + 1);
        radioButton.value = locShuffled[i];

        //create label tag, which hold the actual text of the choices
        var label = document.createElement('label');
        label.setAttribute('for', 'choice' + (i + 1));
        label.innerHTML = locShuffled[i];

        //create a <br> tag to separate options
        var br = document.createElement('br');

        //attach them to content. Attach br tag, then label, then radio button
        document.getElementById('content').insertBefore(br, null);
        document.getElementById('content').insertBefore(label, br);
        document.getElementById('content').insertBefore(radioButton, label);
        }
        else{
        radioButton.type = 'checkbox';
        radioButton.name = 'quiz';
        radioButton.id = 'choice' + (i + 1);
        radioButton.value = locShuffled[i];

        //create label tag, which hold the actual text of the choices
        var label = document.createElement('label');
        label.setAttribute('for', 'choice' + (i + 1));
        label.innerHTML = locShuffled[i];

        //create a <br> tag to separate options
        var br = document.createElement('br');

        //attach them to content. Attach br tag, then label, then radio button
        document.getElementById('content').insertBefore(br, null);
        document.getElementById('content').insertBefore(label, br);
        document.getElementById('content').insertBefore(radioButton, label);
        }

    }

    //load the question
    document.getElementById('question').innerHTML = quiz[currentQuestion]["question"];
    document.getElementById('score').innerHTML = '<p>Счёт: ' + score + ' правильных из ' + quiz.length + ' возможных. ' + String(parseInt(currentQuestion) + parseInt(1)) + '/' + quiz.length + '</p>';

    //setup score for first time
    if (currentQuestion == 0) {
        document.getElementById('score').innerHTML = '<p>Счёт: 0 правильных из ' + quiz.length + ' возможных. ' + String(parseInt(currentQuestion) + parseInt(1)) + '/' + quiz.length + '</p>';
    }
}
var correctIndex = [];
function arraysEqual(arr1, arr2) {
    const sortedArr1 = arr1.slice().sort();
    const sortedArr2 = arr2.slice().sort();
    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
}
function checkAnswer() {

    //are we asking a question, or proceeding to next question?
    if (askingQuestion) {

        //change button text to next question, so next time they click it, it goes to next question
        document.getElementById('check').innerHTML = 'Следующий вопрос';
        askingQuestion = false;

        //determine which radio button they clicked
        var userpick = [];
        var correctIndex=[];
        var radios = document.getElementsByName('quiz');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) { //if this radio button is checked
                userpick.push(radios[i].value);
            }
            if (quiz[currentQuestion]["correct"].includes(radios[i].value)) {
                correctIndex.push(i);
            }
            //get index of correct answer

        }

        //set the color if they got it right, or wrong
        if (arraysEqual(userpick, quiz[currentQuestion]["correct"])) {
            score++;
        };

        //document.getElementById('explanation').innerHTML += '<p>' + quiz[currentQuestion]["explanation"] + '</p>';
        document.getElementById('score').innerHTML = '<p>Счёт: ' + score + ' правильных из ' + quiz.length + ' возможных. ' + String(parseInt(currentQuestion) + parseInt(1)) + '/' + quiz.length + '</p>';
        for (let i = 0; i < correctIndex.length; i++) {
                document.getElementsByTagName('label')[correctIndex[i]].style.color = "green";
                document.getElementsByTagName('label')[correctIndex[i]].style.fontWeight = "bold";
                //document.getElementById('explanation').innerHTML = "<h3>Correct!</h3>";
                historyChoices.push([correctIndex[i], "green"]);
        };

    } else { //reset form and move to next question

        //setting up so user can ask a question
        askingQuestion = true;

        //change button text back to 'submit answer'
        document.getElementById('check').innerHTML = 'Подтвердить';

        //document.getElementById('explanation').innerHTML = "";

        //if we're not on last question, increase question number
        if (currentQuestion < quiz.length - 1) {
            if (backCurrentQuestion == -1) {
                currentQuestion++;
                backCurrentQuestion = -1;
                loadQuestion();
            } else {
                backCurrentQuestion = -1;
                loadQuestion();
            }
        } else {
            showFinalResults();
        }

    }
}

function showFinalResults() {
    grade = 3 + score * 2;
    grade_without = score * 2;
    grade_color = "green"
    grade_color_without = "green"
    if (score < 9) {
        grade = 2;
        grade_color = "red"
    } else if (30 <= grade && grade <= 39) {
        grade = 3;
        grade_color = "orange"
    } else if (40 <= grade && grade <= 55) {
        grade = 4;
    } else if (56 <= grade) {
        grade = 5;
    } else {
        grade = 2;
        grade_color = "red"
    }
    if (score < 9) {
        grade_without = 2;
        grade_color_without = "red"
    } else if (30 <= grade_without && grade_without <= 39) {
        grade_without = 3;
        grade_color_without = "orange"
    } else if (40 <= grade_without && grade_without <= 55) {
        grade_without = 4;
    } else if (56 <= grade_without) {
        grade_without = 5;
    } else {
        grade_without = 2;
        grade_color_without = "red"
    }

    document.getElementById('content').innerHTML = '<h2>Вы завершили попытку</h2>';
    document.getElementById('content').innerHTML += '<p>Результаты:</p>';
    document.getElementById('content').innerHTML += '<h2>' + score + ' из ' + quiz.length + ' вопросов, ' + Math.round(score / quiz.length * 100) + '% (' + score * 2 + ' баллов)</h2>';
    if (quiz.length != 10) {
        //document.getElementById('content').innerHTML += '<p>С 3-мя дополнительными баллами на экзамене вы бы получили <span style=color:' + grade_color + ';font-weight:bold;>' + grade + '</span></p>';
        //document.getElementById('content').innerHTML += '<p>Без дополнительных баллов на экзамене вы бы получили <span style=color:' + grade_color_without + ';font-weight:bold;>' + grade_without + '</span></p>';
    }
    document.getElementById('content').innerHTML += '<button class="btn btn-success fixed-bottom" onclick="window.location.reload();" style="margin-bottom: 30px;width:100%">Повторить</button>'
    //delete the button
    var button_check = document.getElementById('check');
    var button_back = document.getElementById('back');
    button_check.parentNode.removeChild(button_check); //js requires you to delete elements from the parent
    button_back.parentNode.removeChild(button_back);
    //remove question
    document.getElementById('question').innerHTML = "";

}


//window.onload = loadQuestion;
//loadQuestion();
window.onload = choseTopic;