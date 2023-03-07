const db = require("../../data/dbConfig.js");

module.exports = {
  find,
  findBy,
  findById,
  add,
  findListingsNotReservedOnDate,
  findListingsByPrice,
  findListingsByAddress,
  findListingsByLatLonRange,
};

function findListingsNotReservedOnDate(startDate, endDate) {
  // let vacancies,notbooked;
  // [...vacancies,..notbooked]
  console.log({startDate,endDate});
  return db("reservation as r")
    .join("listing as l", "r.listing_id", "l.id")
    .where("r.listing_id", null)
    .orWhereNotBetween("r.start_date", [startDate, endDate])
    .andWhereNotBetween("r.end_date", [startDate, endDate])
    .select("r.*", "l.*");
}
// .raw(`SELECT r.*,l.* WHERE r.listing_id IS NULL or r."startDate" not between '${startDate}' and '${endDate}' and r."endDate" not between '${startDate}' and '${endDate}' order by r."startDate"`)
// return db.raw(`SELECT  r.*,l.* FROM listing as l LEFT JOIN reservation as r ON l.id = r.listing_id WHERE r.listing_id IS NULL or r."startDate" not between '${startDate}' and '${endDate}' and r."endDate" not between '${startDate}' and '${endDate}' order by r."startDate"`)
function find() {
  return db("rv").select("id", "username", "password");
}

function findListingsByAddress(min_price, max_price) {}
function findListingsByLatLonRange(lat, lon, range) {
  let min_lat = lat - range,
    max_lat = lat + range,
    min_lon = lon - range,
    max_lon = lon + range;
  console.log({ min_lat, max_lat }, { min_lon, max_lon }, range);
  return db("listing as l")
    .join("amenities as a ", "l.id", "a.listing_id")
    .whereBetween("l.lat", [`${min_lat}`,` ${max_lat}`])
    .andWhereBetween("l.lon", [`${min_lon}`,`${max_lon}`])
    .select("l.*", "a.*");
}
function findListingsByPrice(min_price, max_price) {
  return db("listing as l")
    .join("amenities as a", "l.id", "a.listing_id")
    .whereBetween("l.price", [min_price, max_price])
    .select("l.*", "a.*");
}

function find() {
  return db("rv").select("id", "username", "password");
}

function findBy(prop, filter) {
  let table = prop.toString();
  return db(table).where(filter);
}

function findById(id) {
  console.log(id);
  return db("rv").where("id", id).first();
}

function add(rv) {
  return db("rv")
    .insert(rv, "id")
    .then(([id]) => {
      return findById(id);
    });
}
