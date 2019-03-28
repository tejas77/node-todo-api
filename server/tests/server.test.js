const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
}, {
    _id: new ObjectID(),
    text: 'Second test todo',
    completed: true,
    completedAt: 123
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(app)
         .post('/todos')
         .send({text})
         .expect(200)
         .expect((res) => {
            expect(res.body.text).toBe(text);
         })
         .end((err,res) => {
            if(err) {
                return done(err);
            }

            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e));
         });   
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
         .post('/todos')
         .send({})
         .expect(400)
         .end((err,res) => {
            if(err) {
                return done(err);
            }

            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch((e) => done(e));
         });   
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
         .get('/todos')
         .expect(200)
         .expect((res) => {
             expect(res.body.todos.length).toBe(2);
         }).end(done);
    });
});

describe('GET /todos/:id', () => {
    it('should return todo doc', (done) => {
        request(app)
         .get(`/todos/${todos[0]._id.toHexString()}`)
         .send()
         .expect(200)
         .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
         })
         .end(done);   
    });
    
    it('should return a 404 if todo not found', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()+1}`)
        .expect(404)
        .end(done);
    });
    
    it('should return a 404 for non-object ids', (done) => {
        request(app)
         .get('/todos/123')
         .expect(404)
         .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
         .delete(`/todos/${hexId}`)
         .send()
         .expect(200)
         .expect((res) => {
            expect(res.body.todo._id).toBe(hexId);
         })
         .end((err,res) => {
            if(err) {
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeNull();
                done();
            }).catch((e) => done(e));
         });   
    });
    
    it('should return a 404 if todo not found', (done) => {
        request(app)
        .delete(`/todos/${todos[0]._id.toHexString()+1}`)
        .expect(404)
        .end(done);
    });
    
    it('should return a 404 for non-object ids', (done) => {
        request(app)
         .delete('/todos/123')
         .expect(404)
         .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
         .patch(`/todos/${hexId}`)
         .send({
            "completed": true,
            "text": "Update Todo Postman"
        })
         .expect(200)
         .expect((res) => {             
            expect(res.body.text).toBe("Update Todo Postman");
            expect(res.body.completed).toBe(true);
            expect(typeof res.body.completedAt).toBe('number');
         })
         .end(done);   
    });
    
    it('should clear completedAt when the todo is not completed', (done) => {
        var hexId = todos[1]._id.toHexString();
        request(app)
         .patch(`/todos/${hexId}`)
         .send({
            "completed": false,
            "text": "Update Todo"
        })
         .expect(200)
         .expect((res) => {
            expect(res.body.text).toBe("Update Todo");
            expect(res.body.completed).toBe(false);
            expect(res.body.completedAt).toBeNull();
         })
         .end(done);  
    });
    
});
