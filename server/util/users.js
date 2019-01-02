class User {
  constructor() {
    this.users = []
  }
  addUser(id, name, room) {
    var user = {id,name,room};
    this.users.push(user)
    return user;
  }
  removeUser(id) {
    var r = this.getUser(id);
    this.users = this.users.filter((user)=>user.id !== id);
    return r;
  }
  getUser(id) {
    return this.users.filter((user)=>user.id === id)[0];
  }
  getUserList(room) {
    var resUsers = this.users.filter((user) => user.room === room);
    var nameArray = resUsers.map((user) => user.name);

    return nameArray;
  }
}

module.exports = {User};
