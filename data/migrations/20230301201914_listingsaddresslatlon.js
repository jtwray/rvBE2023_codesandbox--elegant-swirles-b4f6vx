/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable("listing", (listing) => {
            // listing.increments();
            listing.string("address", 255).notNullable();
            listing.string("city", 255).notNullable();
            listing.string("lat").notNullable();
            listing.string("lon").notNullable();
            // listing.string("photo", 255);
            // listing.string("price", 255).notNullable();
            listing.string("state", 255).notNullable();
            listing.string("zip", 255).notNullable();
            // listing.text("description", 255).notNullable();
            listing.text("title", 255).notNullable();
            listing.dropColumn("location");
            listing.dropColumn("amenities");
            // listing
            //     .integer("landowner_id")
            //     .unsigned()
            //     .notNullable()
            //     .references("id")
            //     .inTable("landowner")
            //     .onUpdate("CASCADE")
            //     .onDelete("CASCADE");
        })
        .createTable("amenities", (tbl) => {
            tbl
                .integer("listing_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("listing")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            tbl.integer("guests");
            tbl.integer("beds");
            tbl.integer("bath");
            tbl.text("wifi", Boolean);
            tbl.text("kitchen", Boolean);
            tbl.text("heat", Boolean);
            tbl.text("water", Boolean);
            tbl.text("shower", Boolean);
            tbl.text("firepit", Boolean);
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("amenities")


};
