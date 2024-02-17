var selectedTeacherRequest = {}

function setDropDownDataTeacher(id = -1) {
   // console.log("setDropDownDataTeacher")
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');
    const languageSelect = document.getElementById('language');
    schoolSelect.innerHTML = '<option disabled selected hidden>Choose...</option>';
    const heading = document.getElementById('addteacherModalHeading');


    if (id != -1) {
        heading.innerHTML = 'Edit Request';
        const user = results[id];
        selectedTeacherRequest = results[id]
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

    }
    // else {
    //     heading.innerHTML = 'Add Teacher';
    //     username.value = '';
    //     useremail.value = '';

    //     // Populate school select options
    //     for (let i = 0; i < refResults.length; i++) {
    //         const refResult = refResults[i];
    //         if (refResult.type === 'school name') {
    //             const option = document.createElement('option');
    //             option.text = refResult.type_value;
    //             schoolSelect.add(option);
    //         }
    //     }

    // }
    document.querySelectorAll('input').forEach(function(input) {
        input.disabled = true;
    });
    document.querySelectorAll('select').forEach(function(input) {
        input.disabled = true;
    });
}

function rejectTeacherRequest() {

    // console.log("rejectTeacherRequest");
    var user = selectedTeacherRequest
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');
    const languageSelect = document.getElementById('language');
    data = {
            user_id: user.user_id,
            username: username.value,
            useremail: useremail.value,
            schoolSelect: schoolSelect.value,
            user_role: user.user_role,
            languageSelect: languageSelect.value,
        }
        // console.log(data);

    $.ajax({
        type: 'PUT',
        url: './teacherRequests/reject',
        data: data,
        success: function(response) {
            // console.log(response);

            location.reload();
            // Handle successful response here
        },
        error: function(error) {
            // console.log(error);
            // Handle error response here
        }
    });

}


function approveTeacherRequest() {

    // console.log("rejectTeacherRequest");
    var user = selectedTeacherRequest
    const username = document.getElementById('username');
    const useremail = document.getElementById('useremail');
    const schoolSelect = document.getElementById('school');
    const languageSelect = document.getElementById('language');
    data = {
            user_id: user.user_id,
            username: username.value,
            useremail: useremail.value,
            schoolSelect: schoolSelect.value,
            user_role: user.user_role,
            languageSelect: languageSelect.value,
        }
        // console.log(data);

    $.ajax({
        type: 'PUT',
        url: './teacherRequests/approve',
        data: data,
        success: function(response) {
            // console.log(response);

            location.reload();
            // Handle successful response here
        },
        error: function(error) {
            // console.log(error);
            // Handle error response here
        }
    });

}