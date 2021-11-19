let tasks = () => { };
let taskDoc = [];

// add task
tasks.add = async (req, res) => {
    try {
        let { description } = req.body;
        if (!description) {
            return res.status(400).send({
                status: -1,
                message: `Add Description`,
                error: true,
                data: {},
            });
        } else {
            let objToAdd = {
                description,
                done: false,
                id: taskDoc.length + 1,
                isDeleted: false
            }
            taskDoc.push(objToAdd);
            res.status(200).send({
                status: 1,
                message: 'Task Added',
                error: false,
                data: objToAdd
            })
        }
    } catch (error) {
        return res.status(400).send({
            status: -1,
            message: `internal server error`,
            error: true,
            data: error,
        });
    }
};

// get tasks
tasks.get = async (req, res) => {
    try {
        let results = taskDoc.filter(t => !t.isDeleted);
        res.status(200).send({
            status: 1,
            message: 'Tasks Fetched',
            error: false,
            data: results
        })
    } catch (error) {
        return res.status(400).send({
            status: -1,
            message: `internal server error`,
            error: true,
            data: error,
        });
    }
};

// update task
tasks.update = async (req, res) => {
    try {
        let { id, done } = req.body;
        let index = taskDoc.findIndex(t => t.id === id);
        if (index === -1) {
            res.status(500).send({
                status: -1,
                message: 'Not Found',
                error: true,
                data: taskDoc[index]
            })
        } else {
            taskDoc[index].done = done;
            res.status(200).send({
                status: 1,
                message: 'Task Updates',
                error: false,
                data: taskDoc[index]
            })
        }
    } catch (error) {
        return res.status(400).send({
            status: -1,
            message: `internal server error`,
            error: true,
            data: error,
        });
    }
};

// delete task
tasks.delete = async (req, res) => {
    try {
        let { id } = req.body;
        let index = taskDoc.findIndex(t => t.id === id);
        taskDoc[index].isDeleted = true;
        res.status(200).send({
            status: 1,
            message: 'Task Updates',
            error: false,
            data: taskDoc[index]
        })
    } catch (error) {
        return res.status(400).send({
            status: -1,
            message: `internal server error`,
            error: true,
            data: error,
        });
    }
};

module.exports = tasks;