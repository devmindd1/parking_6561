const Model = require('../core/Model');
const UserModel = require('./UserModel');

class AirfieldModel extends Model{
    static _STATUSES = {
        0: {
            name: 'pending',
            color: '#7c858c',
        },
        1: {
            name: 'approved',
            color: 'green'
        },
    };

    constructor(){ super('airfields'); }

    async getById(id){
        const [item] = await this.t.select('users.id', 'users.first_name', 'users.last_name', 'users.email', 'airfields.id AS airfield_id',
            'airfields.spaces_count', 'airfields.address', 'airfields.primary_email', 'airfields.manager_name',
            'airfields.operating_license_img', 'airfields.status', 'airfields.phone_number', 'airfields.latitude',
            'airfields.longitude')
            .leftJoin('users', 'airfields.user_id', 'users.id')
            .where({'airfields.id': id});

        this.freeResult();

        return item;
    }

    getByUserId(userId, status = false){
        const where = {
            user_id: userId
        };

        if(status) where['status'] = 1;

        return this.t.select('*').where(where);
    }

    async checkPrimaryEmailExists(userId, primaryEmail){
        const [airfield] = await this.t.select('id')
            .where({primary_email: primaryEmail})
            .andWhere('user_id', '!=', userId);

        this.freeResult();

        if(airfield) return true;
    }

    getAllOwnersAirfields(){
        return this.t.select('users.id', 'users.first_name', 'users.last_name', 'airfields.id AS airfield_id',
            'airfields.spaces_count', 'airfields.address', 'airfields.primary_email', 'airfields.manager_name',
            'airfields.status', 'airfields.phone_number')
            .leftJoin('users', 'airfields.user_id', 'users.id')
            .where({
                role: UserModel._ROLES['owner']
            });
    }

    getAllApproved(){
        return this.t.select('*')
            .where({status: AirfieldModel._STATUSES[1]['name']});
    }

    getFreeAirfieldsByRange(startDate, endDate){
        const query =`
          SELECT
            airfields.id,
            airfields.latitude,
            airfields.longitude,
            f_airfields_spaces_bookings.airfields_space_id AS airfield_space_is_busy,
            COUNT(airfields.id) AS free_spaces_count
          FROM airfields_spaces
          LEFT JOIN (
            SELECT airfields_spaces_bookings.airfields_space_id
            FROM airfields_spaces_bookings
            WHERE start_timestamp BETWEEN '${startDate}' AND '${endDate}'
              OR end_timestamp BETWEEN '${startDate}' AND '${endDate}'
            GROUP BY airfields_space_id
          ) AS f_airfields_spaces_bookings
            ON airfields_spaces.id = f_airfields_spaces_bookings.airfields_space_id
          INNER JOIN airfields
            ON airfields_spaces.airfield_id = airfields.id
          WHERE f_airfields_spaces_bookings.airfields_space_id IS NULL
          GROUP BY airfields.id`;

        return this.exec(query);
    }
}

module.exports = AirfieldModel;