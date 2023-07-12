const {getConnection} = require("./index");
const {logger} = require("../logger");
const {exit} = require("../errorHandler");

/**
 *
 * @returns {Promise<Array<{
 *     id:number,
 *     user_id:number,
 *     up:number,
 *     down:number,
 *     total:number,
 *     remark:string,
 *     enable:0|1,
 *     expire_time:number,
 *     listen:string,
 *     port:number,
 *     protocol: string,
 *     settings0:string,
 *     stream_settings:string,
 *     tag:string,
 *     sniffing:string
 * }>>}
 */
module.exports.getAllUsers = () => {
    const connection = getConnection();
    return new Promise((resolve, reject) => {
        connection.all('select * from inbounds', (err, rows) => {
            if (err) {
                exit({
                    meta: err,
                    type: 'db',
                    message: 'cant get all users.'
                });
                process.exit()
            }
            connection.close();
            resolve(rows);
        });
    });
}