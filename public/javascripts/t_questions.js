
   // const { head } = require("../../s3");
function validateData(data = -1) {

if (data == -1) {
    var data = makeQuestionValidationData();
} else {
    var data = data;
}
console.log(data.questionData, data.updateTransilationResults, data.createTransilationResults);
//check if question exist
if (data.questionData.question.length <= 0 || data.questionData.question == '' || data.questionData.question == "") {
    //chexk if image exist but no question
    if (tinyMCE.get('questionTextArea').getContent().length > 0) {
        //next case
    } else {
        alert("Question Can't be Empty");
        return -1;
    }
}

//console.log(data.questionData.option_1.length)
if (data.questionData.option_1.length <= 0 || data.questionData.option_2.length <= 0 || data.questionData.option_3.length <= 0 ||
    data.questionData.option_4.length <= 0) {
    alert("Question Options Can't be Empty");
    return -1;
}

if (data.questionData.answer.includes("Choose") || data.questionData.answer.length <= 0) {
    alert("Correct Option Can't be Empty");
    return -1;
}

for (var i = 0; i < data.updateTransilationResults.length; i++) {
    if (data.updateTransilationResults[i].t_question_url.length <= 0 && (data.updateTransilationResults[i].t_question.length <= 0 || data.updateTransilationResults[i].t_question == '')) {
        alert("Transilation Question Can't be empty")
        return -1;
    }
}

// console.log(data.updateTransilationResults[0].t_option_1.length);
for (var i = 0; i < data.updateTransilationResults.length; i++) {
    if (data.updateTransilationResults[i].t_question_url.length > 0 || data.updateTransilationResults[i].t_question.length > 0 || data.updateTransilationResults[i].t_question != '') {
        if (data.updateTransilationResults[i].t_option_1.length <= 0 || data.updateTransilationResults[i].t_option_2.length <= 0 ||
            data.updateTransilationResults[i].t_option_3.length <= 0 || data.updateTransilationResults[i].t_option_4.length <= 0) {
            alert("Trasilation Option Can't be empty");
            return -1;
        }
    }
}
if (data.createTransilationResults.length > 0) {

    for (var i = 0; i < data.createTransilationResults.length; i++) {
        if (data.createTransilationResults[i].t_question_url.length > 0 || data.createTransilationResults[i].t_question.length > 0 || data.createTransilationResults[i].t_question != '') {
            if (data.createTransilationResults[i].t_option_1.length <= 0 || data.createTransilationResults[i].t_option_2.length <= 0 ||
                data.createTransilationResults[i].t_option_3.length <= 0 || data.createTransilationResults[i].t_option_4.length <= 0) {
                alert("Transilation Option Can't be empty");
                return -1;
            }
        }
    }
}

return 1;

}

function cleanQuestionNotRequiredData(data) {
if (!data.year || data.year.includes("Choose") || data.year.length < 3) {
    data.year = null
}
if (!data.month || data.month.includes("Choose") || data.month.length < 1) {
    data.month = null
}
if (!data.course || data.course.includes("Choose") || data.course.length < 1) {
    data.course = null
}
if (!data.topic || data.topic.includes("Choose") || data.topic.length < 1) {
    data.topic = null
}
if (!data.sub_topic || data.sub_topic.includes("Choose") || data.sub_topic.length < 1) {
    data.sub_topic = null
}
if (!data.difficulty || data.difficulty.includes("Choose") || data.difficulty.length < 1) {
    data.difficulty = null
}
if (!data.standard || data.standard.includes("Choose") || data.standard.length < 1) {
    data.standard = null
}
return data;
}


function makeQuestionValidationData() {

var question_id = document.getElementById('mappedQuestion_id').value;
var inputStateAnswer = document.getElementById('inputStateAnswer').value;
var inputStateYear = document.getElementById('inputStateYear').value;
var inputStateMonth = document.getElementById('inputStateMonth').value;
var inputStateStandard = document.getElementById('inputStateStandard').value;
var inputStateCourse = document.getElementById('inputStateCourse').value;
var inputStateTopic = document.getElementById('inputStateTopic').value;
var inputStateSubTopic = document.getElementById('inputStateSubTopic').value;
var inputStateDifficulty = document.getElementById('inputStateDifficulty').value;
// console.log("testing tiny mice", tinyMCE.get('questionTextArea').getContent());



var textareas = document.getElementById("accordionExample").querySelectorAll("textarea");
var updateTransilationResults = []
var createTransilationResults = []
for (var i = 0; i < textareas.length; i = i + 6) {
    if (textareas[i].name.includes('Create')) {
        var data = {
            question_id: question_id,
            language: textareas[i].name.substring(0, textareas[i].name.length - 6),
            t_question: ((tinyMCE.get(textareas[i].id).getContent()).replace(/<img.*?>/g, '')),
            t_solution: ((tinyMCE.get(textareas[i + 1].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_1: ((tinyMCE.get(textareas[i + 2].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_2: ((tinyMCE.get(textareas[i + 3].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_3: ((tinyMCE.get(textareas[i + 4].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_4: ((tinyMCE.get(textareas[i + 5].id).getContent()).replace(/<img.*?>/g, '')),
            t_question_url: '',
            t_solution_url: '',
            t_option_1_url: '',
            t_option_2_url: '',
            t_option_3_url: '',
            t_option_4_url: '',
            t_answer: inputStateAnswer
        }
        createTransilationResults.push(data);

    } else {
        var data = {
            translation_id: textareas[i].name,
            t_question: ((tinyMCE.get(textareas[i].id).getContent()).replace(/<img.*?>/g, '')),
            t_solution: ((tinyMCE.get(textareas[i + 1].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_1: ((tinyMCE.get(textareas[i + 2].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_2: ((tinyMCE.get(textareas[i + 3].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_3: ((tinyMCE.get(textareas[i + 4].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_4: ((tinyMCE.get(textareas[i + 5].id).getContent()).replace(/<img.*?>/g, '')),
            t_question_url: '',
            t_solution_url: '',
            t_option_1_url: '',
            t_option_2_url: '',
            t_option_3_url: '',
            t_option_4_url: '',
            t_answer: inputStateAnswer
        }
        updateTransilationResults.push(data);
    }
}

//console.log("from 63")
//remves emty imputs
var temp = []
for (i = 0; i < updateTransilationResults.length; i++) {
    if (updateTransilationResults[i].translation_id != '' && (updateTransilationResults[i].t_question.length > 0 || updateTransilationResults[i].t_question_url.length > 0)) {
        temp.push(updateTransilationResults[i]);
    }
}
//console.log("removed", updateTransilationResults.length - temp.length, "items")
updateTransilationResults = temp;
temp = []

for (i = 0; i < createTransilationResults.length; i++) {
    if (createTransilationResults[i].question_id != '' && (createTransilationResults[i].t_question.length != 0 || createTransilationResults[i].t_question_url.length > 0)) {
        console.log("createTransilationResults");
        temp.push(createTransilationResults[i]);
    }
}
//console.log("removed", createTransilationResults.length - temp.length, "items")
createTransilationResults = temp;

// var userDeletedTheImage = '';
// //check if there is a question withou img tag but with a url when loaded
// editors[0].uploadImages().then(function() {
//     if (!tinyMCE.get('questionTextArea').getContent().includes("<img") && questionResults[0].question_url) {
//         console.log("no there");
//         userDeletedTheImage = ''
//     } else {
//         userDeletedTheImage = imageLocArray[0].productImage;
//         console.log(userDeletedTheImage)
//     }
// }).catch(error => {
//     console.log(error)
// });

// .replace(/(<p>|<br>)*<\/?(p|br)[^>]*>/g, "")


const questionData = {
        question_id: question_id,
        question: ((tinyMCE.get('questionTextArea').getContent()).replace(/<img.*?>/g, '')),
        solution: ((tinyMCE.get('solutionTextArea').getContent()).replace(/<img.*?>/g, '')),
        option_1: ((tinyMCE.get('floatingTextareaOption1').getContent()).replace(/<img.*?>/g, '')),
        option_2: ((tinyMCE.get('floatingTextareaOption2').getContent()).replace(/<img.*?>/g, '')),
        option_3: ((tinyMCE.get('floatingTextareaOption3').getContent()).replace(/<img.*?>/g, '')),
        option_4: ((tinyMCE.get('floatingTextareaOption4').getContent()).replace(/<img.*?>/g, '')),
        question_url: '',
        solution_url: '',
        option_1_url: '',
        option_2_url: '',
        option_3_url: '',
        option_4_url: '',
        answer: inputStateAnswer,
        approval: 'approved',
        reference_tags_id: '',
    }
    //uncoment below line to see full picture
    // console.log("before", questionData, updateTransilationResults, createTransilationResults, inputStateYear, inputStateMonth, inputStateCourse, inputStateTopic, inputStateSubTopic, inputStateDifficulty, inputStateStandard);
    // if (createTransilationResults.length <= 0) {
    //     createTransilationResults.push(-1)
    // }
var data = {
        year: inputStateYear,
        month: inputStateMonth,
        course: inputStateCourse,
        topic: inputStateTopic,
        createTransilationResults: createTransilationResults,
        sub_topic: inputStateSubTopic,
        difficulty: inputStateDifficulty,
        standard: inputStateStandard,
        questionData: questionData,
        updateTransilationResults: updateTransilationResults,
    }
    //console.log(data);
return data;
}

function findTheProductImage(a) {
for (var i = 0; i < imageLocArray.length; i++) {
    if (tinyMCE.get(a).getContent().includes(imageLocArray[i].productImage)) {
        return imageLocArray[i].productImage
    }
}
if (tinyMCE.get(a).getContent().includes('<img')) {
    return '-1'
}

return '';
}

function cleanData(str) {
var escapedStr = str.replace(/\\/g, "\\\\")
    .replace(/\"/g, "\\\"")
    .replace(/\'/g, "\\\'")
    .replace(/\n/g, "\\n")
    .replace(/\r/g, "\\r")
    .replace(/\t/g, "\\t")
    .replace(/\f/g, "\\f")
    .replace(/\v/g, "\\v");
return escapedStr;
}

function submitquestion() {
console.log("submitquestion")
var question_id = document.getElementById('mappedQuestion_id').value;
var questionTextArea = document.getElementById('questionTextArea').value;
var floatingTextareaOption1 = document.getElementById('floatingTextareaOption1').value;
var floatingTextareaOption2 = document.getElementById('floatingTextareaOption2').value;
var floatingTextareaOption3 = document.getElementById('floatingTextareaOption3').value;
var floatingTextareaOption4 = document.getElementById('floatingTextareaOption4').value;
var inputStateAnswer = document.getElementById('inputStateAnswer').value;
var inputStateYear = document.getElementById('inputStateYear').value;
var inputStateMonth = document.getElementById('inputStateMonth').value;
var inputStateStandard = document.getElementById('inputStateStandard').value;
var inputStateCourse = document.getElementById('inputStateCourse').value;
var inputStateTopic = document.getElementById('inputStateTopic').value;
var inputStateSubTopic = document.getElementById('inputStateSubTopic').value;
var inputStateDifficulty = document.getElementById('inputStateDifficulty').value;
// console.log("testing tiny mice", tinyMCE.get('questionTextArea').getContent());

// Get all the elements with class name 'languageAccordianHeader'
var spans = document.getElementsByClassName('languageAccordianHeader');

// Iterate through each element in the HTMLCollection
for (var i = 0; i < spans.length; i++) {
    // Get the text content of the current element
    var value = spans[i].textContent;

    // Do something with the value
    // console.log(value);
}


var textareas = document.getElementById("accordionExample").querySelectorAll("textarea");
var languages = document.getElementById("accordionExample").querySelectorAll("textarea");
var updateTransilationResults = []
var createTransilationResults = []
for (var i = 0; i < textareas.length; i = i + 6) {
    if (textareas[i].name.includes('Create')) {
        var data = {
            question_id: question_id,
            language: textareas[i].name.substring(0, textareas[i].name.length - 6),
            t_question: ((tinyMCE.get(textareas[i].id).getContent()).replace(/<img.*?>/g, '')),
            t_solution: ((tinyMCE.get(textareas[i + 1].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_1: ((tinyMCE.get(textareas[i + 2].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_2: ((tinyMCE.get(textareas[i + 3].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_3: ((tinyMCE.get(textareas[i + 4].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_4: ((tinyMCE.get(textareas[i + 5].id).getContent()).replace(/<img.*?>/g, '')),
            t_question_url: findTheProductImage(textareas[i].id),
            t_solution_url: findTheProductImage(textareas[i + 1].id),
            t_option_1_url: findTheProductImage(textareas[i + 2].id),
            t_option_2_url: findTheProductImage(textareas[i + 3].id),
            t_option_3_url: findTheProductImage(textareas[i + 4].id),
            t_option_4_url: findTheProductImage(textareas[i + 5].id),
            t_answer: inputStateAnswer
        }
        createTransilationResults.push(data);

    } else {
        var data = {
            translation_id: textareas[i].name,
            t_question: ((tinyMCE.get(textareas[i].id).getContent()).replace(/<img.*?>/g, '')),
            t_solution: ((tinyMCE.get(textareas[i + 1].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_1: ((tinyMCE.get(textareas[i + 2].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_2: ((tinyMCE.get(textareas[i + 3].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_3: ((tinyMCE.get(textareas[i + 4].id).getContent()).replace(/<img.*?>/g, '')),
            t_option_4: ((tinyMCE.get(textareas[i + 5].id).getContent()).replace(/<img.*?>/g, '')),
            t_question_url: findTheProductImage(textareas[i].id),
            t_solution_url: findTheProductImage(textareas[i + 1].id),
            t_option_1_url: findTheProductImage(textareas[i + 2].id),
            t_option_2_url: findTheProductImage(textareas[i + 3].id),
            t_option_3_url: findTheProductImage(textareas[i + 4].id),
            t_option_4_url: findTheProductImage(textareas[i + 5].id),
            t_answer: inputStateAnswer
        }
        updateTransilationResults.push(data);
    }
}

//console.log("from 63")
//remves emty imputs
var temp = []
for (i = 0; i < updateTransilationResults.length; i++) {
    if (updateTransilationResults[i].translation_id != '' && (updateTransilationResults[i].t_question.length > 0 || updateTransilationResults[i].t_question_url.length > 0)) {
        temp.push(updateTransilationResults[i]);
    }
}

//console.log("removed", updateTransilationResults.length - temp.length, "items")
updateTransilationResults = temp;

temp = []
for (i = 0; i < createTransilationResults.length; i++) {
    if (createTransilationResults[i].question_id != '' && (createTransilationResults[i].t_question.length > 0 || createTransilationResults[i].t_question_url.length > 0)) {
        console.log("createTransilationResults");
        temp.push(createTransilationResults[i]);

    }
}
//console.log("removed", createTransilationResults.length - temp.length, "items")
createTransilationResults = temp;





const questionData = {
        question_id: question_id,
        question: ((tinyMCE.get('questionTextArea').getContent()).replace(/<img.*?>/g, '')),
        solution: ((tinyMCE.get('solutionTextArea').getContent()).replace(/<img.*?>/g, '')),
        option_1: ((tinyMCE.get('floatingTextareaOption1').getContent()).replace(/<img.*?>/g, '')),
        option_2: ((tinyMCE.get('floatingTextareaOption2').getContent()).replace(/<img.*?>/g, '')),
        option_3: ((tinyMCE.get('floatingTextareaOption3').getContent()).replace(/<img.*?>/g, '')),
        option_4: ((tinyMCE.get('floatingTextareaOption4').getContent()).replace(/<img.*?>/g, '')),
        question_url: findTheProductImage('questionTextArea'),
        solution_url: findTheProductImage('solutionTextArea'),
        option_1_url: findTheProductImage('floatingTextareaOption1'),
        option_2_url: findTheProductImage('floatingTextareaOption2'),
        option_3_url: findTheProductImage('floatingTextareaOption3'),
        option_4_url: findTheProductImage('floatingTextareaOption4'),
        answer: inputStateAnswer,
        approval: 'approved',
        reference_tags_id: '',
    }
    //uncoment below line to see full picture
    //console.log("before", questionData, updateTransilationResults, createTransilationResults, inputStateYear, inputStateMonth, inputStateCourse, inputStateTopic, inputStateSubTopic, inputStateDifficulty, inputStateStandard);
getReferenceId(questionData, updateTransilationResults, createTransilationResults, inputStateYear, inputStateMonth, inputStateCourse, inputStateTopic, inputStateSubTopic, inputStateDifficulty, inputStateStandard);

}

function makeQuestionDataOnly() {

var question_id = document.getElementById('mappedQuestion_id').value;
var questionTextArea = document.getElementById('questionTextArea').value;
var floatingTextareaOption1 = document.getElementById('floatingTextareaOption1').value;
var floatingTextareaOption2 = document.getElementById('floatingTextareaOption2').value;
var floatingTextareaOption3 = document.getElementById('floatingTextareaOption3').value;
var floatingTextareaOption4 = document.getElementById('floatingTextareaOption4').value;
var inputStateAnswer = document.getElementById('inputStateAnswer').value;
var inputStateYear = document.getElementById('inputStateYear').value;
var inputStateMonth = document.getElementById('inputStateMonth').value;
var inputStateStandard = document.getElementById('inputStateStandard').value;
var inputStateCourse = document.getElementById('inputStateCourse').value;
var inputStateTopic = document.getElementById('inputStateTopic').value;
var inputStateSubTopic = document.getElementById('inputStateSubTopic').value;
var inputStateDifficulty = document.getElementById('inputStateDifficulty').value;

const questionData = {
    question_id: question_id,
    question: ((tinyMCE.get('questionTextArea').getContent()).replace(/<img.*?>/g, '')),
    solution: ((tinyMCE.get('solutionTextArea').getContent()).replace(/<img.*?>/g, '')),
    option_1: ((tinyMCE.get('floatingTextareaOption1').getContent()).replace(/<img.*?>/g, '')),
    option_2: ((tinyMCE.get('floatingTextareaOption2').getContent()).replace(/<img.*?>/g, '')),
    option_3: ((tinyMCE.get('floatingTextareaOption3').getContent()).replace(/<img.*?>/g, '')),
    option_4: ((tinyMCE.get('floatingTextareaOption4').getContent()).replace(/<img.*?>/g, '')),
    question_url: findTheProductImage('questionTextArea'),
    solution_url: findTheProductImage('solutionTextArea'),
    option_1_url: findTheProductImage('floatingTextareaOption1'),
    option_2_url: findTheProductImage('floatingTextareaOption2'),
    option_3_url: findTheProductImage('floatingTextareaOption3'),
    option_4_url: findTheProductImage('floatingTextareaOption4'),
    answer: inputStateAnswer,
    approval: 'approved',
    reference_tags_id: '',
}

var data = {
    year: inputStateYear,
    month: inputStateMonth,
    course: inputStateCourse,
    topic: inputStateTopic,
    createTransilationResults: [],
    sub_topic: inputStateSubTopic,
    difficulty: inputStateDifficulty,
    standard: inputStateStandard,
    questionData: questionData,
    updateTransilationResults: [],
}
return data;
}



function userNeverTouchedTrasilation() {
var isSubmited = false;
var data = makeQuestionDataOnly();
data = cleanQuestionNotRequiredData(data);

if (validateData(data) == 1) {

    var editorPromises = [];
    for (var i = 0; i < 6; i++) {
        editorPromises.push(editors[i].uploadImages());
    }

    Promise.all(editorPromises).then(function() {
        if (!isSubmited) {
            data.questionData.question_url = findTheProductImage('questionTextArea');
            data.questionData.solution_url = findTheProductImage('solutionTextArea');
            data.questionData.option_1_url = findTheProductImage('floatingTextareaOption1');
            data.questionData.option_2_url = findTheProductImage('floatingTextareaOption2');
            data.questionData.option_3_url = findTheProductImage('floatingTextareaOption3');
            data.questionData.option_4_url = findTheProductImage('floatingTextareaOption4');
            postQuestionDatatoApi(data);
            isSubmited = true;
            alert("Save successful3");
            window.location.href='/teacher/questions';
        }
    }).catch(function(error) {

        console.log("editors, [Solving...] Image Upload in Progress");

        if (!isSubmited) {
            try {
                data.questionData.question_url = findTheProductImage('questionTextArea');
                data.questionData.solution_url = findTheProductImage('solutionTextArea');
                data.questionData.option_1_url = findTheProductImage('floatingTextareaOption1');
                data.questionData.option_2_url = findTheProductImage('floatingTextareaOption2');
                data.questionData.option_3_url = findTheProductImage('floatingTextareaOption3');
                data.questionData.option_4_url = findTheProductImage('floatingTextareaOption4');
                postQuestionDatatoApi(data);
                isSubmited = true;
                alert("Save successful1");
                window.location.href='/teacher/questions';
            } catch (error) {
                console.log("uploading");
            }
        }
    });
}
}


// function uploadSubmitQuestionData() {
//     console.log(((((tinyMCE.get('questionTextArea').getContent()).replace(/(&nbsp;)*/g, "")).replace(/(<p>)*/g, "")).replace(/<(\/)?p[^>]*>/g, "").replace(/(<p>|<br>)*<\/?(p|br)[^>]*>/g, "").replace(/<img.*?>/g, '')));
// }

function uploadSubmitQuestionData() {
var isSubmited = false;
var userNeverTouchedTrasilationFlag = false;
console.log("hello try/catch above");
try {

    console.log("hellok from try");
    var textareas = document.getElementById("accordionExample").querySelectorAll("textarea");
    tinyMCE.get(textareas[0].id).getContent();
    console.log("jcj")
    console.log( tinyMCE.get(textareas[0].id).getContent());

} catch (error) {
    console.log("hellok from catch");
    userNeverTouchedTrasilation()
    userNeverTouchedTrasilationFlag = true;
}
console.log("hello try/catch above");
if (!userNeverTouchedTrasilationFlag && validateData() == 1) {
    console.log("hello")

    var editorPromises = [];
    for (var i = 0; i < 6; i++) {
        editorPromises.push(editors[i].uploadImages());
    }


    Promise.all(editorPromises).then(function() {
        var textareas = document.getElementById("accordionExample").querySelectorAll("textarea");
        var promises = [];
        console.log("")
        for (var i = 0; i < textareas.length; i++) {
            console.log("Hello");
            var promise = tinyMCE.get(textareas[i].id).uploadImages().catch(function(error) {
                console.log("Error uploading images for TinyMCE instance " + i / 6 + ": ", error);
                return Promise.resolve(); // ignore error and continue processing other instances
            });
            promises.push(promise);
        }

        Promise.all(promises).then(function() {
            if (!isSubmited) {
                console.log("hello");
                submitquestion();
                isSubmited = true;
                alert("Save Successfull2")
                window.location.href='/teacher/questions';
            }
        }).catch(function(error) {
            console.log("Error uploading images for one or more TinyMCE instances: ", error);
        });
    }).catch(function(error) {
        if (editors[0]) {
            console.log("Error uploading images for editors[0]: ", error);
        } else {
            console.log("editors[0],[Solving...] Image Upload in Progress");
        }
    });
}
}




//post the question data using ajax
function getReferenceId(questionData, updateTransilationResults, createTransilationResults, inputStateYear, inputStateMonth, inputStateCourse, inputStateTopic,
inputStateSubTopic, inputStateDifficulty, inputStateStandard) {
//console.log("createTransilationResults", createTransilationResults);
// if (createTransilationResults.length <= 0) {
//     createTransilationResults.push(-1)
// }
var data = {
        year: inputStateYear,
        month: inputStateMonth,
        course: inputStateCourse,
        topic: inputStateTopic,
        createTransilationResults: createTransilationResults,
        sub_topic: inputStateSubTopic,
        difficulty: inputStateDifficulty,
        standard: inputStateStandard,
        questionData: questionData,
        updateTransilationResults: updateTransilationResults,
    }
    // console.log("beforeCleaing cleanQuestionNotRequiredData", data);
data = cleanQuestionNotRequiredData(data);
// console.log("after cleaing cleanQuestionNotRequiredData", data);
postQuestionDatatoApi(data);

}

function postQuestionDatatoApi(data) {
//console.log(data);
if (data.updateTransilationResults.length <= 0) {
    data.updateTransilationResults.push(-1);
}
if (data.createTransilationResults.length <= 0) {
    data.createTransilationResults.push(-1);
}
console.log(data);
if (data.questionData.question_id == -1 || data.questionData.question_id == '') {
    $.ajax({
        type: 'POST',
        url: './questions/AddQuestion',
        data: data,
        success: function(response) {
            console.log(response);
            location.reload();
        },
        error: function(error) {
            console.log(error);
            // // // // location.reload();
            // Handle error response here
        }
    });
} else {
    $.ajax({
        type: 'POST',
        url: './questions/getReferenceid',
        data: data,
        success: function(response) {
            console.log(response);
            location.reload();
        },
        error: function(error) {
            console.log(error);
            // location.reload();
            // Handle error response here
        }
    });
}
}

function gettransilation(data) {

console.log('gettransilation');
const url = './editQuestion?questionId=' + data;
$.get(url, function(data) {

    // console.log('gettransilation');
    $('#editQuestionModalBody').html(data);

    // const editQuestionModalBody =document.getElementById('editQuestionModalBody');
    // editQuestionModalBody.innerHTML = data;  
});
}

function AddQuestion() {
var heading = document.getElementById('exampleModalLabelToggleEditOrAdd')
heading.innerHTML = 'Add Question';
console.log("AddQuestion")
const url = './AddQuestionModal?questionId=-1';
$.get(url, function(data) {
    $('#editQuestionModalBody').html(data);
    // const editQuestionModalBody =document.getElementById('editQuestionModalBody');
    // editQuestionModalBody.innerHTML = data;  
});
}

function deleteQuestion(question_id) {
// console.log(question_id)
$.ajax({
    type: 'POST',
    url: './questions/delete',
    data: { question_id: question_id },
    success: function(response) {
        //console.log(response);
        alert("Question Deleted Succussfully")
        location.reload();
    },
    error: function(error) {
        console.log(error);
        // Handle error response here
    }
});

}



