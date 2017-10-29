require 'bcrypt'

class AuthController < ApplicationController
  
  # if token then token elsif password password and return new token else error
  # string login
  # string password
  # string token
  def login
    user = User.where(login: params[:login], token: params[:token]).first
    if(user) then
      res = {
        :success => true, 
        :type => "login_by_token"
      }
    elsif (params[:password])
      user = User.where(login: params[:login]).first
      password = BCrypt::Password.new(user.encrypted_password)
      if(password == params[:password]) then
        user.token = SecureRandom.urlsafe_base64(61, false)
        user.save(validate: false)
        res = {
          :success => true, 
          :type => "login_by_pass", 
          :token => user.token
        }
      end
    else
      res = {
        :success => false,
        :type => "login_error"
      }
    end
    render :json => res
  end
  
  # reg users
  # string login
  # string password
  def reg
    count = User.where(login: params[:login]).count
    if(count == 0) then
      encrypted_password = BCrypt::Password.create(params[:password]);
      token = SecureRandom.urlsafe_base64(61, false)
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
