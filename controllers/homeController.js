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



    // const oaciTypeModel = new OaciTypeModel();


    let a = [
        [1 ,     48.40825483307793  , 4.86867214251816],
        [5 ,     46.4418968         , 4.3487551],
        [6 ,     50.958102341904095 , 1.9553947448730469],
        [9 ,     49.59516990847224  , 3.6301652509713866],
        [10 ,     49.81616765471443  , 3.205638643044062],
        [11 ,     48.594208078563014 , 3.010425567626953],
        [12 ,     48.70973920391267  , 0.000729560852050781],
        [13 ,     51.042203393026064 , 2.5532054901123047],
        [14 ,     47.689890272830304 , -0.00489234924316406],
        [15 ,     50.42473974960779  , 1.5964245012452194],
        [17 ,     48.54303479503246  , -0.38280487060546875],
        [18 ,     49.48213523166804  , 4.365520798016651],
        [19 ,     49.973084780200935 , 2.6899337768554688],
        [20 ,     49.670960791738885 , 2.5728607177734375],
        [21 ,     48.927123650146044 , -0.14539718627929688],
        [22 ,     50.516111362316934 , 1.6226267720861465],
        [23 ,     49.623574092532614 , -1.830494361163304],
        [24 ,     50.32941604982874  , 3.458242984144877],
        [25 ,     49.410788684070845 , 5.890087483043027],
        [26 ,     48.539085314870384 , 0.5319786071777344],
        [27 ,     49.87192082329946  , 2.3878783789089786],
        [28 ,     44.17450553126265  , 0.5935885334094948],
        [30 ,     44.82969996852731  , -0.7129096984863281],
        [31 ,     44.82422126537857  , 0.5180740356445312],
        [34 ,     46.1760268245766   , -1.1940765380859375],
        [35 ,     46.58604287293068  , 0.3057704054649024],
        [36 ,     45.90232416434773  , 0.9183689827158803],
        [37 ,     46.22592791700753  , 2.3589706420898438],
        [38 ,     45.86323755296437  , 1.1817169189453125],
        [40 ,     46.31246947464678  , -0.398055913914408],
        [41 ,     43.62880886374451  , 1.3654911064388653],
        [42 ,     43.38134711419169  , -0.4195404052734375],
        [43 ,     43.44905567978509  , 1.2663459777832031],
        [44 ,     44.36769333471061  , -1.131919870198308],
        [45 ,     43.18434834365687  , -0.00021404630268229],
        [46 ,     45.729659044987145 , 0.22339563771257342],
        [47 ,     45.04068746018707  , 1.4871815466111737],
        [48 ,     45.19618178192377  , 0.8156176269430526],
        [49 ,     43.690652850856935 , -1.070866584777832],
        [50 ,     43.46886761482925  , -1.5238380432128906],
        [51 ,     46.78195855129872  , 0.5509872239053903],
        [52 ,     42.8009427522556   , 0.5994415283203125],
        [53 ,     44.351351245377614 , 1.4776033104220243],
        [54 ,     44.75344801764751  , -1.0622100975126303],
        [55 ,     46.17565732545566  , 1.9533719349963663],
        [56 ,     44.67197953472216  , 1.7896556854248047],
        [57 ,     43.0067838018131   , 1.103760573171595],
        [58 ,     44.59755709940557  , -1.1139106750488281],
        [59 ,     43.91320569364775  , 2.1144348619387987],
        [60 ,     45.48047527908163  , -0.4231452941894531],
        [61 ,     43.554107208371946 , 2.2937539426945097],
        [62 ,     43.58728958593464  , 1.4989043713799655],
        [63 ,     43.98698102585688  , 3.185265762948011],
        [64 ,     43.766288252287964 , -0.03316118251692979],
        [65 ,     43.164108511581965 , -0.5617396513718287],
        [66 ,     45.56704014910656  , -0.5161489466509961],
        [67 ,     43.76862934572133  , 2.012182932688109],
        [68 ,     44.40753352928723  , 2.4837915652014253],
        [69 ,     44.698261167366326 , -0.5959761574681388],
        [70 ,     46.96239779005899  , -0.15629273672914],
        [71 ,     45.5359441826009   , 2.422998396306828],
        [72 ,     44.369608041568945 , 2.025787576773874],
        [73 ,     44.39849810797574  , 0.7636478611843422],
        [74 ,     44.08631639391218  , 1.1247258267341653],
        [75 ,     45.62943765238291  , -0.9693434499208164],
        [76 ,     44.14677191418694  , -1.1654754462595007],
        [77 ,     43.70828798437297  , -0.24739955297134797],
        [78 ,     44.02720724149219  , 1.3761443783793537],
        [79 ,     45.27211928479894  , -0.452241933527735],
        [80 ,     45.42093052125603  , 2.0689790128487484],
        [81 ,     44.85142804855977  , 0.17927003441420286],
        [82 ,     43.88391794348947  , 1.8773301258309782],
        [83 ,     43.6869060472345   , 0.6008187998490166],
        [84 ,     44.98471349844104  , -0.1393890380859375],
        [85 ,     43.09078931661698  , 1.6956044710196316],
        [86 ,     45.49468112644308  , -1.0833353239540444],
        [87 ,     47.035765789517285 , 0.10037899017333984],
        [88 ,     44.4988011276351   , 0.1980757713317871],
        [89 ,     45.88917301237013  , -0.9813695705793313],
        [91 ,     45.95773490716604  , -1.311155278943279],
        [92 ,     43.277563527505286 , 0.5174443327532208],
        [93 ,     44.567330650626026 , -0.05501227696426580],
        [94 ,     44.792144960172735 , 1.2450530626681422],
        [95 ,     43.21493129873341  , 0.07772943159531032],
        [96 ,     45.197794470834395 , -0.8822965621948242],
        [97 ,     46.27149987760655  , 0.18894466989154424],
        [98 ,     46.581901588167554 , 0.6417096059124727],
        [99 ,     44.45929220963118  , 1.0073574752525616],
        [100 ,     44.875422482124634 , -0.47804451069612286],
        [101 ,     47.32579628040274  , -3.2003573007725894],
        [102 ,     48.44396697410121  , -2.102524407247588],
        [103 ,     48.4623182722397   , -5.064930031820958],
        [104 ,     48.05675948526725  , -2.923180005438779],
        [105 ,     47.33965131378483  , 0.9454292106843898],
        [106 ,     46.597646912305706 , 1.6031028428719285],
        [107 ,     47.48048173690713  , 2.394292221096217],
        [108 ,     47.61344053115668  , 2.784064548229175],
        [109 ,     46.8426160852023   , 1.6223203898004845],
        [110 ,     46.88739990670162  , 2.039289276075502],
        [111 ,     46.61991991664493  , 1.0866703998367244],
        [112 ,     47.96332446460234  , 2.690858612939544],
        [113 ,     47.26633853313589  , 0.6993427720039636],
        [114 ,     47.22115652113471  , 4.561219254580555],
        [115 ,     47.48017827422324  , -3.0970722882631607],
        [116 ,     47.69768130624441  , -2.0393216458904506],
        [117 ,     48.054687495673264 , -3.6635368818574077],
        [118 ,     47.54616346678017  , 5.2104150588727505],
        [119 ,     48.868830368147265 , 5.182321095579221],
        [120 ,     47.43169661712439  , 5.617509229067021],
        [121 ,     47.238810563475226 , 4.264862090364772],
        [122 ,     48.59377479144585  , 6.239620568250652],
        [123 ,     46.716922003766676 , -2.391663991442865],
        [124 ,     48.72176961087133  , 6.211799561879188],
        [125 ,     48.349062208707565 , 2.4259185791015625],
        [126 ,     49.079495781095495 , 1.6840657994416963],
        [127 ,     48.899376377058665 , 1.2540693578640338],
        [128 ,     49.04572442908442  , 2.353402928355268],
        [129 ,     48.759973681387955 , 3.2823062130837277],
        [130 ,     49.066140111090675 , 3.3550949842596545],
        [131 ,     47.40600929497337  , -1.18371204306017],
        [132 ,     48.38520718720719  , 5.144035631699597],
        [133 ,     46.44012772837929  , -0.7952864612176591],
        [134 ,     48.517634746169904 , 1.639159206288019],
        [135 ,     47.65573319476319  , 1.9879854211996273],
        [136 ,     48.42281347685699  , 4.492714539854177],
        [137 ,     48.15591557138165  , 2.1944636305713194],
        [138 ,     48.49836523688477  , 2.342037154176091],
        [139 ,     48.06792788330159  , 4.4103240966796875],
        [140 ,     48.35895295101616  , 5.7199990994810035],
        [141 ,     46.870495354336754 , 2.3777908510632617],
        [142 ,     47.193420642655525 , 2.0644857259952376],
        [143 ,     46.93314092424775  , -1.3241947668166554],
        [144 ,     46.56204657157064  , 4.9755900015435195],
        [145 ,     49.30487765594796  , 1.638233273492662],
        [146 ,     48.71030800959481  , 3.7646163890998396],
        [147 ,     48.10646463228574  , 7.3582142334523],
        [148 ,     47.739295780411275 , 7.432049714959237],
        [149 ,     48.55394471856746  , 7.777572553372383],
        [151 ,     47.502655145750374 , 3.8995482749171506],
        [152 ,     47.009308276807886 , 4.896398579830201],
        [153 ,     47.7014123275884   , 6.831786499422456],
        [154 ,     47.360348838227615 , 2.9176016225311185],
        [155 ,     47.385144063859315 , 4.947763725759189],
        [156 ,     47.04196155163985  , 5.432656844065953],
        [157 ,     47.99505970152232  , 3.396415068116543],
        [158 ,     46.67530642939584  , 5.470995202255429],
        [159 ,     46.60305981065999  , 4.33593196825663],
        [160 ,     46.46631652864877  , 4.133851865361269],
        [161 ,     48.29086312466746  , 3.246423068772457],
        [162 ,     47.98119341826541  , 3.7759914635297065],
        [163 ,     47.48075989005891  , 4.3425080576263975],
        [164 ,     49.15212278739134  , 5.934746881689761],
        [165 ,     49.483696395140676 , 5.569007680120093],
        [166 ,     48.71835149738195  , 7.076323411965841],
        [167 ,     49.12783724816117  , 7.105623883372267],
        [169 ,     49.12230139874158  , 5.470266239427328],
        [170 ,     46.761855662574135 , 5.819715985478857],
        [171 ,     48.26628073103751  , 7.006575724536579],
        [172 ,     47.14229995468614  , 4.967321441052941],
        [173 ,     45.51511900640503  , 3.266393498103155],
        [174 ,     45.872592026634294 , 5.184763823542684],
        [175 ,     44.39687001628923  , 4.716797034729616],
        [176 ,     45.06357872177663  , 5.099944975255797],
        [177 ,     44.44627544580472  , 4.332699844225374],
        [178 ,     45.49217769057557  , 4.532476023797334],
        [179 ,     45.46118039209873  , 4.827569399337328],
        [180 ,     45.68636680115961  , 5.453015708531708],
        [181 ,     45.65517835280011  , 4.912922571555556],
        [182 ,     44.704668798120736 , 3.8857886251120455],
        [183 ,     45.82075561384222  , 6.650946787160672],
        [184 ,     46.124688300120596 , 5.805053789276853],
        [185 ,     44.54414077923865  , 4.372319260574162],
        [186 ,     45.08117843821862  , 3.761501091609305],
        [187 ,     45.076747101707376 , 2.9930035999791382],
        [188 ,     45.321416865727016 , 3.360466025270643],
        [189 ,     46.20127773296011  , 5.2918397243042214],
        [190 ,     45.51524777639622  , 3.744797112325613],
        [191 ,     45.08800637591637  , 6.085234913615216],
        [192 ,     45.919347792172665 , 4.634909677901988],
        [193 ,     46.14065626016378  , 4.713968575886476],
        [194 ,     46.251650140865756 , 3.5872651534313693],
        [195 ,     46.53497532129135  , 3.4271743738283256],
        [197 ,     44.78162509879526  , 0.9563287435741907],
        [198 ,     43.91026237296493  , 0.38917937327710206],
        [199 ,     43.82300098295012  , 2.746936606542607],
        [200 ,     44.17882326198758  , 2.5099965774806288],
        [201 ,     45.26767396794807  , 0.01769385824061498],
        [202 ,     45.2401363360459   , 0.26713622920974345],
        [203 ,     43.91532670906379  , -0.9493067699419111],
        [204 ,     43.106790726132054 , 0.6160964095246824],
        [205 ,     42.79689329183726  , 0.435139161199416],
        [206 ,     43.47940719150083  , 1.9800723662043307],
        [207 ,     43.61125560479671  , 1.7235610688847691],
        [208 ,     45.37986672380735  , -1.1180640149782484],
        [209 ,     43.33642519738377  , -1.4229928882771592],
        [210 ,     45.964982049174196 , -0.5235664048320454],
        [212 ,     46.90493222869984  , -0.6950900400977744],
        [213 ,     47.439113722085835 , 3.5078347332192195],
        [214 ,     46.04021120435937  , 5.495081181802428],
        [215 ,     44.49619917699264  , 5.40323515095841],
        [216 ,     44.69536835394423  , 5.153377879554193],
        [217 ,     43.20077317108223  , 1.0468054738626664],
        [218 ,     45.824313529372056 , -1.0749435424804688],
        [219 ,     48.98540864668612  , 6.255361043998149],
        [220 ,     47.56057522194201  , -0.3084334250099219],
        [221 ,     49.345127026237186 , 3.2822141053039644],
        [222 ,     47.15045759019822  , 0.7127643758634328],
        [223 ,     46.71247297309732  , 2.945280369250205],
        [392 ,     47.758942575070414 , -3.437582997036761],
    ];





    const oaciTypeModel = new OaciTypeModel();

    for(const b of  a){
        await oaciTypeModel.update(b[0], {
            latitude: b[1],
            longitude: b[2]
        });

        await oaciTypeModel.freeResult();
    }



    // console.log(req.body);
    // console.log(req.params);
    // console.log(req.query);

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





    // const stripe = require('stripe')('sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr');
    //
    // const customer = await stripe.customers.update(
    //     'cus_OqEHlBVUW9y21x',
    //     {default_source: 'card_1O2r2JHsAwmdsPL7c10fSuaG'}
    // );
    //
    //
    //
    // console.log(customer);



    // const customer = await stripe.customers.retrieveSource(
    //     'cus_OgXI9nshn8gaK7',
    //     'card_1Nza48HsAwmdsPL7fPy4L06i'
    // );
    //
    //
    //
    // console.log(customer);
    //
    // const cards = await stripe.customers.listSources(
    //     'cus_OgXI9nshn8gaK7',
    //     {object: 'card'}
    // );
    //
    // console.log(cards);


    // 4242424242424242
    //
    // const card = await stripe.customers.createSource(
    //     'cus_OgXI9nshn8gaK7',
    //     {
    //         number: 4242424242424242
    //     }
    // );


    // const paymentMethod = await stripe.paymentMethods.create({
    //     type: 'customer_balance',
    //     card: {
    //         number: '5555555555554444',
    //         exp_month: 8,
    //         exp_year: 2024,
    //         cvc: '314',
    //     },
    // });


    // console.log(paymentMethod);


    // const stripe = require('stripe')('sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr');

    // const paymentMethod = await stripe.paymentMethods.create({
    //     type: 'card',
    //     card: {
    //         number: '4242424242424242',
    //         exp_month: 8,
    //         exp_year: 2024,
    //         cvc: '314',
    //     },
    // });




    // const bankAccount = await stripe.accounts.retrieveExternalAccount(
    //     'acct_1NxmFZQXht3fFlAO',
    //     'ba_1NxnYKQXht3fFlAOltJy1mbm'
    // );


    // const bankAccounts = await stripe.accounts.listExternalAccounts(
    //     'acct_1NxmFZQXht3fFlAO',
    //     {object: 'bank_account'}
    // );
    //
    // console.log(bankAccounts);

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

    // //
    // const token = await stripe.tokens.create({
    //     account: {
    //         business_type: 'individual',
    //         individual: {
    //             first_name: 'Jane',
    //             last_name: 'Doe',
    //             address: {
    //                 line1: '510 Townsend Street',
    //                 city: 'Paris',
    //                 // state: 'GE',
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
    //
    //
    // console.log(token);
    // //
    // // const stripe = require('stripe')('sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr');
    //
    // const account = await stripe.accounts.create({
    //     account_token: token.id,
    //     business_profile: {
    //         mcc: '4582',
    //         name: 'test',
    //         // url: 'https://my-first-business.com/',
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
    //
    // console.log(account);
    // //
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

    // const stripe = require('stripe')('sk_test_your_key');

    // const card = await stripe.customers.createSource('cus_OgX08hFV1PqP3L', {
    //     source: 'tok_mastercard'
    // });


    // const stripe = require('stripe')('sk_test_51NsQHOHsAwmdsPL7mMUW05rPs1h28LexLgPCZ0F8v9BMgVtWQlag3V8AbuP3C8VZt85oMXMFE2xb4YQW4hRzrNIl00glLB76xr');

    // const cardholder = await stripe.issuing.cardholders.create({
    //     name: 'Jenny Rosen',
    //     email: 'jenny.rosen@example.com',
    //     phone_number: '+33634554477',
    //     status: 'active',
    //     type: 'individual',
    //     individual: {
    //         first_name: 'Jenny',
    //         last_name: 'Rosen',
    //         dob: {day: 1, month: 11, year: 1981},
    //     },
    //     billing: {
    //         address: {
    //             line1: '123 Main Street',
    //             city: 'Paris',
    //             state: 'GA',
    //             postal_code: '75001',
    //             country: 'FR',
    //         },
    //     },
    // });
    //
    //
    //
    // console.log(cardholder);


    // const card = await stripe.issuing.cards.create({
    //     cardholder: 'ich_1NvhIWHsAwmdsPL7BTEe7PW8',
    //     currency: 'eur',
    //     type: 'virtual'
    // });
    //
    //
    // console.log(card);



    // const card = await stripe.issuing.cards.update(
    //     'ic_1NvhLbHsAwmdsPL7tZ8O8cDd',
    //     {
    //         status: 'active',
    //     }
    // );
    //
    // console.log(card);



    // const paymentMethod = await stripe.paymentMethods.create({
    //     type: 'card',
    //     card: {
    //         number: '4242424242424242',
    //         exp_month: 8,
    //         exp_year: 2024,
    //         cvc: '314',
    //     },
    // });
    //
    //
    // console.log(paymentMethod);


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


    // const paymentMethods = await stripe.paymentMethods.list({
    //     customer: 'cus_OqEHlBVUW9y21x',
    //     type: 'card',
    // });


    // const paymentIntent = await stripe.charges.create({
    //     customer: 'cus_OgXI9nshn8gaK7',
    //     amount: 1000,
    //     currency: 'eur',
    //     transfer_group: '111'
    // });
    //
    // console.log(paymentMethods.data[0]);


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