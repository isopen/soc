class Message
  include Mongoid::Document
  belongs_to :dialogues
end
