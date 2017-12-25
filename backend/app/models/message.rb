class Message
  include Mongoid::Document
  belongs_to :dialogue

  field :created, type: Time, default: Time.now
  field :updated, type: Time, default: Time.now
end
