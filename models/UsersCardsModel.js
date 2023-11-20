const Model = require('../core/Model');

class UsersCardsModel extends Model{
    constructor(){ super('users_cards'); }

    static _STATUSES = {
        'deleted': 0,
        'valid': 1,
    };

    async getUserCardBySourceId(userId, sourceId){
        const [card] = await this.t.select('id', 'source_id').where({
            source_id: sourceId,
            user_id: userId
        });

        return card;
    }

    setDeleted(id){
        return this.update(id, {
            status: UsersCardsModel._STATUSES['deleted']
        })
    }

    async getUserCardById(userId, id){
        const [card] = await this.t.select('id', 'source_id').where({
            id: id,
            user_id: userId
        });

        return card;
    }
}

module.exports = UsersCardsModel;