const Model = require('../core/Model');

class AirfieldsSpaceModel extends Model{
    constructor(){ super('airfields_spaces'); }

    static _TYPES = {
        'parking': 'parking',
        'hangar': 'hangar',
    };

    getByAirfieldId(airfieldId){
        return this.t.select('id', 'title')
            .where('airfield_id', airfieldId);
    }

    async getRandomFreeAirfieldSpaceId(airfieldId, startDate, endDate, spaceType){
        spaceType = AirfieldsSpaceModel._TYPES[spaceType];

        let query =`
            SELECT airfields_spaces.id
            FROM airfields_spaces
              LEFT JOIN ( 
                SELECT airfields_spaces_bookings.airfields_space_id 
                FROM airfields_spaces_bookings 
                WHERE (start_timestamp BETWEEN ${startDate} AND ${endDate} OR end_timestamp BETWEEN ${startDate} AND ${endDate}) 
              ) AS f_airfields_spaces_bookings 
            ON airfields_spaces.id = f_airfields_spaces_bookings.airfields_space_id 
            WHERE airfield_id = ${airfieldId} 
            AND airfields_space_id IS NULL 
            AND type = '${spaceType}'
            ORDER BY RAND()
            LIMIT 1;`;

        const [row] = await this.exec(query);

        if(row) return row['id'];

        return 0;
    }
}

module.exports = AirfieldsSpaceModel;