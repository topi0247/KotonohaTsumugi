class Ssnovel < ApplicationRecord
  has_many :ssnovel_bodies, dependent: :destroy
  validates :title, presence: true, uniqueness: true

  def created_at
    attributes['created_at'].strftime('%Y年%m月%d日 %H時%M分')
  end

  def updated_at
    attributes['updated_at'].strftime('%Y年%m月%d日 %H時%M分')
  end
end
