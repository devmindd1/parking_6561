const Model = require('../core/Model');
const {_ROLES} = require('../models/UserModel');

class AirfieldsSpacesBookingModel extends Model{
    constructor(){ super('airfields_spaces_bookings'); }

    static _STATUSES = {
        accepted: 10,
        canceled: 0,
        pending: 1, //default SELECTABLE
    };

    async getById(airfieldSpaceId){
        const [booking] = await this.t.select('created', 'airfields_spaces_bookings.user_id', 'users.first_name', 'users.last_name', 'users.email',
                'users.address', 'oaci_types.airfield_name', 'oaci_types.oaci_code', 'airfields_spaces_bookings_info.price',
                'airfields_spaces_bookings_info.com_pilot', 'airfields_spaces_bookings_info.total_vat', 'airfields_spaces_bookings_info.vat_percent',
                'stripe_intents.amount')
            .leftJoin('airfields_spaces_bookings_info', 'airfields_spaces_bookings.airfields_spaces_bookings_info_id', 'airfields_spaces_bookings_info.id')
            .leftJoin('stripe_intents', 'airfields_spaces_bookings_info.stripe_intent_id', 'stripe_intents.id')
            .leftJoin('users', 'airfields_spaces_bookings.user_id', 'users.id')
            .leftJoin('airfields_spaces', 'airfields_spaces_bookings.airfields_space_id', 'airfields_spaces.id')
            .leftJoin('airfields', 'airfields_spaces.airfield_id', 'airfields.id')
            .leftJoin('oaci_types', 'airfields.oaci_type_id', 'oaci_types.id')
            .where({'airfields_spaces_bookings.id': airfieldSpaceId});

        return booking;
    }

    async getByAirfieldId(airfieldSpaceId, airfieldId){
        const [booking] = await this.t.select('status')
            .leftJoin('airfields_spaces', 'airfields_spaces_bookings.airfields_space_id', 'airfields_spaces.id')
            .where({
                'airfields_spaces.airfield_id': airfieldId,
                'airfields_spaces_bookings.id': airfieldSpaceId
            });

        return booking;
    }

    getByRange(startDate, endDate, filter){
        const where = {
            'airfields_spaces.airfield_id': filter.airfieldId
        };

        if(parseInt(filter.airfieldSpaceId))
            where['airfields_spaces.id'] = filter.airfieldSpaceId;

        if(parseInt(filter.status))
            where['airfields_spaces_bookings.status'] = filter.status;

        return this.t.select('*')
            .leftJoin('airfields_spaces', 'airfields_spaces_bookings.airfields_space_id', 'airfields_spaces.id')
            .where('start_timestamp', '>', startDate)
            .andWhere('start_timestamp', '<', endDate)
            .andWhere(where);
    }

    getAllByAirfieldId(airfieldId){
        return this.t.select('airfields_spaces_bookings.id', 'airfields_spaces_bookings.status',
                'start_timestamp', 'end_timestamp', 'users.first_name', 'users.last_name')
            .leftJoin('users', 'airfields_spaces_bookings.user_id', 'users.id')
            .leftJoin('airfields_spaces', 'airfields_spaces_bookings.airfields_space_id', 'airfields_spaces.id')
            .where({airfield_id: airfieldId});
    }

    getOwnerCustomers(ownerId){
        const query =`
          SELECT
            DISTINCT airfields_spaces_bookings.user_id,
            users.*
          FROM airfields
            LEFT JOIN airfields_spaces ON airfields.id = airfields_spaces.airfield_id
            INNER JOIN airfields_spaces_bookings ON airfields_spaces.id = airfields_spaces_bookings.airfields_space_id
            LEFT JOIN users ON airfields_spaces_bookings.user_id = users.id
          WHERE airfields.user_id = ${ownerId} AND users.role = '${_ROLES['user']}'`;

        return this.exec(query);
    }
}

module.exports = AirfieldsSpacesBookingModel;