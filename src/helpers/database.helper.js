/**
 * helpers/database.helper.js
 * 
 * Database wrapper.
 */
const sqlite3 = require("better-sqlite3");
const path    = require("path");
const config  = require(path.resolve("./data/server.config.json"));

const databasePath = path.resolve(config.database.filename);

module.exports = {
    select: (sql) => {
        var results = null;
        var db = new sqlite3(databasePath, { });

        results = db.prepare(sql).all();

        db.close();

        return results;
    },

    insert: (table, data) => {
        var columnsArr = [ ];
        var valuesArr = [ ];

        for (var col in data) {
            columnsArr.push(col);
            valuesArr.push(`'${data[col]}'`);
        }

        var sqlStr = `INSERT INTO ${table} (${columnsArr.toString()}) VALUES (${valuesArr.toString()})`;
        var db = new sqlite3(databasePath, { verbose: console.log });

        db.prepare(sqlStr).run();
        db.close();
    }
};