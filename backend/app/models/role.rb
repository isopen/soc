# collection of links for user roles
# 0 - admin
# 1 - user
# 2 - moderator
class Role
  include Mongoid::Document
  has_one :role_dictionary, dependent: :destroy
  belongs_to :user

  field :id_role, type: Integer
end
