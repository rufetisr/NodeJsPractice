const exp = require('express');
const connection = require('./db');

let app = exp();
let cors = require('cors');

app.listen(400, () => {
    console.log(" server listening on port 400");
})

app.use(exp.static('public'));
app.use(cors()); // cors use etmek ucn
app.use(exp.json()); // body-ni istfde etmek ucun
app.use(exp.urlencoded({ extended: true }));

app.get("/tasks", (req, res) => {
    const addQuery = `SELECT * FROM tododb.tasks`;
    connection.query(addQuery, (err, data) => {
        if (!err) {
            console.log(data);
            res.send(data);
        }
        else {
            console.error(err);
            res.status(500).send();
        }
    })
})

app.post('/addtask', (req, res) => {
    console.log(req.body);
    let addQuery = `insert into tododb.tasks (task) values('${req.body.task}');`
    connection.query(addQuery, (err, result) => {
        if (!err) {
            // console.log(result);
            res.status(200).send("Successfully added task ☺")
        }
        else {
            console.error(err);
            res.status(500).send("Server err");
        }
    })
    // res.send('you can add tasks');
})

app.delete('/deletetask/:id', (req, res) => {
    let reqID = parseInt(req.params.id);
    connection.query(`set @var =  
    (select taskid
    from tododb.tasks
    where taskid = ${reqID});

    select @var;`, (err, data) => {
        if (!err) {
            let returnData = data[1][0]["@var"];
            if (returnData == null) {
                res.status(404).send();
            }
            else {
                connection.query(`delete from todoDb.tasks where taskid = ${reqID};`, (err, result) => {
                    if (!err) {
                        console.log(result);
                        res.status(200).send("Task has been deleted")
                    }
                    else {
                        console.error(err);
                        res.status(500).send();
                    }
                })
            }
        }
        else {
            res.status(500).send();
        }
    })
})

