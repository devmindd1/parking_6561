addEventListener('DOMContentLoaded', () => {
    $.validator.addMethod("alpha", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
    });

    $('form').validate({
        rules: {
            oaci_code: {
                required: true
            },
            airfield_name: {
                required: true
            },
            city: {
                required: true,
                alpha: true
            },
            runways_count: {
                number: true
            }
        },
        messages: {
            city: {
                alpha: 'Please Write alpha only'
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
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