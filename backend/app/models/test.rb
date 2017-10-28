class Test
  include Mongoid::Document
  field :login, type: String
  field :password, type: String
end
