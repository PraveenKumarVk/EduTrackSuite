//exporte les données sélectionnées
var $table = $('#table');
    $(function () {
        $('#toolbar').find('select').change(function () {
          $table.bootstrapTable('refreshOptions', {
                exportDataType: $(this).val()
            });
        });
    })

		var trBoldBlue = $("table");


	$(trBoldBlue).on("click", "tr", function (){
			$(this).toggleClass("bold-blue");
	});


  $(function() {
    var data = [
      {
          'testname':'Test 1',
          'topic':'NUMBERS, OPERATIONS AND PROPERTIES',
          'chapter':'Order of Operations',
          'date': '1-Jan-23',
          'score':'20'

      },
      {
'testname':'Test 2',
'topic':'NUMBERS, OPERATIONS AND PROPERTIES',
'chapter':'Evaluating Expressions',
'date':'2-Jan-23',
'score':'50'
},
{
'testname':'Test 3',
'topic':'NUMBERS, OPERATIONS AND PROPERTIES',
'chapter':'Comparing Reals',
'date':'21-Jan-23',
'score':'60'
},
{
'testname':'Test 4',
'topic':'EXPRESSIONS AND EQUATIONS',
'chapter':'Solving Linear Equations',
'date':'12-Jan-23',
'score':'70'
},
{
'testname':'Test 5',
'topic':'RATE',
'chapter':'Error',
'date':'5-Jan-23',
'score':'50'
},
{
'testname':'Test 6',
'topic':'RATE',
'chapter':'Conversions',
'date':'9-Jan-23',
'score':'90'
},
{
'testname':'Test 7',
'topic':'RATE',
'chapter':'Using Rate',
'date':'14-Jan-23',
'score':'10'
},
{
'testname':'Test 8',
'topic':'INEQUALITIES',
'chapter':'Solving Linear Inequalities',
'date':'8-Jan-23',
'score':'55'
},
{
'testname':'Test 9',
'topic':'INEQUALITIES',
'chapter':'Interpreting Solutions',
'date':'22-Jan-23',
'score':'68'
},
{
'testname':'Test 10',
'topic':'QUADRATICS',
'chapter':'Using the Discriminant',
'date':'27-Jan-23',
'score':'95'
},
{
'testname':'Test 11',
'topic':'QUADRATICS',
'chapter':'Modeling Quadratics',
'date':'20-Jan-23',
'score':'32'
},
{
'testname':'Test 12',
'topic':'POWERS',
'chapter':'Powers of Powers',
'date':'5-Jan-23',
'score':'59'
},
{
'testname':'Test 13',
'topic':'POWERS',
'chapter':'Scientific Notation',
'date':'28-Jan-23',
'score':'74'
},
{
'testname':'Test 14',
'topic':'RADICALS',
'chapter':'Operations with Radicals',
'date':'6-Jan-23',
'score':'56'
},
{
'testname':'Test 15',
'topic':'FUNCTIONS',
'chapter':'Families of Functions',
'date':'3-Jan-23',
'score':'100'
},
{
'testname':'Test 16',
'topic':'FUNCTIONS',
'chapter':'Relating Graphs to Events',
'date':'7-Jan-23',
'score':'69'
},
{
'testname':'Test 17',
'topic':'FUNCTIONS',
'chapter':'Graphing Absolute Value Functions',
'date':'2-Jan-23',
'score':'23'
}

    ]
    $table.bootstrapTable({data: data})
  })



var $table = $('#table');

  $(document).ready(function () {
    $('.btn-filter').on('click', function () {
        var $target = $(this).data('target');
        if ($target != 'all') {
            $('.table tbody tr').css('display', 'none');
            $('.table tr[data-status="' + $target + '"]').fadeIn('slow');
        } else {
            $('.table tbody tr').css('display', 'none').fadeIn('slow');
        }
    });

   });