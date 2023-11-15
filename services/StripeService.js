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
            this.result.error.message = e.raw.message;

            if(e.type === 'StripeInvalidRequestError')
                this.result.error.param = e.raw.param.split('][')[1].replace(/.$/, '');

        }

        return this.result;
    }

    cancelIntent(paymentIntentId){
        return this.s.paymentIntents.cancel(paymentIntentId);
    }

    attachSourceToCustomer(customerId, sourceToken){
        return this.s.customers.createSource(
            customerId,
            {source: sourceToken}
        );
    }

    getCustomerDefaultCard(customerId){
        return this.s.customers.listSources(
            customerId,
            {object: 'card', limit: 1}
        );
    }

    getCustomerCardList(customerId){
        return this.s.customers.listSources(
            customerId,
            {object: 'card'}
        );
    }

    getCustomerPaymentMethodsList(customerId){
        return this.s.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });
    }

    deleteCustomerSource(customerId, sourceId){
        return this.s.customers.deleteSource(
            customerId,
            sourceId
        );
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

    createCustomer(data){
        return this.s.customers.create(data);
    }

    updateCustomerDefaultSource(customerId, sourceId){
        return this.s.customers.update(
            customerId,
            {default_source: sourceId}
        );
    }

    createIntent(customerId, cardId, amount){
        return this.s.paymentIntents.create({
            customer: customerId,
            amount: amount,
            currency: 'eur',
            automatic_payment_methods: {enabled: false},
            payment_method_types: ['card'],
            payment_method: cardId
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