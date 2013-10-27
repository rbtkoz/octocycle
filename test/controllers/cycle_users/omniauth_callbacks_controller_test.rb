require 'test_helper'

class CycleUsers::OmniauthCallbacksControllerTest < ActionController::TestCase
  test "should get twitter" do
    get :twitter
    assert_response :success
  end

end
