# collection of links for user roles
# 0 - admin
# 1 - user
# 2 - moderator
class ConnectRole
  include Mongoid::Document
  has_one :role, dependent: :destroy
  belongs_to :user

  field :id_role, type: Integer
end
