const own_review = localStorage.getItem('own_review');
console.log(own_review);
if(own_review) {
    $('#review_icon').html('create');
    $('.tooltipped').attr('data-tooltip', 'Edit review');
    $('textarea#textarea2').html(own_review);
    M.updateTextFields();
} else {
    $('#review_icon').html('add');
    $('.tooltipped').attr('data-tooltip', 'Write review');
}
$('#submit_btn').click(function() {
    if(own_review) 
        $.getScript("static/scripts/updatereview.js");
    else 
        $.getScript("static/scripts/submitreview.js"); 
});
$('textarea#textarea2').on('input', function() {
    const length = $(this).val().length;
    if(length > 500) $('#submit_btn').addClass('disabled');
    else $('#submit_btn').removeClass('disabled');
});