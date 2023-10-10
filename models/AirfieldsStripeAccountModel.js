const Model = require('../core/Model');

class AirfieldsStripeAccountModel extends Model{
    constructor(){ super('airfields_stripe_accounts'); }

    async checkEmailExists(email){
        const [account] = await this.t.select('email').where({
            email: email
        });

        if(account) return true;
    }

    async getAirfieldAccount(airfieldId, userId){
        const [account] = await this.t.select('airfields_stripe_accounts.id', 'stripe_account_id')
            .leftJoin('airfields', 'airfields_stripe_accounts.airfield_id', 'airfields.id')
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

module.exports = AirfieldsStripeAccountModel;