const router = require("express").Router();
const search = require("./search-model.js");
const axios = require("axios");

router.post("/dates", (req, res) => {
  const { start_date, end_date } = req.body;
  console.log({ start_date, end_date });
  if (!start_date || !end_date) {
    res.status(400).json({
      message: `Bad request:Client should not repeat the request without Modifications.`,
      Modifications: `Received values: start_date:${start_date} end_date:${end_date}.\nBoth 'start_date' and 'end_date' are required for request --searchListingsAvailableByDate--.`,
    });
  }
  search
    .findListingsNotReservedOnDate(start_date, end_date)
    .then((listings) =>
      listings.length === undefined
        ? res.status(404).json({ message: "the listings could not be found" })
        : listings.length === 0
        ? res
            .status(204)
            .json({ message: "No Listings matching these criteria." })
        : (res.status(200).json({ listings: listings, count: listings.length }),
          console.log({ listings }))
    )
    .catch((err) => {
      res.status(500).json({
        error: `There was an error on the server while attempting to search for listings with those parameters. --${err}.`,
      });
    });
});

router.post("/price", (req, res) => {
  const { min_price, max_price } = req.body;
  if (!min_price || !max_price) {
    res.status(400).json({
      message: `Bad request:Client should not repeat the request without Modifications.`,
      Modifications: `Received values: min_price:${min_price} max_price:${max_price}.\nBoth 'min_price' and 'max_price' are required for request --searchListingsAvailableByPrice--.`,
    });
  }
  console.log({ min_price }, { max_price });
  search
    .findListingsByPrice(min_price, max_price)
    .then((listings) =>
      listings.length === undefined
        ? res.status(404).json({ message: "the listings could not be found" })
        : listings.length === 0
        ? res
            .status(204)
            .json({ message: "No Listings matching these criteria." })
        : res.status(200).json({ listings: listings, count: listings.length })
    )
    .catch((err) => {
      res.status(500).json({
        error: `There was an error on the server while attempting to search for listings with those parameters. --${err}.`,
      });
    });
});
function convertAddressToLatLon(address) {}

router.post("/location", async (req, res) => {
  let { zip, city, state, lat, lon, range } = req.body;

  console.log("req.body", req.body);

  if (zip || (city && state)) {
    let address = zip || `${city},${state}`;
    console.log({ address });
    axios
      .get(
        `http://api.positionstack.com/v1/forward?access_key=${process.env.PS_ID}&query=${address}`
      )
      .then(({ data }) => {
        console.log("1", data.data[0].latitude);
        let { latitude, longitude } = data.data[0];
        if (latitude && longitude) {
          console.log(latitude, longitude);
          search
            .findListingsByLatLonRange(latitude, longitude, range)
            .then((listings) => res.status(209).json({ listings }))
            .catch((err) =>
              res.status(500).json({ err }, { message: "server error" })
            );
        }
        if (!longitude || !latitude) {
          res.status(400).json({
            message: `Bad request:Client should not repeat the request without Modifications.`,
            Modifications: `Received values: latitude:${latitude} longitude:${longitude}.\n A complete 'latitude' and 'longitude' pair is required for a latitude/longitude query. Submit both or alter the query to search for listings using a zip code or city & state combination.  --searchListingsAvailableByLocation--.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
  }
});

module.exports = router;
