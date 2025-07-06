// ============================= VARIABLES GLOBALES =============================
let userData = {};
let memories = [];
let images = [];
let isRecording = false;

// ============================= INICIALIZACIÓN =============================
document.addEventListener('DOMContentLoaded', function() {
    console.log('SoulStory App iniciada');
    initializeApp();
});

function initializeApp() {
    loadUserData();
    loadMemories();
    loadImages();
    setupEventListeners();
    checkLoginStatus();
    
    console.log('Aplicación inicializada correctamente');
}

// ============================= NAVEGACIÓN DE PANTALLAS =============================
function showScreen(screenId) {
    // Ocultar todas las pantallas
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Mostrar la pantalla solicitada
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Actualizar navbar activo
        updateNavbarActive(screenId);
        
        // Ejecutar funciones específicas por pantalla
        onScreenChange(screenId);
        
        console.log(`Pantalla cambiada a: ${screenId}`);
    } else {
        console.error(`Pantalla no encontrada: ${screenId}`);
    }
}

function updateNavbarActive(screenId) {
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Mapear pantallas a botones de navegación
    const screenToNavMap = {
        'main-menu': 0,
        'memories-screen': 1,
        'images-screen': 2
    };
    
    const navIndex = screenToNavMap[screenId];
    if (navIndex !== undefined && navButtons[navIndex]) {
        navButtons[navIndex].classList.add('active');
    }
}

function onScreenChange(screenId) {
    switch(screenId) {
        case 'memories-screen':
            displayMemories();
            break;
        case 'images-screen':
            displayImages();
            break;
        case 'profile-screen':
            loadProfileData();
            break;
        case 'legacy-screen':
            displayLegacy();
            break;
    }
}

// ============================= GESTIÓN DE DATOS LOCALES =============================
function loadUserData() {
    const saved = localStorage.getItem('soulstory_user');
    if (saved) {
        userData = JSON.parse(saved);
        updateUserDisplay();
    }
}

function saveUserData() {
    localStorage.setItem('soulstory_user', JSON.stringify(userData));
    updateUserDisplay();
}

function updateUserDisplay() {
    const userNameDisplay = document.getElementById('user-name-display');
    const userAvatarImg = document.getElementById('user-avatar-img');
    
    if (userNameDisplay && userData.name) {
        userNameDisplay.textContent = userData.name;
    }
    
    if (userAvatarImg && userData.avatar) {
        userAvatarImg.src = userData.avatar;
    }
}

function loadMemories() {
    const saved = localStorage.getItem('soulstory_memories');
    if (saved) {
        memories = JSON.parse(saved);
    }
}

function saveMemories() {
    localStorage.setItem('soulstory_memories', JSON.stringify(memories));
}

function loadImages() {
    const saved = localStorage.getItem('soulstory_images');
    if (saved) {
        images = JSON.parse(saved);
    }
}

function saveImages() {
    localStorage.setItem('soulstory_images', JSON.stringify(images));
}

// ============================= LOGIN Y AUTENTICACIÓN =============================
function checkLoginStatus() {
    if (userData.name) {
        showMainApp();
    } else {
        showScreen('login-screen');
    }
}

function showMainApp() {
    document.getElementById('app-header').classList.remove('hidden');
    showScreen('main-menu');
}

function logout() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        userData = {};
        memories = [];
        images = [];
        localStorage.clear();
        
        document.getElementById('app-header').classList.add('hidden');
        showScreen('login-screen');
        
        alert('Sesión cerrada exitosamente');
    }
}

// ============================= EVENT LISTENERS =============================
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
}

// ============================= LOGIN HANDLING =============================
function handleLogin(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newUserData = {
        name: formData.get('name'),
        email: formData.get('email'),
        avatar: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        createdAt: new Date().toISOString()
    };
    
    // Validación básica
    if (!newUserData.name || !newUserData.email) {
        alert('Por favor completa todos los campos obligatorios');
        return;
    }
    
    userData = newUserData;
    saveUserData();
    
    alert('¡Bienvenido a SoulStory!');
    showMainApp();
}

// ============================= PROFILE MANAGEMENT =============================
function loadProfileData() {
    const profileName = document.getElementById('profile-name');
    const profileEmail = document.getElementById('profile-email');
    const profileAvatar = document.getElementById('profile-avatar');
    
    if (profileName && userData.name) {
        profileName.textContent = userData.name;
    }
    
    if (profileEmail && userData.email) {
        profileEmail.textContent = userData.email;
    }
    
    if (profileAvatar && userData.avatar) {
        profileAvatar.src = userData.avatar;
    }
}

function changeAvatar() {
    // Simulación de cambio de avatar
    const avatars = [
        'https://cdn-icons-png.flaticon.com/512/149/149071.png',
        'https://cdn-icons-png.flaticon.com/512/147/147133.png',
        'https://cdn-icons-png.flaticon.com/512/147/147144.png',
        'https://cdn-icons-png.flaticon.com/512/736/736472.png',
        'https://cdn-icons-png.flaticon.com/512/147/147142.png'
    ];
    
    const currentIndex = avatars.indexOf(userData.avatar || avatars[0]);
    const nextIndex = (currentIndex + 1) % avatars.length;
    
    userData.avatar = avatars[nextIndex];
    saveUserData();
    
    // Actualizar todas las imágenes de avatar
    document.querySelectorAll('#profile-avatar, #user-avatar-img').forEach(img => {
        img.src = userData.avatar;
    });
    
    alert('Avatar actualizado');
}

function editProfile() {
    const newName = prompt('Nuevo nombre:', userData.name);
    const newEmail = prompt('Nuevo email:', userData.email);
    
    if (newName && newEmail) {
        userData.name = newName;
        userData.email = newEmail;
        saveUserData();
        loadProfileData();
        alert('Perfil actualizado correctamente');
    }
}

function showSettings() {
    alert('Configuración:\n\n• Tamaño de texto: Medio\n• Tema: Claro\n• Notificaciones: Activadas\n\n(Función en desarrollo)');
}

// ============================= MEMORY MANAGEMENT =============================
function saveMemory() {
    const title = document.getElementById('memory-title').value.trim();
    const text = document.getElementById('memory-text').value.trim();
    
    if (!text) {
        alert('Por favor escribe algo en tu memoria');
        return;
    }
    
    const memory = {
        id: Date.now(),
        title: title || 'Memoria sin título',
        content: text,
        type: 'escrito',
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString(),
        favorite: false,
        comments: []
    };
    
    memories.unshift(memory);
    saveMemories();
    
    // Limpiar formulario
    document.getElementById('memory-title').value = '';
    document.getElementById('memory-text').value = '';
    
    alert('Memoria guardada exitosamente');
    showScreen('memories-screen');
}

function displayMemories(filter = 'todo') {
    const container = document.getElementById('memories-list');
    const emptyState = document.getElementById('memories-empty');
    
    if (!container) return;
    
    // Filtrar memorias
    const filteredMemories = filter === 'todo' 
        ? memories 
        : memories.filter(memory => memory.type === filter);
    
    if (filteredMemories.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    container.innerHTML = filteredMemories.map((memory, index) => `
        <div class="memory-card" onclick="viewMemory(${memories.indexOf(memory)})">
            <div class="memory-header">
                <div class="memory-type">
                    <i class="fas fa-${getMemoryIcon(memory.type)}"></i>
                    ${memory.type.toUpperCase()}
                </div>
                <div class="memory-title">${memory.title}</div>
                <div class="memory-date">${memory.date}</div>
            </div>
            
            <div class="memory-content">
                <div class="memory-text">${memory.content}</div>
                
                <div class="memory-actions">
                    <button class="memory-action-btn favorite ${memory.favorite ? 'active' : ''}" 
                            onclick="event.stopPropagation(); toggleFavorite(${memories.indexOf(memory)})">
                        <i class="fas fa-${memory.favorite ? 'star' : 'star-o'}"></i>
                        ${memory.favorite ? 'Favorito' : 'Marcar'}
                    </button>
                    
                    <button class="memory-action-btn" onclick="event.stopPropagation(); shareMemory(${memories.indexOf(memory)})">
                        <i class="fas fa-share"></i>
                        Compartir
                    </button>
                    
                    <button class="memory-action-btn" onclick="event.stopPropagation(); editMemory(${memories.indexOf(memory)})">
                        <i class="fas fa-edit"></i>
                        Editar
                    </button>
                    
                    <button class="memory-action-btn" onclick="event.stopPropagation(); deleteMemory(${memories.indexOf(memory)})">
                        <i class="fas fa-trash"></i>
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function getMemoryIcon(type) {
    const icons = {
        'escrito': 'pen',
        'audio': 'microphone',
        'video': 'video'
    };
    return icons[type] || 'memory';
}

function filterMemories(filter) {
    // Actualizar tabs activos
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    event.target.classList.add('active');
    
    displayMemories(filter);
}

function viewMemory(index) {
    const memory = memories[index];
    if (!memory) return;
    
    alert(`${memory.title}\n\nFecha: ${memory.date}\nTipo: ${memory.type}\n\n${memory.content}`);
}

function toggleFavorite(index) {
    if (memories[index]) {
        memories[index].favorite = !memories[index].favorite;
        saveMemories();
        displayMemories();
        
        const status = memories[index].favorite ? 'añadido a' : 'removido de';
        alert(`Recuerdo ${status} favoritos`);
    }
}

function editMemory(index) {
    if (memories[index]) {
        const memory = memories[index];
        
        const newTitle = prompt('Nuevo título:', memory.title);
        const newContent = prompt('Nuevo contenido:', memory.content);
        
        if (newTitle !== null && newContent !== null) {
            memory.title = newTitle || memory.title;
            memory.content = newContent || memory.content;
            saveMemories();
            displayMemories();
            alert('Memoria actualizada');
        }
    }
}

function deleteMemory(index) {
    if (memories[index]) {
        if (confirm('¿Estás seguro de que deseas eliminar esta memoria?')) {
            memories.splice(index, 1);
            saveMemories();
            displayMemories();
            alert('Memoria eliminada');
        }
    }
}

function shareMemory(index) {
    const memory = memories[index];
    if (memory) {
        const email = prompt('Correo del destinatario:');
        if (email) {
            alert(`Recuerdo "${memory.title}" compartido con ${email}`);
        }
    }
}

// ============================= AUDIO RECORDING =============================
function toggleRecording() {
    if (isRecording) {
        stopRecording();
    } else {
        startRecording();
    }
}

function startRecording() {
    isRecording = true;
    updateRecordingUI();
    alert('Simulando grabación de audio...\n\nEn una implementación real, aquí se activaría el micrófono.');
}

function stopRecording() {
    isRecording = false;
    updateRecordingUI();
    alert('Grabación detenida');
}

function updateRecordingUI() {
    const recordBtn = document.getElementById('record-btn');
    const recordingCircle = document.querySelector('.recording-circle');
    const recordingStatus = document.getElementById('recording-status');
    
    if (isRecording) {
        recordBtn.classList.add('recording');
        recordBtn.innerHTML = '<i class="fas fa-stop"></i>';
        recordingCircle.classList.add('recording');
        recordingStatus.textContent = 'Grabando...';
    } else {
        recordBtn.classList.remove('recording');
        recordBtn.innerHTML = '<i class="fas fa-microphone"></i>';
        recordingCircle.classList.remove('recording');
        recordingStatus.textContent = 'Presiona el botón para comenzar';
    }
}

function saveAudioRecording() {
    const audioMemory = {
        id: Date.now(),
        title: 'Grabación de audio',
        content: 'Audio grabado el ' + new Date().toLocaleDateString(),
        type: 'audio',
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString(),
        favorite: false,
        comments: []
    };
    
    memories.unshift(audioMemory);
    saveMemories();
    
    alert('Audio guardado exitosamente');
    showScreen('memories-screen');
}

// ============================= VIDEO RECORDING =============================
function saveVideoRecording() {
    const videoMemory = {
        id: Date.now(),
        title: 'Grabación de video',
        content: 'Video grabado el ' + new Date().toLocaleDateString(),
        type: 'video',
        date: new Date().toLocaleDateString(),
        timestamp: new Date().toISOString(),
        favorite: false,
        comments: []
    };
    
    memories.unshift(videoMemory);
    saveMemories();
    
    alert('Video guardado exitosamente');
    showScreen('memories-screen');
}

// ============================= IMAGE GENERATION =============================
function generateImage() {
    const prompt = document.getElementById('image-prompt').value.trim();
    
    if (!prompt) {
        alert('Por favor describe lo que quieres generar');
        return;
    }
    
    // Simular generación de imagen con IA
    alert('Generando ilustración con IA...\n\nPrompt: "' + prompt + '"');
    
    setTimeout(() => {
        const imageUrl = `https://via.placeholder.com/400x300/B7E4C7/333333?text=${encodeURIComponent(prompt.substring(0, 15))}`;
        
        const image = {
            id: Date.now(),
            title: prompt,
            url: imageUrl,
            date: new Date(),
            timestamp: new Date().toISOString()
        };
        
        images.unshift(image);
        saveImages();
        
        document.getElementById('image-prompt').value = '';
        displayImages();
        
        alert('¡Ilustración generada y guardada en tu galería!');
    }, 1000);
}

function displayImages() {
    const container = document.getElementById('images-gallery');
    const emptyState = document.getElementById('images-empty');
    
    if (!container) return;
    
    if (images.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    container.innerHTML = images.map((image, index) => `
        <div class="gallery-item" onclick="viewImage('${image.url}', '${image.title}')">
            <img src="${image.url}" alt="${image.title}">
            <div class="gallery-item-info">
                <div class="gallery-item-title">${image.title}</div>
                <div class="gallery-item-date">${new Date(image.timestamp).toLocaleDateString()}</div>
            </div>
        </div>
    `).join('');
}

function viewImage(url, title) {
    alert(`Imagen: ${title}\n\nEn una implementación completa, aquí se abriría un modal con la imagen en tamaño completo.`);
}

// ============================= VERIFICATION =============================
function verifyCode() {
    const code = document.getElementById('verification-code').value.trim();
    
    if (!code || code.length !== 6) {
        alert('Ingresa un código de 6 dígitos');
        return;
    }
    
    // Código de demo
    if (code === '123456') {
        alert('Código verificado correctamente');
        showScreen('legacy-screen');
        return;
    }
    
    alert('Código incorrecto. Usa: 123456');
}

// ============================= LEGACY DISPLAY =============================
function displayLegacy() {
    const container = document.getElementById('legacy-list');
    const emptyState = document.getElementById('legacy-empty');
    
    if (!container) return;
    
    const favoriteMemories = memories.filter(memory => memory.favorite);
    
    if (favoriteMemories.length === 0) {
        container.innerHTML = '';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    if (emptyState) emptyState.style.display = 'none';
    
    container.innerHTML = favoriteMemories.map((memory, index) => {
        const originalIndex = memories.indexOf(memory);
        return `
            <div class="legacy-card" onclick="viewMemory(${originalIndex})">
                <div class="memory-header">
                    <div class="memory-type">
                        <i class="fas fa-${getMemoryIcon(memory.type)}"></i>
                        ${memory.type.toUpperCase()}
                    </div>
                    <div class="memory-title">${memory.title}</div>
                    <div class="memory-date">${memory.date}</div>
                </div>
                
                <div class="memory-content">
                    <div class="memory-text">${memory.content}</div>
                </div>
            </div>
        `;
    }).join('');
}

// ============================= UTILITY FUNCTIONS =============================
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ============================= ERROR HANDLING =============================
window.addEventListener('error', function(event) {
    console.error('Error capturado:', event.error);
    alert('Ha ocurrido un error inesperado. Por favor, recarga la página.');
});

// ============================= DEBUGGING =============================
if (typeof window !== 'undefined') {
    window.SoulStoryApp = {
        // Funciones públicas para debugging
        showScreen,
        memories,
        images,
        userData,
        isRecording
    };
}

console.log('SoulStory App script cargado correctamente');