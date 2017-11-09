class AuthControllerTest < ActionDispatch::IntegrationTest
  
  test "auth_login" do

    r = [{"login" => ""}, {"token" => ""}, {"password" => ""}, {"guid" => ""}]
    
    Gen::Data.request_data(r).map do |params|
      response = RestClient.post "http://localhost:3000/login", params
      p response
    end
    assert true
  end
  test "auth_reg" do
    assert true
  end
end
