class ApplicationController < ActionController::API
  attr_accessor :len_guid
  attr_accessor :len_token
  attr_accessor :len_login
  attr_accessor :len_password

  attr_accessor :len_token_min
  attr_accessor :len_login_min
  attr_accessor :len_password_min

  def initialize

    @len_guid = 25
    @len_token = 61
    @len_login = 20
    @len_password = 20

    @len_token_min = 16
    @len_login_min = 4
    @len_password_min = 3

  end

  def data_validation(func_type)
    case func_type
      when 'login'
        login_validation = lambda { |gl, tp, type|
          case type
            when 'gt'
              return !gl.is_a?(NilClass) &&
                     !tp.is_a?(NilClass) &&
                     gl.is_a?(String) &&
                     tp.is_a?(String) &&
                     !gl.empty? &&
                     !tp.empty? &&
                     gl.length <= @len_guid &&
                     (tp_len = tp.length) &&
                     tp_len >= @len_token_min &&
                     tp_len <= (@len_token * 2)
            when 'lp'
              return !gl.is_a?(NilClass) &&
                     !tp.is_a?(NilClass) &&
                     gl.is_a?(String) &&
                     tp.is_a?(String) &&
                     !gl.empty? &&
                     !tp.empty? &&
                     (gl_len = gl.length) &&
                     gl_len >= @len_login_min &&
                     gl_len <= @len_login &&
                     (tp_len = tp.length) &&
                     tp_len >= @len_password_min &&
                     tp_len <= @len_password &&
                     gl_len.match('^(\d([._]?)|[a-z]([._]?))+(?<![._])$')
            else
              return false
          end
        }
        if login_validation.call(params[:guid], params[:token], 'gt')
          return true
        else if login_validation.call(params[:login], params[:password], 'lp')
               return true
             else
               return false
             end
        end
      when 'reg'
        return true
      else
        return false
    end
  end
end
