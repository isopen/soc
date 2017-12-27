# collection of dialogues users
class Dialogue
  include Mongoid::Document
  belongs_to :user
  has_many :participants_dialogues, dependent: :destroy

  field :created, type: Time, default: Time.now
  field :updated, type: Time, default: Time.now
end
