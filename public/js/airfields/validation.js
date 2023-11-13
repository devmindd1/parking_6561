addEventListener('DOMContentLoaded', () => {
    const $form = $("form");
    const $weight_types_hangar = $('#weight_types_hangar');
    const $weight_types_parking = $('#weight_types_parking');
    const $weight_types_hangar_inputs = $weight_types_hangar.find('input').toArray();
    const $weight_types_parking_inputs = $weight_types_parking.find('input').toArray();

    $.validator.addMethod("alpha", function(value, element){
        return value.match(/^[a-zA-Z\s]+$/);
    });

    $.validator.addMethod("isEmail", function(value, element) {
        return value.match(/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/);
    });

    $.validator.addMethod("notEmptyValue", function(value, element) {
        return !!value;
    });

    $.validator.addMethod("airfieldImages", function(value, element) {
        return value.split(',')[0] !== '';
    });

    $.validator.addMethod("requireFromParkingInput", function(value, element) {
        const parkingCount = parseInt($('[name="parking_count"]').val());

        return !value ? (isNaN(parkingCount) || parkingCount <= 0): true;
    });

    $.validator.addMethod("requireFromHangarInput", function(value, element) {
        const hangarsCount = parseInt($('[name="hangar_count"]').val());

        return !value ? (isNaN(hangarsCount) || hangarsCount <= 0): true;
    });

    $.validator.addMethod("equalToParkingPlusHangar", function(value, element) {
        return parseInt(value) === parseInt($('[name="parking_count"]').val()) + parseInt($('[name="hangar_count"]').val());
    });

    $(document).on('keyup', '[name="hangar_count"]', function(){
        if($(this).valid() && this.value > 0 && $weight_types_hangar.hasClass('collapsed-card'))
            $weight_types_hangar.find('button').click();

        for(const input of $weight_types_hangar_inputs)
            $form.validate().element(input);
    });

    $(document).on('keyup', '[name="parking_count"]', function(){
        if($(this).valid() && this.value > 0 && $weight_types_parking.hasClass('collapsed-card'))
            $weight_types_parking.find('button').click();

        for(const input of $weight_types_parking_inputs)
            $form.validate().element(input);
    });


    // $.validator.addMethod("frPhoneNumber", function(value, element) {
    //     return /^(?:(?:|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/gmi.test(value);
    // });

    const rules = {
        bank_first_name: {
            required: true
        },
        bank_last_name: {
            required: true
        },
        bank_account_name: {
            required: true
        },
        bank_name: {
            required: true
        },
        bank_bic: {
            required: true
        },
        bank_iban_number: {
            required: true
        },
        bank_email: {
            required: true,
            isEmail: true
        },
        bank_phone: {
            required: true,
            number: true,
            // frPhoneNumber: true
        },
        bank_country_code: {
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
            min: 0,
            equalToParkingPlusHangar: true
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
    };

    $weight_types_parking_inputs.forEach(input => {
        rules[input.name] = {
            requireFromParkingInput: true,
            number: true,
            min: 0
        };
    });

    $weight_types_hangar_inputs.forEach(input => {
        rules[input.name] = {
            requireFromHangarInput: true,
            number: true,
            min: 0
        };
    });

    jQuery.extend(jQuery.validator.messages, {
        requireFromHangarInput: "This field is required.",
        requireFromParkingInput: "This field is required.",
        equalToParkingPlusHangar: 'must be equal to hangar + outdoor'
    });

    $form.validate({
        ignore: "",
        rules,
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
            'bank_email': {
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