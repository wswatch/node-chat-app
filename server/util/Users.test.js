const {User} = require("./users");
const expect = require('expect');

describe('Add user', ()=>{
  it('should return the current new user', ()=>{
    var users = new User();
    var u = users.addUser(1,"ws", "Room1");
    expect(u).toMatchObject({id:1,name:'ws',room:'Room1'});
    expect(users.users).toEqual([u]);
  })

  it('should return the name of all user in one room', ()=> {
    var users = new User();
    users.users = [{id: 1, name: 'Mike', room: 'Room1'},
  {id: 2, name: 'John', room: 'Room1'},
  {id: 3, name: 'Mary', room: 'Room2'}];
    var names = users.getUserList('Room1');
    expect(names).toEqual(['Mike','John']);
  })

  it('should remove a user', ()=>{
    var users = new User();
    users.users = [{id: 1, name: 'Mike', room: 'Room1'},
  {id: 2, name: 'John', room: 'Room1'},
  {id: 3, name: 'Mary', room: 'Room2'}];
    var user = users.removeUser(1);
    expect(user).toMatchObject({id: 1});
    expect(users.users.length).toBe(2);
  })

  it('should not remove user', ()=>{
    var users = new User();
    users.users = [{id: 1, name: 'Mike', room: 'Room1'},
  {id: 2, name: 'John', room: 'Room1'},
  {id: 3, name: 'Mary', room: 'Room2'}];
    var user = users.removeUser(4);
    expect(user).toBeFalsy();
    expect(users.users.length).toBe(3);
  })
})
