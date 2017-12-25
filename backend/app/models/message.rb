class Message
  include Mongoid::Document
  belongs_to :dialogue

  field :created, type: Time
  field :updated, type: Time
end
