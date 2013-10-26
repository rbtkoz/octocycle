class AddUserIdToGets < ActiveRecord::Migration
  def change
    add_column :gets, :user_id, :integer
  end
end
