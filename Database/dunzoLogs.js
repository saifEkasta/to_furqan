const request = require('request');
const fs = require('fs');
var Logger = require('../config/logger.js');
var logger = Logger.logger;
const db = require("../Models");
const { con } = require('../config/dbconfig.js');
const Logisticsitems= db.logisticsitems;
const Op = db.Sequelize.Op;
const Sequelize= db.Sequelize;
const sequelize= db.sequelize;

var createTaskUpdate = async function(reqData,order_id,apisource){
    
   var updated = Logisticsitems.update(
       reqData,
        { where: { 
            order_id: order_id,
            source:apisource,
        } 
    }
      )
      .then(data => {
        result = {status:1,data:'success'};
         return result;
         
        })
        .catch(err => {
            result = {status:0,data:'failed'};
            return result;
        });
       
       
     return updated;
}

var cancelTask = async function(reqData,order_id,apisource){
   
   var updated = Logisticsitems.update(
    reqData,
        { where: { 
            task_id: order_id,
            source:apisource,
            task_id: {
                [Op.ne]: null
              }
        } 
       }
      )
      .then(data => {
        result = {status:1,data:'success'};
         return result;
         
        })
        .catch(err => {
            result = {status:0,data:'failed'};
            return result;
        });
       
       
     return updated;
}
var trackTask = async function(reqData,order_id,apisource){
   console.log('order_id- database',order_id);
   console.log(typeof(order_id));
   console.log('reqData',reqData);
    var updated = Logisticsitems.update(
     reqData,
         { where: {
              task_id: order_id,
              source:apisource
             } 
            }
       )
       .then(data => {
         result = {status:1,data:'success'};
          return result;
          
         })
         .catch(err => {
             console.log(err);
             result = {status:0,data:'failed'};
             return result;
         });
        
        
      return updated;
 }
var createTask = async function(reqData){
    var inserted =  Logisticsitems.create(reqData)
      .then(data => {
       result = {status:1,data:'success'};
        return result;
        
       })
       .catch(err => {
           result = {status:0,data:'failed'};
           return result;
       });
      
      
    return inserted;
        
}
var getOrderDetail = async function(task_ids,apisource){
var getOrder = Logisticsitems.findOne({
    where: {
        order_id: task_ids,
        source:apisource,
    },
    order: [ [ 'createdAt', 'DESC' ]],
 }).then(data => {
    result = {status:1,data:data};
     return result;
     
    })
    .catch(err => {
        result = {status:0,data:'failed'};
        return result;
    });
    return getOrder;
}
var getOrderDetailhook = async function(task_ids,apisource){
    var getOrder = Logisticsitems.findOne({
        where: {
            task_id: task_ids,
            source:apisource,
        },
        order: [ [ 'createdAt', 'DESC' ]],
     }).then(data => {
        result = {status:1,data:data};
         return result;
         
        })
        .catch(err => {
            result = {status:0,data:'failed'};
            return result;
        });
        return getOrder;
    }
module.exports  = {
    'createTask' : createTask,
    'createTaskUpdate' : createTaskUpdate,
    'cancelTask' : cancelTask,
    'trackTask':trackTask,
    'getOrderDetail' : getOrderDetail,
    'getOrderDetailhook': getOrderDetailhook
};