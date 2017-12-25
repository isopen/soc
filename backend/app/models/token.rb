class Token
  include Mongoid::Document
  belongs_to :user

  field :token, type: String
  field :ip, type: String
  field :last_ip,    type: String
  field :user_agent, type: String
  field :active, type: Boolean, default: false
  field :created, type: Time, default: Time.now
  field :updated, type: Time, default: Time.now
end
