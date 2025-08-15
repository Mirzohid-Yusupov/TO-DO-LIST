const rt = require("express").Router();

const tasks = require('./Controller/tasks')
rt.post("/add/task", tasks.add_task)
rt.get("/get/tasks/:user_id", tasks.get_tasks)
rt.get("/get/task/:task_id", tasks.get_task_byid)
rt.get("/get/completed/:user_id", tasks.get_completed_tasks)
rt.get("/get/sorted/tasks/:user_id", tasks.get_sorted_tasks)
rt.delete("/delete/task/:task_id", tasks.delete_tasks)
rt.patch("/update/task/:task_id", tasks.update_tasks)
rt.patch("/completed/:task_id", tasks.completed_tasks)


module.exports = rt;