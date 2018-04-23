const UberEat = require('../models/UberEat');
const faker = require('faker');
const rp = require('request-promise');

// UberEat.create({
//   name: 'Starbucks',
//   address: '555 bucks ave'
// })

// UberEat.find({}).then(eats => console.log(eats));
// let data = [];
// let count = 500;

// while ( count-- ) {
//   UberEat.create({
//     name: faker.company.companyName(),
//     address: faker.address.streetAddress()
//   });
// }

// for ( let i = 0; i < 500; i++ ) {

// }

UberEat.find({}).remove().then(() => console.log('removed...'));

module.exports = (app) => {
  app.get('/eats', (req, res) => {
    console.log(req.query);
    let options = {
      uri: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurant&location=${req.query.lat},${req.query.long}&radius=3200&key=AIzaSyDQEYOINnOnunGRCH1UmluDgkh_au21SCQ`,
      json: true
    };

    rp(options)
      .then(({ results }) => {
        res.send(results);
      })
  });

  app.post('/eats', (req, res) => {
    UberEat.find({
      name: req.body.name
    }).then(eat => {
      console.log(eat);
      if ( !eat.length ) {
        UberEat.create(req.body).then(() => {
          res.send({result: 1, message: 'Saved!' })
        });
      } else res.send({result: 0, message: 'Already Exists'})
    })
  });
}