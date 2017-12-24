require 'bcrypt'
require 'openssl'

class AuthControllerTest < ActionDispatch::IntegrationTest

  test 'auth_login' do
    # parameters for forming combinations
    opt = [{ 'login' => '' }, { 'token' => '' }, { 'password' => '' }, { 'guid' => '' }]
    # generate combinations and send post requests
    Gen::Data.shuffle_options(opt).map do |params|
      response = RestClient.post (Backend::Application.config.host + '/login'), params
      assert_equal false, JSON.parse(response)['success']
    end

    # (guid && token) auth
    User.all.includes(:tokens).each do |u|
      u.tokens.each do |t|
        opt = { 'guid' => u.id.to_s, 'token' => t.token }
        response = RestClient.post (Backend::Application.config.host + '/login'), opt
        assert_equal true, JSON.parse(response)['success']
      end
    end

    # (login && password) auth
    opt = { 'login' => 'test1', 'password' => 'test' }
    response = RestClient.post (Backend::Application.config.host + '/login'), opt
    assert_equal true, JSON.parse(response)['success']
  end

  test 'auth_reg' do
    # (login && password) reg
    thr = []
    3.times do |n|
      thr << Thread.new(n) do |_i|
        1.times do
          s_rand = OpenSSL::Random.random_bytes(10).unpack('H*').join
          opt = { 'login' => s_rand, 'password' => s_rand, 're_password' => s_rand }
          response = RestClient.post (Backend::Application.config.host + '/reg'), opt
          assert_equal true, JSON.parse(response)['success']
        end
      end
    end
    thr.each(&:join)
  end
end
