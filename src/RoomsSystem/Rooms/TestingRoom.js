TestingRoom = function () {
    BaseRoom.call(this);
}

TestingRoom.prototype = Object.create(BaseRoom.prototype);
TestingRoom.prototype.constructor = TestingRoom;