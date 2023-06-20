function checkLogin(req, res) {
  if (!req.session.user) {
    res.status(403).json({ message: "Nicht eingeloggt" })
    return false
  }

  return true
}

const tasks = [
  {
    id: 1,
    title: "Kinderhüten",
    description: "Kinder von der Schule abholen und auf sie aufpassen",
    done: false,
    due: "2023-03-11",
  },
  {
    id: 2,
    title: "Putzen",
    description: "Haus sauber machen",
    done: false,
    due: "2023-06-17",
  },
  {
    id: 3,
    title: "Coden",
    description: "Das Feature fertig machen",
    done: true,
    due: "2023-07-15",
  },
  {
    id: 4,
    title: "Lernen",
    description: "Für die Prüfung lernen",
    done: true,
    due: "2023-06-20",
  },
]

exports.getTasks = (req, res) => {
  if (checkLogin(req, res)) {
    res.status(200).json(tasks)
  }
}

exports.postTasks = (req, res) => {
  if (checkLogin(req, res)) {
    const task = req.body

    //Aus altem Projekt kopiert und angepasst
    const id = Math.max(...tasks.map((task) => task.id)) + 1

    const newTask = {
      id: id,
      title: task.title,
      description: task.description,
      done: task.done,
      due: task.due,
    }
    tasks.push(newTask)
    res.status(201).json(newTask)
  }
}

exports.getTask = (req, res) => {
  if (checkLogin(req, res)) {
    const taskid = req.params.taskid

    const task = tasks.find((task) => task.id == taskid)
    if (task) {
      res.json(task)
    } else {
      res.sendStatus(404)
    }
  }
}

exports.updateTask = (req, res) => {
  if (checkLogin(req, res)) {
    const taskid = req.params.taskid
    const task = req.body

    const taskUpdate = tasks.find((task) => task.id == taskid)
    if (taskUpdate) {
      taskUpdate.title = task.title
      taskUpdate.description = task.description
      taskUpdate.done = task.done
      taskUpdate.due = task.due
      res.status(200).json(taskUpdate)
    } else {
      res.sendStatus(404)
    }
  }
}

exports.deleteTask = (req, res) => {
  if (checkLogin(req, res)) {
    const taskid = req.params.taskid

    const taskDelete = tasks.find((task) => task.id == taskid)

    if (taskDelete) {
      const index = tasks.indexOf(taskDelete)

      tasks.splice(index, 1)
      res.status(200).json(taskDelete)
    } else {
      res.sendStatus(404)
    }
  }
}
