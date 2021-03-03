module.exports = (sequelize, Sequelize) => {
    const Logisticsitem = sequelize.define("logisticsitem", {
      order_id: {
        type: Sequelize.STRING
      },
      request_id: {
        type: Sequelize.STRING
      },
      task_id: {
        type: Sequelize.STRING
      },
      user_id: {
        type: Sequelize.STRING
      },
      store_id: {
        type: Sequelize.STRING
      },
      used_API: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      otp_required: {
        type: Sequelize.STRING
      },
      start_point: {
        type: Sequelize.STRING
      },
      end_point: {
        type: Sequelize.STRING
      },
      package_content: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      package_approx_value: {
        type: Sequelize.FLOAT
      },
      track_url: {
        type: Sequelize.STRING
      },
      runner_name: {
        type: Sequelize.STRING
      },
      runner_phone_number: {
        type: Sequelize.BIGINT
      },
      estimated_price: {
        type: Sequelize.FLOAT
      },
      price: {
        type: Sequelize.FLOAT
      },
      total_time: {
        type: Sequelize.FLOAT
      },
      is_cancelled: {
        type: Sequelize.BOOLEAN
      },
      cancelled_by: {
        type: Sequelize.STRING
      },
      
      cancellation_reason: {
        type: Sequelize.STRING
      },
      
      is_delivered: {
        type: Sequelize.BOOLEAN
      },
      event_timestamp: {
        type: Sequelize.BIGINT
      },
      request_timestamp: {
        type: Sequelize.BIGINT
      },
      created_by: {
        type: Sequelize.STRING
      },
      updated_by : {
        type: Sequelize.STRING
      },

      request_JSON : {
        type: Sequelize.TEXT
      },
      response_JSON: {
        type: Sequelize.TEXT
      },
      quote_response_JSON: {
        type: Sequelize.TEXT
      },
      status_response_JSON: {
        type: Sequelize.TEXT
      },
      edit_response_JSON: {
        type: Sequelize.TEXT
      },
      cancel_response_JSON: {
        type: Sequelize.TEXT
      },
    }, 
    {
       indexes:[
         {
           unique: false,
           fields:['store_id','user_id','task_id','order_id']
         }
        ]
    
    });
  
    return Logisticsitem;
  };