class WelcomeController < ApplicationController

  def index
    @gets = Get.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @gets }
    end
  end
end
