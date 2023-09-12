// const {validate} = require('../../helpers/bodyValidationHelper');
// const {messageInsertBody} = require('../../models/bodyValidation/messageBody');
// const {negotiationJoinBody} = require('../../models/bodyValidation/negotiationBody');
// const MessageModel = require('../../models/MessageModel');
// const NegotiationUserModel = require('../../models/NegotiationUserModel');
// const NegotiationModel = require('../../models/NegotiationModel');
//
// exports.getByNegotiation = async function(req){
//     const {negotiationUuid} = req.body;
//     const {offset} = req.body;
//
//     const messageModel = new MessageModel();
//     const negotiationModel = new NegotiationModel();
//     const negotiationUserModel = new NegotiationUserModel();
//
//     const negotiation = await negotiationModel.getByUuid(negotiationUuid);
//     if(!negotiation)
//         req.response.errorMessage = 'test';
//
//     const userBelongs = await negotiationUserModel.checkUserBelongsNegotiation(negotiation.id, req.user.id);
//     if(!userBelongs)
//         req.response.errorMessage = 'test';
//
//     req.response.messages = await messageModel.getByNegotiation(negotiation.id);
//
//     return req.socket.emit(req.name, req.response);
// };
//
// exports.insert = async function(req){
//     const errors = await validate(req, [negotiationJoinBody, messageInsertBody]);
//     if(errors.errors.length){
//         req.response.validationErrors = errors.errors;
//         return req.socket.emit('message1', req.response);
//     }
//
//     return req.socket.emit('message12', req.response);
// };
//
//
