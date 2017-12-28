# static collection of roles
class RoleDictionary
  include Mongoid::Document

  field :name, type: String
end
