require 'test_helper'

class GetsControllerTest < ActionController::TestCase
  setup do
    @get = gets(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:gets)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create get" do
    assert_difference('Get.count') do
      post :create, get: {  }
    end

    assert_redirected_to get_path(assigns(:get))
  end

  test "should show get" do
    get :show, id: @get
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @get
    assert_response :success
  end

  test "should update get" do
    patch :update, id: @get, get: {  }
    assert_redirected_to get_path(assigns(:get))
  end

  test "should destroy get" do
    assert_difference('Get.count', -1) do
      delete :destroy, id: @get
    end

    assert_redirected_to gets_path
  end
end
