class Token
  include Mongoid::Document
  belongs_to :user
  field :token, type: String
  field :ip, type: String
  field :user_agent, type: String
end
