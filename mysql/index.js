var mysql = require('mysql');
var config = require('../config/default.js')

const handleHardwareList = list => {
    const hardwareList = [];
    list.map(item => {
        hardwareList.push({
            id: item.id,
            name: item.title,
            dec: [{
                decId: item.decId,
                content: item.content
            }],
            gn: item.gn,
            an: item.an,
            bn: item.bn
        })
    });
    return hardwareList
};

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
            pool.query(`SELECT * from xupt_food.indexPageList`, function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results)
            });
        })

    }
    queryhome() {
        return new Promise((resolve, reject) => {
            pool.query('SELECT * from `xupt_food`.`indexPageList` ', function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results)
            });
        })

    }
    queryfoodDetail(id) {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from xupt_food.indexPageList where id="${id}"`, function(error, results, fields) {
                if (error) {
                    throw error
                }
                console.log({results})
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
    queryHardwareNew() {
        return new Promise((resolve, reject) => {
            pool.query(`SELECT * from xupt_food.indexPageList where type="3"`, function(error, results, fields) {
                const selectList = Boolean(Math.round(Math.random())) ? results.splice(0,3) : results.splice(3,6)
                const hardwareList = handleHardwareList(selectList)
                if (error) {
                    throw error
                }
                resolve(hardwareList)
            });
        })
    }
    queryOperateComment({gn, an, bn, id}) {
        return new Promise((resolve, reject) => {
            pool.query(`UPDATE xupt_food.indexPageList SET gn=${gn}, bn=${bn}, an=${an} where id=${id}`, function(error, results, fields) {
                if (error) {
                    throw error
                }
                resolve(results.length)
            });
        })
    }
}

module.exports = new Mysql()