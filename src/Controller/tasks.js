const service = require('../Service/task.service');

class tasks {
  async add_task(req, res) {
    try {
      await service.add_task(req.body)

      res.status(200).json({
        message: "Jinni joyladim",
        data: req.body,
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "Jinni notugri beribsanu",
        error: req.body
      })
    }
  }

  async get_tasks(req, res) {
    try {
      const data = await service.get_tasks(req.params.user_id)

      res.status(200).json({
        message: "mana sanga",
        data: data,
      })
    } catch (error) {
      res.status(500).json({
        message: "hatolik",
        error: req.body
      })
    }
  }
  async delete_tasks(req, res) {
    try {
      const data = await service.delete_tasks(req.params.task_id)

      res.status(200).json({
        message: "task deleted successfully",
        data: data,
      })
    } catch {
      res.status(500).json({
        message: "hatolik",
        error: req.body
      })
    }
  }
  async update_tasks(req, res) {
    try {
      const data = await service.update_tasks(req.params.task_id, req.body)

      res.status(200).json({
        message: "task updated successfully",
        data,
      })
    } catch (error) {
      res.status(500).json({
        message: "something went wrong",
        error: req.body
      })
    }
  }
  async get_task_byid(req, res) {
    try {
      const data = await service.get_task_byid(req.params.task_id)

      res.status(200).json({
        message: "here is your task!",
        data: data,
      })
    } catch (error) {
      res.status(500).json({
        message: "something went wrong",
        error: req.body
      })
    }
  }
  async completed_tasks(req, res) {
    try {
      const data = await service.completed_tasks(req.params.task_id)

      res.status(200).json({
        message: "weell done!",
        data: data,
      })
    } catch (error) {
      res.status(500).json({
        message: "something went wrong",
        error: req.body
      })
    }
  }
  async get_completed_tasks(req, res) {
    try {
      const data = await service.get_completed_tasks(req.params.user_id)

      res.status(200).json({
        message: "mana sanga",
        data: data,
      })
    } catch (error) {
      res.status(500).json({
        message: "hatolik",
        error: req.body
      })
    }
  }
    async get_sorted_tasks(req, res) {
    try {
      const data = await service.get_sorted_tasks(req.params.user_id)

      res.status(200).json({
        message: "mana sanga",
        data: data,
      })
    } catch (error) {
      res.status(500).json({
        message: "hatolik",
        error: req.body
      })
    }
  }
}
module.exports = new tasks();
