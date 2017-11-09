class AuthControllerTest < ActionDispatch::IntegrationTest
  
  test "auth_login" do

    # parameters for forming combinations
    r = [{"login" => ""}, {"token" => ""}, {"password" => ""}, {"guid" => ""}]
    # generate combinations and send post requests  
    Gen::Data.request_data(r).map do |params|
      response = RestClient.post (Backend::Application.config.host + "/login"), params
      assert_equal false, JSON.parse(response)["success"]
    end
  end
  test "auth_reg" do
    assert true
  end
end
