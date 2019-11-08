class User < ApplicationRecord
  has_many :savepets
  has_many :pets, through: :savepets
end
