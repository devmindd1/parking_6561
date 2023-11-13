const Model = require('../core/Model');

module.exports = class SettingModel extends Model{
    constructor(){ super('settings'); }

    async getPaymentSettings(){
        const result = {};
        const settings = await this.t.select('key', 'value')
            .where({'key': 'vat_percent'})
            .orWhere({'key': 'pilot_short_com'})
            .orWhere({'key': 'pilot_long_com'})
            .orWhere({'key': 'airfield_com'});

        this.freeResult();

        for(const setting of settings)
            result[setting['key']] = parseInt(setting['value']);

        return result;
    }
};
