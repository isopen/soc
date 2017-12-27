# collection of links for user roles
class ConnectRole
  include Mongoid::Document
  has_one :role, dependent: :destroy
  belongs_to :user
end
