const OaciTypeModel = require('../models/OaciTypeModel');
const xlsx = require('node-xlsx');

const axios = require('axios');

exports.index = async function(req, res){
    return res.render('home/index', res.data);
};

exports.test1 = function(req, res){

    console.log(req.body);
    console.log(req.params);
    console.log(req.query);

    return res.send('ok');
};

exports.test = async function(req, res){
    const oaciTypeModel = new OaciTypeModel();


    // $a = "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_OhvARKi4mJsCzF50FgLbpo3ffdmCEJGJ&scope=read_write&redirect_uri=http://192.168.77.129:9026/stripe-connect";

    // axios.post('https://connect.stripe.com/oauth/token', {
    //     'client_secret': 'sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr',
    //     'grant_type': 'authorization_code',
    //     'code': 'ac_OiNDhneD2Lf4SBi2GKykwcGEHRi92YdL'
    // })
    // .then(function (response) {
    //     console.log(response);
    // })
    // .catch(function (error) {
    //     console.log(error);
    // });


    const stripe = require('stripe')('sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr');
    //
    // const account = await stripe.accounts.create({
    //     account_token: 'ct_1Nux6dHsAwmdsPL7XhDucLLp',
    //     type: 'custom',
    //     country: 'FR',
    //     email: 'customer119955@gmail.com',
    //     capabilities: {
    //         card_payments: {requested: true},
    //         transfers: {requested: true},
    //     },
    // });
    //
    //
    // console.log(account);



    // const stripe = require('stripe')('sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr');
    //
    //
    // const transfer = await stripe.transfers.create({
    //     amount: 400,
    //     currency: 'eur',
    //     destination: 'acct_1NvakAQYaUT33qSt'
    // });
    //
    //
    //
    // console.log(transfer);

    // console.log(transfer);

        // 'stripe_user[country]' => 'FR',
        // 'stripe_user[phone_number]' => $user['phone'],
        // 'stripe_user[business_name]' => $user['business_name'],
        // 'stripe_user[first_name]' => $user['first_name'],
        // 'stripe_user[last_name]' => $user['last_name'],
        // 'stripe_user[street_address]' => $user['address'],
        // 'stripe_user[city]' => $user['city'],
        // 'stripe_user[zip]' => $user['zip_code'],
        // 'stripe_user[state]' => substr($user['zip_code'], 0, 2),
        // 'stripe_user[dob_day]' => $birth_day,
        // 'stripe_user[dob_month]' => $birth_month,
        // 'stripe_user[dob_year]' => $birth_year,
        // 'stripe_user[currency]' => $this->currency,
        // 'stripe_user[url]' => base_url().'users/'.$user['user_url'],

    //
    // const token = await stripe.tokens.create({
    //     account: {
    //         business_type: 'individual',
    //         individual: {
    //             first_name: 'Jane',
    //             last_name: 'Doe',
    //             address: {
    //                 line1: '510 Townsend Street',
    //                 city: 'Paris',
    //                 state: 'GE',
    //                 postal_code: '75001',
    //                 country: 'FR',
    //             },
    //             email: 'custouumer119955@gmail.cmom',
    //             gender: 'male',
    //             phone: '+18008675309',
    //             dob: {
    //                 day: 2,
    //                 month: 1,
    //                 year: 1995,
    //             }
    //         },
    //         tos_shown_and_accepted: true,
    //     },
    // });


    // console.log(token);
    //
    // // const stripe = require('stripe')('sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr');
    //
    // const account = await stripe.accounts.create({
    //     account_token: token.id,
    //     business_profile: {
    //         mcc: '4582',
    //         name: 'test',
    //         url: 'https://my-first-business.com/',
    //         product_description: 'Car Washes'
    //     },
    //     type: 'custom',
    //     country: 'FR',
    //     email: 'custouumer119955@gmail.cmom',
    //     capabilities: {
    //         card_payments: {requested: true},
    //         transfers: {requested: true},
    //     },
    // });

    //
    // console.log(account);
    //
    //
    //
    // const cardholder = await stripe.issuing.cardholders.create(
    //     {
    //         name: 'Jenny Rosen',
    //         email: 'jenny.rosen@example.com',
    //         phone_number: '+18008675309',
    //         status: 'active',
    //         type: 'individual',
    //         individual: {
    //             first_name: 'Jenny',
    //             last_name: 'Rosen',
    //             dob: {
    //                 day: 1,
    //                 month: 11,
    //                 year: 1981,
    //             },
    //         },
    //         billing: {
    //             address: {
    //                 line1: '510 Townsend Street',
    //                 city: 'Paris',
    //                 state: 'GE',
    //                 postal_code: '75001',
    //                 country: 'FR',
    //             },
    //         },
    //     },
    //     {
    //         stripeAccount: 'acct_1NvakAQYaUT33qSt',
    //     }
    // );
    //
    //
    //
    // console.log(cardholder);


    // const accountLink = await stripe.accountLinks.create({
    //     account: 'acct_1Nuy1RQewTzbZTBM',
    //     refresh_url: 'https://example.com/reauth',
    //     return_url: 'http://localhost:9026/stripe-account-bank-on-boarding-redirect/',
    //     type: 'account_onboarding',
    // });
    //
    //
    // console.log(accountLink);


    // const stripe = require('stripe')('sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr');

    // const paymentIntent = await stripe.paymentIntents.create({
    //     customer: 'cus_OgXI9nshn8gaK7',
    //     amount: 100,
    //     currency: 'eur'
    // });

    // console.log(paymentIntent);


    // const paymentIntent = await stripe.charges.create({
    //     customer: 'cus_OgXI9nshn8gaK7',
    //     amount: 1000,
    //     currency: 'eur'
    // });
    //
    // console.log(paymentIntent);


    // acct_1NuwT2ABBpravRte

    //
    // axios.post('https://connect.stripe.com/oauth/token', {
    //     params: {
    //         'client_secret': '',
    //         'grant_type': 'authorization_code',
    //         'code': 'ac_OiNDhneD2Lf4SBi2GKykwcGEHRi92YdL'
    //     }
    // })
    // .then(function (response) {
    //     console.log(response);
    // });






    //
    //
    //
    // const [workSheetsFromFile] = xlsx.parse(`${__dirname}/test1.xlsx`);
    // //
    // //
    // // console.log(workSheetsFromFile.data);
    //
    //
    // for(let i = 1; i < workSheetsFromFile.data.length; i++){
    //     if(!workSheetsFromFile.data[i][0]) continue;
    //
    //     await oaciTypeModel.insert({
    //         oaci_code: workSheetsFromFile.data[i][0],
    //         airfield_name: workSheetsFromFile.data[i][1],
    //         city: workSheetsFromFile.data[i][2],
    //         runways_count: workSheetsFromFile.data[i][5],
    //         type: workSheetsFromFile.data[i][6],
    //     });
    // }
    //
    //


    return res.render('home/test', res.data);
};