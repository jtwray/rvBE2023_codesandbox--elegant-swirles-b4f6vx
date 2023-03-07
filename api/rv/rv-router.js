// MVP
// 1. Users can register/create an account as either an **RV Owner** or a **Landowner** (web, mobile)

// 2. **Landowners** and **RV Owners** can login to the the app. (web, mobile)

// 3. **Landowners** can create, update and delete listings of their available land. 
//      At a minimum, a listing must include the land's location, description, price per day, and a photo. (web, mobile)

// 4. **RV Owners** can query/filter available listings by location (at a minimum)

//      and reserve a spot for their RV for a desired date(s) (web, mobile)
const router = require('express').Router();
const listing = require('../jsondata/mock.js').listings

router.get('/', (req, res) => {
  res.status(200).json({ listings: listing })
})

module.exports = router
