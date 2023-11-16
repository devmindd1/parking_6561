addEventListener('DOMContentLoaded', () => {
    let acceptButton;
    let confirmed = false;

    $(document).on('click', '#generate_pdf', function(){
        html2pdf().set({
            filename: '_Kennel_Card_.pdf',
            margin: 5,
            jsPDF: {orientation: 'l', format:'a4'}
        })
        .from(document.querySelector('#print-block'))
        .save();
    });

    $(document).on('click', '[name="submit"]', function(e){
        if(!confirmed)
            e.preventDefault();

        $('#confirm-payment-submit-item-open').click();

        acceptButton = $(e.target);
    });


    $(document).on('click', '.confirm-submit-payment-button', function(e){
        confirmed = true;
        acceptButton.click();
    });
});