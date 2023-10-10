const Model = require('../core/Model');

class AirfieldsStripeAccountsBankModel extends Model{
    constructor(){ super('airfields_stripe_accounts_banks'); }

    deleteByAirfieldStripeAccountId(airfieldStripeAccountId){
        return this.t.where('airfield_stripe_account_id', airfieldStripeAccountId).del();
    }

    getByAirfieldStripeAccountId(airfieldStripeAccountId){
        return this.t.select('*').where({airfield_stripe_account_id: airfieldStripeAccountId});
    }
}

module.exports = AirfieldsStripeAccountsBankModel;