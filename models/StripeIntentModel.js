const Model = require('../core/Model');

module.exports = class StripeIntentModel extends Model{
    constructor(){ super('stripe_intents'); }

    static _STATUSES = {
        accepted: 'succeeded',
        canceled: 'canceled',
        pending: 'requires_confirmation' //default SELECTABLE
    };

    getIntentsInfoByUserId(userId){
        const query =`
            SELECT
              stripe_intents.id,
              stripe_intents.status,
              stripe_intents.amount,
              oaci_types.airfield_name,
              DATE_FORMAT(airfields_spaces_bookings.end_timestamp,'%Y-%m-%d') AS dateEnd,
              DATE_FORMAT(airfields_spaces_bookings.start_timestamp,'%Y-%m-%d') AS dateStart,
              DATEDIFF(airfields_spaces_bookings.end_timestamp, airfields_spaces_bookings.start_timestamp) AS days_different
            FROM stripe_intents
            LEFT JOIN airfields_spaces_bookings_info ON stripe_intents.id = airfields_spaces_bookings_info.stripe_intent_id
            LEFT JOIN airfields_spaces_bookings ON airfields_spaces_bookings.airfields_spaces_bookings_info_id = airfields_spaces_bookings_info.id
            LEFT JOIN airfields_spaces ON airfields_spaces_bookings.airfields_space_id = airfields_spaces.id
            LEFT JOIN airfields ON airfields_spaces.airfield_id = airfields.id
            LEFT JOIN oaci_types ON airfields.oaci_type_id = oaci_types.id
            WHERE airfields_spaces_bookings.user_id = ${userId}`;

        return this.exec(query);
    }

    async getByAirfieldsSpacesBookingId(airfieldsSpacesBookingId){
        const [intent] = await this.t.select('stripe_intents.id', 'payment_intent_id')
            .leftJoin('airfields_spaces_bookings_info', 'stripe_intents.id', 'airfields_spaces_bookings_info.stripe_intent_id')
            .leftJoin('airfields_spaces_bookings', 'airfields_spaces_bookings_info.id', 'airfields_spaces_bookings.airfields_spaces_bookings_info_id')
            .where({
                'airfields_spaces_bookings.id': airfieldsSpacesBookingId
            });

        return intent;
    }
};
