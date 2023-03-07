exports.seed = function (knex) {
  return knex("reservation")
    .del()
    .then(function () {
      return knex("reservation").insert([
        { rvowner_id: 1, listing_id: 7, date: "12/27/2019" },
        { rvowner_id: 10, listing_id: 13, date: "9/29/2020" },
        { rvowner_id: 10, listing_id: 8, date: "7/18/2020" },
        { rvowner_id: 11, listing_id: 10, date: "6/18/2019" },
        { rvowner_id: 11, listing_id: 9, date: "5/5/2021" },
        { rvowner_id: 12, listing_id: 19, date: "2/25/2022" },
        { rvowner_id: 13, listing_id: 17, date: "8/10/2022" },
        { rvowner_id: 13, listing_id: 7, date: "11/19/2020" },
        { rvowner_id: 14, listing_id: 16, date: "12/6/2019" },
        { rvowner_id: 14, listing_id: 16, date: "8/1/2019" },
        { rvowner_id: 14, listing_id: 6, date: "9/17/2019" },
        { rvowner_id: 15, listing_id: 5, date: "12/16/2019" },
        { rvowner_id: 15, listing_id: 7, date: "7/20/2020" },
        { rvowner_id: 16, listing_id: 10, date: "7/31/2021" },
        { rvowner_id: 16, listing_id: 9, date: "3/14/2020" },
        { rvowner_id: 17, listing_id: 15, date: "9/8/2022" },
        { rvowner_id: 17, listing_id: 20, date: "6/29/2022" },
        { rvowner_id: 17, listing_id: 5, date: "3/15/2022" },
        { rvowner_id: 2, listing_id: 4, date: "5/2/2020" },
        { rvowner_id: 3, listing_id: 14, date: "11/30/2019" },
        { rvowner_id: 4, listing_id: 1, date: "12/9/2020" },
        { rvowner_id: 4, listing_id: 18, date: "6/25/2022" },
        { rvowner_id: 4, listing_id: 19, date: "11/11/2020" },
        { rvowner_id: 4, listing_id: 7, date: "12/28/2021" },
        { rvowner_id: 5, listing_id: 13, date: "5/28/2021" },
        { rvowner_id: 5, listing_id: 16, date: "10/3/2022" },
        { rvowner_id: 5, listing_id: 7, date: "3/5/2019" },
        { rvowner_id: 5, listing_id: 9, date: "9/5/2021" },
        { rvowner_id: 8, listing_id: 1, date: "11/22/2020" },
        { rvowner_id: 8, listing_id: 10, date: "10/16/2019" },
        { rvowner_id: 8, listing_id: 15, date: "10/20/2022" },
        { rvowner_id: 8, listing_id: 15, date: "8/7/2020" },
        { rvowner_id: 9, listing_id: 10, date: "11/18/2021" },
        { rvowner_id: 9, listing_id: 16, date: "8/1/2021" },
        { rvowner_id: 9, listing_id: 20, date: "10/10/2021" },
      ]);
    });
};
