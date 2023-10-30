addEventListener('DOMContentLoaded', () => {
    $(document).on('click', '.attach_bank_account', function(e){
        // $.ajax({
        //     type: "POST",
        //     url: `airfields/create-link-for-attach-bank`,
        //     data:{
        //         airfieldId: e.target.dataset.id
        //     },
        //     success: function (data) {
        //         if(data.url) location.href = data.url;
        //     },
        //     error: function(data){
        //         console.log(data);
        //     }
        // });
    });
});