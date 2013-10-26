class AddAttachmentImageToGets < ActiveRecord::Migration
  def self.up
    change_table :gets do |t|
      t.attachment :image
    end
  end

  def self.down
    drop_attached_file :gets, :image
  end
end
