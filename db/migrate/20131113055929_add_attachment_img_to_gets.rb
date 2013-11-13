class AddAttachmentImgToGets < ActiveRecord::Migration
  def self.up
    change_table :gets do |t|
      t.attachment :img
    end
  end

  def self.down
    drop_attached_file :gets, :img
  end
end
