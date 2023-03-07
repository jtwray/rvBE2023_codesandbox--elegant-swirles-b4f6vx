
const util = require("util")
const stream = require('stream');
const fs = require('fs');
const pipeline = util.promisify(stream.pipeline);

let listings = [
    {
        title: "Lake Front Dream Escape",
        price: "$98.13",
        landowner_id: 1,
        photo: "https://i.imgur.com/zmbaXFD.webp",
        address: "30 MEMORIAL DR",
        zip: " 02322",
        state: " MA",
        city: " AVON",
        lat: "-71.033226",
        lon: "42.121796",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },

    {
        title: "Breathtaking Sunrises",
        price: "$112.78",
        landowner_id: 59,
        photo: "https://i.imgur.com/qgRYDex.webp",
        address: "250 HARTFORD AVE",
        zip: " 02019",
        state: " MA",
        city: " BELLINGHAM",
        lat: "-71.466995",
        lon: "42.114178",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Fresh Mountain Air",
        price: "$161.84",
        landowner_id: 25,
        photo: "https://i.imgur.com/l94JiT9.webp",
        address: "700 OAK ST",
        zip: " 02301",
        state: " MA",
        city: " BROCKTON",
        lat: "-71.057724",
        lon: "42.101124",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$159.55",
        landowner_id: 28,
        photo: "https://i.imgur.com/pbUQXCF.webp",
        address: "591 MEMORIAL DR",
        zip: " 01020",
        state: " MA",
        city: " CHICOPEE",
        lat: "-72.57639",
        lon: "42.17348",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "Wooded Wonderland Minutes from the Metro",
        price: "$69.33",
        landowner_id: 10,
        photo: "https://i.imgur.com/hCA9ZwX.webp",
        address: "137 TEATICKET HWY",
        zip: " 02536",
        state: " MA",
        city: " EAST FALMOUTH",
        lat: "-70.59611",
        lon: "41.56443",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$169.22",
        landowner_id: 81,
        photo: "https://i.imgur.com/oGncYsR.webp",
        address: "42 FAIRHAVEN COMMONS WAY",
        zip: " 02719",
        state: " MA",
        city: " FAIRHAVEN",
        lat: "-70.88628",
        lon: "41.644257",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$218.02",
        landowner_id: 87,
        photo: "https://i.imgur.com/bMPEl58.webp",
        address: "374 WILLIAM S CANNING BLVD",
        zip: " 02721",
        state: " MA",
        city: " FALL RIVER",
        lat: "-71.161514",
        lon: "41.674385",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Four Wheel Drive Mud Retreat",
        price: "$179.94",
        landowner_id: 15,
        photo: "https://i.imgur.com/jMozf8R.webp",
        address: "121 WORCESTER RD",
        zip: " 01701",
        state: " MA",
        city: " FRAMINGHAM",
        lat: "-71.40022",
        lon: "42.29875",
        description: "non-volatile",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$154.56",
        landowner_id: 17,
        photo: "https://i.imgur.com/1bC79NF.webp",
        address: "677 TIMPANY BLVD",
        zip: " 01440",
        state: " MA",
        city: " GARDNER",
        lat: "-71.99177",
        lon: "42.549988",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Wide Open Spaces Super TALL Blue Skies Fresh Air",
        price: "$193.62",
        landowner_id: 76,
        photo: "https://i.imgur.com/ZwXXHZf.webp",
        address: "295 PLYMOUTH ST",
        zip: " 02338",
        state: " MA",
        city: " HALIFAX",
        lat: "-70.84345",
        lon: "41.996315",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "River Life at its Best",
        price: "$137.42",
        landowner_id: 65,
        photo: "https://i.imgur.com/27rhlxH.webp",
        address: "1775 WASHINGTON ST",
        zip: " 02339",
        state: " MA",
        city: " HANOVER",
        lat: "-70.84535",
        lon: "42.147366",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$260.39",
        landowner_id: 33,
        photo: "https://i.imgur.com/53oXIGq.webp",
        address: "280 WASHINGTON ST",
        zip: " 01749",
        state: " MA",
        city: " HUDSON",
        lat: "-71.56461",
        lon: "42.375977",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Breathtaking Sunrises",
        price: "$247.49",
        landowner_id: 32,
        photo: "https://i.imgur.com/z5FnKQ0.webp",
        address: "11 JUNGLE RD",
        zip: " 01453",
        state: " MA",
        city: " LEOMINSTER",
        lat: "-71.72751",
        lon: "42.49107",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "Fresh Mountain Air",
        price: "$260.81",
        landowner_id: 92,
        photo: "https://i.imgur.com/fqkyi8O.webp",
        address: "301 MASSACHUSETTS AVE",
        zip: " 01462",
        state: " MA",
        city: " LUNENBURG",
        lat: "-71.756516",
        lon: "42.593716",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$186.82",
        landowner_id: 66,
        photo: "https://i.imgur.com/Zq6sanZ.webp",
        address: "780 LYNNWAY",
        zip: " 01905",
        state: " MA",
        city: " LYNN",
        lat: "-70.96315",
        lon: "42.45016",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$51.68",
        landowner_id: 83,
        photo: "https://i.imgur.com/QeuTMAd.webp",
        address: "830 CURRAN HWY",
        zip: " 01247",
        state: " MA",
        city: " NORTH ADAMS",
        lat: "-73.106476",
        lon: "42.679737",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$127.90",
        landowner_id: 49,
        photo: "https://i.imgur.com/jvJILEi.webp",
        address: "200 OTIS ST",
        zip: " 01532",
        state: " MA",
        city: " NORTHBOROUGH",
        lat: "-71.65583",
        lon: "42.28852",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$257.76",
        landowner_id: 7,
        photo: "https://i.imgur.com/OlTKNPt.webp",
        address: "180 N KING ST",
        zip: " 01060",
        state: " MA",
        city: " NORTHAMPTON",
        lat: "-72.64154",
        lon: "42.34253",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Wide Open Spaces Super TALL Blue Skies Fresh Air",
        price: "$215.68",
        landowner_id: 17,
        photo: "https://i.imgur.com/VlWGiIe.webp",
        address: "555 S MAIN ST",
        zip: " 01364",
        state: " MA",
        city: " ORANGE",
        lat: "-72.30423",
        lon: "42.568398",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "River Life at its Best",
        price: "$291.65",
        landowner_id: 62,
        photo: "https://i.imgur.com/wAlSXth.webp",
        address: "555 HUBBARD AVE",
        zip: " 01201",
        state: " MA",
        city: " PITTSFIELD",
        lat: "-73.196724",
        lon: "42.468338",
        description: "non-volatile",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$80.82",
        landowner_id: 12,
        photo: "https://i.imgur.com/U6oPRwj.webp",
        address: "301 FALLS BLVD",
        zip: " 02169",
        state: " MA",
        city: " QUINCY",
        lat: "-70.98604",
        lon: "42.238014",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },

    {
        title: "Fresh Mountain Air",
        price: "$78.10",
        landowner_id: 53,
        photo: "https://i.imgur.com/vXE4VRg.webp",
        address: "450 HIGHLAND AVE",
        zip: " 01970",
        state: " MA",
        city: " SALEM",
        lat: "-70.934044",
        lon: "42.493847",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$285.68",
        landowner_id: 65,
        photo: "https://i.imgur.com/FWGnQn6.webp",
        address: "1180 FALL RIVER AVE",
        zip: " 02771",
        state: " MA",
        city: " SEEKONK",
        lat: "-71.326294",
        lon: "41.793045",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$73.40",
        landowner_id: 58,
        photo: "https://i.imgur.com/pm4hjoP.webp",
        address: "1105 BOSTON RD",
        zip: " 01119",
        state: " MA",
        city: " SPRINGFIELD",
        lat: "-72.50814",
        lon: "42.13879",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$59.93",
        landowner_id: 42,
        photo: "https://i.imgur.com/avgI4NE.webp",
        address: "100 CHARLTON RD",
        zip: " 01566",
        state: " MA",
        city: " STURBRIDGE",
        lat: "-72.05778",
        lon: "42.12286",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$63.13",
        landowner_id: 6,
        photo: "https://i.imgur.com/WkMRLA9.webp",
        address: "333 MAIN ST",
        zip: " 01876",
        state: " MA",
        city: " TEWKSBURY",
        lat: "-71.25923",
        lon: "42.620525",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Four Wheel Drive Mud Retreat",
        price: "$174.70",
        landowner_id: 69,
        photo: "https://i.imgur.com/oAVNf6n.webp",
        address: "352 PALMER RD",
        zip: " 01082",
        state: " MA",
        city: " WARE",
        lat: "-72.28096",
        lon: "42.239468",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$291.83",
        landowner_id: 86,
        photo: "https://i.imgur.com/B208b09.webp",
        address: "3005 CRANBERRY HWY",
        zip: " 02538",
        state: " MA",
        city: " EAST WAREHAM",
        lat: "-70.662926",
        lon: "41.75934",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$236.90",
        landowner_id: 3,
        photo: "https://i.imgur.com/xx4cZRb.webp",
        address: "250 STATE RTE 59",
        zip: " 10901",
        state: " NY",
        city: " AIRMONT",
        lat: "-74.13641",
        lon: "41.112392",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$52.34",
        landowner_id: 6,
        photo: "https://i.imgur.com/FZWis5M.webp",
        address: "2055 NIAGARA FALLS BLVD",
        zip: " 14228",
        state: " NY",
        city: " AMHERST",
        lat: "-78.82229",
        lon: "43.011",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$146.33",
        landowner_id: 72,
        photo: "https://i.imgur.com/OiVtmvG.webp",
        address: "101 SANFORD AVE",
        zip: " 12010",
        state: " NY",
        city: " AMSTERDAM",
        lat: "-74.17464",
        lon: "42.945038",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$149.84",
        landowner_id: 82,
        photo: "https://i.imgur.com/oal0A1B.webp",
        address: "6265 BROCKPORT SPENCERPORT RD",
        zip: " 14420",
        state: " NY",
        city: " BROCKPORT",
        lat: "-77.93182",
        lon: "43.1983",
        description: "non-volatile",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$77.58",
        landowner_id: 80,
        photo: "https://i.imgur.com/NAbRfc1.webp",
        address: "3191 CO RD 10",
        zip: " 14424",
        state: " NY",
        city: " CANANDAIGUA",
        lat: "-77.245605",
        lon: "42.87586",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Wooded Wonderland Minutes from the Metro",
        price: "$221.26",
        landowner_id: 8,
        photo: "https://i.imgur.com/syiM87E.webp",
        address: "30 CATSKILL CMNS",
        zip: " 12414",
        state: " NY",
        city: " CATSKILL",
        lat: "-73.881584",
        lon: "42.21326",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$123.55",
        landowner_id: 62,
        photo: "https://i.imgur.com/W8EPbaU.webp",
        address: "3018 EAST AVE",
        zip: " 13036",
        state: " NY",
        city: " CENTRAL SQUARE",
        lat: "-76.14007",
        lon: "43.284954",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$122.73",
        landowner_id: 85,
        photo: "https://i.imgur.com/cAcpkMt.webp",
        address: "8064 BREWERTON RD",
        zip: " 13039",
        state: " NY",
        city: " CICERO",
        lat: "-76.12012",
        lon: "43.16176",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$237.02",
        landowner_id: 47,
        photo: "https://i.imgur.com/v4UVlvq.webp",
        address: "85 CROOKED HILL RD",
        zip: " 11725",
        state: " NY",
        city: " COMMACK",
        lat: "-73.292786",
        lon: "40.813286",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "Fresh Mountain Air",
        price: "$96.00",
        landowner_id: 67,
        photo: "https://i.imgur.com/tXN6YmI.webp",
        address: "2465 HEMPSTEAD TPKE",
        zip: " 11554",
        state: " NY",
        city: " EAST MEADOW",
        lat: "-73.54468",
        lon: "40.7247",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$102.41",
        landowner_id: 19,
        photo: "https://i.imgur.com/whv3jtM.webp",
        address: "6438 BASILE ROWE",
        zip: " 13057",
        state: " NY",
        city: " EAST SYRACUSE",
        lat: "-76.05925",
        lon: "43.063206",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$170.65",
        landowner_id: 62,
        photo: "https://i.imgur.com/BvlrxK3.webp",
        address: "25737 US HWY 11",
        zip: " 13637",
        state: " NY",
        city: " EVANS MILLS",
        lat: "-75.841125",
        lon: "44.03924",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$178.72",
        landowner_id: 86,
        photo: "https://i.imgur.com/DoNiQTJ.webp",
        address: "10401 BENNETT RD",
        zip: " 14063",
        state: " NY",
        city: " FREDONIA",
        lat: "-79.31044",
        lon: "42.455254",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Four Wheel Drive Mud Retreat",
        price: "$152.02",
        landowner_id: 6,
        photo: "https://i.imgur.com/9wWTTgH.webp",
        address: "4300 LAKEVILLE RD",
        zip: " 14454",
        state: " NY",
        city: " GENESEO",
        lat: "-77.784775",
        lon: "42.799103",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$206.78",
        landowner_id: 65,
        photo: "https://i.imgur.com/PUI4rs8.webp",
        address: "311 US HWY 9W",
        zip: " 12077",
        state: " NY",
        city: " GLENMONT",
        lat: "-73.79052",
        lon: "42.605846",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Wide Open Spaces Super TALL Blue Skies Fresh Air",
        price: "$154.36",
        landowner_id: 58,
        photo: "https://i.imgur.com/GcGYxEz.webp",
        address: "200 DUTCH MEADOWS LN",
        zip: " 12302",
        state: " NY",
        city: " GLENVILLE",
        lat: "-73.94523",
        lon: "42.8398",
        description: "non-volatile",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$129.18",
        landowner_id: 18,
        photo: "https://i.imgur.com/ngLMMXm.webp",
        address: "1549 US HWY 9",
        zip: " 12065",
        state: " NY",
        city: " HALFMOON",
        lat: "-73.74945",
        lon: "42.845123",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$168.18",
        landowner_id: 59,
        photo: "https://i.imgur.com/cxcbiTF.webp",
        address: "5360 SOUTHWESTERN BLVD",
        zip: " 14075",
        state: " NY",
        city: " HAMBURG",
        lat: "-78.86971",
        lon: "42.741455",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "Breathtaking Sunrises",
        price: "$110.66",
        landowner_id: 31,
        photo: "https://i.imgur.com/qBWIokl.webp",
        address: "103 N CAROLINE ST",
        zip: " 13350",
        state: " NY",
        city: " HERKIMER",
        lat: "-74.9938",
        lon: "43.023956",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$280.72",
        landowner_id: 78,
        photo: "https://i.imgur.com/7yH4ksV.webp",
        address: "1400 CO RD 64",
        zip: " 14845",
        state: " NY",
        city: " HORSEHEADS",
        lat: "-76.85823",
        lon: "42.16002",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$264.59",
        landowner_id: 18,
        photo: "https://i.imgur.com/W1HFYfS.webp",
        address: "2 GANNETT DR",
        zip: " 13790",
        state: " NY",
        city: " JOHNSON CITY",
        lat: "-75.94906",
        lon: "42.115845",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$292.61",
        landowner_id: 85,
        photo: "https://i.imgur.com/yhFYwHv.webp",
        address: "350 E FAIRMOUNT AVE",
        zip: " 14750",
        state: " NY",
        city: " LAKEWOOD",
        lat: "-79.29773",
        lon: "42.098442",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$194.68",
        landowner_id: 79,
        photo: "https://i.imgur.com/SOamOMF.webp",
        address: "5783 S TRANSIT RD",
        zip: " 14094",
        state: " NY",
        city: " LOCKPORT",
        lat: "-78.69689",
        lon: "43.14414",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "River Life at its Best",
        price: "$88.63",
        landowner_id: 12,
        photo: "https://i.imgur.com/gNtMkpU.webp",
        address: "425 STATE RTE 31",
        zip: " 14502",
        state: " NY",
        city: " MACEDON",
        lat: "-77.297",
        lon: "43.06974",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$174.31",
        landowner_id: 83,
        photo: "https://i.imgur.com/OWZxfJo.webp",
        address: "200 SUNRISE MALL",
        zip: " 11758",
        state: " NY",
        city: " MASSAPEQUA",
        lat: "-73.43535",
        lon: "40.681034",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Breathtaking Sunrises",
        price: "$183.75",
        landowner_id: 8,
        photo: "https://i.imgur.com/AfAVj0R.webp",
        address: "43 STEPHENVILLE ST",
        zip: " 13662",
        state: " NY",
        city: " MASSENA",
        lat: "-74.876015",
        lon: "44.92533",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Fresh Mountain Air",
        price: "$176.82",
        landowner_id: 47,
        photo: "https://i.imgur.com/VEyRRE1.webp",
        address: "750 MIDDLE COUNTRY RD",
        zip: " 11953",
        state: " NY",
        city: " MIDDLE ISLAND",
        lat: "-72.94614",
        lon: "40.882267",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$76.00",
        landowner_id: 19,
        photo: "https://i.imgur.com/rhic9us.webp",
        address: "3133 MAIN ST",
        zip: " 10547",
        state: " NY",
        city: " MOHEGAN LAKE",
        lat: "-73.86391",
        lon: "41.31467",
        description: "non-volatile",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$111.44",
        landowner_id: 85,
        photo: "https://i.imgur.com/Y7pxAI8.webp",
        address: "288 LARKIN DR",
        zip: " 10950",
        state: " NY",
        city: " MONROE",
        lat: "-74.15016",
        lon: "41.320614",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Wooded Wonderland Minutes from the Metro",
        price: "$234.77",
        landowner_id: 96,
        photo: "https://i.imgur.com/1yn4hYQ.webp",
        address: "41 ANAWANA LAKE RD",
        zip: " 12701",
        state: " NY",
        city: " MONTICELLO",
        lat: "-74.68092",
        lon: "41.670395",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$180.67",
        landowner_id: 16,
        photo: "https://i.imgur.com/mEWaQ2o.webp",
        address: "4765 COMMERCIAL DR",
        zip: " 13413",
        state: " NY",
        city: " NEW HARTFORD",
        lat: "-75.30768",
        lon: "43.092762",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$279.14",
        landowner_id: 8,
        photo: "https://i.imgur.com/Earhzqb.webp",
        address: "1201 STATE RTE 300",
        zip: " 12550",
        state: " NY",
        city: " NEWBURGH",
        lat: "-74.0723",
        lon: "41.496624",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Four Wheel Drive Mud Retreat",
        price: "$290.48",
        landowner_id: 70,
        photo: "https://i.imgur.com/RjZZ4Vh.webp",
        address: "255 W MAIN ST",
        zip: " 06001",
        state: " CT",
        city: " AVON",
        lat: "-72.85602",
        lon: "41.813335",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$102.29",
        landowner_id: 66,
        photo: "https://i.imgur.com/oBfn7pz.webp",
        address: "120 COMMERCIAL PKWY",
        zip: " 06405",
        state: " CT",
        city: " BRANFORD",
        lat: "-72.831245",
        lon: "41.278526",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$201.46",
        landowner_id: 67,
        photo: "https://i.imgur.com/6Lv6PRJ.webp",
        address: "1400 FARMINGTON AVE",
        zip: " 06010",
        state: " CT",
        city: " BRISTOL",
        lat: "-72.90152",
        lon: "41.698063",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "Wide Open Spaces Super TALL Blue Skies Fresh Air",
        price: "$67.39",
        landowner_id: 26,
        photo: "https://i.imgur.com/dKkPs9a.webp",
        address: "161 BERLIN RD",
        zip: " 06416",
        state: " CT",
        city: " CROMWELL",
        lat: "-72.71462",
        lon: "41.607918",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$191.85",
        landowner_id: 8,
        photo: "https://i.imgur.com/ZiVjbxU.webp",
        address: "656 NEW HAVEN AVE",
        zip: " 06418",
        state: " CT",
        city: " DERBY",
        lat: "-73.05724",
        lon: "41.31217",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$197.40",
        landowner_id: 79,
        photo: "https://i.imgur.com/DEH3T5F.webp",
        address: "69 PROSPECT HILL RD",
        zip: " 06088",
        state: " CT",
        city: " EAST WINDSOR",
        lat: "-72.606895",
        lon: "41.922188",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Fresh Mountain Air",
        price: "$140.85",
        landowner_id: 87,
        photo: "https://i.imgur.com/gaeicr0.webp",
        address: "900 BOSTON POST RD",
        zip: " 06437",
        state: " CT",
        city: " GUILFORD",
        lat: "-72.67904",
        lon: "41.288532",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$154.35",
        landowner_id: 18,
        photo: "https://i.imgur.com/zm8Oq63.webp",
        address: "495 FLATBUSH AVE",
        zip: " 06106",
        state: " CT",
        city: " HARTFORD",
        lat: "-72.71262",
        lon: "41.742516",
        description: "non-volatile",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$58.98",
        landowner_id: 27,
        photo: "https://i.imgur.com/YdiMYIK.webp",
        address: "1365 BOSTON POST RD",
        zip: " 06460",
        state: " CT",
        city: " MILFORD",
        lat: "-73.03365",
        lon: "41.24055",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$67.64",
        landowner_id: 14,
        photo: "https://i.imgur.com/x1pEryv.webp",
        address: "1100 NEW HAVEN RD",
        zip: " 06770",
        state: " CT",
        city: " NAUGATUCK",
        lat: "-73.02807",
        lon: "41.469112",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$133.04",
        landowner_id: 36,
        photo: "https://i.imgur.com/JWUiMXT.webp",
        address: "164 DANBURY RD",
        zip: " 06776",
        state: " CT",
        city: " NEW MILFORD",
        lat: "-73.41712",
        lon: "41.552082",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$108.11",
        landowner_id: 55,
        photo: "https://i.imgur.com/zmbaXFD.webp",
        address: "3164 BERLIN TPKE",
        zip: " 06111",
        state: " CT",
        city: " NEWINGTON",
        lat: "-72.721695",
        lon: "41.66243",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Wide Open Spaces Super TALL Blue Skies Fresh Air",
        price: "$50.36",
        landowner_id: 29,
        photo: "https://i.imgur.com/qgRYDex.webp",
        address: "474 BOSTON POST RD",
        zip: " 06256",
        state: " CT",
        city: " NORTH WINDHAM",
        lat: "-72.168",
        lon: "41.74574",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "River Life at its Best",
        price: "$234.15",
        landowner_id: 9,
        photo: "https://i.imgur.com/l94JiT9.webp",
        address: "650 MAIN AVE",
        zip: " 06851",
        state: " CT",
        city: " NORWALK",
        lat: "-73.42471",
        lon: "41.152245",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$224.77",
        landowner_id: 73,
        photo: "https://i.imgur.com/pbUQXCF.webp",
        address: "680 CONNECTICUT AVE",
        zip: " 06854",
        state: " CT",
        city: " NORWALK",
        lat: "-73.44991",
        lon: "41.0946",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$160.56",
        landowner_id: 76,
        photo: "https://i.imgur.com/hCA9ZwX.webp",
        address: "220 SALEM TPKE",
        zip: " 06360",
        state: " CT",
        city: " NORWICH",
        lat: "-72.13006",
        lon: "41.506138",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "Fresh Mountain Air",
        price: "$142.72",
        landowner_id: 20,
        photo: "https://i.imgur.com/oGncYsR.webp",
        address: "625 SCHOOL ST",
        zip: " 06260",
        state: " CT",
        city: " PUTNAM",
        lat: "-71.8886",
        lon: "41.924446",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$172.87",
        landowner_id: 82,
        photo: "https://i.imgur.com/bMPEl58.webp",
        address: "80 TOWN LINE RD",
        zip: " 06067",
        state: " CT",
        city: " ROCKY HILL",
        lat: "-72.658066",
        lon: "41.682217",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$115.93",
        landowner_id: 88,
        photo: "https://i.imgur.com/jMozf8R.webp",
        address: "465 BRIDGEPORT AVE",
        zip: " 06484",
        state: " CT",
        city: " SHELTON",
        lat: "-73.11237",
        lon: "41.289597",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$172.40",
        landowner_id: 83,
        photo: "https://i.imgur.com/1bC79NF.webp",
        address: "235 QUEEN ST",
        zip: " 06489",
        state: " CT",
        city: " SOUTHINGTON",
        lat: "-72.87323",
        lon: "41.625",
        description: "non-volatile",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$73.37",
        landowner_id: 21,
        photo: "https://i.imgur.com/ZwXXHZf.webp",
        address: "970 TORRINGFORD ST",
        zip: " 06790",
        state: " CT",
        city: " TORRINGTON",
        lat: "-73.08114",
        lon: "41.820038",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$162.78",
        landowner_id: 39,
        photo: "https://i.imgur.com/27rhlxH.webp",
        address: "844 N COLONY RD",
        zip: " 06492",
        state: " CT",
        city: " WALLINGFORD",
        lat: "-72.81123",
        lon: "41.479355",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "Four Wheel Drive Mud Retreat",
        price: "$54.87",
        landowner_id: 19,
        photo: "https://i.imgur.com/53oXIGq.webp",
        address: "910 WOLCOTT ST",
        zip: " 06705",
        state: " CT",
        city: " WATERBURY",
        lat: "-73.0079",
        lon: "41.56631",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$233.71",
        landowner_id: 27,
        photo: "https://i.imgur.com/z5FnKQ0.webp",
        address: "155 WATERFORD PKWY N",
        zip: " 06385",
        state: " CT",
        city: " WATERFORD",
        lat: "-72.16108",
        lon: "41.368256",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$293.52",
        landowner_id: 30,
        photo: "https://i.imgur.com/fqkyi8O.webp",
        address: "515 SAW MILL RD",
        zip: " 06516",
        state: " CT",
        city: " W HAVEN",
        lat: "-72.975624",
        lon: "41.269814",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "River Life at its Best",
        price: "$293.24",
        landowner_id: 18,
        photo: "https://i.imgur.com/Zq6sanZ.webp",
        address: "630 COLONIAL PROMENADE PKWY",
        zip: " 35007",
        state: " AL",
        city: " ALABASTER",
        lat: "-86.80368",
        lon: "33.236618",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Breathtaking Sunrises",
        price: "$97.06",
        landowner_id: 53,
        photo: "https://i.imgur.com/QeuTMAd.webp",
        address: "5560 MCCLELLAN BLVD",
        zip: " 36206",
        state: " AL",
        city: " ANNISTON",
        lat: "-85.81838",
        lon: "33.718227",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$140.43",
        landowner_id: 58,
        photo: "https://i.imgur.com/jvJILEi.webp",
        address: "973 GILBERT FERRY RD SE",
        zip: " 35954",
        state: " AL",
        city: " ATTALLA",
        lat: "-86.09731",
        lon: "33.99695",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "Wooded Wonderland Minutes from the Metro",
        price: "$105.02",
        landowner_id: 37,
        photo: "https://i.imgur.com/OlTKNPt.webp",
        address: "701 MCMEANS AVE",
        zip: " 36507",
        state: " AL",
        city: " BAY MINETTE",
        lat: "-87.78915",
        lon: "30.88708",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$196.70",
        landowner_id: 89,
        photo: "https://i.imgur.com/VlWGiIe.webp",
        address: "750 ACADEMY DR",
        zip: " 35022",
        state: " AL",
        city: " BESSEMER",
        lat: "-87.00301",
        lon: "33.367256",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$201.53",
        landowner_id: 79,
        photo: "https://i.imgur.com/wAlSXth.webp",
        address: "312 PALISADES BLVD",
        zip: " 35209",
        state: " AL",
        city: " BIRMINGHAM",
        lat: "-86.81934",
        lon: "33.468437",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Four Wheel Drive Mud Retreat",
        price: "$76.13",
        landowner_id: 58,
        photo: "https://i.imgur.com/U6oPRwj.webp",
        address: "1600 MONTCLAIR RD",
        zip: " 35210",
        state: " AL",
        city: " BIRMINGHAM",
        lat: "-86.72189",
        lon: "33.525524",
        description: "non-volatile",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$223.46",
        landowner_id: 31,
        photo: "https://i.imgur.com/vXE4VRg.webp",
        address: "9248 PARKWAY E",
        zip: " 35206",
        state: " AL",
        city: " BIRMINGHAM",
        lat: "-86.700615",
        lon: "33.58701",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Wide Open Spaces Super TALL Blue Skies Fresh Air",
        price: "$96.95",
        landowner_id: 51,
        photo: "https://i.imgur.com/FWGnQn6.webp",
        address: "1972 US HWY 431",
        zip: " 35957",
        state: " AL",
        city: " BOAZ",
        lat: "-86.15639",
        lon: "34.214256",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$171.11",
        landowner_id: 99,
        photo: "https://i.imgur.com/pm4hjoP.webp",
        address: "2041 DOUGLAS AVE",
        zip: " 36426",
        state: " AL",
        city: " BREWTON",
        lat: "-87.06882",
        lon: "31.139597",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$75.95",
        landowner_id: 15,
        photo: "https://i.imgur.com/avgI4NE.webp",
        address: "5100 US HWY 31",
        zip: " 35040",
        state: " AL",
        city: " CALERA",
        lat: "-86.74916",
        lon: "33.14756",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Wooded Wonderland Minutes from the Metro",
        price: "$241.69",
        landowner_id: 42,
        photo: "https://i.imgur.com/WkMRLA9.webp",
        address: "27520 US HWY 98",
        zip: " 36526",
        state: " AL",
        city: " DAPHNE",
        lat: "-87.908264",
        lon: "30.62564",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$136.82",
        landowner_id: 38,
        photo: "https://i.imgur.com/oAVNf6n.webp",
        address: "4310 MONTGOMERY HWY",
        zip: " 36303",
        state: " AL",
        city: " DOTHAN",
        lat: "-85.44262",
        lon: "31.265938",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$221.56",
        landowner_id: 93,
        photo: "https://i.imgur.com/B208b09.webp",
        address: "600 BOLL WEEVIL CIR",
        zip: " 36330",
        state: " AL",
        city: " ENTERPRISE",
        lat: "-85.86475",
        lon: "31.33349",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "River Life at its Best",
        price: "$243.71",
        landowner_id: 97,
        photo: "https://i.imgur.com/xx4cZRb.webp",
        address: "7100 AARON ARONOV DR",
        zip: " 35064",
        state: " AL",
        city: " FAIRFIELD",
        lat: "-86.91775",
        lon: "33.468178",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$128.59",
        landowner_id: 90,
        photo: "https://i.imgur.com/FZWis5M.webp",
        address: "10040 CO RD 48",
        zip: " 36532",
        state: " AL",
        city: " FAIRHOPE",
        lat: "-87.84938",
        lon: "30.523624",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Breathtaking Sunrises",
        price: "$111.70",
        landowner_id: 65,
        photo: "https://i.imgur.com/OiVtmvG.webp",
        address: "3100 HOUGH RD",
        zip: " 35630",
        state: " AL",
        city: " FLORENCE",
        lat: "-87.6277",
        lon: "34.83612",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Fresh Mountain Air",
        price: "$57.38",
        landowner_id: 81,
        photo: "https://i.imgur.com/oal0A1B.webp",
        address: "2200 S MCKENZIE ST",
        zip: " 36535",
        state: " AL",
        city: " FOLEY",
        lat: "-87.68332",
        lon: "30.377443",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$205.37",
        landowner_id: 99,
        photo: "https://i.imgur.com/NAbRfc1.webp",
        address: "890 ODUM RD",
        zip: " 35071",
        state: " AL",
        city: " GARDENDALE",
        lat: "-86.82722",
        lon: "33.645164",
        description: "non-volatile",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$241.24",
        landowner_id: 4,
        photo: "https://i.imgur.com/syiM87E.webp",
        address: "170 FORT MORGAN RD",
        zip: " 36542",
        state: " AL",
        city: " GULF SHORES",
        lat: "-87.68442",
        lon: "30.26502",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Four Wheel Drive Mud Retreat",
        price: "$68.60",
        landowner_id: 26,
        photo: "https://i.imgur.com/W8EPbaU.webp",
        address: "11697 US HWY 431",
        zip: " 35976",
        state: " AL",
        city: " GUNTERSVILLE",
        lat: "-86.284744",
        lon: "34.304108",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "River Life at its Best",
        price: "$268.54",
        landowner_id: 39,
        photo: "https://i.imgur.com/cAcpkMt.webp",
        address: "209 LAKESHORE PKWY",
        zip: " 35209",
        state: " AL",
        city: " HOMEWOOD",
        lat: "-86.82564",
        lon: "33.446182",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$278.23",
        landowner_id: 87,
        photo: "https://i.imgur.com/v4UVlvq.webp",
        address: "11610 MEMORIAL PKWY SW",
        zip: " 35803",
        state: " AL",
        city: " HUNTSVILLE",
        lat: "-86.56732",
        lon: "34.617184",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$262.95",
        landowner_id: 93,
        photo: "https://i.imgur.com/tXN6YmI.webp",
        address: "2200 SPARKMAN DR NW",
        zip: " 35810",
        state: " AL",
        city: " HUNTSVILLE",
        lat: "-86.59372",
        lon: "34.763058",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$217.34",
        landowner_id: 88,
        photo: "https://i.imgur.com/whv3jtM.webp",
        address: "330 SUTTON RD",
        zip: " 35763",
        state: " AL",
        city: " HAMPTON COVE",
        lat: "-86.48732",
        lon: "34.66002",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Wooded Wonderland Minutes from the Metro",
        price: "$154.04",
        landowner_id: 94,
        photo: "https://i.imgur.com/BvlrxK3.webp",
        address: "6140 UNIVERSITY DR NW",
        zip: " 35806",
        state: " AL",
        city: " HUNTSVILLE",
        lat: "-86.67574",
        lon: "34.74374",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$292.38",
        landowner_id: 67,
        photo: "https://i.imgur.com/DoNiQTJ.webp",
        address: "1625 PELHAM RD S",
        zip: " 36265",
        state: " AL",
        city: " JACKSONVILLE",
        lat: "-85.76169",
        lon: "33.782402",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$204.91",
        landowner_id: 45,
        photo: "https://i.imgur.com/9wWTTgH.webp",
        address: "8551 WHITFIELD AVE",
        zip: " 35094",
        state: " AL",
        city: " LEEDS",
        lat: "-86.52081",
        lon: "33.56104",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "River Life at its Best",
        price: "$58.08",
        landowner_id: 54,
        photo: "https://i.imgur.com/PUI4rs8.webp",
        address: "1970 S UNIVERSITY BLVD",
        zip: " 36609",
        state: " AL",
        city: " MOBILE",
        lat: "-88.16119",
        lon: "30.65303",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$275.93",
        landowner_id: 85,
        photo: "https://i.imgur.com/GcGYxEz.webp",
        address: "6350 COTTAGE HILL RD",
        zip: " 36609",
        state: " AL",
        city: " MOBILE",
        lat: "-88.18902",
        lon: "30.640219",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$63.63",
        landowner_id: 38,
        photo: "https://i.imgur.com/ngLMMXm.webp",
        address: "101 S BELTLINE HWY",
        zip: " 36606",
        state: " AL",
        city: " MOBILE",
        lat: "-88.12512",
        lon: "30.687267",
        description: "non-volatile",
    },
    {
        title: "Fresh Mountain Air",
        price: "$86.98",
        landowner_id: 98,
        photo: "https://i.imgur.com/cxcbiTF.webp",
        address: "5245 RANGELINE RD",
        zip: " 36619",
        state: " AL",
        city: " MOBILE",
        lat: "-88.16054",
        lon: "30.596573",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$245.07",
        landowner_id: 69,
        photo: "https://i.imgur.com/qBWIokl.webp",
        address: "685 SCHILLINGER RD S",
        zip: " 36695",
        state: " AL",
        city: " MOBILE",
        lat: "-88.22547",
        lon: "30.676332",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "Cabin Escape Just Above the Clouds",
        price: "$183.59",
        landowner_id: 99,
        photo: "https://i.imgur.com/7yH4ksV.webp",
        address: "10710 CHANTILLY PKWY",
        zip: " 36117",
        state: " AL",
        city: " MONTGOMERY",
        lat: "-86.13221",
        lon: "32.356533",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Wooded Wonderland Minutes from the Metro",
        price: "$272.26",
        landowner_id: 62,
        photo: "https://i.imgur.com/W1HFYfS.webp",
        address: "3801 EASTERN BLVD",
        zip: " 36116",
        state: " AL",
        city: " MONTGOMERY",
        lat: "-86.23511",
        lon: "32.328243",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$178.41",
        landowner_id: 14,
        photo: "https://i.imgur.com/yhFYwHv.webp",
        address: "6495 ATLANTA HWY",
        zip: " 36117",
        state: " AL",
        city: " MONTGOMERY",
        lat: "-86.18596",
        lon: "32.382355",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$139.26",
        landowner_id: 17,
        photo: "https://i.imgur.com/SOamOMF.webp",
        address: "851 ANN ST",
        zip: " 36107",
        state: " AL",
        city: " MONTGOMERY",
        lat: "-86.270966",
        lon: "32.370766",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
    {
        title: "Four Wheel Drive Mud Retreat",
        price: "$101.50",
        landowner_id: 9,
        photo: "https://i.imgur.com/gNtMkpU.webp",
        address: "15445 STATE RTE 24",
        zip: " 35650",
        state: " AL",
        city: " MOULTON",
        lat: "-87.27387",
        lon: "34.49313",
        description:
            "Beautiful 34 Titanium Fifth Wheel completely renovated this spring. Everything is new.Comfort and luxury at your disposal. All you need is your suitcase! Young family and dogs are welcome!",
    },
    {
        title: "Bird Watchers Paradise (Twitchers Welcome)",
        price: "$137.99",
        landowner_id: 50,
        photo: "https://i.imgur.com/OWZxfJo.webp",
        address: "5710 MCFARLAND BLVD",
        zip: " 35476",
        state: " AL",
        city: " NORTHPORT",
        lat: "-87.61144",
        lon: "33.235645",
        description:
            "Large like new Denali Fifth Wheel. Trailer is parked next to our house in the RV parking area. Fully functional, gated, clean and comfortable at private residence. Within walking distance to some stores and across from walking, riding and jogging trail next to Fresno State Ag field. Close to Millerton Lake, Fresno State, Hospital, Movie Theatres, Tower District, Casinos, and much more! ONLY AUTHORIZED GUESTS ALLOWED ON PROPERTY OR IN FIFTH WHEEL.",
    },
    {
        title: "River Life at its Best",
        price: "$126.80",
        landowner_id: 40,
        photo: "https://i.imgur.com/AfAVj0R.webp",
        address: "2900 PEPPERELL PKWY",
        zip: " 36801",
        state: " AL",
        city: " OPELIKA",
        lat: "-85.42067",
        lon: "32.635582",
        description:
            "We bought these beautiful 11.5 acres in Tallahassee in 2017 and lived in this luxury 42 ft “glamper” while we built our very own tiny farmhouse! Now that the house is finished we offer the camper as a space for guests. Be close enough to town to attend all the fun events but have the option to feel totally removed from the city & enjoy every star in the night sky! We are a working farm & love sharing our little piece of heaven so come enjoy all that Currie Hill Farm and Tallahassee has to offer!",
    },
    {
        title: "Fresh Mountain Air",
        price: "$158.85",
        landowner_id: 56,
        photo: "https://i.imgur.com/VEyRRE1.webp",
        address: "165 VAUGHAN LN",
        zip: " 35125",
        state: " AL",
        city: " PELL CITY",
        lat: "-86.27678",
        lon: "33.60811",
        description:
            "6 miles from the airport and 5 miles from the COTA track, this 43-acre property on Hwy 71 is close to everything but far enough away to relax quietly. Gate code access to the 42.5' Fifth Wheel RV with 4 slides on a hill with downtown Austin views from the pool deck. Next to pool and hot tub, & near pond that is stocked with bass. Large tree swing makes it kid-friendly. DOG FRIENDLY!: shaded outdoor dog-kennel provided. Check out our other listing: https://airbnb.com/h/alpine",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$199.43",
        landowner_id: 79,
        photo: "https://i.imgur.com/rhic9us.webp",
        address: "1095 INDUSTRIAL PKWY",
        zip: " 36571",
        state: " AL",
        city: " SARALAND",
        lat: "-88.08297",
        lon: "30.797203",
        description:
            "Beautiful clean 2017 5th wheel with one bedroom and a full size pull out couch/ bed that is perfect for kids. Located close to Horseshoe Lake with all the amenities of home.",
    },
    {
        title:
            "Fresh Grown Fruit and Vegetables Mountain Hikes and Quiet Morning Coffees",
        price: "$279.13",
        landowner_id: 35,
        photo: "https://i.imgur.com/Y7pxAI8.webp",
        address: "7855 MOFFETT RD",
        zip: " 36575",
        state: " AL",
        city: " SEMMES",
        lat: "-88.22698",
        lon: "30.763655",
        description: "non-volatile",
    },
    {
        title: "Whitewater Rapids Fresh Morning Brew",
        price: "$279.73",
        landowner_id: 78,
        photo: "https://i.imgur.com/1yn4hYQ.webp",
        address: "214 HAYNES ST",
        zip: " 35160",
        state: " AL",
        city: " TALLADEGA",
        lat: "-86.082886",
        lon: "33.43937",
        description:
            "Our RV is a 2008 Forest River 5th wheel. It has an open floor plan perfect for medium size families or a small group of friends. The bedroom has a queen bed and tons of storage space. A full size air mattress is provided for the living room and the dinette folds down into a twin bed perfect for kiddos. The living room couch, while not the most comfortable for adults, could be used as a bed for children. The RV is blizzard proof and stays cozy warm for all those ski weekends!",
    },
    {
        title: "Lake Front Dream Escape",
        price: "$91.71",
        landowner_id: 84,
        photo: "https://i.imgur.com/mEWaQ2o.webp",
        address: "1300 GILMER AVE",
        zip: " 36078",
        state: " AL",
        city: " TALLASSEE",
        lat: "-85.911766",
        lon: "32.546787",
        description:
            "Quite place in the country . Enjoy quite nights gazing at beautiful sky full of stars.",
    },
    {
        title: "Towering Forest Brimming with Wild Life",
        price: "$276.50",
        landowner_id: 21,
        photo: "https://i.imgur.com/Earhzqb.webp",
        address: "1501 SKYLAND BLVD E",
        zip: " 35405",
        state: " AL",
        city: " TUSCALOOSA",
        lat: "-87.517044",
        lon: "33.16844",
        description:
            "Our 34' loaded toy hauler camper can be rented on our site, where it is set up in a nice quiet spot. 2 queen beds, and convertible seating can sleep up to 6. Has full kitchen, bath,built in icemaker. Bring your toys and relax at our site without the hassle of packing or towing.",
    },
    {
        title: "Clifftop Views and Rolling Hills",
        price: "$199.10",
        landowner_id: 2,
        photo: "https://i.imgur.com/RjZZ4Vh.webp",
        address: "3501 20TH AVE",
        zip: " 36854",
        state: " AL",
        city: " VALLEY",
        lat: "-85.15954",
        lon: "32.793484",
        description:
            "Stay in our 1 year old 37ft Keystone Cougar. Parked right at the Tontitown Winery. Enjoy live music and food trucks on Friday and Saturday nights through the summer and live music only, on Wednesday night. Also free wine tasting 7 days a week.Private entrance in the back.Close to everything in Northwest Arkansas.The RV has two bedrooms with one queen bed and two smaller bunk style beds in second bedroom. Also two love seats fold out to make extra sleeping for kids.",
    },
    {
        title: "Wilderness Vacation Miles from anyone",
        price: "$240.03",
        landowner_id: 64,
        photo: "https://i.imgur.com/oBfn7pz.webp",
        address: "2575 US HWY 43",
        zip: " 35594",
        state: " AL",
        city: " WINFIELD",
        lat: "-87.84023",
        lon: "33.93784",
        description:
            "Enjoy the Camping and Outdoor Experience with the comforts of RV. Located in OK RV Full Hookup Park w/ Wifi & Cable. Gas Grill with Picnic Table and Firepit for Smores. Hard to cook those at hotels :-)",
    },
    {
        title: "Surfing Sand Dunes and Soaking up Sun Rays",
        price: "$88.52",
        landowner_id: 48,
        photo: "https://i.imgur.com/6Lv6PRJ.webp",
        address: "19 COSTILLA BLVD",
        zip: " 81101",
        state: " CO",
        city: " ALAMOSA",
        lat: "-95.859146",
        lon: "37.47086",
        description:
            "This pet friendly Airbnb rental in Anderson can comfortably accommodate 4 people in 1 bedroom and 2 bathrooms. There are 2 beds and guests will have access to the entire camper/rv during their stay.",
    },
];
let rvowners = [
    {
        username: 'bchesher0',
        email: 'cbalme0@hugedomains.com',
        password: 'ZmOoUVl',
        contact: '862-854-6705'
    }, {
        username: 'kjewis1',
        email: 'landreazzi1@blogs.com',
        password: 'SnwKqUCwrc',
        contact: '477-555-4447'
    }, {
        username: 'rkarpeev2',
        email: 'dellgood2@xrea.com',
        password: 'aJy4vo6L5X',
        contact: '142-218-7247'
    }, {
        username: 'cspikins3',
        email: 'mbalsom3@addtoany.com',
        password: '4jUJIQWuTt2',
        contact: '583-482-7786'
    }, {
        username: 'btee4',
        email: 'tram4@walmart.com',
        password: 'kzTVNI1',
        contact: '792-680-1534'
    }, {
        username: 'bnerger5',
        email: 'aplank5@arizona.edu',
        password: '1bWpSeTp9',
        contact: '541-969-7746'
    }, {
        username: 'rwoloschinski6',
        email: 'tchatburn6@nationalgeographic.com',
        password: 'BEYwfJwR',
        contact: '335-927-8359'
    }, {
        username: 'anorbury7',
        email: 'kroyle7@hp.com',
        password: 'GD5anVDpBI',
        contact: '356-206-9505'
    }, {
        username: 'svalsler8',
        email: 'jlanghorne8@moonfruit.com',
        password: 'vg448-501-9014',
        contact: '803-980-3313'
    }, {
        username: 'ejohnsson9',
        email: 'tpendrick9@pcworld.com',
        password: 'szfaStut',
        contact: '803-980-3313'
    }, {
        username: 'ddillimorea',
        email: 'aagerskowa@nifty.com',
        password: '0oSwYell9v',
        contact: '227-312-7124'
    }, {
        username: 'bremmersb',
        email: 'laxtellb@latimes.com',
        password: 'DVcoWeuknhfn',
        contact: '696-542-7113'
    }, {
        username: 'ccrushc',
        email: 'csandaverc@cpanel.net',
        password: 'a0xDGA4ThK4',
        contact: '166-458-7950'
    }, {
        username: 'propkesd',
        email: 'egravestoned@dailymotion.com',
        password: '5WgoEZQkKC',
        contact: '998-860-0617'
    }, {
        username: 'lkopelmane',
        email: 'klewknore@psu.edu',
        password: '31ikqy',
        contact: '513-957-8176'
    }, {
        username: 'cchallenorf',
        email: 'cbowlasf@bbb.org',
        password: 'FLhzHm7iI',
        contact: '390-301-8789'
    }, {
        username: 'jcurleyg',
        email: 'dgorewayg@cisco.com',
        password: 'uJdHemKeWV7',
        contact: '609-136-5326'
    }, {
        username: 'oovetth',
        email: 'mjerzycowskih@people.com.cn',
        password: 'NVLiA7V58z',
        contact: '136-291-8462'
    }, {
        username: 'dricardoi',
        email: 'ebeamsoni@examiner.com',
        password: 'BAaJ0eD10b9h',
        contact: '121-402-0674'
    }, {
        username: 'gwarnej',
        email: 'jmcbrierj@craigslist.org',
        password: 'zJ00pLqMpJM2',
        contact: '373-675-2772'
    },
]
let landowners = [
    {
        username: "fskermer0",
        email: "jcakebread0@4shared.com",
        password: "TAojEZvD",
        contact: "903-620-8852",
    },
    {
        username: "pverson1",
        email: "cparmby1@about.me",
        password: "7oTT0RU7oTT0RU",
        contact: "214-738-8075",
    },
    {
        username: "apalatino2",
        email: "dhabron2@cmu.edu",
        password: "5W1XiQoSct5",
        contact: "419-359-7132",
    },
    {
        username: "vmacelane3",
        email: "iportam3@springer.com",
        password: "PLnXOkruEN",
        contact: "279-652-1824",
    },
    {
        username: "nchalfant4",
        email: "jjoule4@si.edu",
        password: "iMFTm2uUb2",
        contact: "594-272-5197",
    },
    {
        username: "slubeck5",
        email: "mhowden5@oaic.gov",
        password: "bD5wjGbD5wjG",
        contact: "439-551-4067",
    },
    {
        username: "gcantopher6",
        email: "mboom6@auda.org",
        password: "Q9ZxfkDvkEvJ",
        contact: "137-904-0226",
    },
    {
        username: "jheugh7",
        email: "ekeuneke7@miibeian.gov",
        password: "PUZ91RlPUZ91Rl",
        contact: "612-806-2447",
    },
    {
        username: "dawton8",
        email: "aglentz8@yolasite.com",
        password: "3M8lc5ITl",
        contact: "454-558-6650",
    },
    {
        username: "mong9",
        email: "kteaze9@aol.com",
        password: "6X0c4kTfM",
        contact: "616-107-3297",
    },
    {
        username: "wdynea",
        email: "bpetta@oaic.gov.au",
        password: "ut7aC8ut7aC8",
        contact: "405-715-7555",
    },
    {
        username: "bpudeb",
        email: "elycettb@ca.gov",
        password: "013Wg6JA",
        contact: "604-234-4874",
    },
    {
        username: "bibbotsonc",
        email: "jduftonc@histats.com",
        password: "RPRbx3GryA",
        contact: "722-284-9471",
    },
    {
        username: "rsnoadd",
        email: "torrowd@pagesperso-orange.fr",
        password: "1DkVV4LKT7",
        contact: "688-534-9102",
    },
    {
        username: "msteptoee",
        email: "dnergere@fda.gov",
        password: "dC2jZvucPPx8",
        contact: "850-269-2674",
    },
    {
        username: "nansticef",
        email: "eathowef@harvard.edu",
        password: "WK5mGdpx9fT0",
        contact: "219-661-6821",
    },
    {
        username: "wgogartyg",
        email: "ahumpheryg@trellian.com",
        password: "gnYEwQ5gnYEwQ5",
        contact: "189-793-7427",
    },
    {
        username: "ltanderh",
        email: "mnoseworthyh@goodreads.com",
        password: "efqyazefqyaz",
        contact: "536-858-6644",
    },
    {
        username: "ichubbi",
        email: "bpremblei@nationalgeographic.com",
        password: "oANWz8Y31QKi",
        contact: "508-456-5322",
    },
    {
        username: "kdomicoj",
        email: "jmancellj@hao123.com",
        password: "vOhFvMFv5i",
        contact: "339-495-8476",
    },
    {
        username: "bjollyek",
        email: "wjoddensk@census.gov",
        password: "yvY4wj2RnYSQ",
        contact: "174-942-7506",
    },
    {
        username: "dfronzekl",
        email: "wcodronl@google.de",
        password: "DqiQ4H0DqiQ4H0",
        contact: "465-342-8433",
    },
    {
        username: "tbrannom",
        email: "oneisingm@purevolume.com",
        password: "uMh3pRd0EF",
        contact: "582-888-0040",
    },
    {
        username: "swestleyn",
        email: "kbrettn@goo.gl",
        password: "p2E7reMKWXo",
        contact: "242-451-1775",
    },
    {
        username: "garnoldio",
        email: "rhamshereo@twitter.com",
        password: "0H9VdO0H9VdO",
        contact: "294-368-3318",
    },
    {
        username: "adibiasiop",
        email: "abritonp@utexas.edu",
        password: "fMM57iZlJvA8",
        contact: "375-988-4670",
    },
    {
        username: "greijmersq",
        email: "ychopyq@hc360.com",
        password: "uWFRxr0tRn",
        contact: "752-164-3113",
    },
    {
        username: "lknutsenr",
        email: "lelsmerer@flavors.me",
        password: "cFNdr9cFNdr9",
        contact: "998-187-4159",
    },
    {
        username: "lhoundsoms",
        email: "wilchenkos@ameblo.jp",
        password: "YlcmKmYlcmKm",
        contact: "256-529-7425",
    },
    {
        username: "hcruset",
        email: "wscholet@hexun.com",
        password: "w53Xr2Qdq8bq",
        contact: "551-238-8706",
    },
    {
        username: "vlillu",
        email: "bwastlingu@wikipedia.org",
        password: "52e160u52e160u",
        contact: "317-161-2763",
    },
    {
        username: "noakebyv",
        email: "stomaszczykv@noaa.gov",
        password: "wfGWg7wfGWg7",
        contact: "234-145-0467",
    },
    {
        username: "elelievrew",
        email: "ahearleyw@parallels.com",
        password: "VvlSNu5i",
        contact: "548-699-4397",
    },
    {
        username: "pdjakovicx",
        email: "dfarrellx@answers.com",
        password: "ZwOHO4ZwOHO4",
        contact: "710-260-7718",
    },
    {
        username: "achampnessy",
        email: "efinkley@howstuffworks.com",
        password: "4gZK9Ss4gZK9Ss",
        contact: "275-610-6320",
    },
    {
        username: "tkynndz",
        email: "gfirmagez@wp.com",
        password: "B3LkwuLDUm",
        contact: "703-273-4585",
    },
    {
        username: "dboyett10",
        email: "bagott10@earthlink.net",
        password: "i5fAwEi5fAwE",
        contact: "908-678-5393",
    },
    {
        username: "amabbutt11",
        email: "nlanchberry11@paypal.com",
        password: "GbZEs5NaNPZ",
        contact: "474-441-4812",
    },
    {
        username: "jdubois12",
        email: "klomen12@homestead.com",
        password: "94mUEeA94mUEeA",
        contact: "891-226-6005",
    },
    {
        username: "pleftbridge13",
        email: "bkopecka13@stumbleupon.com",
        password: "HpdFopnki",
        contact: "353-498-8343",
    },
    {
        username: "ranthoney14",
        email: "mshadfourth14@earthlink.net",
        password: "scbxXi5i",
        contact: "924-397-8719",
    },
    {
        username: "agolder15",
        email: "fcousans15@discovery.com",
        password: "bL9zd9AJET6n",
        contact: "155-170-8550",
    },
    {
        username: "livain16",
        email: "clouisot16@scientificamerican.com",
        password: "ht0Zccht0Zcc",
        contact: "598-111-1256",
    },
    {
        username: "lschwieso17",
        email: "mhucquart17@cdbaby.com",
        password: "cp7aNk1YS4kK",
        contact: "752-819-7851",
    },
    {
        username: "rtorre18",
        email: "jflindall18@youku.com",
        password: "ga8E6ZvUMc",
        contact: "106-146-0851",
    },
    {
        username: "ahanmer19",
        email: "aseldon19@discuz.net",
        password: "EulYNuN3CnU",
        contact: "297-157-1365",
    },
    {
        username: "kcathel1a",
        email: "cadanez1a@china.com",
        password: "YFjhVX4G93kl",
        contact: "669-645-6719",
    },
    {
        username: "ohorick1b",
        email: "pbram1b@istockphoto.com",
        password: "MXGsS1MXGsS1",
        contact: "723-573-1935",
    },
    {
        username: "lslimings1c",
        email: "awones1c@cyberchimps.com",
        password: "YRCTLXQUAHMq",
        contact: "679-917-8803",
    },
    {
        username: "smassimo1d",
        email: "ablyden1d@wikispaces.com",
        password: "g8QawDg8QawD",
        contact: "464-139-7099",
    },
    {
        username: "hortell1e",
        email: "ljewis1e@twitter.com",
        password: "S76TXlRaAr",
        contact: "764-583-7321",
    },
    {
        username: "pbeake1f",
        email: "gelia1f@goo.com",
        password: "6UHNPoYO",
        contact: "635-713-8129",
    },
    {
        username: "mtarply1g",
        email: "dhandford1g@webeden.com",
        password: "C2t45UNDr",
        contact: "176-599-1851",
    },
    {
        username: "mkopfer1h",
        email: "brisman1h@cpanel.net",
        password: "RDdKBLRR8P",
        contact: "244-675-3179",
    },
    {
        username: "tfrentz1i",
        email: "gswindle1i@imgur.com",
        password: "C8BLQHAlG0j",
        contact: "116-994-3256",
    },
    {
        username: "ppindar1j",
        email: "cneed1j@google.es",
        password: "K7BSgSK7BSgS",
        contact: "514-409-8798",
    },
    {
        username: "pmitchard1k",
        email: "wcamellini1k@timesonline.com",
        password: "gsz5Lamgsz5Lam",
        contact: "219-139-6108",
    },
    {
        username: "kbarrett1l",
        email: "mmarjoribanks1l@businesswire.com",
        password: "Kxk9L73D9F",
        contact: "142-543-6493",
    },
    {
        username: "abodell1m",
        email: "oginnane1m@tinyurl.com",
        password: "a2COSN2a2COSN2",
        contact: "623-862-1413",
    },
    {
        username: "nlinnemann1n",
        email: "pridge1n@earthlink.net",
        password: "24QmyOF24QmyOF",
        contact: "719-722-0092",
    },
    {
        username: "mtattersfield1o",
        email: "gpawden1o@edublogs.org",
        password: "61HlDyXJy9rh",
        contact: "284-877-5883",
    },
    {
        username: "doxbrough1p",
        email: "mbaxendale1p@google.com",
        password: "7ioxPWGVBCez",
        contact: "576-562-1088",
    },
    {
        username: "acorre1q",
        email: "lnancarrow1q@msu.edu",
        password: "uX0MtntrZka",
        contact: "385-389-3802",
    },
    {
        username: "ftulk1r",
        email: "mstoak1r@wisc.edu",
        password: "jlZdPuPOO3R",
        contact: "202-726-7330",
    },
    {
        username: "dcaswill1s",
        email: "tcroll1s@sfgate.com",
        password: "jnJmXDpyl",
        contact: "574-953-1243",
    },
    {
        username: "amcmanus1t",
        email: "awildbore1t@typepad.com",
        password: "MUU0VitJjAGu",
        contact: "552-542-2017",
    },
    {
        username: "vmilnes1u",
        email: "erozsa1u@hubpages.com",
        password: "5PSet7h6",
        contact: "512-301-1015",
    },
    {
        username: "rlatan1v",
        email: "ctisun1v@dyndns.org",
        password: "bh7H19bh7H19",
        contact: "210-265-1313",
    },
    {
        username: "tloftin1w",
        email: "cboyde1w@google.com",
        password: "tzQGFb4kY",
        contact: "485-755-0385",
    },
    {
        username: "ahavill1x",
        email: "ccooke1x@taobao.com",
        password: "M9ocbmKFZIKW",
        contact: "832-927-8176",
    },
    {
        username: "cpinke1y",
        email: "mmcbeith1y@craigslist.org",
        password: "03hpeXag4Xd",
        contact: "876-258-1210",
    },
    {
        username: "wlivesey1z",
        email: "jfairweather1z@odnoklassniki.ru",
        password: "80BYY0Cm",
        contact: "305-171-4850",
    },
    {
        username: "somara20",
        email: "bwasmer20@github.io",
        password: "u0BPDSIa9cpW",
        contact: "443-846-9264",
    },
    {
        username: "adorow21",
        email: "sferrai21@amazon.de",
        password: "bGEUd98hz",
        contact: "576-752-6742",
    },
    {
        username: "cmaclaren22",
        email: "ctschirasche22@patch.com",
        password: "eUXNp6eUXNp6",
        contact: "134-624-7120",
    },
    {
        username: "dcuniam23",
        email: "tord23@fotki.com",
        password: "QZhgR3rusbu",
        contact: "187-561-2618",
    },
    {
        username: "mtoderbrugge24",
        email: "ldoumerque24@dropbox.com",
        password: "Gl1jr7cGl1jr7c",
        contact: "191-514-6270",
    },
    {
        username: "shatcliffe25",
        email: "hlessmare25@usnews.com",
        password: "ZJTlKqVZJTlKqV",
        contact: "549-952-6945",
    },
    {
        username: "idally26",
        email: "basher26@live.com",
        password: "DlRSxF1DlRSxF1",
        contact: "623-344-8844",
    },
    {
        username: "wlepoidevin27",
        email: "asimmen27@creativecommons.org",
        password: "vFywnCRezO",
        contact: "536-782-9927",
    },
    {
        username: "bstrang28",
        email: "nmowlam28@baidu.com",
        password: "glRjLlV5rR",
        contact: "478-425-1601",
    },
    {
        username: "mmatisse29",
        email: "dbromehed29@apple.com",
        password: "zPAl1SAUQH0",
        contact: "712-821-8006",
    },
    {
        username: "bskellorne2a",
        email: "mcamus2a@unblog.fr",
        password: "cxJsSqfv",
        contact: "794-561-2966",
    },
    {
        username: "sgatrell2b",
        email: "kbattill2b@posterous.com",
        password: "vZweZ8qeq",
        contact: "870-523-5580",
    },
    {
        username: "ncanaan2c",
        email: "kemeney2c@slate.com",
        password: "7tyFJqjd",
        contact: "637-734-7093",
    },
    {
        username: "hbeckson2d",
        email: "gdikes2d@hud.gov",
        password: "New2sJWBh",
        contact: "227-944-3725",
    },
    {
        username: "alivingston2e",
        email: "ndemicoli2e@wiley.com",
        password: "lGOBVPH9jwnC",
        contact: "156-260-7774",
    },
    {
        username: "phartman2f",
        email: "vamberger2f@time.com",
        password: "K3eg1QQ4",
        contact: "110-632-1025",
    },
    {
        username: "dmedcraft2g",
        email: "dpynner2g@weebly.com",
        password: "NvGjMF3NvGjMF3",
        contact: "424-539-4239",
    },
    {
        username: "mrain2h",
        email: "kkun2h@github.com",
        password: "ULThA0hF",
        contact: "548-374-9992",
    },
    {
        username: "imoscon2i",
        email: "mdarnborough2i@intel.com",
        password: "UgNFumtFMU",
        contact: "317-740-5080",
    },
    {
        username: "rentwhistle2j",
        email: "hoborne2j@yellowpages.com",
        password: "0Vs3Vy0Vs3Vy",
        contact: "237-483-7506",
    },
    {
        username: "htolcher2k",
        email: "jhubble2k@princeton.edu",
        password: "1A7sGJi1A7sGJi",
        contact: "817-685-6724",
    },
    {
        username: "lmackill2l",
        email: "mgrishinov2l@privacy.gov.au",
        password: "8629YeloP",
        contact: "198-879-8496",
    },
    {
        username: "eskechley2m",
        email: "cmayne2m@buzzfeed.com",
        password: "IM1a7qEfaV",
        contact: "156-109-8098",
    },
    {
        username: "kgarey2n",
        email: "kproudley2n@tamu.edu",
        password: "lnoBA05w5bc0",
        contact: "311-227-2262",
    },
    {
        username: "dmeffan2o",
        email: "ebarensen2o@yahoo.com",
        password: "4Uya16bP",
        contact: "741-516-9330",
    },
    {
        username: "jwakeling2p",
        email: "acollopy2p@unicef.org",
        password: "W9go38XW9go38X",
        contact: "484-297-3188",
    },
    {
        username: "ebrickdale2q",
        email: "dstenson2q@instagram.com",
        password: "AOyZ5gAOyZ5g",
        contact: "816-884-2314",
    },
    {
        username: "nvelti2r",
        email: "tbernini2r@redcross.org",
        password: "n4Q8lVn4Q8lV",
        contact: "738-671-1605",
    },
]
let landowner_listings = [
    { landowner_id: 28, listing_id: 1 },
    { landowner_id: 59, listing_id: 2 },
    { landowner_id: 25, listing_id: 3 },
    { landowner_id: 28, listing_id: 5 },
    { landowner_id: 10, listing_id: 7 },
    { landowner_id: 81, listing_id: 8 },
    { landowner_id: 87, listing_id: 9 },
    { landowner_id: 15, listing_id: 10 },
    { landowner_id: 17, listing_id: 11 },
    { landowner_id: 76, listing_id: 13 },
    { landowner_id: 65, listing_id: 14 },
    { landowner_id: 33, listing_id: 15 },
    { landowner_id: 32, listing_id: 17 },
    { landowner_id: 92, listing_id: 18 },
    { landowner_id: 66, listing_id: 19 },
    { landowner_id: 83, listing_id: 21 },
    { landowner_id: 49, listing_id: 26 },
    { landowner_id: 7, listing_id: 27 },
    { landowner_id: 17, listing_id: 28 },
    { landowner_id: 62, listing_id: 29 },
    { landowner_id: 12, listing_id: 31 },
    { landowner_id: 53, listing_id: 33 },
    { landowner_id: 65, listing_id: 34 },
    { landowner_id: 58, listing_id: 35 },
    { landowner_id: 42, listing_id: 36 },
    { landowner_id: 6, listing_id: 38 },
    { landowner_id: 69, listing_id: 40 },
    { landowner_id: 86, listing_id: 41 },
    { landowner_id: 3, listing_id: 42 },
    { landowner_id: 6, listing_id: 45 },
    { landowner_id: 72, listing_id: 46 },
    { landowner_id: 82, listing_id: 49 },
    { landowner_id: 80, listing_id: 51 },
    { landowner_id: 8, listing_id: 52 },
    { landowner_id: 62, listing_id: 54 },
    { landowner_id: 85, listing_id: 56 },
    { landowner_id: 47, listing_id: 60 },
    { landowner_id: 67, listing_id: 63 },
    { landowner_id: 19, listing_id: 64 },
    { landowner_id: 62, listing_id: 65 },
    { landowner_id: 86, listing_id: 68 },
    { landowner_id: 6, listing_id: 70 },
    { landowner_id: 65, listing_id: 72 },
    { landowner_id: 58, listing_id: 73 },
    { landowner_id: 18, listing_id: 75 },
    { landowner_id: 59, listing_id: 76 },
    { landowner_id: 31, listing_id: 77 },
    { landowner_id: 78, listing_id: 79 },
    { landowner_id: 18, listing_id: 81 },
    { landowner_id: 85, listing_id: 84 },
    { landowner_id: 79, listing_id: 87 },
    { landowner_id: 12, listing_id: 89 },
    { landowner_id: 83, listing_id: 91 },
    { landowner_id: 8, listing_id: 92 },
    { landowner_id: 47, listing_id: 93 },
    { landowner_id: 19, listing_id: 95 },
    { landowner_id: 85, listing_id: 96 },
    { landowner_id: 96, listing_id: 97 },
    { landowner_id: 16, listing_id: 98 },
    { landowner_id: 8, listing_id: 99 },
    { landowner_id: 70, listing_id: 100 },
    { landowner_id: 66, listing_id: 101 },
    { landowner_id: 67, listing_id: 102 },
    { landowner_id: 26, listing_id: 103 },
    { landowner_id: 8, listing_id: 105 },
    { landowner_id: 79, listing_id: 106 },
    { landowner_id: 87, listing_id: 108 },
    { landowner_id: 18, listing_id: 110 },
    { landowner_id: 27, listing_id: 113 },
    { landowner_id: 14, listing_id: 114 },
    { landowner_id: 36, listing_id: 116 },
    { landowner_id: 55, listing_id: 117 },
    { landowner_id: 29, listing_id: 118 },
    { landowner_id: 9, listing_id: 119 },
    { landowner_id: 73, listing_id: 120 },
    { landowner_id: 76, listing_id: 121 },
    { landowner_id: 20, listing_id: 123 },
    { landowner_id: 82, listing_id: 124 },
    { landowner_id: 88, listing_id: 125 },
    { landowner_id: 83, listing_id: 126 },
    { landowner_id: 21, listing_id: 128 },
    { landowner_id: 39, listing_id: 129 },
    { landowner_id: 19, listing_id: 130 },
    { landowner_id: 27, listing_id: 131 },
    { landowner_id: 30, listing_id: 132 },
    { landowner_id: 18, listing_id: 134 },
    { landowner_id: 53, listing_id: 137 },
    { landowner_id: 58, listing_id: 140 },
    { landowner_id: 37, listing_id: 142 },
    { landowner_id: 89, listing_id: 143 },
    { landowner_id: 79, listing_id: 144 },
    { landowner_id: 58, listing_id: 145 },
    { landowner_id: 31, listing_id: 147 },
    { landowner_id: 51, listing_id: 148 },
    { landowner_id: 99, listing_id: 150 },
    { landowner_id: 15, listing_id: 151 },
    { landowner_id: 42, listing_id: 157 },
    { landowner_id: 38, listing_id: 161 },
    { landowner_id: 93, listing_id: 162 },
    { landowner_id: 97, listing_id: 164 },
    { landowner_id: 90, listing_id: 165 },
    { landowner_id: 65, listing_id: 167 },
    { landowner_id: 81, listing_id: 168 },
    { landowner_id: 99, listing_id: 171 },
    { landowner_id: 4, listing_id: 174 },
    { landowner_id: 26, listing_id: 175 },
    { landowner_id: 39, listing_id: 179 },
    { landowner_id: 87, listing_id: 184 },
    { landowner_id: 93, listing_id: 185 },
    { landowner_id: 88, listing_id: 186 },
    { landowner_id: 94, listing_id: 187 },
    { landowner_id: 67, listing_id: 189 },
    { landowner_id: 45, listing_id: 191 },
    { landowner_id: 54, listing_id: 194 },
    { landowner_id: 85, listing_id: 195 },
    { landowner_id: 38, listing_id: 196 },
    { landowner_id: 98, listing_id: 198 },
    { landowner_id: 69, listing_id: 199 },
    { landowner_id: 99, listing_id: 201 },
    { landowner_id: 62, listing_id: 202 },
    { landowner_id: 14, listing_id: 203 },
    { landowner_id: 17, listing_id: 204 },
    { landowner_id: 9, listing_id: 205 },
    { landowner_id: 50, listing_id: 207 },
    { landowner_id: 40, listing_id: 209 },
    { landowner_id: 56, listing_id: 213 },
    { landowner_id: 79, listing_id: 218 },
    { landowner_id: 35, listing_id: 221 },
    { landowner_id: 78, listing_id: 225 },
    { landowner_id: 84, listing_id: 226 },
    { landowner_id: 21, listing_id: 229 },
    { landowner_id: 2, listing_id: 230 },
    { landowner_id: 64, listing_id: 233 },
    { landowner_id: 48, listing_id: 234 },
]
let rvownerfav_listings = [
    {
        rvowner_id: 10,
        listing_id: 4
    }, {
        rvowner_id: 19,
        listing_id: 6
    }, {
        rvowner_id: 6,
        listing_id: 11
    }, {
        rvowner_id: 11,
        listing_id: 10
    }, {
        rvowner_id: 10,
        listing_id: 19
    }, {
        rvowner_id: 20,
        listing_id: 20
    }, {
        rvowner_id: 14,
        listing_id: 7
    }, {
        rvowner_id: 3,
        listing_id: 20
    }, {
        rvowner_id: 10,
        listing_id: 2
    }, {
        rvowner_id: 9,
        listing_id: 14
    }, {
        rvowner_id: 12,
        listing_id: 16
    }, {
        rvowner_id: 20,
        listing_id: 15
    }, {
        rvowner_id: 9,
        listing_id: 6
    }, {
        rvowner_id: 9,
        listing_id: 8
    }, {
        rvowner_id: 13,
        listing_id: 17
    }, {
        rvowner_id: 7,
        listing_id: 7
    }, {
        rvowner_id: 11,
        listing_id: 2
    }, {
        rvowner_id: 2,
        listing_id: 6
    }, {
        rvowner_id: 2,
        listing_id: 11
    }, {
        rvowner_id: 6,
        listing_id: 17
    }, {
        rvowner_id: 13,
        listing_id: 19
    }, {
        rvowner_id: 11,
        listing_id: 4
    }, {
        rvowner_id: 18,
        listing_id: 3
    }, {
        rvowner_id: 15,
        listing_id: 11
    }, {
        rvowner_id: 16,
        listing_id: 3
    }, {
        rvowner_id: 10,
        listing_id: 9
    }, {
        rvowner_id: 16,
        listing_id: 20
    }, {
        rvowner_id: 11,
        listing_id: 11
    }, {
        rvowner_id: 9,
        listing_id: 20
    }, {
        rvowner_id: 15,
        listing_id: 16
    }, {
        rvowner_id: 16,
        listing_id: 4
    }, {
        rvowner_id: 15,
        listing_id: 18
    }, {
        rvowner_id: 3,
        listing_id: 17
    }, {
        rvowner_id: 3,
        listing_id: 4
    }, {
        rvowner_id: 10,
        listing_id: 12
    }
]
let amenities = [
    { "listing_id": 1, "guests": 6, "beds": 5, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 2, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 3, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 5, "guests": 5, "beds": 3, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 7, "guests": 4, "beds": 4, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 8, "guests": 12, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 9, "guests": 7, "beds": 7, "bath": 2, "wifi": "true", "kitchen": "true", "heat": "true", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 10, "guests": 14, "beds": 7, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "false", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 11, "guests": 3, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 13, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 14, "guests": 10, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 15, "guests": 10, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 17, "guests": 7, "beds": 6, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 18, "guests": 7, "beds": 6, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 19, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 21, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 26, "guests": 12, "beds": 5, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 27, "guests": 4, "beds": 4, "bath": 2, "wifi": "true", "kitchen": "true", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 28, "guests": 3, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 29, "guests": 12, "beds": 5, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 31, "guests": 12, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 33, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 34, "guests": 12, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 35, "guests": 15, "beds": 9, "bath": 3, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 36, "guests": 4, "beds": 4, "bath": 2, "wifi": "true", "kitchen": "true", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 38, "guests": 3, "beds": 2, "bath": 3, "wifi": "true", "kitchen": "true", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 40, "guests": 7, "beds": 6, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 41, "guests": 10, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 42, "guests": 3, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 45, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 46, "guests": 5, "beds": 3, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 49, "guests": 15, "beds": 9, "bath": 3, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 51, "guests": 5, "beds": 4, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 52, "guests": 14, "beds": 8, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 54, "guests": 3, "beds": 3, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 56, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 60, "guests": 10, "beds": 7, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 63, "guests": 7, "beds": 3, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 64, "guests": 3, "beds": 3, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 65, "guests": 7, "beds": 3, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 68, "guests": 14, "beds": 12, "bath": 3, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 70, "guests": 10, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 72, "guests": 14, "beds": 8, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 73, "guests": 3, "beds": 3, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 75, "guests": 7, "beds": 6, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 76, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 77, "guests": 8, "beds": 7, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 79, "guests": 10, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 81, "guests": 15, "beds": 9, "bath": 3, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 84, "guests": 10, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 87, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 89, "guests": 3, "beds": 3, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 91, "guests": 3, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 92, "guests": 4, "beds": 4, "bath": 2, "wifi": "true", "kitchen": "true", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 93, "guests": 3, "beds": 3, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 95, "guests": 4, "beds": 4, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 96, "guests": 7, "beds": 7, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 97, "guests": 5, "beds": 3, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 98, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 99, "guests": 10, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 100, "guests": 4, "beds": 4, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 101, "guests": 7, "beds": 6, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 102, "guests": 7, "beds": 6, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 103, "guests": 7, "beds": 6, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 105, "guests": 7, "beds": 3, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 106, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 108, "guests": 14, "beds": 8, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 110, "guests": 6, "beds": 5, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 113, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 114, "guests": 14, "beds": 7, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "false", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 116, "guests": 4, "beds": 4, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 117, "guests": 10, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 118, "guests": 7, "beds": 3, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 119, "guests": 12, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 120, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 121, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 123, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 124, "guests": 14, "beds": 8, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 125, "guests": 15, "beds": 11, "bath": 3, "wifi": "false", "kitchen": "true", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 126, "guests": 15, "beds": 9, "bath": 3, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 128, "guests": 7, "beds": 6, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 129, "guests": 15, "beds": 11, "bath": 3, "wifi": "false", "kitchen": "true", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 130, "guests": 3, "beds": 2, "bath": 3, "wifi": "true", "kitchen": "true", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 131, "guests": 6, "beds": 5, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 132, "guests": 7, "beds": 6, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 134, "guests": 15, "beds": 11, "bath": 3, "wifi": "false", "kitchen": "true", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 137, "guests": 5, "beds": 4, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 140, "guests": 10, "beds": 7, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 142, "guests": 12, "beds": 5, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 143, "guests": 5, "beds": 3, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 144, "guests": 7, "beds": 7, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 145, "guests": 3, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 147, "guests": 12, "beds": 5, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 148, "guests": 10, "beds": 7, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 150, "guests": 7, "beds": 6, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 151, "guests": 14, "beds": 7, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "false", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 157, "guests": 12, "beds": 5, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 161, "guests": 4, "beds": 4, "bath": 2, "wifi": "true", "kitchen": "true", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 162, "guests": 10, "beds": 7, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 164, "guests": 14, "beds": 7, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "false", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 165, "guests": 6, "beds": 5, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 167, "guests": 14, "beds": 7, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "false", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 168, "guests": 14, "beds": 7, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "false", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 171, "guests": 8, "beds": 7, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 174, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 175, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 179, "guests": 12, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 184, "guests": 7, "beds": 3, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 185, "guests": 10, "beds": 7, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 186, "guests": 3, "beds": 3, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 187, "guests": 15, "beds": 9, "bath": 3, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 189, "guests": 5, "beds": 3, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 191, "guests": 15, "beds": 9, "bath": 3, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 194, "guests": 3, "beds": 3, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 195, "guests": 12, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 196, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 198, "guests": 5, "beds": 4, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 199, "guests": 5, "beds": 4, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 201, "guests": 7, "beds": 3, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 202, "guests": 14, "beds": 7, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "false", "water": "false", "shower": "true", "firepit": "false" },
    { "listing_id": 203, "guests": 14, "beds": 12, "bath": 3, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 204, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 205, "guests": 8, "beds": 7, "bath": 1, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "true" },
    { "listing_id": 207, "guests": 10, "beds": 7, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 209, "guests": 5, "beds": 4, "bath": 3, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 213, "guests": 12, "beds": 2, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 218, "guests": 7, "beds": 6, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "true" },
    { "listing_id": 221, "guests": 12, "beds": 5, "bath": 3, "wifi": "false", "kitchen": "false", "heat": "false", "water": "true", "shower": "true", "firepit": "false" },
    { "listing_id": 225, "guests": 7, "beds": 2, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "true" },
    { "listing_id": 226, "guests": 7, "beds": 6, "bath": 2, "wifi": "false", "kitchen": "true", "heat": "false", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 229, "guests": 5, "beds": 2, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "false", "firepit": "false" },
    { "listing_id": 230, "guests": 6, "beds": 5, "bath": 2, "wifi": "true", "kitchen": "false", "heat": "true", "water": "true", "shower": "false", "firepit": "false" },
    { "listing_id": 233, "guests": 14, "beds": 8, "bath": 1, "wifi": "false", "kitchen": "true", "heat": "true", "water": "false", "shower": "true", "firepit": "true" },
    { "listing_id": 234, "guests": 8, "beds": 7, "bath": 1, "wifi": "true", "kitchen": "true", "heat": "true", "water": "true", "shower": "true", "firepit": "true" }]
let reservations = [
    {
        rvowner_id: 14,
        listing_id: 16,
        date: '12/6/2019'
    },
    {
        rvowner_id: 20,
        listing_id: 15,
        date: '9/8/2022'
    },
    {
        rvowner_id: 4,
        listing_id: 19,
        date: '11/11/2020'
    },
    {
        rvowner_id: 4,
        listing_id: 7,
        date: '12/28/2021'
    },
    {
        rvowner_id: 4,
        listing_id: 18,
        date: '6/25/2022'
    },
    {
        rvowner_id: 12,
        listing_id: 19,
        date: '2/25/2022'
    },
    {
        rvowner_id: 11,
        listing_id: 10,
        date: '6/18/2019'
    },
    {
        rvowner_id: 9,
        listing_id: 20,
        date: '10/10/2021'
    },
    {
        rvowner_id: 10,
        listing_id: 8,
        date: '7/18/2020'
    },
    {
        rvowner_id: 4,
        listing_id: 1,
        date: '12/9/2020'
    },
    {
        rvowner_id: 10,
        listing_id: 13,
        date: '9/29/2020'
    },
    {
        rvowner_id: 5,
        listing_id: 7,
        date: '3/5/2019'
    },
    {
        rvowner_id: 20,
        listing_id: 16,
        date: '8/1/2021'
    },
    {
        rvowner_id: 20,
        listing_id: 10,
        date: '7/31/2021'
    },
    {
        rvowner_id: 5,
        listing_id: 9,
        date: '9/5/2021'
    },
    {
        rvowner_id: 8,
        listing_id: 10,
        date: '10/16/2019'
    },
    {
        rvowner_id: 15,
        listing_id: 7,
        date: '7/20/2020'
    },
    {
        rvowner_id: 13,
        listing_id: 7,
        date: '11/19/2020'
    },
    {
        rvowner_id: 2,
        listing_id: 4,
        date: '5/2/2020'
    },
    {
        rvowner_id: 3,
        listing_id: 14,
        date: '11/30/2019'
    },
    {
        rvowner_id: 16,
        listing_id: 9,
        date: '3/14/2020'
    },
    {
        rvowner_id: 15,
        listing_id: 5,
        date: '12/16/2019'
    },
    {
        rvowner_id: 14,
        listing_id: 6,
        date: '9/17/2019'
    },
    {
        rvowner_id: 13,
        listing_id: 17,
        date: '8/10/2022'
    },
    {
        rvowner_id: 11,
        listing_id: 9,
        date: '5/5/2021'
    },
    {
        rvowner_id: 8,
        listing_id: 15,
        date: '10/20/2022'
    },
    {
        rvowner_id: 5,
        listing_id: 16,
        date: '10/3/2022'
    },
    {
        rvowner_id: 9,
        listing_id: 10,
        date: '11/18/2021'
    },
    {
        rvowner_id: 5,
        listing_id: 13,
        date: '5/28/2021'
    },
    {
        rvowner_id: 1,
        listing_id: 7,
        date: '12/27/2019'
    },
    {
        rvowner_id: 8,
        listing_id: 1,
        date: '11/22/2020'
    },
    {
        rvowner_id: 14,
        listing_id: 16,
        date: '8/1/2019'
    },
    {
        rvowner_id: 8,
        listing_id: 15,
        date: '8/7/2020'
    },
    {
        rvowner_id: 17,
        listing_id: 5,
        date: '3/15/2022'
    },
    {
        rvowner_id: 17,
        listing_id: 20,
        date: '6/29/2022'
    }
]

async function writeIterableToFile(iterable, filePath) {
    const readable = stream.Readable.from(
        iterable, { encoding: 'utf8' });
    const writable = fs.createWriteStream(filePath);
    await pipeline(readable, writable);
}
const writeSeeds = (arrName, arr) =>
    writeIterableToFile(JSON.stringify(arr), arrName + 'SEED.js');

let c = 0;
const getRandomIdx = arr => Math.limit(1,Math.floor(Math.random() * arr.length));
const normalizeArr = (arr, fk, fkarr) => arr.forEach(element => {
    let randomID = getRandomIdx(fkarr);
    let arrName = arr === listings
        ? 'listings'
        : arr === amenities
            ? 'amenities'
            : arr === reservations
                ? 'reservations'
                : null;
    let fkLen = fkarr.length;
    let prevID = element[fk.toString()];
    let currID = prevID >= fkLen
        ? randomID
        : prevID;
    element[fk.toString()] = currID;

    let newID = element[fk.toString()];
    if (newID !== prevID) console.log({ c: c++, prevID, fkLen, currID, newID, arrName });
    return element;
});
let toNormalizeList = [
    { arr: amenities, arrName: "amenities", fk: "listing_id", fkarr: listings },
    { arr: reservations, arrName: "reservations", fk: "rvowner_id", fkarr: rvowners },
    { arr: reservations, arrName: "reservations", fk: "listing_id", fkarr: listings },
    { arr: listings, arrName: "listings", fk: "landowner_id", fkarr: landowners },
    { arr: reservations, arrName: "reservations", fk: "rvowner_id", fkarr: rvowners },
    { arr: landowner_listings, arrName: "landowner_listings", fk: "listing_id", fkarr: listings },
    { arr: landowner_listings, arrName: "landowner_listings", fk: "landowner_id", fkarr: landowners },
    { arr: rvownerfav_listings, arrName: "rvownerfav_listings", fk: "rvowner_id", fkarr: rvowners },
    { arr: rvownerfav_listings, arrName: "rvownerfav_listings", fk: "listing_id", fkarr: listings },
]

toNormalizeList.forEach(({ arr, fk, fkarr }) => normalizeArr(arr, fk, fkarr))

toNormalizeList.forEach(({ arrName, arr }) => writeSeeds('./seedstreams/' + arrName, arr))
// normalizeArr(listings, landowner_id, landowners);
// normalizeArr(reservations, rvowner_id, rvowners);


// function checkListingLandOwners() {
//     for (let i = 0; i < listings.length; i++) {
//         if (listings[i]['landowner_id']) {

//         }

//     }
//     function loadHash(seedListToCheck, fk) {
//         let hash = {}, foundIdsList = [], count = 0;
//         for (let i = 0; i < seedListToCheck.length; i++) {
//             if (hash[seedListToCheck[i][fk]] != true) {
//                 hash[seedListToCheck[i][fk]] = true;
//                 foundIdsList.push(seedListToCheck[i].fk);
//                 count++;
//             }
//         }
//         return [hash, foundIdsList, count]
//     }//[hash, foundIdsList, count]

//     function confirmFKs(seedListToCheck, foundIdsList, fk, hash) {
//         for (let i = 0, j = 0; i < seedListToCheck.length; i++) {
//             let rInt = Math.floor(Math.random() * 75);
//             let rInt2 = Math.floor(Math.random() * 75);
//             let newLOID = foundIdsList[rInt];
//             if (hash[seedListToCheck[i][fk]] != true) {
//                 seedListToCheck[i][fk] = newLOID;
//                 // console.log({ newLOID, newl: listings[i] })
//             }
//         }
//         return seedListToCheck;
//     }//seedListToCheck


//     const [listingsHash, listingsFoundIdsList, listingsCount] = loadHash(listings, "landowner_id")
//     const [rvownersHash, rvownersFoundIdsList, rvownersCount] = loadHash(rvowners, "landowner_id")
//     const [landownersHash, landownersFoundIdsList, landownersCount] = loadHash(landowners, "landowner_id")
//     const [reservationsHash, reservationsFoundIdsList, reservationsCount] = loadHash(reservations, "landowner_id")
//     const [amenitiesHash, amenitiesFoundIdsList, amenitiesCount] = loadHash(amenities, "landowner_id")
//     listings = confirmFKs(listings, listingsFoundIdsList, "landowner_id")


//     // the NODE streaming function

//  writeIterableToFile(
//         JSON.stringify(newListingsTableSEED), 'new2ListingsTableSEED.js')


