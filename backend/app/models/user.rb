# collection of users
class User
  include Mongoid::Document
  has_many :roles, dependent: :destroy
  has_many :tokens, dependent: :destroy
  has_many :contacts, dependent: :destroy
  has_many :dialogues, dependent: :destroy

  ## Database authenticatable
  field :email, type: String
  field :login, type: String
  #field :confirm_token, type: Integer, default: 0
  field :encrypted_password, type: String

  ## Recoverable
  field :reset_password_token,   type: String
  field :reset_password_sent_at, type: Time

  ## Rememberable
  field :remember_created_at, type: Time

  ## Trackable
  field :sign_in_count,      type: Integer, default: 0
  field :current_sign_in_at, type: Time
  field :last_sign_in_at,    type: Time
  field :created, type: Time, default: Time.now
  field :updated, type: Time, default: Time.now
end
