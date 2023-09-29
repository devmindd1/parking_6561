let savedAirfieldPhotoIds = [];

const uploadImgRemoveImg = document.createElement('img');
uploadImgRemoveImg.src = '/admin/images/remove_image_icon.png';

function createErrorBlock(text){
    const span = document.createElement('span');
    span.classList.add('error', 'invalid-feedback');

    span.innerText = text;

    return span;
}

function createImageRemoveButton(){
    const removeImgButton = uploadImgRemoveImg.cloneNode();
    removeImgButton.classList.add('upload-image-remove');

    return removeImgButton;
}

function createDocumentRemoveButton(){
    const removeImgButton = uploadImgRemoveImg.cloneNode();
    removeImgButton.classList.add('upload-document-remove');

    return removeImgButton;
}

function createImageElement(imgSrc){
    const img = document.createElement('img');
    img.style.width = '100%';
    img.src = imgSrc;

    return img;
}

function createImageBlock(id, imgSrc){
    const div = document.createElement('div');
    div.dataset.id = id;
    div.classList.add('col-sm-4', 'upload-image-item');

    div.append(
        createImageElement(imgSrc),
        createImageRemoveButton()
    );

    return div;
}

function createDocumentBlock(imgSrc){
    const div = document.createElement('div');
    div.classList.add('col-sm-4', 'upload-image-item');

    div.append(
        createImageElement(imgSrc),
        createDocumentRemoveButton()
    );

    return div;
}

function loadInputImage(file){
    return new Promise(resolve => {
        const reader  = new FileReader();
        reader.onloadend = async function () {
            resolve(reader.result);
        };

        reader.readAsDataURL(file);
    });
}

addEventListener('DOMContentLoaded', () => {
    const savedAirfieldPhotoIdsInput = $('#save_airfield_photo_ids');
    const uploadedImages = $('#uploaded-images');
    const uploadedDocument = $('#uploaded-document');


    $('#short_hr_price_eur_input').ionRangeSlider({
        min     : 0.1,
        max     : 20,
        type    : 'single',
        step    : 0.1,
        postfix : ' eur HT/hr',
        prettify: false,
        // hasGrid : true
    });

    $('#long_hr_price_eur_input').ionRangeSlider({
        min     : 0.1,
        max     : 20,
        type    : 'single',
        step    : 0.1,
        postfix : ' eur HT/hr',
        prettify: false,
        // hasGrid : true
    });


    $('.select2').select2();

    $(document).on('click', '#create', function(e){
        const primaryEmailInput = $('#primary_email');
        const isValid = $('form').valid();

        if(!isValid) return;

        $.ajax({
            type: "POST",
            url: `check-primary-email`,
            data: {
                primaryEmail: primaryEmailInput.val()
            },
            beforeSend: function(){
                primaryEmailInput.removeClass('is-invalid');
                primaryEmailInput.find('span').remove();
            },
            success: function (data) {
                if(!data.primaryEmailExists) return $('form').submit();

                primaryEmailInput.addClass('is-invalid');
                primaryEmailInput.closest('.form-group').append(createErrorBlock('Primary Email Exists'));
            }
        });
    });

    $('#reservationdate').datetimepicker({
        format: 'L'
    });

    $(document).on('click', '.upload_airfield_images', function(e){
        $('#airfield_images_input').click();
    });

    $(document).on('click', '.upload_document_image', function(e){
        $('#document_image_input').click();
    });

    $(document).on('change', '#document_image_input', async function(e){
        uploadedDocument.html('');

        if(e.target.files && e.target.files[0]){
            const image = await loadInputImage(e.target.files[0]);
            uploadedDocument.append(createDocumentBlock(image));
        }
    });

    $(document).on('change', '#airfield_images_input', async function(e){
        uploadedImages.html('');
        savedAirfieldPhotoIds = [];

        if(e.target.files)
            for (const [id, file] of Object.entries(e.target.files)){
                const image = await loadInputImage(file);

                uploadedImages.append(createImageBlock(id, image));

                savedAirfieldPhotoIds.push(id);
            }

        savedAirfieldPhotoIdsInput.val(savedAirfieldPhotoIds.join(','));
    });

    $(document).on('click', '.upload-document-remove', async function(e){
        const uploadedImageItem = $(this).closest('.upload-image-item');

        $('#document_image_input').val('');

        uploadedImageItem.remove();
    });

    $(document).on('click', '.upload-image-remove', async function(e){
        const uploadedImageItem = $(this).closest('.upload-image-item');
        const id = uploadedImageItem.attr('data-id');

        savedAirfieldPhotoIds = [...savedAirfieldPhotoIds.filter(v => v !== id)];
        savedAirfieldPhotoIdsInput.val(savedAirfieldPhotoIds.join(','));

        uploadedImageItem.remove();
    });
});