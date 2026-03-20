const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

     // Арена
    drawArena(ctx);
    drawRiver(ctx);
    drawBridge(ctx);
    
    // Башни
    drawPlayerTower(ctx, 150, 400);
    drawEnemyTower(ctx, 650, 400);
    drawKingTower(ctx, 400, 200, true);
    
     // Войска
    drawTroop(ctx, 200, 300, 'knight', true);
    drawTroop(ctx, 300, 350, 'archer', true);
    drawTroop(ctx, 500, 300, 'knight', false);
    drawTroop(ctx, 600, 350, 'mage', false);
    
    // Интерфейс
    drawElixirBar(ctx, 6, 10);
    drawTowerScore(ctx, 2, 1);
    
    requestAnimationFrame(gameLoop);
}

gameLoop();
