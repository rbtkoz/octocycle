# I'd use a more descriptive name than "gets". As a programmer seeing this code base for the first time, I have no idea what this means.
class Get < ActiveRecord::Base
	# belongs_to :user
	has_attached_file :image, :styles => { :large => "800x800>", :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/missing.png"
	
  # Por que?
  include Rails.application.routes.url_helpers

  # Is this method being called anywhere?
  def to_jq_image
    {
      "name" => read_attribute(:image_file_name),
      "size" => read_attribute(:image_file_size),
      "url" => image.url(:original),
      "delete_url" => image_path(self),
      "delete_type" => "DELETE" 
    }
  end

	# validates_attachment_presence :image
end
