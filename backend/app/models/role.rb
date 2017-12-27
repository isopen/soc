# static collection of roles
class Role
  include Mongoid::Document
  belongs_to :connect_role

  field :name, type: String
end
