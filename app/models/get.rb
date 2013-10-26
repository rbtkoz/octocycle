class Get < ActiveRecord::Base
  belongs_to :user
  
#Adding db
  col :image_url, :as=> :string
  col :latitude,  :as=> :float
  col :longitude, :as=> :float
  # col timestamps
  # col :user_id, :as => :integer
end

Get.auto_upgrade!
