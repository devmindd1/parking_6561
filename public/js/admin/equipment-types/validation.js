addEventListener('DOMContentLoaded', () => {
    $('form').validate({
        rules: {
            title: {
                required: true
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element){
            element.closest('.form-group').find('span.invalid-feedback').remove();
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        }
    });
});