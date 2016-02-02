module MyCreep {
    export interface IMyCreep {
        getEnergyFromSpawn:(spawn:Spawn) => boolean;
        doOrMoveTo:(action:Function, target:Structure|Creep|ConstructionSite) => boolean;
        findClosestByRange:(structureType:number, filterFunction?:Function) => Structure;
        findAllInTheRoom:(findConstant:number) => any[];
    }

    export class MyCreep implements IMyCreep {
        private buildThreshold = 199;
        public constructor(private creep:Creep) {
        }

        public getEnergyFromSpawn(source:Spawn|Link) {
            if (this.creep.pos.isNearTo(source) === false) {
                this.creep.moveTo(source);
            }
            else if (source.energy > this.buildThreshold) {
                source.transferEnergy(this.creep)
            }
        }

        public doOrMoveTo(action:Function, target:Structure|Creep|ConstructionSite) {
            if (this.creep.pos.isNearTo(target)) {
                action.call(this.creep, target);
            }
            else {
                this.creep.moveTo(target);
            }
        }

        public findClosestByRange(findConstant:number, filterFunction?:Function) {

            if (filterFunction) {
                return this.creep.pos.findClosestByRange(findConstant, {
                    filter: filterFunction
                });
            }
            return this.creep.pos.findClosestByRange(findConstant);
        }

        // cast it to the correct type when finding something in particular.
        public findAllInTheRoom(findConstant:number):any[] {
            return this.creep.room.find<any>(findConstant);
        }
    }

}

module.exports = MyCreep;