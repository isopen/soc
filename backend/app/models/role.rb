# static collection of roles
class Role
  include Mongoid::Document

  field :name, type: String
end
