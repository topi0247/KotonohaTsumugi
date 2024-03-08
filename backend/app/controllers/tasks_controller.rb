class TasksController < ApplicationController
  def index
    tasks = Task.all
    render json: tasks
  end
end
