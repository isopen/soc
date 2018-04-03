# collection of messages users
class Message
  include Mongoid::Document
  belongs_to :participants_dialogue

  field :text, type: String
  field :count_views, type: Integer, default: 0
  field :count_forward, type: Integer, default: 0
  field :count_changes, type: Integer, default: 0
  field :created, type: Time, default: Time.now
  field :updated, type: Time, default: Time.now
end
