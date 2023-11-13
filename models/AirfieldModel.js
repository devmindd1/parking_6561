const Model = require('../core/Model');
const UserModel = require('./UserModel');
const AirfieldsSpaceModel = require('./AirfieldsSpaceModel');

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
            'airfields.operating_license_img', 'airfields.status', 'airfields.phone_number', 'oaci_types.latitude', 'oaci_types.longitude')
            .leftJoin('users', 'airfields.user_id', 'users.id')
            .leftJoin('oaci_types', 'airfields.oaci_type_id', 'oaci_types.id')
            .where({'airfields.id': id});

        this.freeResult();

        return item;
    }

    async getByOaciId(oaciTypeId){
        const [airfield] = await  this.t.select('*')
            .leftJoin('airfields_banks', 'airfields.id', 'airfields_banks.airfield_id')
            .where({oaci_type_id: oaciTypeId});

        return airfield;
    }

    async getInfo(id){
        const [airfield] = await this.t.select('airfields.id', 'airfields.spaces_count', 'airfields.short_hr_price_eur',
                'airfields.long_day_price_eur', 'oaci_types.airfield_name', 'oaci_types.oaci_code')
            .leftJoin('oaci_types', 'airfields.oaci_type_id', 'oaci_types.id')
            .where({'airfields.id': id});

        this.freeResult();

        return airfield;
    }

    async getInfoByOaciId(oaciId){
        const [airfield] = await this.t.select('airfields.id', 'airfields.spaces_count', 'oaci_types.airfield_name', 'oaci_types.oaci_code')
            .leftJoin('oaci_types', 'airfields.oaci_type_id', 'oaci_types.id')
            .where({'airfields.oaci_type_id': oaciId});

        this.freeResult();

        return airfield;
    }

    getByUserId(userId, status = false){
        const where = {
            user_id: userId
        };

        if(status) where['status'] = 1;

        return this.t.select('airfields.*')
            .where(where);
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

    async getAirfieldIdByOaciId(oaciId){
        const [airfield] = await this.t.select('id')
            .where({oaci_type_id: oaciId});

        this.freeResult();

        if(airfield) return airfield['id'];

        return 0;
    }

    getFreeAirfieldsByRange(data){
        const spaceType = AirfieldsSpaceModel._TYPES[data.spaceType];
        const oaciWhere = data.oaciId ? `oaci_types.id = ${data.oaciId}`: 1;

        let startDate = '1970-01-01';
        let endDate = '1970-01-01';
        if(data.startDate && data.endDate){
            startDate = data.startDate;
            endDate = data.endDate;
        }

        let query =`
            SELECT
              airfields.id,
              COUNT(f_airfields_spaces_bookings.airfield_id) AS reserved_count,
              oaci_types.id AS oaci_id,
              oaci_types.airfield_name,
              airfields.spaces_count,
              airfields.parking_count,
              airfields.hangar_count,
              oaci_types.latitude,
              oaci_types.longitude
            FROM airfields
            LEFT JOIN (
              SELECT airfields_spaces.airfield_id 
              FROM airfields_spaces_bookings
              LEFT JOIN airfields_spaces ON airfields_spaces_bookings.airfields_space_id = airfields_spaces.id 
              WHERE (start_timestamp BETWEEN '${startDate}' AND '${endDate}' OR end_timestamp BETWEEN '${startDate}' AND '${endDate}') 
              AND type = '${spaceType}' 
              GROUP BY airfields_space_id
            ) AS f_airfields_spaces_bookings ON airfields.id = f_airfields_spaces_bookings.airfield_id
            LEFT JOIN oaci_types ON airfields.oaci_type_id = oaci_types.id 
            WHERE ${oaciWhere}
            GROUP BY airfields.id
            HAVING reserved_count < airfields.${spaceType}_count`;

        return this.exec(query);
    }
}

module.exports = AirfieldModel;