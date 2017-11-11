require 'bcrypt'

class AuthController < ApplicationController
  
  attr_accessor :len_token;
  
  def initialize()
    @len_token = 61
  end
  
  def login_by_token(guid, token)
    begin
      token_is = Token.where(
        users_id: guid ? BSON::ObjectId(guid) : "",
        token: token
      ).first
      if(token_is) then
        return {
          :success => true, 
          :type => "login_by_token",
          :id => token_is['users_id']
        }
      else
        return {
          :success => false,
          :type => "login_error"
        }
      end
    rescue
      return {
        :success => false,
        :type => "login_error"
      }
    end
  end
  
  def login_by_pass(login, pass)
    begin
      user = User.where(login: login).first
      if(user) then
        password = BCrypt::Password.new(user.encrypted_password)
        if(password == pass) then
          token = SecureRandom.urlsafe_base64(@len_token, false)
          user.tokens.create(
            token: token,
            ip: request.remote_ip,
            user_agent: request.user_agent
          )
          return {
            :success => true, 
            :type => "login_by_pass", 
            :token => token,
            :id => user['_id']
          }
        else
          return {
            :success => false,
            :type => "login_error"
          }
        end
      else
        return {
          :success => false,
          :type => "login_error"
        }
      end
    rescue
      return {
        :success => false,
        :type => "login_error"
      }
    end
  end
  
  # if need delete token (example: exit user)
  # string guid
  # string token
  def remove_token()
    res = {
      :success => false,
      :type => "remove_token_error"
    }
    begin
      Token.where(
        users_id: params[:guid] ? BSON::ObjectId(params[:guid]) : "",
        token: params[:token]
      ).delete
      res = {
        :success => true,
        :type => "remove_token"
      }
    rescue
      p "#{$!.inspect}"
    end
    render :json => res
  end
  
  # if token then login_by_token else login_by_pass and return new token else error
  # string guid
  # string login
  # string password
  # string token
  def login
    res = {
      :success => false,
      :type => "login_error"
    }
    begin
      res = login_by_token(params[:guid], params[:token])
      if(!res[:success]) then
        res = login_by_pass(params[:login], params[:password])
      end
    rescue
      p "#{$!.inspect}"
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
      token = SecureRandom.urlsafe_base64(@len_token, false)
      user = User.new(
        login: params[:login],
        encrypted_password: encrypted_password
      )
      user.save(validate: false)
      user.tokens.create(
        token: token,
        ip: request.remote_ip,
        user_agent: request.user_agent
      )
      res = {
        :success => true,
        :type => "reg_by_loginpass",
        :id => user['_id'],
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
