class Get < ActiveRecord::Base
	belongs_to :user
	has_attached_file :img, :styles => { :large => "800x800>", :medium => "300x300>", :thumb => "100x100>" }, :default_url => "/images/missing.png",
	:storage => :s3,
    :bucket => 'octocycle',
    :s3_credentials => {
      :access_key_id => 'AKIAI3YC6X4GFDGRS5FQ',
      :secret_access_key => '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'
    }
	
end
