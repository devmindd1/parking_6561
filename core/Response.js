class ApiResponse{
    constructor(){
        this.validationErrors = [];
        this.errorMessage = '';
    }
}

class AdminResponse{
    constructor(){
        this.model = {};
        this.errors = {};
    }
}

exports.apiResponse = function(){
    return function(req, res, next){
        res.data = new ApiResponse();
        next();
    }
};

exports.adminResponse = function(){
    return function(req, res, next){
        res.data = new AdminResponse();
        next();
    }
};

exports.ApiResponse = ApiResponse;