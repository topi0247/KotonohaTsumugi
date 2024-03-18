class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable,
  :registerable,
  :recoverable,
  :rememberable,
  :validatable,
  :jwt_authenticatable,
  jwt_revocation_strategy: self
  has_many :ssnovel_bodies, dependent: :destroy
  validates :email, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true

  def jwt_subject
    self.id
  end

  def generate_jwt_token
    playload = { user_id: self.id }
    secret = Rails.application.credentials.secret_key_base
    token = JWT.encode(playload, secret, "HS256")
    token
  end
end
