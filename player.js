// Параметры игрока
            const PLAYER_SIZE = 40;      // сторона квадрата (px)
            const PLAYER_SPEED = 5;      // пикселей за кадр (плавное движение)
            
            // Начальная позиция (по центру)
            let player = {
                x: canvas.width/2 - PLAYER_SIZE/2,
                y: canvas.height/2 - PLAYER_SIZE/2,
                width: PLAYER_SIZE,
                height: PLAYER_SIZE
