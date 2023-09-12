const Model = require('../core/Model');

class UsersTokenModel extends Model{
    constructor(){ super('users_tokens'); }

    deleteTokens(userId){
       return this.t
        .where({user_id: userId})
        .del()
    }

    async updateTokens(userId, tokens) {
        await this.deleteTokens(userId);

        await this.insert({
            user_id: userId,
            refresh_token: tokens.refreshToken,
            access_token: tokens.accessToken,
        });
    }

    async getByAccessToken(accessToken){
        const [user] = await this.t
            .select('user_id')
            .where({
                access_token: accessToken
            });

        return user;
    }

    async getByRefreshToken(refreshToken){
        const [user] = await this.t
            .select('user_id')
            .where({
                refresh_token: refreshToken
            });

        return user;
    }
}

module.exports = UsersTokenModel;