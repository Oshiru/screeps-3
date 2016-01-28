/// <reference path="../typings/tsd.d.ts" />

// calculate distances to each source and store them in the local memory
function getDistancesToSources(spawn:Spawn){
    let roomName = spawn.room.name;
    console.log('room name'+ roomName );
}

let transferToClosestAvailableExtension = (creep:Creep) => {
    //var extension = creep.room.find(FIND_MY_STRUCTURES, {
    //    filter: (object:Extension) => {
    //        return object.structureType === STRUCTURE_EXTENSION && (object.energy < object.energyCapacity);
    //    }
    //});
    var extension = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: (object:Extension) => {
            return object.structureType === STRUCTURE_EXTENSION && (object.energy < object.energyCapacity);
        }
    });

    if (extension && creep.transferEnergy(extension) === ERR_NOT_IN_RANGE){
        creep.moveTo(extension);
    }
};

function getExtensions(spawn:Spawn):Extension[] {
    var extensions: Extension[];
    console.log(spawn.room.name)
    return extensions;
}

var mine = function (creep:Creep, spawn:Spawn) {
    //getExtensions(spawn);
    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find<Source>(FIND_SOURCES);
        // navigate towards the closest resource
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
    else {
        // check if the spawn is full. If it is, transfer to the closest empty extension.
        if (spawn.energy === spawn.energyCapacity){
            transferToClosestAvailableExtension(creep);
        }
        else if (creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE){
            creep.moveTo(spawn);
        }
    }
};
// transfer energy
//Game.creeps.builder42.moveTo(Game.creeps.builder42.room.find(FIND_MY_STRUCTURES)[2])
//Game.creeps.builder42.moveTo(Game.creeps.builder42.room.find(FIND_MY_STRUCTURES)[2])
//Game.creeps.builder42.transferEnergy(Game.creeps.builder42.room.find(FIND_MY_STRUCTURES)[2])
module.exports = mine;