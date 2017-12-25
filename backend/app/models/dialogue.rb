class Dialogue
  include Mongoid::Document
  belongs_to :user
  has_many :participants_dialogues, dependent: :destroy
  has_many :messages, dependent: :destroy

  field :created, type: Time
  field :updated, type: Time
end
