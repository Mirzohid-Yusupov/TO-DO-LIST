const db = require("../config/config")
const crypto = require('crypto')
const { Query } = require("../utils/sql.helper");

class tasks {
  async add_task(data) {
    try {
      data.task_id = crypto.randomBytes(4).toString('hex');
      const query = `INSERT INTO tasks SET ?`;
      const result = await Query(query, [data]);

      if (!result?.affectedRows) {
        throw new Error("Failed to Add New task")
      }

      return result;
    } catch (err) {
      throw (err)
    }
  }
  async get_tasks(user_id) {
    try {
      const query = `SELECT * FROM tasks WHERE user_id = ?`;
      const result = await Query(query, user_id);

      if (!result?.length) {
        return "there are no tasks";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async delete_tasks(task_id) {
    try {
      const query = `DELETE FROM tasks WHERE task_id = ?`;
      const result = await Query(query, task_id);

      if (!result?.affectedRows) {
        return "there is no task in this ID"
      }
    } catch (error) {
      throw error
    }
  }
  async update_tasks(task_id, data) {
    try {
      if (!data || Object.keys(data).length === 0) {
        throw new Error("No update data provided");
      }

      const query = `UPDATE tasks SET ? WHERE task_id = ?`;
      const result = await Query(query, [data, task_id]);

      if (!result?.affectedRows) {
        return "Something went wrong";
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
  async get_task_byid(task_id) {
    try {
      const query = `SELECT * FROM tasks WHERE task_id = ?`;
      const result = await Query(query, task_id);

      if (!result?.length) {
        return "task not found";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
  async completed_tasks(task_id) {
    try {
      const query = `UPDATE tasks SET status = 1 WHERE task_id = ?`
      const result = await Query(query, task_id)

      if (!result?.affectedRows) {
        return "Something went wrong";
      }

       return result;

    } catch(error) {
       throw error
    }

  }
  async get_completed_tasks(user_id) {
    try {
      const query = `SELECT * FROM tasks WHERE user_id = ? AND status = 1`;
      const result = await Query(query, user_id);

      if (!result?.length) {
        return "there are not completed tasks";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
    async get_sorted_tasks(user_id) {
    try {
      const query = `SELECT * FROM tasks WHERE user_id = ? ORDER BY start asc`;
      const result = await Query(query, user_id);

      if (!result?.length) {
        return "there are no tasks";
      }
      return result;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new tasks()
