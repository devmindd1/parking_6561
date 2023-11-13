exports.decimal = function(value){
    const exp = -2;

    value = value.toString().split("e");
    value = Math.round(+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));
    value = value.toString().split("e");

    return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
};
