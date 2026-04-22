findTarget(allUnits, towers) {
    let closestUnit = null;
    let closestDist = Infinity;
    
    for (let unit of allUnits) {
        if (unit.isPlayer !== this.isPlayer && unit.lane === this.lane && unit.hp > 0) {
            const dist = Math.hypot(this.x - unit.x, this.y - unit.y);
            // Для дальних юнитов - атакуем в пределах range
            // Для ближних - подходим вплотную
            const attackDist = this.attackType === 'ranged' ? this.attackRange : this.attackRange;
            if (dist < attackDist && dist < closestDist) {
                closestDist = dist;
                closestUnit = unit;
            }
        }
    }
    
    if (closestUnit) {
        this.target = closestUnit;
        this.targetType = 'unit';
        return;
    }
    
    const targetTower = this.getTargetTower(towers);
    if (targetTower && targetTower.hp > 0) {
        const dist = Math.hypot(this.x - targetTower.x, this.y - targetTower.y);
        const attackDist = this.attackType === 'ranged' ? this.attackRange : this.attackRange;
        if (dist < attackDist) {
            this.target = targetTower;
            this.targetType = 'tower';
            return;
        }
    }
    
    this.target = null;
    this.targetType = null;
}
