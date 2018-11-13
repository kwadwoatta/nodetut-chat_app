const expect = require('expect');
const {Users} = require('./users');

var users;

beforeEach(() => {
    users = new Users();
    users.users = [
    {
        id: 1,
        name: 'Mike',
        room: 'Node Course'
    },
    {
        id: 2,
        name: 'Jen',
        room: 'React Course'
    },
    {
        id: 3,
        name: 'Joe',
        room: 'Node Course'
    }
]
})

describe('Users', () => {
    it ('should add new user', () => {
        var users = new Users();
        var user = {
            id: 123,
            name: 'Prince',
            room: 'office fans'
        }
        var resUsr = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user])
    })

    it('should return names for node course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    })

    it('should remove a user', () => {
        var removee = users.removeUser(1);
    expect(removee).toEqual(
            {
            id: 1,
            name: 'Mike',
            room: 'Node Course'
            })
    })

    it('should return a user with specified id', () => {
        var usee = users.getUser(3);
    expect(usee).toEqual(
        {
            id: 3,
            name: 'Joe',
            room: 'Node Course'
        })
    })
})