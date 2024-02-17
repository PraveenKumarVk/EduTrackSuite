var data = {}
var selectedRefData = {}
var selectedCourseData = {}
var selectedTopicData = {}
var selectedSubTopicData = {}




function tempcall(a) {

    const QuestionReferencetables = document.getElementsByClassName('QuestionReferencetables');

    const Standardreftableclass = document.getElementsByClassName('Standardreftableclass');
    const Yearreftableclass = document.getElementsByClassName('Yearreftableclass');
    const Difficultyreftableclass = document.getElementsByClassName('Difficultyreftableclass');
    const QuestionTagreftable = document.getElementsByClassName('QuestionTagreftable');
    const allTablesForTopic = document.getElementsByClassName('allTablesForTopic');
    const Coursereftableclass = document.getElementsByClassName('Coursereftableclass');
    const topicsTablerowId = document.getElementById('topicsTablerowId')


    makeClassNone(QuestionReferencetables);
    makeClassNone(allTablesForTopic);
    topicsTablerowId.style.display = 'none';

    localStorage.setItem("questionReferenceTagselect", a);

    if (a == 'Standard') {
        Standardreftableclass[0].style.display = 'block';

    } else if (a == "Year") {
        Yearreftableclass[0].style.display = 'block';
    } else if (a == "Difficulty") {
        Difficultyreftableclass[0].style.display = 'block';
    } else if (a == "Question Tag") {
        QuestionTagreftable[0].style.display = 'block';
    } else if (a == "Course") {
        Coursereftableclass[0].style.display = 'block';
    }

};

function setReferenceDataModal(i = -1) {
    if (i != -1) {
        const reference_type = document.getElementById('addReferenceModalHeading');
        const reference_type_value = document.getElementById('refInput');

        if (results[i].type == 'language' || results[i].type == 'standard' || results[i].type == 'question_tag' ||
            results[i].type == 'difficulty' || results[i].type == 'course' || results[i].type == 'year' ||
            results[i].type == 'month' || results[i].type == 'school name' || i > -1
        ) {
            reference_type.innerHTML = 'Edit ' + results[i].type
            reference_type_value.value = results[i].type_value
            selectedRefData = results[i];
        }
    }

}

function addNewPreferedLanguage() {
    const reference_type = document.getElementById('addReferenceModalHeading');
    const reference_type_value = document.getElementById('refInput');
    reference_type.innerHTML = 'Add Language'
    reference_type_value.value = ''
}

function submitPreferedLanguage() {
   // console.log("submitPreferedLanguage");
    const reference_type = document.getElementById('addReferenceModalHeading');
    const reference_type_value = document.getElementById('refInput');
    if (reference_type.innerHTML == 'Add Language') {
        data = {
            add: true,
            type: 'language',
            type_value: reference_type_value.value
        }
    }

    if (reference_type.innerHTML == 'Add School') {
        data = {
            add: true,
            type: 'school name',
            type_value: reference_type_value.value
        }
    }

    if (reference_type.innerHTML == 'Add Standard') {
        data = {
            add: true,
            type: 'standard',
            type_value: reference_type_value.value
        }
    }

    if (reference_type.innerHTML == 'Add Course') {
        data = {
            add: true,
            type: 'course',
            type_value: reference_type_value.value
        }
    }

    if (reference_type.innerHTML == 'Add Year') {
        data = {
            add: true,
            type: 'year',
            type_value: reference_type_value.value
        }
    }

    if (reference_type.innerHTML == 'Add Difficulty') {
        data = {
            add: true,
            type: 'difficulty',
            type_value: reference_type_value.value
        }
    }

    if (reference_type.innerHTML == 'Add Question Tag') {
        data = {
            add: true,
            type: 'question_tag',
            type_value: reference_type_value.value
        }
    }

    if (reference_type.innerHTML.includes('Edit')) {
        data = {
            add: false,
            predefined_id: selectedRefData.predefined_id,
            type: selectedRefData.type,
            type_value: reference_type_value.value
        }
    } {


        if (reference_type.innerHTML.includes('Sub-Topic')) {
            data = {
                    add: true,
                    type: selectedSubTopicData.type_value,
                    type_value: reference_type_value.value
                }
                // console.log("sub-topic", data)
        } else if (reference_type.innerHTML.includes('Topic')) {
            // console.log(reference_type.innerHTML)
            data = {
                add: true,
                type: selectedCourseData.type_value,
                type_value: reference_type_value.value
            }
        }


    }

    if (validateSubmitRefData(data) == -1) {
        alert(data.type_value + " Already Exists !!");
        // location.reload();
        return -1;
    } else {
        submitAddRefData(data);
    }
}

function validateSubmitRefData(data) {
  //  console.log(data)
    for (var i = 0; i < results.length; i++) {
        if (data.type.toUpperCase() == results[i].type.toUpperCase() && data.type_value.toUpperCase() == results[i].type_value.toUpperCase()) {
            return -1;
        }
    }
    if (data.type.toUpperCase().length < 1 || data.type_value.toUpperCase().length < 1) {
        alert("Input Field is Required")
        location.reload();
    }
    return 1;
}

function submitAddRefData(data) {
    $.ajax({
        type: 'POST',
        url: './referencedata/addReferenceData',
        data: data,
        success: function(response) {
            // console.log(response);
            alert("Operation Successfull")
        //    console.log(response);
            location.reload();

            // courseTableUpdate(response)
            // var dt = $('#Coursereftable').dataTable();
            // console.log(dt);
            // var row = '<tr><td>${response.insertId}</td><td>${response.sentData.type_value}</td><td>xyz</td>';
            // dt.rows.add($(row)).draw();
            // Handle successful response here
        },
        error: function(error) {
         //   console.log(error);
            location.reload();
            // Handle error response here
        }
    });
}


function setAddQuestionReference() {

    const addReferenceModal = new bootstrap.Modal(document.getElementById('addReferenceModal'));

    addReferenceModal.show();

    const questionReferenceTagselect = document.getElementById('questionReferenceTagselect');
    const reference_type = document.getElementById('addReferenceModalHeading');
    const reference_type_value = document.getElementById('refInput');
    reference_type.innerHTML = 'Add ' + questionReferenceTagselect.value
    reference_type_value.value = ''
}

function setAddTopicModal() {

    const addReferenceModal = new bootstrap.Modal(document.getElementById('addReferenceModal'));
    addReferenceModal.show();
    const reference_type = document.getElementById('addReferenceModalHeading');
    const reference_type_value = document.getElementById('refInput');
    reference_type.innerHTML = 'Add Topic Under ' + selectedCourseData.type_value
    reference_type_value.value = ''

}

function setAddsubtopicModal() {

    const addReferenceModal = new bootstrap.Modal(document.getElementById('addReferenceModal'));
    addReferenceModal.show();
    const reference_type = document.getElementById('addReferenceModalHeading');
    const reference_type_value = document.getElementById('refInput');
    // console.log(selectedSubTopicData)
    if (selectedSubTopicData == {}) {
        reference_type.innerHTML = 'Please Select a Topic Before Adding a Sub-Topic'
        reference_type.diabled;
    }
    reference_type.innerHTML = 'Add Sub-Topic Under ' + selectedSubTopicData.type_value
    reference_type_value.value = ''

}


function setAddSchoolReference() {

    const addReferenceModal = new bootstrap.Modal(document.getElementById('addReferenceModal'));

    addReferenceModal.show();

    const questionReferenceTagselect = document.getElementById('questionReferenceTagselect');
    const reference_type = document.getElementById('addReferenceModalHeading');
    const reference_type_value = document.getElementById('refInput');
    reference_type.innerHTML = 'Add School'
    reference_type_value.value = ''
}


function setdeleteRef(id = -1) {
    if (id != -1) {
     //   console.log("setdeleteRef")
            // console.log(results[id]);
        selectedRefData = results[id];
        data = {
                predefined_id: selectedRefData.predefined_id
            }
            // console.log(data);
    }
}

function deleteRef() {
  //  console.log('deleteRef');
    $.ajax({
        type: 'DELETE',
        url: './referencedata/deleteReferenceData',
        data: data,
        success: function(response) {
          //  console.log(response);
            location.reload();
            // Handle successful response here
        },
        error: function(error) {
          //  console.log(error);
            location.reload();
            // Handle error response here
        }
    });
}



function makeClassNone(a) {
    for (var i = 0; i < a.length; i++) {
        a[i].style.display = 'none';
    }
}

function topicSubtopicCard(a, b) {
    //console.log("from topicSubtopicModal");
    selectedCourseData = results[b];
    // console.log(selectedCourseData);
    const topicsTablerowId = document.getElementById('topicsTablerowId');
    const allTablesForTopic = document.getElementsByClassName('allTablesForTopic');
    const dynamictableId = document.getElementById(a);
    makeClassNone(allTablesForTopic);
    $('#subTopicref' + a).DataTable();
    topicsTablerowId.style.display = 'flex';
    dynamictableId.style.display = 'flex';
}

function courseTableUpdate(response) {

    //console.log("courseTableUpdate()");
    const tableBody = document.getElementById('Coursereftable');
    selectedSubTopicData = {
        predefined_id: response.insertId,
        type: response.sentData.type,
        type_value: response.sentData.type_value
    };
    const mytable = $('#Coursereftable').DataTable();
    // $('#OgsubTopicreftable').DataTable({
    //     data: [
    //         { name: 'John', age: 30, gender: 'Male' },
    //         { name: 'Jane', age: 25, gender: 'Female' }
    //     ],
    //     columns: [
    //         { data: '#' },
    //         { data: 'Sub-Topic' },
    //         { data: 'Actions' }
    //     ]
    // });
    var j = 0;
    results.push({
        predefined_id: response.insertId,
        type: response.sentData.type,
        type_value: response.sentData.type_value
    });

    // console.log("hello", results[i].type_value, results[id].type_value);
    const type = response.sentData.type_value
    const row = `<tr>
                            <td>${(response.insertId)}</td>
                            <td>${type}</td>
                            <td> <a href="" onclick="setReferenceDataModal('${response.insertId}')" data-bs-toggle="modal" data-bs-target="#addReferenceModal"><i
                            class="fa fa-edit"></i></a>&nbsp;<a href=""><a href="" onclick="setdeleteRef('${response.insertId}')"
                        data-bs-toggle="modal" data-bs-target="#deleteReferenceModal"><i
                            class="fa fa-trash"></i></a></td>
                        </tr>`;
    tableBody.insertAdjacentHTML('beforeend', row);

}

function setsubtopiccard(id) {
    //console.log("setsubtopiccard()");
    const tableBody = document.getElementById('subtopictablebody');
    selectedSubTopicData = results[id];
    tableBody.innerHTML = '';
    const mytable = $('#OgsubTopicreftable').DataTable();
    mytable.clear();
    mytable.destroy();
    // $('#OgsubTopicreftable').DataTable({
    //     data: [
    //         { name: 'John', age: 30, gender: 'Male' },
    //         { name: 'Jane', age: 25, gender: 'Female' }
    //     ],
    //     columns: [
    //         { data: '#' },
    //         { data: 'Sub-Topic' },
    //         { data: 'Actions' }
    //     ]
    // });
    var j = 0;
    for (let i = 0; i < results.length; i++) {
        if (results[i].type.toUpperCase() == results[id].type_value.toUpperCase()) {

            // console.log("hello", results[i].type_value, results[id].type_value);
            const type = results[i].type_value;
            const row = `<tr>
                            <td>${(++j)}</td>
                            <td>${type}</td>
                            <td> <a href="" onclick="setReferenceDataModal('${i}')" data-bs-toggle="modal" data-bs-target="#addReferenceModal"><i
                            class="fa fa-edit"></i></a>&nbsp;<a href=""><a href="" onclick="setdeleteRef('${i}')"
                        data-bs-toggle="modal" data-bs-target="#deleteReferenceModal"><i
                            class="fa fa-trash"></i></a></td>
                        </tr>`;
            tableBody.insertAdjacentHTML('beforeend', row);
        }
    }
    $('#OgsubTopicreftable').DataTable();
}


$(document).ready(function() {
    $("#preferedLanguagesTable").DataTable({
        dom: "Bftip",
        //    dom: '<"top">rt<"bottom"flp><"clear">',

        buttons: [{
            text: "Add",
            action: function(e, dt, node, config) {},
        }, {
            text: "Remove All",
            action: function(e, dt, node, config) {},
        }, ],
        order: [
            [0, "asc"]
        ],
    });
});

$(document).ready(function() {
    $("#schoolreftable").DataTable({
        dom: "<f<t>ip>",
        order: [
            [0, "asc"]
        ],
        buttons: [{
            text: "Add",
            action: function(e, dt, node, config) {},
        }, {
            text: "Remove All",
            action: function(e, dt, node, config) {},
        }, ],
    });
});

$(document).ready(function() {
    $("#Standardreftable").DataTable({
        dom: "<f<t>ip>",
        order: [
            [0, "desc"]
        ],
        buttons: [{
            text: "Add",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, {
            text: "Remove All",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, ],
    });
});


$(document).ready(function() {
    $("#Yearreftable").DataTable({
        dom: "<f<t>ip>",
        order: [
            [0, "asc"]
        ],
        buttons: [{
            text: "Add",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, {
            text: "Remove All",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, ],
    });
});

$(document).ready(function() {
    $("#Difficultyreftable").DataTable({
        dom: "<f<t>ip>",
        order: [
            [0, "asc"]
        ],
        buttons: [{
            text: "Add",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, {
            text: "Remove All",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, ],
    });
});


$(document).ready(function() {
    $("#QuestionTagreftable").DataTable({
        dom: "<f<t>ip>",
        order: [
            [0, "asc"]
        ],
        buttons: [{
            text: "Add",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, {
            text: "Remove All",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, ],
    });
});

$(document).ready(function() {
    $("#Coursereftable").DataTable({
        dom: "<f<t>ip>",
        order: [
            [0, "asc"]
        ],
        buttons: [{
            text: "Add",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, {
            text: "Remove All",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, ],
    });
});

$(document).ready(function() {
    $("#topicSubTopicreftable").DataTable({
        dom: "<f<t>ip>",
        order: [
            [0, "asc"]
        ],
        buttons: [{
            text: "Add",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, {
            text: "Remove All",
            action: function(e, dt, node, config) {
                alert("Button activated");
            },
        }, ],
    });
});










//     function format(d) {
//     // `d` is the original data object for the row
//     return (
//         '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
//         '<tr>' +
//         '<td>Full name:</td>' +
//         '<td>' +
//         d.name +
//         '</td>' +
//         '</tr>' +
//         '<tr>' +
//         '<td>Extension number:</td>' +
//         '<td>' +
//         d.extn +
//         '</td>' +
//         '</tr>' +
//         '<tr>' +
//         '<td>Extra info:</td>' +
//         '<td>And any further details here (images etc)...</td>' +
//         '</tr>' +
//         '</table>'
//     );
// }

// $(document).ready(function () {
//     var table = $('#questiontable').DataTable({
//       order: [[1, 'dsc']],
//       columns: [
//             {
//                 className: 'dt-control',
//                 orderable: false,
//                 data: null,
//                 defaultContent: '',
//             },
//             { data: 'Tag' },
//         ],
//     });

//     // Add event listener for opening and closing details
//     $('#example tbody').on('click', 'td.dt-control', function () {
//         var tr = $(this).closest('tr');
//         var row = table.row(tr);

//         if (row.child.isShown()) {
//             // This row is already open - close it
//             row.child.hide();
//             tr.removeClass('shown');
//         } else {
//             // Open this row
//             row.child(format(row.data())).show();
//             tr.addClass('shown');
//         }
//     });
// });