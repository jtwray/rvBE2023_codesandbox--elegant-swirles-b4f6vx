const db = require("../../data/dbConfig.js")
const list=require('./listing-model.js')
const router = require('express').Router();
// //MVP
// 1. Users can register/create an account as either an **RV Owner** or a **Landowner** (web, mobile)
// 2. **Landowners** and **RV Owners** can login to the the app. (web, mobile)
// 3. **Landowners** can create, update and delete listings of their available land. At a minimum, a listing must include the land's location, description, price per day, and a photo. (web, mobile)
// 4. **RV Owners** can query/filter available listings by location (at a minimum) and reserve a spot for their RV for a desired date(s) (web, mobile)
// npm run server
/// rv owners need to view listings 
///rv owners need to create view update and deleted single reservations for the listings by date availability
///rv owners need to  view  and deleted all reservations for the listings by date availability
///rv owners need to  view  and deleted all reservations for the listings by date availability
///rv owners need to create view update and deleted single fav reservations single reservations for the listings by date availability

router.get('/', async (req, res) => {
list.find()
.then((listings)=>{
        listings.length==undefined?
        res.status(404).json({message:"the listings could not be found"})
        :
        listings.length==0?res.status(200).json({message:"No listings. "})
        :
        res.status(200).json({ listings })
    })
    .catch((error)=>{
        res.status(500).json({error:`there was an error on the server while attempting to retrieve the listings.--+${error}`});console.error(error);
    })
})

//hardcode listing by req.params.id
// this can return listings by owner or listing id
router.get('/:id/listings', async (req, res) => {
list.findBy('listing',req.params.id)
    .then(singleListing => {  
         singleListing.length==0||undefined
    ?
     res.status(404).json({message:"the listing could not be found"})
    :
     res.status(200).json({ singleListing })
    })
.catch(error=>{
     res.status(500).json({message:error}) ;console.error(error)})
})
router.get('/:id/listing/:id', async (req, res) => {
list.findBy('listing',req.params.id)
    .then(singleListing => {  
         singleListing.length==0||undefined
    ?
     res.status(404).json({message:"the listing could not be found"})
    :
     res.status(200).json({ singleListing })
    })
.catch(error=>{
     res.status(500).json({message:error}) ;console.error(error)})
})

//[GET] owner listing with upcoming reservations 
router.get('/:id/reservation', async (req, res) => {
list.findBy('listing',req.params.id)
    .then(singleListing => {  
         singleListing.length==0||undefined
    ?
     res.status(404).json({message:"the listing could not be found"})
    :
     res.status(200).json({ singleListing })
    })
.catch(error=>{
     res.status(500).json({message:error}) ;console.error(error)})
})

//hardcode add new listing by req.body
router.post('/', async (req, res) => {
    const newlisting = list.add(req.body)
    .then(listingUp => {
        res.status(201)
           .json({ "newlisting added": listingUp })
})
    .catch(error => {
        res.status(500)
            .json({ error: "thatdidnt work my friend" }); console.error(error)})
})

router.put('/:id', (req, res) => {
  list.update(req.params.id, req.body)
    .then((updatedListing) => {   updatedListing.length==0||undefined?
   res
   .status(404)
   .json({message:"the listing could not be found"})
   :
      res.status(200).json({ message: 'Listing updated successfully',updatedListing });
    })
    .catch(error => {
      console.log('PUT /api/user/:id Error', error);
      res.status(500).json({ error: 'We ran into an error updating the listing' });
    });
});

router.delete('/:id', (req, res) => {
  list.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: 'The listing has been nuked' });
      } else {
        res.status(404).json({ message: 'The listing could not be found' });
      }
    })
    .catch(error => {
      // log error to server
      console.log(error);
      res.status(500).json({
        message: 'Error removing the listing',
      });
    });
});

module.exports = router;
