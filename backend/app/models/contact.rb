class Contact
  include Mongoid::Document
  belongs_to :user

  field :created, type: Time, default: Time.now
  field :updated, type: Time, default: Time.now
end
