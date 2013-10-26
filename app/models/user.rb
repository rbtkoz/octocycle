class User < ActiveRecord::Base
  has_many :gets

  #add db
  col :user_name, :as=> :string
  col :twitter_handle, :as=> :string
  col :first_name, :as=> :string
  col :last_name, :as=> :string
  col :description,  :as=> :text
  # col timestamps
end

User.auto_upgrade!
