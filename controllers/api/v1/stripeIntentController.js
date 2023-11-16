const StripeIntentModel = require('../../../models/StripeIntentModel');
exports.getUserIntents = async function(req, res){
    const stripeIntentModel = new StripeIntentModel();

    res.data.stripeIntents = await stripeIntentModel.getIntentsInfoByUserId(req.user.id);

    console.log(req.user.id);

    return res.status(200).json(res.data);
};