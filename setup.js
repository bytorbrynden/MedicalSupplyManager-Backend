/**
 * setup.js
 * @author Brynden Bielefeld
 * 
 * Performs initial server & database setup.
 */
const serverConfig = require("./data/server.config.json");
const sqlite3      = require("better-sqlite3");

const serverHost = serverConfig.host.name;
const serverPort = serverConfig.host.port;
const databaseName = serverConfig.database.filename;

function main() {
    const database = new sqlite3(databaseName, {
        verbose: console.log
    });

    // Create users table
    database
        .prepare("CREATE TABLE IF NOT EXISTS 'users' (admin_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, username TEXT, password TEXT, permissions TEXT, email TEXT, badge TEXT)")
        .run();

    // Create product table
    database
        .prepare("CREATE TABLE IF NOT EXISTS `product` (product_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, product_tag TEXT, product_name TEXT, product_qty TEXT, product_reorder TEXT, exp_date TEXT ,checkout_count TEXT, ordered TEXT)")
        .run();

    // Create transactions table
    database
        .prepare("CREATE TABLE IF NOT EXISTS `transactions` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `transaction_id` INTEGER, `t_type` INTEGER, `admin_id` TEXT, `product_id` INTEGER, `qty_change` INTEGER, `new_qty` INTEGER, `note` TEXT, `date` TEXT )")
        .run();

    // Create config table
    database
        .prepare("CREATE TABLE IF NOT EXISTS `config` ( `variable` TEXT, `value` INTEGER , `data` TEXT )")
        .run();

    // Query the users table to determine if admin account has already been created, if not, add admin user to database.
    if (!database.prepare("SELECT * FROM users WHERE username = ?").get(serverConfig.admin.name)) {
        database
            .prepare("INSERT INTO users (username, password, email, badge) VALUES (?, ?, ?, ?)")
            .run(
                serverConfig.admin.name,
                serverConfig.admin.pass,
                serverConfig.admin.email,
                serverConfig.admin.badge
            );
    }

    database.close();
}

main();