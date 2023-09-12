export default class XhrClass{
    post(url, data){
        return new Promise(resolve => {
            $.ajax({
                type: "POST",
                url: url,
                data: data,
                complete: function(response){
                    resolve({
                        status: response.status,
                        data: response.responseJSON
                    });
                }
            });
        });
    }

    put(url, data){
        const accessToken = localStorage.getItem('token');
        const HEADERS = {};

        if(accessToken)
            HEADERS['Authorization'] = `Bearer ${accessToken}`;

        return new Promise(resolve => {
            $.ajax({
                type: "PUT",
                url: BASE_URL + url,
                data: data,
                headers: HEADERS,
                cache: false,
                contentType: false,
                processData: false,
                xhrFields: {
                    withCredentials: true
                },
                complete: function(response){
                    resolve({
                        status: response.status,
                        data: response.responseJSON
                    });
                }
            });
        });
    }

    get(url){
        return new Promise(resolve => {
            $.ajax({
                url: url,
                type: 'GET',
                xhrFields: {
                    withCredentials: true
                },
                complete: function(response){
                    resolve({
                        status: response.status,
                        data: response.responseJSON
                    });
                }
            });
        });
    }

    getAbs(url, data){
        return new Promise(resolve => {

            $.ajax({
                url: url,
                type: 'GET',
                complete: function(response){
                    resolve({
                        status: response.status,
                        data: response.responseJSON
                    });
                }
            });
        });
    }
}