class Dialogue
  include Mongoid::Document
  belongs_to :users
  has_many :participants_dialogues, dependent: :destroy
  has_many :messages, dependent: :destroy
end
