const {validationResult} = require('express-validator');
const UserModel = require('../../../models/UserModel');
const UsersCardsModel = require('../../../models/UsersCardsModel');
const StripeService = require('../../../services/StripeService');
const AirfieldsSpacesBookingModel = require('../../../models/AirfieldsSpacesBookingModel');

exports.update = async function(req, res){
    const userModel = new UserModel();
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    await userModel.update(req.user.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        country_id: req.body.country_id,
        date_of_birth: req.body.date_of_birth
    });

    return res.status(200).json(res.data);
};

exports.deleteCard = async function(req, res){
    const {cardId} = req.body;
    const stripe = new StripeService();
    const userModel = new UserModel();
    const usersCardsModel = new UsersCardsModel();

    const customerId = await userModel.getUserStripeCustomerId(req.user.id);
    const card = await usersCardsModel.getUserCardBySourceId(req.user.id, cardId);

    if(!card)
        return res.status(400).json(res.data);

    const deletedCard = await stripe._call('deleteCustomerSource', [customerId, cardId]);
    if(!deletedCard.success)
        return res.status(400).json(res.data);

    await await usersCardsModel.deleteById(card.id);

    return res.status(200).json(res.data);
};

exports.getCards = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    const userModel = new UserModel();
    const stripe = new StripeService();

    const customerId = await userModel.getUserStripeCustomerId(req.user.id);

    const cards = await stripe._call('getCustomerPaymentMethodsList', [customerId]);
    if(!cards.success)
        return res.status(400).json(res.data);
    res.data.cards = cards.data;

    const defaultCard = await stripe._call('getCustomerDefaultCard', [customerId]);
    if(!defaultCard.success)
        return res.status(400).json(res.data);
    res.data.defaultCardId = defaultCard.data.data[0]?.id || '';

    return res.status(200).json(res.data);
};

exports.insertCard = async function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.data.validationErrors = errors.array();
        return res.status(400).json(res.data);
    }

    const userModel = new UserModel();
    const stripe = new StripeService();
    const usersCardsModel = new UsersCardsModel();

    const customerId = await userModel.getUserStripeCustomerId(req.user.id);

    const card = await stripe._call('attachSourceToCustomer', [customerId, req.body.stripe_card_token]);
    if(!card.success)
        return res.status(400).json(res.data);

    await usersCardsModel.insert({
        user_id: req.user.id,
        source_id: req.body.stripe_card_id
    });

    return res.status(200).json(res.data);
};


exports.changeDefaultCard = async function(req, res){
    const {cardId} = req.body;

    const stripe = new StripeService();
    const usersCardsModel = new UsersCardsModel();
    const userModel = new UserModel();

    const customerId = await userModel.getUserStripeCustomerId(req.user.id);

    const card = await usersCardsModel.getUserCardBySourceId(req.user.id, cardId);


    console.log(card);
    console.log(cardId);

    if(!card)
        return res.status(400).json(res.data);

    const customer = await stripe._call('updateCustomerDefaultSource', [customerId, cardId]);
    if(!customer.success)
        return res.status(400).json(res.data);

    return res.status(200).json(res.data);
};


// Arthur check this query, I created this for get bookings
exports.getBookings = async (req, res) => {
    const bookings = new AirfieldsSpacesBookingModel();
    const data = await bookings.getBooks(req.body.userId);

    return res.status(200).json(data);
};