const Model = require('../core/Model');

class CountryModel extends Model{
    constructor(){ super('countries'); }

    async getAllStripeAvailable(){
        const result = await this.t.select('code', 'name')
            .where({stripe_available: 1});

        this.freeResult();

        return result;
    }
}

module.exports = CountryModel;