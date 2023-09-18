const Model = require('../core/Model');

class AirfieldsSourceModel extends Model{
    constructor(){ super('airfields_sources'); }

    getByAirfieldId(airfieldId){
        return this.t.select('file_path').where({
            airfield_id: airfieldId,
        });
    }
}

module.exports = AirfieldsSourceModel;