addEventListener('DOMContentLoaded', () => {
    $.validator.addMethod("alpha", function(value, element) {
        return this.optional(element) || value == value.match(/^[a-zA-Z\s]+$/);
    });

    $.validator.addMethod("isEmail", function(value, element) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(value);
    });

    $.validator.addMethod("notEmptyValue", function(value, element) {
        return !!value;
    });

    $.validator.addMethod("airfieldImages", function(value, element) {
        const imageIndexes = value.split(',');

        return imageIndexes[0] !== '';
    });

    $.validator.addMethod("maxIsSpacesCount", function(value, element) {
        const imageIndexes = value.split(',');

        return imageIndexes[0] !== '';
    });

    // $.validator.addMethod("frPhoneNumber", function(value, element) {
    //     return /^(?:(?:|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi.test(value);
    // });

    $('form').validate({
        ignore: "",
        rules: {
            'stripe[first_name]': {
                required: true
            },
            'stripe[last_name]': {
                required: true
            },
            'stripe[email]': {
                required: true,
                isEmail: true
            },
            'stripe[account_name]': {
                required: true
            },
            'stripe[gender]': {
                required: true
            },
            'stripe[date_of_birth]': {
                required: true
            },
            'stripe[country_code]': {
                required: true
            },
            'stripe[city]': {
                required: true
            },
            'stripe[phone]': {
                required: true,
                // frPhoneNumber: true
            },
            'stripe[postal_code]': {
                required: true
            },
            address: {
                required: true
            },
            runway_type_ids: {
                required: true
            },
            save_airfield_photo_ids: {
                required: true,
            },
            manager_name: {
                required: true,
                alpha: true
            },
            phone_number: {
                required: true,
                number: true
            },
            spaces_count: {
                required: true,
                number: true,
                min: 0
            },
            hangar_count: {
                required: true,
                number: true,
                min: 0
            },
            parking_count: {
                required: true,
                number: true,
                min: 0
            },
            primary_email: {
                required: true,
                isEmail: true
            },
            oaci_type_id: {
                notEmptyValue: true
            },
            license_id: {
                required: true
            },
            expiration_date: {
                required: true
            },
            issuing_state: {
                required: true
            }
        },
        messages: {
            oaci_type_id: {
                notEmptyValue: 'OACI is required'
            },
            manager_name: {
                alpha: 'Please Write alpha only'
            },
            primary_email: {
                isEmail: 'Please Write Valid Email'
            },
            'stripe[email]': {
                isEmail: 'Please Write Valid Email'
            },
            save_airfield_photo_ids: {
                required: 'Please attache photo'
            }
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');


            if ($(element).hasClass("select2-hidden-accessible")) {
                $("#select2-" + $(element).attr("id") + "-container").parent().addClass('form-control is-invalid');
            } else {
                $(element).addClass('form-control is-invalid');
            }


            // if($(element).closest('.form-group').find('.select2-selection__rendered').length){
            //     $(element).closest('.form-group').find('.select2-selection__rendered').addClass('form-control is-invalid')
            // }

            console.log();

            if($(element).closest('.modal').length)
                $('[data-target="#' + $(element).closest('.modal').attr('id') + '"]').closest('.card-default').css('border', '1px solid red');

        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');

            if($(element).closest('.modal').length && !$(element).closest('.modal').find('.is-invalid').length)
                $('[data-target="#' + $(element).closest('.modal').attr('id') + '"]').closest('.card-default').css('border', '');

        },
    });
});