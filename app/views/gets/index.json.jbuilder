json.array!(@gets) do |get|
  json.extract! get, 
  json.url get_url(get, format: :json)
end
