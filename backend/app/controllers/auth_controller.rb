require 'bcrypt'

# auth api
class AuthController < ApplicationController

  # string guid
  # string token
  # return json
  def login_by_token(guid, token)
    token = Token.where(
      user_id: guid ? BSON::ObjectId(guid) : '',
      token: token
    ).first
    if token
      if request.remote_ip != token['last_ip'] && request.user_agent != token['last_user_agent']
        token.delete
        return {
            success: false,
            type: 'login_error',
            transcript: 'hack_token'
        }
      end
      token.update(
        ip: request.remote_ip,
        last_ip: token['ip'],
        user_agent: request.user_agent,
        last_user_agent: token['user_agent'],
        updated: Time.now
      )
      return {
        success: true,
        type: 'login_by_token',
        id: token['user_id']
      }
    else
      return {
        success: false,
        type: 'login_error',
        transcript: 'no_token_found'
      }
    end
  rescue StandardError
    p $ERROR_INFO.inspect.to_s
    return {
      success: false,
      type: 'login_error',
      transcript: 'oops_something_went_wrong'
    }
  end

  # string login
  # string pass
  # return json
  def login_by_pass(login, pass)
    user = User.where(login: login).first
    if user
      password = BCrypt::Password.new(user.encrypted_password)
      if password == pass
        token = SecureRandom.urlsafe_base64(@len_token, false)
        user.tokens.create(
          token: token,
          ip: request.remote_ip,
          last_ip: request.remote_ip,
          user_agent: request.user_agent,
          last_user_agent: request.user_agent
        )
        roles = []
        user.roles.each do |r|
          roles.push(r['id_role'])
        end
        return {
          success: true,
          type: 'login_by_pass',
          token: token,
          id: user['_id'],
          roles: roles
        }
      else
        return {
          success: false,
          type: 'login_error',
          transcript: 'incorrect_password'
        }
      end
    else
      return {
        success: false,
        type: 'login_error',
        transcript: 'user_is_not_found'
      }
    end
  rescue StandardError
    p $ERROR_INFO.inspect.to_s
    return {
      success: false,
      type: 'login_error',
      transcript: 'oops_something_went_wrong'
    }
  end

  # if need delete token (example: exit user)
  # string guid
  # string token
  # return render-json
  def remove_token
    res = {
      success: false,
      type: 'remove_token_error',
      transcript: 'oops_something_went_wrong'
    }
    begin
      Token.where(
        user_id: params[:guid] ? BSON::ObjectId(params[:guid]) : '',
        token: params[:token]
      ).delete
      res = {
        success: true,
        type: 'remove_token'
      }
    rescue StandardError
      p $ERROR_INFO.inspect.to_s
    end
    render json: res
  end

  # if token then login_by_token else login_by_pass
  # and return new token else error
  # string guid
  # string login
  # string password
  # string token
  # return render-json
  def login
    res = {
      success: false,
      type: 'login_error',
      transcript: 'oops_something_went_wrong'
    }
    begin
      if self.data_validation('login')
        res = login_by_token(params[:guid], params[:token])
        if !res[:success] && res[:transcript] == 'no_token_found'
          res = login_by_pass(params[:login], params[:password])
        end
      else
        res = {
            success: false,
            type: 'login_error',
            transcript: 'validation error'
        }
      end
    rescue StandardError
      p $ERROR_INFO.inspect.to_s
    end
    render json: res
  end

  # reg users
  # string login
  # string password
  # return render-json
  def reg
    begin
      if self.data_validation('reg')
        count = User.where(login: params[:login]).count
        if count.zero?
          encrypted_password = BCrypt::Password.create(params[:password])
          token = SecureRandom.urlsafe_base64(@len_token, false)
          user = User.new(
            login: params[:login],
            encrypted_password: encrypted_password
          )
          user.save(validate: false)
          user.tokens.create(
            token: token,
            ip: request.remote_ip,
            last_ip: request.remote_ip,
            user_agent: request.user_agent,
            last_user_agent: request.user_agent
          )
          user.roles.create(
            id_role: 1
          )
          res = {
            success: true,
            type: 'reg_success',
            id: user['_id'],
            token: token
          }
        else
          res = {
            success: false,
            type: 'reg_error',
            transcript: 'user_exists'
          }
        end
      else
        res = {
          success: false,
          type: 'reg_error',
          transcript: 'validation error'
        }
      end
    rescue StandardError
      p $ERROR_INFO.inspect.to_s
      res = {
        success: false,
        type: 'reg_error',
        transcript: 'oops_something_went_wrong'
      }
    end
    render json: res
  end
end
