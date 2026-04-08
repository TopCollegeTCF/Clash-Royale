// Sound Module - звуковые эффекты
window.SoundFX = {
    sounds: {}, // Объект для хранения звуковых эффектов
    music: null, // Переменная для фоновой музыки
    isMuted: false, // Флаг полного отключения звука
    isMusicEnabled: true, // Флаг включения музыки
    isSFXEnabled: true, // Флаг включения звуковых эффектов
    
    init: function() { // Инициализация звуковой системы
        this.loadSounds(); // Загрузка звуковых эффектов
        this.loadMusic(); // Загрузка фоновой музыки
        console.log('🔊 Sound system initialized'); // Лог в консоль о готовности системы
    },
    
    loadSounds: function() { // Загрузка всех звуковых эффектов
        const soundList = { // Список звуков с путями к файлам
            deploy: 'assets/audio/sounds/deploy.mp3', // Звук размещения юнита
            hit: 'assets/audio/sounds/hit.mp3', // Звук удара
            towerHit: 'assets/audio/sounds/tower_hit.mp3', // Звук удара по башне
            victory: 'assets/audio/sounds/victory.mp3', // Звук победы
            defeat: 'assets/audio/sounds/defeat.mp3' // Звук поражения
        };
        
        for (let key in soundList) { // Перебор всех звуков из списка
            const audio = new Audio(soundList[key]); // Создание нового аудиообъекта
            audio.preload = 'auto'; // Автоматическая предзагрузка звука
            this.sounds[key] = audio; // Сохранение звука в объект sounds
        }
    },
    
    loadMusic: function() { // Загрузка фоновой музыки
        this.music = new Audio('assets/audio/music/battle_theme.mp3'); // Создание аудиообъекта для музыки
        this.music.loop = true; // Зацикливание музыки
        this.music.volume = 0.5; // Установка громкости на 50%
        this.music.preload = 'auto'; // Автоматическая предзагрузка музыки
    },
    
    play: function(soundName) { // Воспроизведение звукового эффекта по имени
        if (this.isMuted) return; // Проверка - не отключен ли звук полностью
        if (!this.isSFXEnabled && soundName !== 'victory' && soundName !== 'defeat') return; // Проверка включения звуковых эффектов (кроме victory/defeat)
        
        const sound = this.sounds[soundName]; // Получение аудиообъекта по имени
        if (sound) { // Если звук существует
            sound.currentTime = 0; // Сброс к началу (для возможности быстрого повторения)
            sound.play().catch(e => console.log(`🔇 Sound play error: ${soundName}`)); // Воспроизведение с обработкой ошибки
        }
    },
    
    playMusic: function() { // Воспроизведение фоновой музыки
        if (this.isMuted) return; // Проверка - не отключен ли звук полностью
        if (!this.isMusicEnabled) return; // Проверка - включена ли музыка в настройках
        
        if (this.music) { // Если музыка загружена
            this.music.currentTime = 0; // Сброс к началу
            this.music.play().catch(e => console.log('🎵 Music play error')); // Воспроизведение с обработкой ошибки
        }
    },
    
    stopMusic: function() { // Полная остановка музыки
        if (this.music) { // Если музыка существует
            this.music.pause(); // Пауза
            this.music.currentTime = 0; // Сброс к началу
        }
    },
    
    pauseMusic: function() { // Пауза музыки без сброса времени
        if (this.music && !this.music.paused) { // Если музыка существует и играет
            this.music.pause(); // Поставить на паузу
        }
    },
    
    resumeMusic: function() { // Возобновление музыки с места паузы
        if (this.music && this.music.paused && !this.isMuted && this.isMusicEnabled) { // Проверка условий для возобновления
            this.music.play().catch(e => console.log('Music resume error')); // Воспроизведение с обработкой ошибки
        }
    },
    
    toggleMute: function() { // Переключение полного отключения звука
        this.isMuted = !this.isMuted; // Инвертирование флага отключения звука
        if (this.isMuted) { // Если звук теперь отключен
            this.stopMusic(); // Остановить музыку
        } else { // Если звук теперь включен
            if (GameState.isActive) this.playMusic(); // Если игра активна - запустить музыку
        }
        console.log(`🔇 Sound muted: ${this.isMuted}`); // Лог состояния в консоль
        return this.isMuted; // Возврат нового состояния
    },
    
    toggleMusic: function() { // Переключение флага включения музыки
        this.isMusicEnabled = !this.isMusicEnabled; // Инвертирование флага музыки
        if (!this.isMusicEnabled) { // Если музыку выключили
            this.stopMusic(); // Остановить музыку
        } else if (GameState.isActive && !this.isMuted) { // Если музыку включили, игра активна и звук не отключен
            this.playMusic(); // Запустить музыку
        }
        console.log(`🎵 Music: ${this.isMusicEnabled ? 'ON' : 'OFF'}`); // Лог состояния в консоль
    },
    
    toggleSFX: function() { // Переключение флага включения звуковых эффектов
        this.isSFXEnabled = !this.isSFXEnabled; // Инвертирование флага звуковых эффектов
        console.log(`🔊 SFX: ${this.isSFXEnabled ? 'ON' : 'OFF'}`); // Лог состояния в консоль
    },
    
    setVolume: function(volume) { // Установка громкости для всех звуков
        const vol = Math.max(0, Math.min(1, volume)); // Ограничение громкости от 0 до 1
        if (this.music) this.music.volume = vol; // Установка громкости музыки
        for (let key in this.sounds) { // Перебор всех звуковых эффектов
            this.sounds[key].volume = vol; // Установка громкости для каждого эффекта
        }
    },
    
    // Тестовый звук
    test: function() { // Функция для тестирования звуков
        this.play('deploy'); // Воспроизведение звука размещения
        setTimeout(() => this.play('hit'), 500); // Через 0.5 секунды воспроизвести звук удара
    }
};
