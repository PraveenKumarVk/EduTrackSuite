function temp() {
   // console.log("hello");
}

function gettransilation(data) {

   // console.log('gettransilation');
    const url = './editQuestion?questionId=' + data;
    $.get(url, function(data) {

   //     console.log('gettransilation');
        $('#editQuestionModalBody').html(data);

        document.querySelectorAll('select').forEach(function(input) {
            input.disabled = true;
        });



        
        // const editQuestionModalBody =document.getElementById('editQuestionModalBody');
        // editQuestionModalBody.innerHTML = data;  
    });
}

function approveQuestion() {

  //  console.log('approveQuestion');

    var question_id = document.getElementById('mappedQuestion_id').value;

    $.ajax({
        type: 'POST',
        url: './questionsRequests/approve',
        data: { question_id: question_id },
        success: function(response) {
            //console.log(response);
            alert("Question Approved Successfully")
            location.reload();
        },
        error: function(error) {
           // console.log(error);
            location.reload();
            // Handle error response here
        }
    });

}

function rejectQuestion() {

    // console.log('rejectQuestion');

    var question_id = document.getElementById('mappedQuestion_id').value;

    $.ajax({
        type: 'POST',
        url: './questionsRequests/reject',
        data: { question_id: question_id },
        success: function(response) {
            //console.log(response);
            alert("Question Rejected Successfully")
            location.reload();
        },
        error: function(error) {
           // console.log(error);
            location.reload();
            // Handle error response here
        }
    });

}