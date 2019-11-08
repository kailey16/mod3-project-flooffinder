class Pet < ApplicationRecord
  has_many :savepets
  has_many :users, through: :savepets
end
