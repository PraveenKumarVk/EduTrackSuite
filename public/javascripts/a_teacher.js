var selectedUserData = {}
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

function isValidEmail(email) {
    // console.log("3456789");
    const emailRegex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (emailRegex.test(email)) {
        return true;
    } else {
        return false;
    }
}

function setDropDownDataTeacher(id = -1) {
    // console.log(id)
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');
    const languageSelect = document.getElementById('language');
    schoolSelect.innerHTML = '<option disabled selected hidden>Choose...</option>';
    const heading = document.getElementById('addteacherModalHeading');


    if (id != -1) {
        heading.innerHTML = 'Edit Teacher';
        const user = results[id];
        selectedUserData = results[id];
        // Set username input value
        username.value = user.user_name;
        useremail.value = user.user_email;

        // Populate school select options
        for (let i = 0; i < refResults.length; i++) {
            const refResult = refResults[i];
            if (refResult.type === 'school name') {
                const option = document.createElement('option');
                option.text = refResult.type_value;
                if (refResult.type_value === user.school_name) {
                    option.selected = true;
                }
                schoolSelect.add(option);
            }
        }
        // console.log("hi", user)
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
        heading.innerHTML = 'Add Teacher';
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

    }
}

function add_edit(id = -1) {
    const heading = document.getElementById('addteacherModalHeading');
    if (heading.innerHTML == 'Edit Teacher') {
        // console.log("edit");
        editTeacher();
    } else {
        // console.log("add");
        addTeacher();
    }
}

function validateTeacherData(data, user = -1) {
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
            if (userList[i].user_role.toUpperCase() == 'student'.toUpperCase()) {
                alert("User Email or Username Already Exists as student, Try with Different Email");
                if (userList[i].deleted == '1') {
                    alert("User Already Exists as Student But, is Soft Deleted, Try Adding in Student Tab");
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

function editTeacher() {
    // console.log("editTeacher")
    const user = selectedUserData;
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');
    const languageSelect = document.getElementById('language');
    // console.log(user);
    data = {
        user_id: user.user_id,
        username: username.value,
        useremail: useremail.value,
        schoolSelect: schoolSelect.value,
        user_role: user.user_role,
        languageSelect: languageSelect.value,
    }
    // console.log(data);

    if (validateTeacherData(data, user) == -1) {
        return -1;
    }

    $.ajax({
        type: 'PUT',
        url: './teacher/updateTeacher',
        data: data,
        success: function(response) {
            // console.log(response);
            alert("Opertaion Successfull")
            location.reload();
            // Handle successful response here
        },
        error: function(error) {
            // console.log(error);
            location.reload();
            // Handle error response here
        }
    });
}

function addTeacher() {

    // console.log("hi")
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');
    const languageSelect = document.getElementById('language');
    data = {
        username: username.value,
        useremail: useremail.value,
        schoolSelect: schoolSelect.value,
        user_role: 'teacher',
        languageSelect: languageSelect.value,

    }

    if (validateTeacherData(data) == -1) {
        return -1;
    }

    $.ajax({
        type: 'POST',
        url: './teacher/addTeacher',
        data: data,
        success: function(response) {
            // console.log(response);
            alert("Operation Successfull")
            location.reload();
            // Handle successful response here
        },
        error: function(error) {
            // console.log(error);
            location.reload();
            // Handle error response here
        }
    });


}

function makeTeacherAsAdmin(id) {
    // console.log(selectedUserData)
    if (confirm(results[id].user_email + " will be added as Admin !!")) {

        $.ajax({
            type: 'POST',
            url: './teacher/makeTeacherAsAdmin',
            data: results[id],
            success: function(response) {
                alert(results[id].user_name + "Is Changed to 'Admin'")
                location.reload();
                // Handle successful response here
            },
            error: function(error) {
                // console.log(error);
                location.reload();
                // Handle error response here
            }
        });

    } else {
        alert("Operation Denied")
        location.reload();
    }
}

//using this to delete techer just to keep this function to have a bootstrap modal
function setdeleteTeacher(id = -1) {
    if (id != -1) {
        // console.log("deleteStudent")

        // console.log(results[id]);
        var user = results[id];
        data = {
            user_id: user.user_id,
            username: user.user_name,
            useremail: user.user_email,
            user_role: user.user_role
        }
        selectedUserData = data
            // console.log(selectedUserData);

        $.ajax({
            type: 'DELETE',
            url: './teacher/deleteTeacher',
            data: data,
            success: function(response) {
                // console.log(response);
                alert("Operation Successfull")
                location.reload();
                // Handle successful response here
            },
            error: function(error) {
                // console.log(error);
                location.reload();
                // Handle error response here
            }
        });

    }
}

// function deleteTeacher() {
//     // console.log(selectedUserData)
//     $.ajax({
//         type: 'DELETE',
//         url: './teacher/deleteTeacher',
//         data: selectedUserData,
//         success: function(response) {
//             // console.log(response);
//             location.reload();
//             // Handle successful response here
//         },
//         error: function(error) {
//             // console.log(error);
//             // Handle error response here
//         }
//     });
// }