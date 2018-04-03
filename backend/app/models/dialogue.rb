# collection of dialogues users
# 0 - wall
# 1 - dialogues
class Dialogue
  include Mongoid::Document
  belongs_to :user
  has_many :participants_dialogues, dependent: :destroy

  field :name, type: String
  field :type, type: Integer
  field :created, type: Time, default: Time.now
  field :updated, type: Time, default: Time.now
end
