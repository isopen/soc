class Message
  include Mongoid::Document
  belongs_to :participants_dialogue

  field :text, type: String
  field :created, type: Time, default: Time.now
  field :updated, type: Time, default: Time.now
end
