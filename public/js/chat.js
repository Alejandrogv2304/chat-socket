
const username = localStorage.getItem('name');
if (!username) {
    window.location.replace('/');
    throw new Error('Username is required');
}

//Referencias de HTML

const lblStatusOnline = document.querySelector('#status-online');
const lblStatusOffline = document.querySelector('#status-offline');

const socket = io({
    auth:{
        token:'ABC-123',
        name: username,
    }
});

socket.on('connect', () => {
    lblStatusOnline.classList.remove('hidden');
    lblStatusOffline.classList.add('hidden');
});

socket.on('disconnect', () => {
    lblStatusOffline.classList.remove('hidden');
    lblStatusOnline.classList.add('hidden');
});
