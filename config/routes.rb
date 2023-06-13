Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :users, :defaults => { :format => 'json' } do
    collection do
      post 'login'
      post 'registration'
    end
  end
  root "home#index"
  get "home/index"
  post '/send_referral_email' => 'home#send_referral_email'
end
