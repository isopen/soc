class Contact
  include Mongoid::Document
  belongs_to :user

  field :created, type: Time
  field :updated, type: Time
end
