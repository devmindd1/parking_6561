addEventListener('DOMContentLoaded', () => {
    $.validator.addMethod("alpha", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
    });

    $.validator.addMethod("isEmail", function(value, element) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(value);
    });

    $('form').validate({
        rules: {
            address: {
                required: true
            },
            runway_type_id: {
                required: true,
                number: true
            },
            manager_name: {
                required: true,
                alpha: true
            },
            phone_number: {
                number: true
            },
            spaces_count: {
                required: true,
                number: true
            },
            primary_email: {
                required: true,
                isEmail: true
            }
        },
        messages: {
            runway_type_id: "Please select runway",
            manager_name: {
                alpha: 'Please Write alpha only'
            },
            primary_email: {
                isEmail: 'Please Write Valid Email'
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