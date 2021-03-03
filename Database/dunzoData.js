const request = require('request');
const fs = require('fs');
var Logger = require('../config/logger.js');
var logger = Logger.logger;
const db = require("../Models/");
const { con } = require('../config/dbconfig.js');
const OrderDelivery= db.orderDelivery;
const Op = db.Sequelize.Op;
const Sequelize= db.Sequelize;
const sequelize= db.sequelize;

var createTaskUpdate = async function(reqData,order_id,apisource){
    
   var updated = OrderDelivery.update(
       reqData,
        { where: { 
            order_id: order_id,
            source:apisource,
            task_id: null,
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
   
   var updated = OrderDelivery.update(
    reqData,
        { where: { 
            id: order_id,
            source: apisource,
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
    var updated = OrderDelivery.update(
     reqData,
         { where: { 
             id: order_id,
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
             console.log(err);
             result = {status:0,data:'failed'};
             return result;
         });
        
        
      return updated;
 }
var createTask = async function(reqData){
    
    var inserted =  OrderDelivery.create(reqData)
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
var orderData = OrderDelivery.findOne({
    where: {
        order_id: task_ids,
        source:apisource,
        task_id: {
            [Op.ne]: null
          }
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
    return orderData;
}
var getOrderDetailhook = async function(task_ids,apisource){
var orderData = OrderDelivery.findOne({
    where: {
        task_id: task_ids,
        source :apisource
        
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
    return orderData;
}
var getOrderData = async function(order_id){
    var data;
             const query = `SELECT orders.id, orders.order_id, orders."userprofileId", orders.status, orders.bill_amount, users."name", userprofiles."email", users."phone", userprofiles."address", userprofiles."userId", orders."createdAt" FROM orders JOIN userprofiles ON orders."userprofileId" = userprofiles.id JOIN users ON userprofiles."userId" = users.id
             WHERE orders."order_id"='${order_id}' ORDER BY orders.id DESC`;
             data = await sequelize.query(query);
             console.log('data',data);
           if(data[0].length > 0){
            console.log('inside null got data');
           }else{
             
             const query = `SELECT orders.id, orders.order_id, orders."userprofileId", orders.status, orders.bill_amount, users."name", users."email", users."phone", users."address", orders."userId", orders."createdAt" FROM orders JOIN users ON orders."userId" = users.id
             WHERE orders."order_id"='${order_id}' ORDER BY orders.id DESC`;
            console.log('inside null');
            data = await sequelize.query(query);
           }
            return data[0];
   } 

module.exports  = {
    'createTask' : createTask,
    'createTaskUpdate' : createTaskUpdate,
    'cancelTask' : cancelTask,
    'trackTask':trackTask,
    'getOrderData':getOrderData,
    'getOrderDetail': getOrderDetail,
    'getOrderDetailhook': getOrderDetailhook
};