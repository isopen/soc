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

    # (non-existent guid and/or non-existent token) auth
    p = 10
    User.all.includes(:tokens).each_with_index do |u, i|
      response = {}
      if i < p
        opt = { 'guid' => u.id.to_s, 'token' => (srand 1234).to_s}
        response = RestClient.post (Backend::Application.config.host + '/login'), opt
      else if i < (p * 2)
             opt = { 'guid' => (srand 1234).to_s, 'token' => (srand 1234).to_s}
             response = RestClient.post (Backend::Application.config.host + '/login'), opt
           else
             u.tokens.each do |t|
               opt = { 'guid' => (srand 1234).to_s, 'token' => t.token}
               response = RestClient.post (Backend::Application.config.host + '/login'), opt
             end
           end
      end
      assert_equal false, JSON.parse(response)['success']
    end

    # (nil guid and/or nil token) auth
    User.all.includes(:tokens).each do |u|
      opt = { 'guid' => u.id.to_s, 'token' => nil}
      response = RestClient.post (Backend::Application.config.host + '/login'), opt
      assert_equal false, JSON.parse(response)['success']
      u.tokens.each do |t|
        opt = { 'guid' => nil, 'token' => t.token}
        response = RestClient.post (Backend::Application.config.host + '/login'), opt
        assert_equal false, JSON.parse(response)['success']
      end
      opt = { 'guid' => nil, 'token' => nil}
      response = RestClient.post (Backend::Application.config.host + '/login'), opt
      assert_equal false, JSON.parse(response)['success']
    end

    # (login && password) auth
    opt = { 'login' => 'test1', 'password' => 'test' }
    response = RestClient.post (Backend::Application.config.host + '/login'), opt
    assert_equal true, JSON.parse(response)['success']
  end

  test 'theft_token' do
    # theft of the token from the user's side
    User.all.includes(:tokens).each do |u|
      u.tokens.each do |t|
        opt = { 'guid' => u.id.to_s, 'token' => t.token}
        headers = {
            :'user-agent' => 'brutal user',
            :'http_client_ip' => '0.0.0.0',
            :'remote_addr' => '0.0.0.0',
            :'x-forwarded-for' => '0.0.0.0'
        }
        response = RestClient.post Backend::Application.config.host + '/login', opt, headers
        assert_equal false, JSON.parse(response)['success']
      end
    end
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
