class ApiResponse{
    constructor(){
        this.validationErrors = [];
        this.errorMessage = '';
    }
}

exports.apiResponse = function(){
    return function(req, res, next){
        res.data = new ApiResponse();
        next();
    }
};

exports.ApiResponse = ApiResponse;