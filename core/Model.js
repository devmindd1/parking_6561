const database = require('../config/database.js');

class Model{
    constructor(table){
        this._table = table;
        this.db = database;
        this.t = this.db(this._table);
    }

    async startTransaction(isolationLevel){
        await this.exec(`SET TRANSACTION ISOLATION LEVEL ${isolationLevel};`);
        await this.exec(`START TRANSACTION;`);

        return true;
    }

    commit(){
        return this.exec(`COMMIT;`);
    }

    rollback(){
        return this.exec(`ROLLBACK;`);
    }

    async getById(id){
        const [item] = await this.t.select('*').where({id: id});

        this.freeResult();

        return item;
    }

    async getAllCount(){
        const [row] = await this.t.count();

        return parseInt(row['count(*)']);
    }

    deleteById(id){
        return this.t.where('id', id).del();
    }

    getAll(){
        return this.t.select('*');
    }

    async insert(data){
        const [id] = await this.t.insert(data);

        this.freeResult();

        return id;
    }

    disableOnlyFullGroupBy(){
        return this.exec(`SET GLOBAL sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));`);
    }

    update(id, data){
        this.freeResult();

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