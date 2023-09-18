const database = require('../config/database.js');

class Model{
    constructor(table){
        this._SORT_TYPES = ['ASC', 'DESC'];
        this._table = table;
        this.db = database;
        this.t = this.db(this._table);
    }

    async getById(id){
        const [item] = await this.t.select('*').where({id: id});

        this.freeResult();

        return item;
    }

    getAll(){
        return this.t.select('*');
    }

    async insert(data){
        const [id] = await this.t.insert(data);

        this.freeResult();

        return id;
    }

    update(id, data){
        return this.t.update(data).where({id: id});
    }

    async exec(query){
        const [result] = await this.db.raw(query);

        return result;
    }

    freeResult(){
        this.t = this.db(this._table);
    }
}

module.exports = Model;