

(function ($) {
    "use strict";


    /*==================================================================
    [ Focus Contact2 ]*/
    $('.input3').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
            

    /*==================================================================
    [ Chose Radio ]*/
    $("#radio1").on('change', function(){
        if ($(this).is(":checked")) {
            console.log('i am here');
            $('#userOrder').show();
            $('#adhoc').hide();
            // $('.input3-select').slideUp(300);
            
        }
    });

    $("#radio2").on('change', function(){
        if ($(this).is(":checked")) {
            $('#userOrder').hide();
            $('#adhoc').show();
            // $('.input3-select').slideDown(300);
        }
    });
        
    $('#dunzoprice').on('click',function(){
        var orderData =  JSON.parse(localStorage.getItem('orderData'));
        $.ajax({
            url: '/dunzoAPI/getQuote?pickup_lat='+orderData.pickup_lat+'&pickup_lng='+orderData.pickup_lng+'&drop_lat='+orderData.drop_lat+'&drop_lng='+orderData.drop_lng+'&category_id=pickup_drop&order_id='+orderData.order_id+'&user_id='+orderData.user_id+'&store_id='+orderData.store_id+'&end_point='+orderData.drop_add_act+'&start_point='+orderData.pickup_add_act,
            dataType: 'json',
            type:'GET',
           
          })
        .done(function(response){
            
           if(response.status == 1){
             $('#placeorderdunzo').prop("disabled",false); 
             $('#placeorderdunzo').html('Confirm'); 
          $('#dunzoQuote').html(response.data.estimated_price +' /Rs.' );
          
           }
           if(response.status == 0){
            alert(response.data.code +'-'+response.data.message);
            
          }
        }) 
    });
    $('#shadowfaxprice').on('click',function(){
        var orderData =  JSON.parse(localStorage.getItem('orderData'));
        $.ajax({
            url: '/shadowfaxAPI/getService?pickup_latitude='+orderData.pickup_lat+'&pickup_longitude='+orderData.pickup_lng+'&drop_latitude='+orderData.drop_lat+'&drop_longitude='+orderData.drop_lng+'&order_id='+orderData.order_id+'&user_id='+orderData.user_id+'&order_value='+orderData.amount+'&store_id='+orderData.store_id+'&end_point='+orderData.drop_add_act+'&start_point='+orderData.pickup_add_act+'&paid=false',
         dataType: 'json',
            type:'GET',
           
          })
        .done(function(response){
            console.log('response',response);
           if(response.status == 1){
             if(response.data.serviceability == false)
             alert('Location is currently not serviceable');       
            
             if(response.data.serviceability == true){
                $('#placeordershadowfax').prop("disabled",false);  
                $('#placeordershadowfax').html('Confirm');
                $('#shadowfaxQuote').html(response.data.delivery_cost +' /Rs.' );
                }
          
           }
           if(response.status == 0)
            alert('Error  in getting details');
        }) 
    });
    
    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="ad_name"]');
    var ad_mobile = $('.validate-input input[name="ad_mobile"]');

    var order = $('.validate-input input[name="order"]');
    //var p_name = $('.validate-input input[name="p_name"]');
    
    $('select').on('change', function() {

        var choice1 = $("input[name='choice']:checked").val(); 
        var store_id = $('#store').val();
        var ad_name = $('#ad_name').val();
        var ad_address = $('#ad_address').val();
        var ad_mobile = $('#ad_mobile').val();
        var curr = Math.floor(Math.random()*(9999-100+1)+100);
        var curr1 = Math.floor(Math.random()*(9999-100+1)+100);

        var ad_orderId = 'ek-'+curr+'-Eadhoc-'+curr1;
    

        var storeadd = $('option:selected').attr('data-storeadd');
        var storename = $( "#store option:selected" ).text();
        var check = true;
       
        if(choice1 == 'adhoc'){
 
            if($(name).val().trim() == ''){
                showValidate(name);
                check=false;
            }
            if(ad_address.length < 10){
                alert('please enter complete address');
                check=false;
            }
            if(ad_mobile.length > 10 || ad_mobile.length < 10 ){
                alert('please enter 10 digit mobile number');
                check=false;
            }
        if(check) {
            $.ajax({
                url: '/getOrderDataAdhoc?order_id='+ad_orderId+'&store_id='+store_id+'&storeadd='+storeadd+'&storename='+storename+'&ad_address='+ad_address+'&ad_mobile='+ad_mobile+'&ad_name='+ad_name,
                dataType: 'json',
                type:'GET',
               
              })
            .done(function(response){
                console.log(response);
               if(response.status == 1){
                localStorage.setItem('orderData',JSON.stringify(response.data));
                $('#quataion').show();
                $('#c_name').html(response.data.name);
                $('#c_mobile').html(response.data.mobile);
                $('#c_address').html(response.data.drop_add_act);
              
               }
               if(response.status == 0){
                alert(response.data);
                
              }
            }) 
            
        }else{
            showValidate(order);
           
        }

        }else{
   
        if($(order).val().trim().length <18 || $(order).val().trim().length >18) {
            $.ajax({
                url: '/getOrderData?order_id='+$(order).val()+'&store_id='+store_id+'&storeadd='+storeadd+'&storename='+storename,
                dataType: 'json',
                type:'GET',
               
              })
            .done(function(response){
                console.log(response);
               if(response.status == 1){
                localStorage.setItem('orderData',JSON.stringify(response.data));
                $('#quataion').show();
                $('#c_name').html(response.data.name);
                $('#c_mobile').html(response.data.mobile);
                $('#c_address').html(response.data.drop_add_act);
              
               }
               if(response.status == 0){
                alert(response.data);
                
              }
            }) 
            
        }else{
            showValidate(order);
           
        }
      }
  
      });

      $("#order").keyup(function(){
          var orderVal =$('#order').val();
          orderVal  = orderVal.trim();
        if(orderVal.length >18 && orderVal.length < 20) {
           
           
        }
      
      });
      $("#ad_mobile").keyup(function(){
        var orderVal =$('#ad_mobile').val();
        orderVal  = orderVal.trim();
      if(orderVal.length >10 && orderVal.length < 10) {
         
         showValidate(ad_mobile);
      }
    
    });

    $('#placeorderdunzo').on('click',function(){
        
        var check = true;  
        var choice1 = $("input[name='choice']:checked").val(); 
        var storeId = $('#store').val();
        var name1 = $('#ad_name').val();
        var order1= $('#order').val();
        var ad_address= $('#ad_address').val();
        var store = $( "#store option:selected" ).text();
        
        var a='';
        if(choice1 == 'adhoc'){
            if($(name).val().trim() == ''){
                showValidate(name);
                check=false;
            }
            if(ad_address.length < 10){
                alert('please enter complete address');
                check=false;
            }
            if($(ad_mobile).val().length > 10 || ad_mobile.val().length < 10 ){
                showValidate(ad_mobile);
                check=false;
            }
        }else{
        
         if($(order).val().trim().length <19) {
            showValidate(order);
            check=false;
        }
    }
        if(store == 'Store Name'){
            check=false;
            alert('Please select store')
            $("#store").css("color:red");
        }

        if(check){
        var a=10;
          
    var orderData =  JSON.parse(localStorage.getItem('orderData'));
            console.log(orderData);
        $.ajax({
            url: '/dunzoAPI/createTask',
            dataType: 'json',
            type:'POST',
            data: {
                "request_id" : orderData.order_id,
                "user_id" : orderData.user_id,
                "store_id" : orderData.store_id,
                "pickup_details": {
                lat: parseFloat(orderData.pickup_lat),
                lng: parseFloat(orderData.pickup_lng),
                "address": {
                "apartment_address" : orderData.pickup_add_act,
                "street_address_1": orderData.pickup_add_act,
                "city": orderData.pickup_city,
                "pincode": orderData.pickup_pincode,
                "country": "India"
                }
                },
                "drop_details": {
                    lat: parseFloat(orderData.drop_lat),
                    lng: parseFloat(orderData.drop_lng),
                    "address": {
                    "apartment_address" : orderData.drop_add_act,
                    "street_address_1": orderData.drop_add_act,
                    "city": orderData.drop_city,
                    "pincode": orderData.drop_pincode,
                    "country": "India"
                    }
                },
                "sender_details": {
                "name": store,
                "phone_number": '9769333666'
                },
                "receiver_details": {
                    "name": orderData.name,
                    "phone_number": orderData.mobile
                },
                "package_content": ["Household Items"],
                package_approx_value: parseInt(orderData.amount),
                "special_instructions": "Handle with great care!!"
                },
           
          })
        .done(function(response){
           
           if(response.status == 1){
             if(!!response.data.task_id || !!response.data.sfx_order_id){
                 alert('successfully ordered');
                 location.reload();
             }
           }
           if(response.status == 0){
            alert(response.data.code);
            location.reload();
            
          }
        })
        }
       return check;
    });


    $('#placeordershadowfax').on('click',function(){
        var check = true;  
        var choice1 = $("input[name='choice']:checked").val(); 
        var storeId = $('#store').val();
        var name1 = $('#name').val();
        var order1= $('#order').val();
        var p_name1 = $('#p_name').val();
        var store = $( "#store option:selected" ).text();
        var ad_address= $('#ad_address').val();
        var p_name1s = $( "#p_name option:selected" ).text();
        var a='';
        if(choice1 == 'adhoc'){
            if($(name).val().trim() == ''){
                showValidate(name);
                check=false;
            }
            if(ad_address.length < 10){
                alert('please enter complete address');
                check=false;
            }
            if($(ad_mobile).val().length > 10 || ad_mobile.val().length < 10 ){
                showValidate(ad_mobile);
                check=false;
            }
        }else{
        
         if($(order).val().trim().length <19) {
            showValidate(order);
            check=false;
        }
    }

        if(store == 'Store Name'){
            check=false;
            alert('Please select store')
            $("#store").css("color:red");
        }
        if(check){
            
    var orderData =  JSON.parse(localStorage.getItem('orderData'));
            
        $.ajax({
            url: '/shadowfaxAPI/createOrder',
            dataType: 'json',
            type:'POST',
            data: {
                "order_details":{
                "order_value":orderData.amount,
                "paid":"false",
                "client_order_id":orderData.order_id,
                "pickup_otp": "1234"
                },
                "pickup_details":{
                "city": orderData.pickup_city,
                "contact_number": '9769333666',
                "name": store,
                "longitude": orderData.pickup_lng,
                "address": orderData.pickup_add_act,
                "latitude": orderData.pickup_lat
                },
                "user_id":orderData.user_id,
                "store_id" : orderData.store_id,
                "order_items":[
                {
                "name":"Grocery",
                "price": orderData.amount,
                "quantity": 1,
                "id": orderData.order_id
                }
                ],
                "drop_details":{
                "name": orderData.name,
                "longitude":orderData.drop_lng,
                "address": orderData.drop_add_act,
                "latitude":orderData.drop_lat,
                "contact_number":orderData.mobile,
                "city":orderData.drop_city
                }
            },
           
          })
        .done(function(response){
           
           if(response.status == 1){
             if(!!response.data.data.sfx_order_id){
                 alert(response.data.message);
                 location.reload();
             }
           }
           if(response.status == 0){
            alert(response.data.code);
            location.reload();
          }
        })
        }
       return check;
    });

    $('.validate-form .input3').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);