
var request = {
  
  common_action:'common_action',
  request_action:'request_action',
  
   //用户接口
  req_get_user_info:'fkc/user/user',
  req_bind_user_info:'fkc/user/create',
  req_get_open_id:'fkc/user/get_open_id',
  
  //请求学堂所有的分类
  req_school_categorys: 'fkc/school/get_category_list',
  req_get_subject_content_in_category:'fkc/school/get_subject_content_in_category',
  
  //请求产品
  req_product_categorys: 'fkc/product/product_category_list',
  req_product_packagey : 'fkc/product/product_package_list',
  req_product_package_content:'fkc/product/product_package_content',
  req_product_single:"fkc/product/product_single",
  req_product_search:'fkc/product/product_search',
  
  //客户信息相关
  //请求客户信息列表
  req_customer_record_list:'fkc/customer/customer_record_list',
  //获取拜访客户记录表
  req_customer_visit_list: 'fkc/customer/customer_visit_list',
  //获取客户治疗记录表
  req_customer_treat_records: 'fkc/customer/customer_treat_records',
  //提交客户信息
  put_customer_info: 'fkc/customer/customer_info_submit',
  
  //通知相关
  //请求通知列表
  req_notify_list:'fkc/notify/list',
}

export default request;
