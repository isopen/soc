# collection of participants of dialogues
class ParticipantsDialogue
  include Mongoid::Document
  belongs_to :dialogue
  has_many :messages, dependent: :destroy
end
