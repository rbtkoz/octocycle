class AddColumnsToCycleUsers < ActiveRecord::Migration
  def change
    add_column :cycle_users, :provider, :string
    add_column :cycle_users, :uid, :string
    add_column :cycle_users, :name, :string
  end
end
