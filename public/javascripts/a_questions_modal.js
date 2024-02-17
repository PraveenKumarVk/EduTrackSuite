function setTopicMetaData() {
    const selectedCourse = document.getElementById('inputStateCourse');
}

function updateTopicDropdown() {
  //  console.log("a ques mod");
    const course = document.getElementById("inputStateCourse").value;
    const topicDropdown = document.getElementById("inputStateTopic");
    const subTopicDropdown = document.getElementById("inputStateSubTopic");
    topicDropdown.innerHTML = '<option>Choose...</option>';
    subTopicDropdown.innerHTML = '<option>Choose...</option>';

    for (let i = 0; i < refResults.length; i++) {
        if (refResults[i].type.toUpperCase() === course.toUpperCase()) {

            const option = document.createElement("option");
            option.value = refResults[i].type_value;
            option.text = refResults[i].type_value;
            topicDropdown.appendChild(option);
        }
    }
}


function updateSubTopicDropdown() {
    const topic = document.getElementById("inputStateTopic").value;
    const subTopicDropdown = document.getElementById("inputStateSubTopic");
    subTopicDropdown.innerHTML = '<option>Choose...</option>';

    for (let i = 0; i < refResults.length; i++) {
        if (refResults[i].type.toUpperCase() === topic.toUpperCase()) {
            const option = document.createElement("option");

            option.value = refResults[i].type_value;
            option.text = refResults[i].type_value;
            subTopicDropdown.appendChild(option);
        }
    }
}
