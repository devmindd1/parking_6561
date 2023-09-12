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
        const [item] = await this.t.select('users.id', 'users.name', 'users.surname', 'airfields.id AS airfield_id',
            'airfields.spaces_count', 'airfields.address', 'airfields.primary_email', 'airfields.manager_name',
            'airfields.status', 'airfields.phone_number')
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

    async checkPrimaryEmailExists(primaryEmail){
        const [airfield] = await this.t.select('id').where({
            primary_email: primaryEmail
        });

        this.freeResult();

        if(airfield) return true;
    }

    getAllOwnersAirfields(){

        return this.t.select('users.id', 'users.name', 'users.surname', 'airfields.id AS airfield_id',
            'airfields.spaces_count', 'airfields.address', 'airfields.primary_email', 'airfields.manager_name',
            'airfields.status', 'airfields.phone_number')
            .leftJoin('users', 'airfields.user_id', 'users.id')
            .where({
                role: UserModel._ROLES['owner']
            });
    }

}

module.exports = AirfieldModel;