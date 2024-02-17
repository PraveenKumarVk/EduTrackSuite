  $(document).ready(function () {
    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('#assignedtable tbody tr').css('display', 'none');
            $('#assignedtable tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('#assignedtable tbody tr').css('display', 'none').fadeIn('slow');
        }
    });

   });
   