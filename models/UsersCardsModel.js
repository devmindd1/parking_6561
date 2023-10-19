const Model = require('../core/Model');

class UsersCardsModel extends Model{
    constructor(){ super('users_cards'); }

    async getUserCardBySourceId(userId, sourceId){
        const [card] = await this.t.select('id').where({
            source_id: sourceId,
            user_id: userId
        });

        return card;
    }

}

module.exports = UsersCardsModel;