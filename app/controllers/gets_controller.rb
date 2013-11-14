class GetsController < ApplicationController
  before_action :set_get, only: [:show, :edit, :update, :destroy]

  # GET /gets
  # GET /gets.json
  def index
    @gets = Get.all
    # @hash = Gmaps4rails.build_markers(@gets) do |user, marker|
    #   marker.lat gets.latitude
    #   marker.lng gets.longitude
    # end 
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @get }
    end
  end

  # GET /gets/1
  # GET /gets/1.json
  def show
    @get = Get.find(params[:id])
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @get }
    end
    

  end

  # GET /gets/new
  def new

    
    @get = Get.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @get }
    end
  end

  # GET /gets/1/edit
  def edit
    @get = Get.find(params[:id])
  end

  # POST /gets
  # POST /gets.json
  def create
    @get = Get.create(get_params_better)

    respond_to do |format|
      if @get.save
        format.html { redirect_to @get, notice: 'Get was successfully created.' }
        format.json { render json @get, status: :created, location: @get }
      else
        format.html { render action: 'new' }
        format.json { render json: @get.errors, status: :unprocessable_entity }
      end
    end
  end


  def update
    respond_to do |format|
      if @get.update(get_params_better)
        format.html { redirect_to @get, notice: 'Get was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @get.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /gets/1
  # DELETE /gets/1.json
  def destroy
    @get.destroy
    respond_to do |format|
      format.html { redirect_to gets_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_get
      @get = Get.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def get_params
      params[:get]
    end

    def get_params_better

    params.require(:get).permit(:user_id,:img)

    end

end
