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

    @regex_login = /^(\d([._]?)|[a-z]([._]?))+(?<![._])$/

  end

  # validation of data
  # string func_type
  # 'login' - form of login
  # 'reg' - form of registration
  # return bool
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
                     @regex_login.match(gl) &&
                     (tp_len = tp.length) &&
                     tp_len >= @len_password_min &&
                     tp_len <= @len_password
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
        reg_validation = lambda { |l, p, pp|
          return !l.is_a?(NilClass) &&
                 !p.is_a?(NilClass) &&
                 !pp.is_a?(NilClass) &&
                 l.is_a?(String) &&
                 p.is_a?(String) &&
                 pp.is_a?(String) &&
                 !l.empty? &&
                 !p.empty? &&
                 !pp.empty? &&
                 (l_len = l.length) &&
                 l_len >= @len_login_min &&
                 l_len <= @len_login &&
                 @regex_login.match(l) &&
                 p == pp &&
                 (p_len = p.length) &&
                 p_len >= @len_password_min &&
                 p_len <= @len_password &&
                 (pp_len = pp.length) &&
                 pp_len >= @len_password_min &&
                 pp_len <= @len_password
        }
        p params['re_password']
        if reg_validation.call(params['login'], params['password'], params['re_password'])
          return true
        else
          return false
        end
      else
        return false
    end
  end
end
