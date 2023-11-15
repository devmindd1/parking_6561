const Model = require('../core/Model');

class UserModel extends Model{
    static _ROLES = {
        'admin': 'admin',
        'user': 'user',
        'owner': 'owner'
    };

    static _ownerTokenMaxAge = 60*60*24*15*1000;

    constructor(){ super('users'); }

    getOwners(){
        return this.t.select('*').where({
            role: UserModel._ROLES['owner']
        });
    }

    async getOwnersCount(){
        const [row] =  await this.t.count().where({role: UserModel._ROLES['owner']});

        return row['count(*)']
    }

    async getAdminByEmailPassword(email, password){
        const [user] =  await this.t.select('*').where({
            email: email,
            password: password,
            role: UserModel._ROLES['admin']
        });

        return user;
    }

    async getByForgotPasswordToken(forgotPasswordToken){
        const [user] = await this.t.select('id').where({
            forgot_password_token: forgotPasswordToken,
            role: _ROLES['user']
        });

        return user;
    }


    async getUserStripeCustomerId(userId){
        const [user] = await this.t.select('stripe_customer_id')
            .where({id: userId});

        if(!user || !user['stripe_customer_id']) return '';

        return user['stripe_customer_id'];
    }

    getAllOwners(){
        return this.t.select('id', 'status', 'email', 'first_name', 'last_name')
            .where({role: UserModel._ROLES['owner']});
    }

    updateByEmail(email, data){
        return this.t.update(data).where({email: email});
    }

    async getByEmail(email){
        const [user] = await this.t
            .select('id', 'first_name', 'last_name', 'email', 'date_of_birth', 'country_id', 'password')
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

    async checkEmailExists(email, userId = 0){
        const whereNot = {};
        if(userId) whereNot['id'] = userId;

        const [user] = await this.t.select('email')
        .where({
            email: email,
            role: UserModel._ROLES['user']
        })
        .andWhereNot(whereNot);

        return !!user;
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