const router = require('express').Router();
// const Trip = require('./reservation/reserve-model.js.js');

// return a reserved trip for a matching reservation id 
//  if userid = a related landowner or rvowner


// router.get('/reserve/:id', (req, res) => {

//     req.body
// })
// module.exports = router;





// //MVP
// 1. Users can register/create an account as either an **RV Owner** or a **Landowner** (web, mobile)
// 2. **Landowners** and **RV Owners** can login to the the app. (web, mobile)
// 3. **Landowners** can create, update and delete reservations of their available land. At a minimum, a reservation must include the land's location, description, price per day, and a photo. (web, mobile)
// 4. **RV Owners** can query/filter available reservations by location (at a minimum) and reserve a spot for their RV for a desired date(s) (web, mobile)


let Reservations = require('../jsondata/mock.js').reservations;


/// rv owners need to view reservations 
///rv owners need to create view update and deleted single reservations for the reservations by date availability
///rv owners need to  view  and deleted all reservations for the reservations by date availability
///rv owners need to  view  and deleted all reservations for the reservations by date availability
///rv owners need to create view update and deleted single fav reservations single reservations for the reservations by date availability


/// reservations =>get all  
/// reservations =>get all and crud by id 
/// fav reservations =>get all and add delete by id 

//hardcode reservations
router.get('/', async (req, res) => {

    res.status(200)
        .json(Reservations);
})


//hardcode reservation by req.params.id
router.get('/:id', async (req, res) => {

    const singlereservation = reservations.filter(reservation => reservation.id == req.params.id);
    res.status(200)
        .json({ singlereservation })
})


//hardcode add new reservation by req.body
router.post('/', async (req, res) => {

    const newreservation = req.body;
    await reservations.push(req.body);

    res.status(201)
        .json({ "newreservation added": newreservation, "reservation.length": reservations.length });

})


//hardcode delete reservation by req.params.id
router.delete('/:id', async (req, res) => {

    reservations.map((l, i) => {
        l.id == Number(req.params.id) ? delete reservations[i] : l
    })

    function cleanArray(actual) {
        var newArray = new Array();
        for (var i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }
    reservations = reservations.filter(function (v) { return v; });
    cleanArray(reservations);

    res.status(204)
        .json({ reservations })
})


module.exports = router;
