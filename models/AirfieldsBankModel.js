const Model = require('../core/Model');

class AirfieldsBankModel extends Model{
    constructor(){ super('airfields_banks'); }

    async checkEmailExists(email){
        const [account] = await this.t.select('email').where({
            email: email
        });

        if(account) return true;
    }

    async getAirfieldBank(airfieldId, userId){
        const [account] = await this.t.select('airfields_banks.id')
            .leftJoin('airfields', 'airfields_banks.airfield_id', 'airfields.id')
            .where({
                'airfields.user_id': userId,
                airfield_id: airfieldId
            });

        return account;
    }

    async getByAirfieldId(airfieldId){
        const [account] = await this.t.select('*')
            .where({
                airfield_id: airfieldId
            });

        return account;
    }
}

module.exports = AirfieldsBankModel;