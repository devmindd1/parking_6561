$(document).ready(function(){

    console.log('ppl');

    $(document).on('click', '.delete-button', function(e){
        $.ajax({
            url: '/admin/groups/move-to-user',
            dataType: 'json',
            type: 'POST',
            data: $('#move_group_to_user_form').serialize(),
            success: function (data) {
                if(data.success){
                    location.reload();
                }
            },
            error: function(data){
                console.log(data);
            }
        });

        console.log(this.dataset.id);
    });
});