var deleteStudentData = {};
var userList;

$.ajax({
    type: 'GET',
    url: './getAllStudents',
    success: function(response) {
        // console.log(response);
        userList = response
            // Handle successful response here
    },
    error: function(error) {
        // console.log(error);
        // Handle error response here
    }
});

function setDropdownData(id = -1) {

    const user_id = document.getElementById('selectedid');
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');

    const heading = document.getElementById('addstudentModalHeading');

    const languageSelect = document.getElementById('language');
    schoolSelect.innerHTML = '<option disabled selected hidden>Choose...</option>';
    languageSelect.innerHTML = '<option disabled selected hidden>Choose...</option>';


    if (id != -1) {
        heading.innerHTML = 'Edit Student';
        const user = results[id];
        // Set username input value
        username.value = user.user_name;
        useremail.value = user.user_email;
        user_id.value = id

        // Populate school select options
        for (let i = 0; i < refResults.length; i++) {
            const refResult = refResults[i];
            if (refResult.type == 'school name') {
                // console.log(refResult)
                const option = document.createElement('option');
                option.text = refResult.type_value;
                // console.log(refResult.type_value, user.school_name);
                if (refResult.type_value.toUpperCase() === user.school_name.toUpperCase()) {
                    option.selected = true;
                }
                schoolSelect.add(option);
            }
        }

        // Populate language select options
        for (let i = 0; i < refResults.length; i++) {
            const refResult = refResults[i];
            if (refResult.type == 'language') {
                const option = document.createElement('option');
                option.text = refResult.type_value;
                if (refResult.type_value === user.preferred_language) {
                    option.selected = true;
                }
                languageSelect.add(option);
            }
        }
    } else {
        heading.innerHTML = 'Add New Student';
        username.value = '';
        useremail.value = '';

        // Populate school select options
        for (let i = 0; i < refResults.length; i++) {
            const refResult = refResults[i];
            if (refResult.type === 'school name') {
                const option = document.createElement('option');
                option.text = refResult.type_value;
                schoolSelect.add(option);
            }
        }

        // Populate language select options
        for (let i = 0; i < refResults.length; i++) {
            const refResult = refResults[i];
            if (refResult.type == 'language') {
                const option = document.createElement('option');
                option.text = refResult.type_value;
                languageSelect.add(option);
            }
        }

    }
}

function add_edit(id = -1) {
    const heading = document.getElementById('addstudentModalHeading');
    if (heading.innerHTML == 'Edit Student') {
        // console.log("edit");
        editStudent();
    } else {
        // console.log("add");
        addStudent();
    }
}

function editStudent() {
    const user_id = document.getElementById('selectedid');
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');
    const heading = document.getElementById('addstudentModalHeading');
    const languageSelect = document.getElementById('language');
    // console.log(results[user_id.value]);
    user = results[user_id.value];
    data = {
        user_id: user.user_id,
        username: username.value,
        useremail: useremail.value,
        schoolSelect: schoolSelect.value,
        user_role: 'student',
        languageSelect: languageSelect.value,
    }

    if (validateStudentData(data, user) == -1) {
        return -1;
    }

    // console.log(data);

    $.ajax({
        type: 'POST',
        url: './student/updateStudent',
        data: data,
        success: function(response) {
            // console.log(response);
            alert("Operation Successfull")
            location.reload();
            // Handle successful response here
        },
        error: function(error) {
            // console.log(error);
            alert("Operation Failed");
            location.reload();
            // Handle error response here
        }
    });

}

function isValidEmail(email) {
    // console.log("3456789");
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validateStudentData(data, user = -1) {
    // console.log("3456789")
    if (!isValidEmail(data.useremail)) {
        alert("Not a Valid Email :" + data.useremail)
        return -1
    }

    if (data.username.length < 1 || data.useremail.length < 1 || data.schoolSelect.length < 1 || data.languageSelect.length < 1) {
        alert("All Input Fields Are Required")
        return -1;
    }

    for (var i = 0; i < userList.length; i++) {
        if (userList[i].user_email.toUpperCase() == data.useremail.toUpperCase() || userList[i].user_name.toUpperCase() == data.username.toUpperCase()) {
            if (userList[i].user_role.toUpperCase() == 'teacher'.toUpperCase()) {
                alert("User Email or Username Already Exists as Teacher, Try with Different Email");
                if (userList[i].deleted == '1') {
                    alert("User Already Exists as Teacher But, is Soft Deleted, Try Adding in Teacher Tab");
                    return -1
                }
                return -1;
            }
        }
    }

    if (user != 1) {
        for (var i = 0; i < results.length; i++) {
            if (results[i].user_email == data.useremail || results[i].user_name == data.username) {
                if (user.user_email == data.useremail || user.user_name == data.username) {

                } else {
                    alert("Email or UserName Exists, Try With a New Email");
                    return -1;
                }
            }
        }
    } else {

        for (var i = 0; i < results.length; i++) {
            if (results[i].user_email == data.useremail || results[i].user_name == data.username) {
                alert("Email or UserName Exists, Try With a New Email");
                return -1;
            }
        }
    }

    return 1;
}

function addStudent() {
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');
    const languageSelect = document.getElementById('language');
    data = {
        username: username.value,
        useremail: useremail.value,
        schoolSelect: schoolSelect.value,
        user_role: 'student',
        languageSelect: languageSelect.value,

    }

    if (validateStudentData(data) == -1) {
        return -1;
    }



    $.ajax({
        type: 'POST',
        url: './student/addStudent',
        data: data,
        success: function(response) {
            alert("Operation Sucessfull");
            location.reload();
            // Handle successful response here
        },
        error: function(error) {
            alert("Add Student Operation Failed")
            // console.log(error);
            location.reload();
        }
    });


}

function setdeleteStudent(id = -1) {
    if (id != -1) {
        // console.log("deleteStudent()")

        // console.log(results[id]);
        user = results[id];
        data = {
            user_id: user.user_id,
            username: user.user_name,
            useremail: user.user_email,
            user_role: user.user_role
        }
        deleteStudentData = data
            // console.log(deleteStudentData);

        // $.ajax({
        //     type: 'DELETE',
        //     url: './student/deleteStudent',
        //     data: data,
        //     success: function(response) {
        //         console.log(response);
        //         // Handle successful response here
        //     },
        //     error: function(error) {
        //         console.log(error);
        //         // Handle error response here
        //     }
        // });

    }
}

function deleteStudent(id = -1) {
    // console.log(deleteStudentData)
    var data;
    if (id != -1) {
        // console.log("deleteStudent()")
        user = results[id];
        data = {
            user_id: user.user_id,
            username: user.user_name,
            useremail: user.user_email,
            user_role: user.user_role
        }
    }

    if (confirm("You will Delete :\n" + data.username + "  " + data.useremail)) {
        $.ajax({
            type: 'DELETE',
            url: './student/deleteStudent',
            data: data,
            success: function(response) {
                // console.log(response);
                alert("Operation Sucessfull");
                location.reload();
                // Handle successful response here
            },
            error: function(error) {
                // console.log(error);
                alert("Delete Student Operation Failed");
                location.reload();
                // Handle error response here
            }
        });
    } else {
        alert("Operation Denied");
    }

}


// $(document).ready(function() {
//     $("#radioUnaffiliatedStudentsId").click(function() {
//         $.get("./getUnaffiliatedStudents", function(data) {
//             // console.log(data)
//             var tbody = document.querySelector('tbody');
//             var newResults = data

//             // Clear the existing contents of the tbody
//             tbody.innerHTML = ''; // Loop through the new data and append it to the tbody
//             for (var i = 0; i < newResults.length; i++) {
//                 var tr = document.createElement('tr');
//                 tr.innerHTML = '<td>' + (i + 1) + '</td>' +
//                     '<td>' + newResults[i].user_name + '</td>' +
//                     '<td>' + newResults[i].user_email + '</td>' +
//                     '<td>' + newResults[i].school_name + '</td>' +
//                     '<td>' + newResults[i].preferred_language + '</td>' +
//                     `<td><span data-bs-toggle="modal" data-bs-target="#assignAssignment"
// style="font-size:30px;cursor:pointer" onclick="openNav()">
// <img src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png"
//     class="center" alt="Icon" width="24" height="24"></span>
// </td>                                                        <td><span data-bs-toggle="modal" data-bs-target="#viewTaskStudent"
// style="font-size:30px;cursor:pointer"
// onclick="openNav()"><img
//     src="https://cdn-icons-png.flaticon.com/128/8347/8347446.png"
//     class="center" alt="Icon" width="24" height="24"></span>
// </td>                                        <td><span data-bs-toggle="modal" data-bs-target="#analytics"
// style="font-size:30px;cursor:pointer"
// onclick="openanalytics()"><img
//     src="https://cdn-icons-png.flaticon.com/512/1548/1548914.png"
//     class="center" data-toggle="modal"
//     data-target="#assigntaskmodel" alt="Icon" width="24"
//     height="24"></span></td>
// <td style="text-align: center;"><a href="" data-bs-toggle="modal"
// data-bs-target="#editstudentModal">
// <i class="fa fa-edit"></i></a> &nbsp;
// <a href="" data-bs-toggle="modal"
// data-bs-target="#deletestudentModal">
// <i class="fa fa-trash" aria-hidden="true"></i></a>&nbsp;
//                     </td>`
//                 tbody.appendChild(tr);
//             }
//         });
//     });
// });

$(document).ready(function() {
    $("#radioAllStudents").click(function() {
        $.get("./getAllstudent", function(data) {
            // console.log("from js", data);
            var tbody = document.getElementById('tbody-AllStudents');
            var newResults = data

            // Clear the existing contents of the tbody
            tbody.innerHTML = '';
            // Loop through the new data and append it to the tbody
            for (var i = 0; i < newResults.length; i++) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<td>' + (i + 1) + '</td>' +
                    '<td>' + newResults[i].user_email + '</td>' +
                    '<td>' + newResults[i].school_name + '</td>' +
                    '<td>' + newResults[i].preferred_language + '</td>' +
                    `<td><span data-bs-toggle="modal" data-bs-target="#assignAssignment"
style="font-size:30px;cursor:pointer" onclick="openNav()">
<img src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png"
    class="center" alt="Icon" width="24" height="24"></span>
</td>                                                        <td><span data-bs-toggle="modal" data-bs-target="#viewTaskStudent"
style="font-size:30px;cursor:pointer"
onclick="openNav()"><img
    src="https://cdn-icons-png.flaticon.com/128/8347/8347446.png"
    class="center" alt="Icon" width="24" height="24"></span>
</td>                                        <td><span data-bs-toggle="modal" data-bs-target="#analytics"
style="font-size:30px;cursor:pointer"
onclick="openanalytics()"><img
    src="https://cdn-icons-png.flaticon.com/512/1548/1548914.png"
    class="center" data-toggle="modal"
    data-target="#assigntaskmodel" alt="Icon" width="24"
    height="24"></span></td>
<td style="text-align: center;"><a href="" data-bs-toggle="modal"
data-bs-target="#editstudentModal">
<i class="fa fa-edit"></i></a> &nbsp;
<a href="" data-bs-toggle="modal"
data-bs-target="#deletestudentModal">
<i class="fa fa-trash" aria-hidden="true"></i></a>&nbsp;
                    </td>`


                tbody.appendChild(tr);
            }
        });
    });
});


$(document).ready(function() {
    $("#radioUnaffiliatedStudentsId").click(function() {
        $.get("./getUnaffiliatedStudents", function(data) {
            // console.log(data)
            var tbody = document.querySelector('tbody');
            var newResults = data

            // Clear the existing contents of the tbody
            tbody.innerHTML = ''; // Loop through the new data and append it to the tbody
            for (var i = 0; i < newResults.length; i++) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<td>' + (i + 1) + '</td>' +
                    '<td>' + newResults[i].user_name + '</td>' +
                    '<td>' + newResults[i].user_email + '</td>' +
                    '<td>' + newResults[i].school_name + '</td>' +
                    '<td>' + newResults[i].preferred_language + '</td>' +
                    `<td><a href="/admin/student/assigntask?user_name=` + newResults[i].user_name + '&user_id=' + newResults[i].user_id + '"><img src="https://cdn-icons-png.flaticon.com/512/2098/2098402.png" class="center" data-toggle="modal" data-target="#assigntaskmodel" alt="Assign Task" width="24" height="24"></a></td>' +
                    `<td><a href="/admin/student/viewtask1?user_name=` + newResults[i].user_name + '&student_id=' + newResults[i].user_id + '"><img src="https://cdn-icons-png.flaticon.com/128/8347/8347446.png" class="center" data-toggle="modal" data-target="#viewtasktaskmodel" alt="Assign Task" width="24" height="24"></a></td>' +
                    `<td><span data-bs-toggle="modal" data-bs-target="#analytics" style="font-size:30px;cursor:pointer" onclick="openanalytics()"><img src="https://cdn-icons-png.flaticon.com/512/1548/1548914.png" class="center" data-toggle="modal" data-target="#assigntaskmodel" alt="Icon" width="24" height="24"></span></td>
<td style="text-align: center;"><a href="" data-bs-toggle="modal"
data-bs-target="#editstudentModal">
<i class="fa fa-edit"></i></a> &nbsp;
<a href="" data-bs-toggle="modal"
data-bs-target="#deletestudentModal">
<i class="fa fa-trash" aria-hidden="true"></i></a>&nbsp;
                    </td>`
                tbody.appendChild(tr);
            }
        });
    });
});