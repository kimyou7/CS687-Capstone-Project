const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    region: 'us-west-2',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
});
// Create DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2018-11-26' });

const params = {
    RequestItems: {
        weather: [
            {
                PutRequest: {
                    Item: {
                        name: { S: 'San Francisco, CA' },
                        image: { S: 'https://www.sfaf.org/wp-content/uploads/posts/SF_bridge_1200x800.jpg' },
                        today: {S:'Sunny'},
                        degree: { S: '62 °F'},
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        name: { S: 'Seattle, WA' },
                        image: { S: 'https://media.cntraveler.com/photos/60480c67ff9cba52f2a91899/16:9/w_2991,h_1682,c_limit/01-velo-header-seattle-needle.jpg' },
                        today: {S:'Mostly Cloudy'},
                        degree: { S: '61 °F'},
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        name: { S: 'Tacoma, WA' },
                        image: { S: 'https://www.tacomadome.org/assets/img/Dome-Info-Slide-46d862af4f.jpg' },
                        today: {S:'Mostly Cloudy'},
                        degree: { S: '63 °F'},
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        name: { S: 'Rexburg, ID' },
                        image: { S: 'https://thevillagerex.com/wp-content/uploads/2017/02/theivyrexburgidahoneartemplejpg20151030092457.jpg' },
                        today: {S:'Mostly Cloudy'},
                        degree: { S: '57 °F'},
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        name: { S: 'St. Louis, MO' },
                        image: { S: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Gateway_Arch%2C_St._Louis%2C_Missouri%2C_U.S.A.jpg' },
                        today: {S:'Partly Cloudy'},
                        degree: { S: '89 °F'},
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        name: { S: 'Phnom Penh, Cambodia' },
                        image: { S: 'https://a.cdn-hotels.com/gdcs/production66/d41/07b19af0-8ab2-492e-97af-1ba8c6cac50a.jpg' },
                        today: {S:'Sunny'},
                        degree: { S: '89 °F'},
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        name: { S: 'Battambang, Cambodia' },
                        image: { S: 'http://www.cambodianmoments.com/wp-content/uploads/2018/07/Phnom-Penh-——-Pursat-——-Battambang03.jpg' },
                        today: {S:'Cloudy'},
                        degree: { S: '78 °F'},
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        name: { S: 'Seoul, South Korea' },
                        image: { S: 'https://media.shermanstravel.com/Advice/952x460_seoul_istock.jpg' },
                        today: {S:'Partly Cloudy'},
                        degree: { S: '69 °F'},
                    },
                },
            },
            {
                PutRequest: {
                    Item: {
                        name: { S: 'Taipei, Taiwan' },
                        image: { S: 'https://cdn.britannica.com/14/130914-050-D22892DF/Taipei-101-building-Taiwan.jpg' },
                        today: {S:'Partly Cloudy'},
                        degree: { S: '79 °F'},
                    },
                },
            },
        ],
    },
};

ddb.batchWriteItem(params, (err, data) => {
    if (err) console.log(err);
    else console.log('success', data);
});

/* Add one item */
// const paramsA = {
//   TableName: 'books',
//   Item: {
//     name: { S: '' },
//     image: { S: '' },
//     themes: { SS: [] },
//   },
// };

// ddb.putItem(paramsA, (err, data) => {
//   if (err) console.log(err);
//   else console.log(data);
// });