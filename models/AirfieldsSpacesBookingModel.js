const Model = require('../core/Model');

class AirfieldsSpacesBookingModel extends Model{
    constructor(){ super('airfields_spaces_bookings'); }

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

    getOwnerCustomers(ownerId){
        const query =`
          SELECT
            DISTINCT  airfields_spaces_bookings.user_id,
            users.*
          FROM
            airfields
              LEFT JOIN airfields_spaces ON airfields.id = airfields_spaces.airfield_id
              INNER JOIN airfields_spaces_bookings ON airfields_spaces.id = airfields_spaces_bookings.airfields_space_id
              LEFT JOIN users ON airfields_spaces_bookings.user_id = users.id
          WHERE airfields.user_id = ${ownerId}`;

        return this.exec(query);
    }
}

module.exports = AirfieldsSpacesBookingModel;