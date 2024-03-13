
# ユーザー
# 12.times do |index|
#   User.create(
#     name: "user#{index}",
#     email: "user#{index}@example.com",
#     password: "password",
#   )
# end

# 小説作成
12.times do |index|
  ssnovel = Ssnovel.find_or_create_by(
    title: "ssnovel #{index}",
  )

  count = rand(1..4)
  users = User.all.sample(count)
  count.times do |j|
    SsnovelBody.find_or_create_by(
      content: "ssnovel body #{j}",
      narrative_stage: j,
      ssnovel_id: ssnovel.id,
      user_id: users[j].id,
    )
  end
end