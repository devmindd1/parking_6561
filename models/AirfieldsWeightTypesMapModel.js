const Model = require('../core/Model');

class AirfieldsWeightTypesMapModel extends Model{
    constructor(){ super('airfields_weight_types_map'); }

    static _PRICE_TYPES = {
        'long': 'long',
        'short': 'short',
    };

    async getPrice(userId, spaceType, priceType, airfieldId){
        const [row] = await this.t.select('price')
            .leftJoin('users', 'airfields_weight_types_map.weight_type_id', 'users.weight_type_id')
            .where({
                'users.id': userId,
                'space_type': spaceType,
                'airfield_id': airfieldId,
                'price_type': AirfieldsWeightTypesMapModel._PRICE_TYPES[priceType]
            });

        this.freeResult();

        if(row) return parseFloat(row['price']);

        return 0;
    }
}

module.exports = AirfieldsWeightTypesMapModel;