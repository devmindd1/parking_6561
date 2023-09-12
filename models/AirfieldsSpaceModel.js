const Model = require('../core/Model');

class AirfieldsSpaceModel extends Model{
    constructor(){ super('airfields_spaces'); }

    getByAirfieldId(airfieldId){
        return this.t.select('id', 'title')
            .where('airfield_id', airfieldId);
    }
}

module.exports = AirfieldsSpaceModel;