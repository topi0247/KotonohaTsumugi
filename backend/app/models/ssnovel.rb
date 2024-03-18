class Ssnovel < ApplicationRecord
  has_many :ssnovel_bodies, dependent: :destroy
  has_many :users, through: :ssnovel_bodies
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
    attributes['created_at'].strftime('%Y/%m/%d %H:%M')
  end

  def updated_at
    attributes['updated_at'].strftime('%Y/%m/%d %H:%M')
  end
end
