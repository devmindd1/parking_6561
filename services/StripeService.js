const stripe = require('stripe');
const __SECRET_KEY = 'sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr';

class StripeService{
    constructor(){
        this.s = stripe(__SECRET_KEY);
        this.result = {
            error: {
                type: '',
                message: '',
                param: ''
            },
            success: true,
            data: null
        }
    }

    async _call(method, args){
        try {
            this.result.data = await this[method](...args);

            console.log(this.result.data);

        }catch (e) {

            console.log(e);

            this.result.success = false;
            this.result.error.type = e.type;

            if(e.type === 'StripeInvalidRequestError'){
                this.result.error.message = e.raw.message;
                this.result.error.param = e.raw.param.split('][')[1].replace(/.$/, '');
            }
        }

        return this.result;
    }

    createAccountToken(account){
        const dob = new Date(account.date_of_birth);
        return this.s.tokens.create({
            account: {
                business_type: 'individual',
                individual: {
                    first_name: account.first_name,
                    last_name: account.first_name,
                    address: {
                        line1: `${account.country_code}: ${account.city} - ${account.postal_code}`,
                        city: account.city,
                        // state: 'GE',
                        postal_code: account.postal_code,
                        country: account.country_code,
                    },
                    email: account.email,
                    gender: account.gender,
                    phone: account.phone,
                    dob: {
                        day: dob.getDate(),
                        month: dob.getMonth() + 1,
                        year: dob.getFullYear(),
                    }
                },
                tos_shown_and_accepted: true,
            },
        });
    }

    createAccountByAccountToken(accountToken, account){
        return this.s.accounts.create({
            account_token: accountToken,
            business_profile: {
                mcc: '4582',
                name: account.account_name,
                // url: 'https://my-first-business.com/',
                product_description: 'Airports, Flying Fields'
            },
            type: 'custom',
            country: account.country_code,
            email: account.email,
            capabilities: {
                card_payments: {requested: true},
                transfers: {requested: true},
            },
        });
    }

    createAttachBankToAccountLink(accountId, return_url){
        return this.s.accountLinks.create({
            account: accountId,
            refresh_url: 'https://example.com/reauth',
            return_url: return_url,
            type: 'account_onboarding'
        });
    }

    retrieveExternalAccountsByAccountId(accountId){
        return this.s.accounts.listExternalAccounts(
            accountId,
            {object: 'bank_account'}
        );
    }

    createIntent(customerId, amount){
        return this.s.charges.create({
            customer: customerId,
            amount: amount,
            currency: 'eur',
            transfer_group: 'ORDER10',
        });
    }

    orderIntent(accountId){
        return this.s.transfers.create({
            amount: 2000,
            currency: 'eur',
            destination: accountId,
            transfer_group: 'ORDER10',
        });
    }


}

module.exports = StripeService;