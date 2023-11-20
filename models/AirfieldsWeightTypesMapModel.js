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

    async getAirfieldWeights(airfieldId){
        const result = {};

        const weightTypes = await this.t.select('*')
            .where({
                'airfield_id': airfieldId
            });


        for(const type of weightTypes){
            if(!result[type.space_type])
                result[type.space_type] = {};

            if(!result[type.space_type][type.weight_type_id])
                result[type.space_type][type.weight_type_id] = {};

            result[type.space_type][type.weight_type_id][type.price_type] = type.price;
        }

        return result;
    }
}

module.exports = AirfieldsWeightTypesMapModel;