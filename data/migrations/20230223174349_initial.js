exports.up = function (knex) {
    return knex.schema
        .createTable("rv", (rv) => {
            rv.increments();
            rv.string("username", 255).notNullable().unique();
            rv.string("email", 255).unique();
            rv.string("contact", 255);
            rv.string("password", 255).notNullable();
        })
        .createTable("landowner", (landowner) => {
            landowner.increments();
            landowner.string("username", 255).notNullable().unique();
            landowner.string("email", 255).unique();
            landowner.string("contact", 255);
            landowner.string("password", 255).notNullable();
        })
        .createTable("listing", (listing) => {
            listing.increments();
            listing.text("description", 255).notNullable();
            listing.string("price", 255).notNullable();
            listing.string("location", 255).notNullable();
            listing.string("photo", 255);
            listing.string("amenities", 255);
            listing
                .integer("landowner_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("landowner")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        })
        .createTable("reservation", (reservation) => {
            reservation.increments();
            reservation
                .integer("rvowner_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("rv")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            reservation
                .integer("listing_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("listing")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            reservation.string("date", 255).notNullable();
        })
        .createTable("landowner_listing", (landowner_listing) => {
            landowner_listing
                .integer("landowner_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("landowner")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            landowner_listing
                .integer("listing_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("listing")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            landowner_listing.primary(["landowner_id", "listing_id"]);
        })
        .createTable("rvownerfav_listing", (rvownerfav_listing) => {
            rvownerfav_listing
                .integer("rvowner_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("rv")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            rvownerfav_listing
                .integer("listing_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("listing")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            rvownerfav_listing.primary(["rvowner_id", "listing_id"]);
        });
};
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("rvownerfav_listing")
        .dropTableIfExists("landowner_listing")
        .dropTableIfExists("reservation")
        .dropTableIfExists("listing")
        .dropTableIfExists("landowner")
        .dropTableIfExists("rv");
};