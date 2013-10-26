class Get < ActiveRecord::Base
	belongs_to :user
	has_attached_file :image, :styles => { :large => "800x800>", :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/missing.png"
	
	# validates_attachment_presence :image
end
