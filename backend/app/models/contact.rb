class Contact
  include Mongoid::Document
  belongs_to :users
end
