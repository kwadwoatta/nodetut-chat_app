class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room}
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var user = this.getUser(id);

        if(user) {
            this.users = this.users.filter((user) => user.id !== id);
        }
        return user
    }
    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room) {
        var users = this.users.filter((user) => user.room === room )
        var namesArray = users.map((user) => user.name)
        return namesArray;
    }
}

module.exports ={Users}
// class Person {
//     constructor(name, age) {
//         // this in constructor refer to the instance and not the class
//         this.name = name,
//         this.age = age
//     }
//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old`
//     }
// }

// var me = new Person("Prince", 19);

// console.log(me)
// console.log(me.name)
// console.log(me.age)
// var hi = me.getUserDescription();
// console.log(hi);

