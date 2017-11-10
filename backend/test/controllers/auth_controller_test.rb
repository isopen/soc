require 'bcrypt'

class AuthControllerTest < ActionDispatch::IntegrationTest
  
  test "auth_login" do

    # parameters for forming combinations
    opt = [{"login" => ""}, {"token" => ""}, {"password" => ""}, {"guid" => ""}]
    # generate combinations and send post requests  
    Gen::Data.shuffle_options(opt).map do |params|
      response = RestClient.post (Backend::Application.config.host + "/login"), params
      assert_equal false, JSON.parse(response)["success"]
    end
    
    # ((guid && token) || (login && token)) auth
    User.all.each do |u|    
      opt = {"login" => u.login, "token" => u.token}
      response = RestClient.post (Backend::Application.config.host + "/login"), opt
      assert_equal true, JSON.parse(response)["success"]
      
      opt = {"guid" => u.id.to_s, "token" => u.token}
      response = RestClient.post (Backend::Application.config.host + "/login"), opt
      assert_equal true, JSON.parse(response)["success"]    
    end
    
    # (login && password) auth
    opt = {"login" => "test1", "password" => "test"}
    response = RestClient.post (Backend::Application.config.host + "/login"), opt
    assert_equal true, JSON.parse(response)["success"]
    
  end
  test "auth_reg" do
    assert true
  end
end