
// //color picker
// $(document).ready(function () {
//     $('#avatarBgColor').on('input', function () {
//         $('#avatar').css('background-color', $(this).val());
//     });

//     $('#avatarTextColor').on('input', function () {
//         $('#avatar').css('color', $(this).val());
//     });
// });


//form edit
const form = document.querySelector('#myForm');
const editBtn = document.querySelector('#edit');
const saveBtn = document.querySelector('#save');

editBtn.addEventListener('click', () => {
    form.querySelectorAll('select').forEach(select => select.removeAttribute('disabled'));
    editBtn.classList.add('d-none');
    saveBtn.classList.remove('d-none');
});

// form.addEventListener('submit', (e) => {
//     //e.preventDefault();

//     if (!form.checkValidity()) {
//         form.classList.add('was-validated')
//         return;
//     }

    form.querySelectorAll('select').forEach(select => select.setAttribute('disabled', true));
    saveBtn.classList.add('d-none');
    editBtn.classList.remove('d-none');

//     // Reset Validation
//     form.classList.remove('was-validated')
// });
