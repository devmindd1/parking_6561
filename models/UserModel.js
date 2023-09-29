const Model = require('../core/Model');

class UserModel extends Model{
    static _ROLES = {
        'admin': 'admin',
        'user': 'user',
        'owner': 'owner'
    };

    static _ownerTokenMaxAge = 60*60*24*15*1000;

    constructor(){ super('users'); }

    async getAdminByEmailPassword(email, password){
        const [user] =  await this.t.select('*').where({
            email: email,
            password: password,
            role: UserModel._ROLES['admin']
        });

        return user;
    }

    getAllOwners(){
        return this.t.select('id', 'status', 'email', 'first_name', 'last_name')
            .where({role: UserModel._ROLES['owner']});
    }

    async getByEmail(email){
        const [user] = await this.t
            .select('id', 'first_name', 'last_name', 'email', 'password')
            .where({
                email: email,
                role: UserModel._ROLES['user']
            });

        return user;
    }

    async getOwnerByEmailPassword(email, password){
        const [user] =  await this.t.select('*').where({
            email: email,
            password: password,
            role: UserModel._ROLES['owner']
        });

        return user;
    }

    async checkById(id){
        const [item] = await this.t.select('*').where({id: id});

        this.freeResult();

        return item;
    }

    async checkEmailExists(email){
        const [user] = await this.t.select('email').where({
            email: email,
            role: UserModel._ROLES['user']
        });

        if(user) return true;
    }

    updateToken(userId, token){
        return this.t.update({
            '_token': token
        }).where({id: userId});
    }

    async getUserByToken(_token){
        const [user] = await this.t.select('id').where({_token: _token});

        return user;
    }
}

module.exports = UserModel;