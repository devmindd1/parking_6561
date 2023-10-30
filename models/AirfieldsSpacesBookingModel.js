const Model = require('../core/Model');
const {_ROLES} = require('../models/UserModel');

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
            DISTINCT airfields_spaces_bookings.user_id,
            users.*
          FROM
            airfields
              LEFT JOIN airfields_spaces ON airfields.id = airfields_spaces.airfield_id
              INNER JOIN airfields_spaces_bookings ON airfields_spaces.id = airfields_spaces_bookings.airfields_space_id
              LEFT JOIN users ON airfields_spaces_bookings.user_id = users.id
          WHERE airfields.user_id = ${ownerId} AND users.role = '${_ROLES['user']}'`;

        return this.exec(query);
    }

    // Arthur check this query, I created this for get bookings
    getBooks(userId) {
        // const query = `
        //     SELECT * FROM airfields_spaces_bookings WHERE user_id = ${userId};
        // `;
        const query = `SELECT airfields_spaces_bookings.id, airfields_spaces_bookings.user_id, 
                           airfields_spaces_bookings.airfields_space_id, 
                           airfields_spaces_bookings.start_timestamp, airfields_spaces_bookings.end_timestamp, 
                           airfields_spaces_bookings.status, airfields.address 
                        FROM airfields_spaces_bookings 
                          LEFT JOIN airfields_spaces ON airfields_spaces_bookings.airfields_space_id = airfields_spaces.id 
                          LEFT JOIN airfields ON airfields_spaces.airfield_id = airfields.id 
                        WHERE airfields_spaces_bookings.user_id = ${userId};`

        return this.exec(query);
    }
}

module.exports = AirfieldsSpacesBookingModel;