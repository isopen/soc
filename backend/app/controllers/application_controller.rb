class ApplicationController < ActionController::API
  attr_accessor :len_guid
  attr_accessor :len_token
  attr_accessor :len_login
  attr_accessor :len_password

  def initialize
    @len_guid = 25
    @len_token = 61
    @len_login = 20
    @len_password = 20
  end

  def data_validation(func_type)
    case func_type
      when 'login'
        def login_validation(gl, tp, type)
          case type
            when 'gt'
              return !gl.is_a?(NilClass) && !tp.is_a?(NilClass) && gl.is_a?(String) && tp.is_a?(String) && !gl.empty? && !tp.empty? && gl.length <= @len_guid && tp.length <= (@len_token * 2)
            when 'lp'
              return !gl.is_a?(NilClass) && !tp.is_a?(NilClass) && gl.is_a?(String) && tp.is_a?(String) && !gl.empty? && !tp.empty? && gl.length <= @len_login && tp.length <= @len_password
            else
              return false;
          end
        end
        if login_validation(params[:guid], params[:token], 'gt')
          return true
        else if login_validation(params[:login], params[:password], 'lp')
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
