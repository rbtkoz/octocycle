class WelcomeController < ApplicationController
  before_filter :authenticate_cycle_user!
  def index
  end
end
