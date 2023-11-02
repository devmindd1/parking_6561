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
        this.activeMenu = '';
    }
}

exports.apiResponse = function(){
    return function(req, res, next){
        res.data = new ApiResponse();
        next();
    }
};

exports.indexResponse = function(){
    return function(req, res, next){
        res.data = new ApiResponse();
        res.data.activeMenu = req.originalUrl === '/' ? '/': req.originalUrl.split('/')[1];

        next();
    }
};

exports.adminResponse = function(){
    return function(req, res, next){
        res.data = new AdminResponse();
        res.data.activeMenu = req.originalUrl === '/admin/' ? '/': req.originalUrl.split('/')[2];

        next();
    }
};

exports.ApiResponse = ApiResponse;