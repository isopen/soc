require 'bcrypt'

class AuthController < ApplicationController
  
  attr_accessor :len_token;
  
  def initialize()
    @len_token = 61
  end
  
  #def auth_validator(login, password, token) {
  #  return false;
  #}
  
  # if token then token elsif password password and return new token else error
  # string login
  # string password
  # string token
  def login 
    # TODO:: validator 
    res = {
      :success => false,
      :type => "login_error"
    }
    user = User.where(login: params[:login], token: params[:token]).first
    if(user) then
      res = {
        :success => true, 
        :type => "login_by_token",
        :id => user['_id']
      }
    else
      user = User.where(login: params[:login]).first
      password = BCrypt::Password.new(user.encrypted_password)
      if(password == params[:password]) then
        user.token = SecureRandom.urlsafe_base64(@len_token, false)
        user.save(validate: false)
        res = {
          :success => true, 
          :type => "login_by_pass", 
          :token => user.token,
          :id => user['_id']
        }
      end
    end
    render :json => res
  end
  
  # reg users
  # string login
  # string password
  def reg
    # TODO:: validator
    count = User.where(login: params[:login]).count
    if(count == 0) then
      encrypted_password = BCrypt::Password.create(params[:password]);
      token = SecureRandom.urlsafe_base64(@len_token, false)
      User.new(login: params[:login], encrypted_password: encrypted_password, token: token)
        .save(validate: false)
      res = {
        :success => true,
        :type => "reg_by_loginpass",
        :login => params[:login], 
        :token => token
      }
    else
      res = {
        :success => false,
        :type => "reg_error"
      }
    end
    render :json => res
  end
end
