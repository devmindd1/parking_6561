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
            'airfields.operating_license_img', 'airfields.status', 'airfields.phone_number')
            .leftJoin('users', 'airfields.user_id', 'users.id')
            .where({'airfields.id': id});

        this.freeResult();

        return item;
    }

    async getByOaciId(oaciTypeId){
        const [airfield] = await  this.t.select('*')
            .leftJoin('airfields_stripe_accounts', 'airfields.id', 'airfields_stripe_accounts.airfield_id')
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
        const [airfield] = await this.t.select('airfields.id', 'airfields.spaces_count', 'airfields.short_hr_price_eur',
            'airfields.long_day_price_eur', 'oaci_types.airfield_name', 'oaci_types.oaci_code')
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

        return this.t.select('airfields.*', 'airfields_stripe_accounts_banks.bank_account_id AS has_bank')
            .leftJoin('airfields_stripe_accounts', 'airfields.id', 'airfields_stripe_accounts.airfield_id')
            .leftJoin('airfields_stripe_accounts_banks', 'airfields_stripe_accounts.id', 'airfields_stripe_accounts_banks.airfield_stripe_account_id')
            .where(where)
            .groupBy('airfields.id');
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
        const oaciId = data.oaciId || 0;
        const spaceType = AirfieldsSpaceModel._TYPES[data.spaceType];
        let startDate = '1970-01-01 00:00';
        let endDate = '1970-01-01 00:00';

        if(data.startDate && data.endDate){
            startDate = data.startDate;
            endDate = data.endDate;
        }

        let query =`
          SELECT
            oaci_types.airfield_name,
            airfields.id,
            airfields.spaces_count,
            airfields.parking_count,
            airfields.hangar_count,
            oaci_types.latitude,
            oaci_types.longitude,
            airfields_spaces.type,
            -- airfields_spaces.id AS airSpa_id,
            -- f_airfields_spaces_bookings.airfields_space_id AS airfield_space_is_busy,
            COUNT(*) AS free_spaces_count
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
          LEFT JOIN oaci_types ON airfields.oaci_type_id = oaci_types.id
          WHERE f_airfields_spaces_bookings.airfields_space_id IS NULL
            AND airfields_spaces.type = '${spaceType}'`;

        if(oaciId) query += ` AND oaci_types.id = ${oaciId}`;

        query += ` GROUP BY airfields.id`;

        return this.exec(query);
    }
}

module.exports = AirfieldModel;