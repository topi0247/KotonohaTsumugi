class Ssnovel < ApplicationRecord
  has_many :ssnovel_bodies, dependent: :destroy
  validates :title, presence: true, uniqueness: true

  def as_custom_json
    self.as_json(
      only: %i[id title created_at updated_at],
      include: {
        ssnovel_bodies: {
          only: %i[id content narrative_stage created_at],
          include: {
            user: {
              only: %i[id name]
            }
          }
        }
      }
    )
  end

  def created_at
    attributes['created_at'].strftime('%Y年%m月%d日 %H時%M分')
  end

  def updated_at
    attributes['updated_at'].strftime('%Y年%m月%d日 %H時%M分')
  end
end
