// tough melee attacker
import {MyCreep} from "creep";

export class Fighter extends MyCreep {
    private flag:Flag;
    constructor(private creep:Creep) {
        super(creep);
        this.flag = Game.flags['rallyPoint'];
    }

    public runRoutine() {
        //this.routine = [
        //
        //];
        //if (this.creep.room.name !== this.flag.room.name) {
            this.creep.moveTo(this.flag);
        //}
        // else {
        //     var nearestSpawn = this.findClosestByRange(FIND_HOSTILE_STRUCTURES);
        // if (nearestSpawn) {
        //     return this.doOrMoveTo(this.creep.attack, nearestSpawn);
        // }
        // }
    }

    public findHostileCreepsInRange(range:number):Creep[] {
        return this.creep.pos.findInRange(FIND_HOSTILE_CREEPS, range);
    }

    public attackNearestCreep() {
        let nearestEnemyCreep = this.findClosestByRange(FIND_HOSTILE_CREEPS);
            //(c:Creep) => c.getActiveBodyparts(ATTACK) > 0);
        if (_.isObject(nearestEnemyCreep)) {
            this.doOrMoveTo(this.creep.attack, nearestEnemyCreep);
            return true;
        }
        return false;
    }

    public attackNearestSpawn() {
        let nearestSpawn = this.findClosestByRange(FIND_HOSTILE_SPAWNS);
        if (nearestSpawn) {
            return this.doOrMoveTo(this.creep.attack, nearestSpawn);
        }
    }

    public attackLowestWall() {
        let wallsInRange = this.creep.pos.findInRange(FIND_STRUCTURES, 5,
            {filter: (s:Structure) => s.structureType === STRUCTURE_WALL});
        let sortedWalls = _.sortBy(wallsInRange, 'hits');
        return this.doOrMoveTo(this.creep.attack, sortedWalls[0]);
    }

    public attackNearestWall() {
        let nearestWall = this.findClosestByRange(FIND_STRUCTURES, (s:Structure) => s.structureType === STRUCTURE_WALL);
        if (nearestWall) {
            return this.doOrMoveTo(this.creep.attack, nearestWall);
        }
    }

}

export class Healer extends MyCreep {
    constructor(private creep:Creep) {
        super(creep);
    }
}