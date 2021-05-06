var mysql = require('mysql');
var config = require('../config/default.js')

var pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
});


// 目前是使用声明类，在类的方法中使用poo.query方法
// 以后尝试使用async await方法写这个query
class Mysql {
    constructor() {

    }
    queryfood() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from `xupt_food`.`foodList`', function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results)
            });
        })

    }
    queryhome() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from `xupt_food`.`indexList` ', function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results)
            });
        })

    }
    queryLogin({ userName, password }) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from xupt_food.userInfoList where userName="${userName}" and password="${password}" `, function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results.length)
            });
        })
    }
}

module.exports = new Mysql()