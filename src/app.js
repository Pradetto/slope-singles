// View management
const views = {
  landing: document.getElementById('landingView'),
  signup: document.getElementById('signupView'),
  checkin: document.getElementById('checkinView'),
  browse: document.getElementById('browseView'),
  matches: document.getElementById('matchesView'),
  chat: document.getElementById('chatView'),
  profile: document.getElementById('profileView'),
}

// State
window.matchedProfiles = [];
let currentProfileIndex = 0;
let isCheckedIn = false;

// Enhanced profiles
const sampleProfiles = [
  {
    name: "Alex",
    age: 26,
    skill: "Advanced",
    lookingFor: "Both",
    bio: "Early bird catches the powder 🌅 Love hitting blacks when it's fresh!",
    emoji: "🏂"
  },
  {
    name: "Sam",
    age: 24,
    skill: "Intermediate",
    lookingFor: "Friends",
    bio: "New to Mammoth! Looking for chill crew to explore with 🗻",
    emoji: "⛷️"
  },
  {
    name: "Jordan",
    age: 29,
    skill: "Expert",
    lookingFor: "Dating",
    bio: "Backcountry enthusiast. If you can keep up, let's shred! 💪",
    emoji: "🏂"
  },
  {
    name: "Riley",
    age: 27,
    skill: "Intermediate",
    lookingFor: "Both",
    bio: "Park rat by day, apres by night 🎿🍻 Living the dream!",
    emoji: "⛷️"
  },
  {
    name: "Casey",
    age: 25,
    skill: "Beginner",
    lookingFor: "Friends",
    bio: "Still learning but having a blast! Patient buddies wanted 😊",
    emoji: "🏂"
  },
  {
    name: "Taylor",
    age: 28,
    skill: "Advanced",
    lookingFor: "Dating",
    bio: "Weekend warrior 🏂 Work hard, ride harder. Share the stoke?",
    emoji: "⛷️"
  },
  {
    name: "Morgan",
    age: 23,
    skill: "Intermediate",
    lookingFor: "Both",
    bio: "Snowboard instructor by day, sunset chaser always 🌅",
    emoji: "🏂"
  },
  {
    name: "Avery",
    age: 30,
    skill: "Expert",
    lookingFor: "Friends",
    bio: "10 years riding, still obsessed 🏔️ Groomers to trees!",
    emoji: "⛷️"
  }
];

function updateMatchCount() {
  const btn = document.getElementById('matchesBtn');
  if (btn) {
    btn.textContent = `View Matches (${matchedProfiles.length}) →`;
  }
}

function showView(viewName) {
  // Hide all views
  Object.values(views).forEach(view => view?.classList.add('hidden'))
  
  // Show requested view
  if (views[viewName]) {
    views[viewName].classList.remove('hidden')
    
    // Handle view-specific logic
    if (viewName === 'browse') {
      currentProfileIndex = 0;
      document.getElementById('navButtons').classList.remove('hidden');
      updateMatchCount();
      renderProfileCard();
    } else if (viewName === 'matches') {
      document.getElementById('navButtons').classList.remove('hidden');
      renderMatches();
    } else if (viewName === 'profile') {
      document.getElementById('navButtons').classList.remove('hidden');
    } else {
      document.getElementById('navButtons').classList.add('hidden');
    }
  }
}

function checkIn() {
  const btn = document.getElementById('checkinBtn');
  btn.textContent = '✓ Checked In!';
  btn.classList.remove('from-green-600', 'to-emerald-600');
  btn.classList.add('from-purple-600', 'to-pink-600');
  isCheckedIn = true;
  
  setTimeout(() => {
    showView('browse');
  }, 1000);
}

function renderProfileCard() {
  const cardStack = document.getElementById('cardStack');
  if (!cardStack) return;
  
  cardStack.innerHTML = '';
  
  if (currentProfileIndex >= sampleProfiles.length) {
    cardStack.innerHTML = `
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl border border-slate-700/50 text-center space-y-6">
          <div class="text-8xl mb-4">🎿</div>
          <h3 class="text-3xl font-black text-white mb-2 gradient-text">All Caught Up!</h3>
          <p class="text-slate-400 text-lg mb-6">That's everyone on the mountain right now</p>
          <div class="bg-slate-700/30 rounded-2xl p-6 mb-6">
            <div class="text-5xl mb-2">${matchedProfiles.length}</div>
            <div class="text-slate-400 font-semibold">Total Matches 💕</div>
          </div>
          <button onclick="showView('matches')" class="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
            View Matches →
          </button>
        </div>
      </div>
    `;
    return;
  }
  
  const profile = sampleProfiles[currentProfileIndex];
  
  const skillColors = {
    'Beginner': 'bg-green-500/20 text-green-300 border-green-500/50',
    'Intermediate': 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    'Advanced': 'bg-purple-500/20 text-purple-300 border-purple-500/50',
    'Expert': 'bg-pink-500/20 text-pink-300 border-pink-500/50'
  };
  
  const lookingForEmoji = {
    'Friends': '🤝',
    'Dating': '❤️',
    'Both': '✨'
  };
  
  const card = document.createElement('div');
  card.className = 'absolute inset-0 swipe-card';
  card.innerHTML = `
    <div class="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/30 overflow-hidden relative">
      <div class="like-overlay" style="color: #10b981;">LIKE</div>
      <div class="pass-overlay" style="color: #ef4444;">PASS</div>
      
      <div class="relative h-64 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <div class="text-[140px]">${profile.emoji}</div>
        <div class="absolute top-4 right-4">
          <span class="px-4 py-2 ${skillColors[profile.skill]} rounded-full text-sm font-black border-2 backdrop-blur-sm">
            ${profile.skill}
          </span>
        </div>
        <div class="absolute bottom-4 left-4">
          <span class="px-4 py-2 bg-green-500/20 text-green-300 border-2 border-green-500/50 rounded-full text-sm font-bold backdrop-blur-sm">
            🟢 Active now
          </span>
        </div>
      </div>
      
      <div class="p-6 space-y-4">
        <div>
          <h3 class="text-4xl font-black text-white mb-1">${profile.name}, ${profile.age}</h3>
          <p class="text-slate-300 flex items-center gap-2 text-lg font-semibold">
            <span class="text-xl">${lookingForEmoji[profile.lookingFor]}</span>
            <span>${profile.lookingFor}</span>
          </p>
        </div>
        
        <div class="bg-slate-700/40 rounded-2xl p-4 border border-slate-600/50">
          <p class="text-slate-200 text-lg leading-relaxed">${profile.bio}</p>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
          <div class="bg-slate-700/30 rounded-xl p-4 text-center border border-slate-600/50">
            <div class="text-2xl mb-1">📍</div>
            <div class="text-xs text-slate-400">Location</div>
            <div class="text-white font-bold text-sm">Mammoth</div>
          </div>
          <div class="bg-slate-700/30 rounded-xl p-4 text-center border border-slate-600/50">
            <div class="text-2xl mb-1">⏰</div>
            <div class="text-xs text-slate-400">Checked in</div>
            <div class="text-white font-bold text-sm">20 min ago</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  cardStack.appendChild(card);
  
  // Swipe handling
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  
  const likeOverlay = card.querySelector('.like-overlay');
  const passOverlay = card.querySelector('.pass-overlay');
  
  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  
  card.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX - startX;
    const rotation = currentX / 20;
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    
    if (currentX > 50) {
      likeOverlay.classList.add('show-like');
      passOverlay.classList.remove('show-pass');
    } else if (currentX < -50) {
      passOverlay.classList.add('show-pass');
      likeOverlay.classList.remove('show-like');
    } else {
      likeOverlay.classList.remove('show-like');
      passOverlay.classList.remove('show-pass');
    }
  });
  
  card.addEventListener('touchend', () => {
    isDragging = false;
    likeOverlay.classList.remove('show-like');
    passOverlay.classList.remove('show-pass');
    
    if (Math.abs(currentX) > 120) {
      if (currentX > 0) {
        likeProfile();
      } else {
        passProfile();
      }
    } else {
      card.style.transform = '';
    }
    currentX = 0;
  });
}

function likeProfile() {
  const card = document.querySelector('.swipe-card');
  if (card) {
    card.style.transform = 'translateX(500px) rotate(30deg)';
    card.style.transition = 'all 0.4s ease-out';
    card.style.opacity = '0';
    
    // 50% chance of match
    if (Math.random() < 0.5) {
      matchedProfiles.push(sampleProfiles[currentProfileIndex]);
      updateMatchCount();
      setTimeout(() => {
        showMatchAnimation();
      }, 400);
    }
    
    setTimeout(() => {
      currentProfileIndex++;
      renderProfileCard();
    }, 400);
  }
}

function passProfile() {
  const card = document.querySelector('.swipe-card');
  if (card) {
    card.style.transform = 'translateX(-500px) rotate(-30deg)';
    card.style.transition = 'all 0.4s ease-out';
    card.style.opacity = '0';
    
    setTimeout(() => {
      currentProfileIndex++;
      renderProfileCard();
    }, 400);
  }
}

function showMatchAnimation() {
  const cardStack = document.getElementById('cardStack');
  const matchDiv = document.createElement('div');
  matchDiv.className = 'absolute inset-0 flex items-center justify-center z-50';
  matchDiv.innerHTML = `
    <div class="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-12 shadow-2xl transform scale-0" style="animation: scaleIn 0.5s ease-out forwards;">
      <div class="text-8xl mb-4 text-center">💕</div>
      <div class="text-white text-4xl font-black text-center mb-4">It's a Match!</div>
      <button onclick="this.closest('.absolute').remove(); showView('matches');" class="w-full bg-white text-purple-600 py-3 rounded-xl font-bold hover:scale-105 transition">
        Send a Message
      </button>
    </div>
  `;
  cardStack.appendChild(matchDiv);
  
  setTimeout(() => {
    matchDiv.remove();
  }, 3000);
}

function renderMatches() {
  const list = document.getElementById('matchesList');
  if (!list) return;
  
  if (matchedProfiles.length === 0) {
    list.innerHTML = `
      <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl border border-slate-700/50 text-center">
        <div class="text-6xl mb-4">💕</div>
        <h3 class="text-2xl font-black text-white mb-2">No Matches Yet</h3>
        <p class="text-slate-400 mb-6">Keep swiping to find your riding partner!</p>
        <button onclick="showView('browse')" class="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:scale-105 transition">
          Start Browsing
        </button>
      </div>
    `;
    return;
  }
  
  list.innerHTML = matchedProfiles.map((profile, index) => `
    <div onclick="openChat(${index})" class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 shadow-xl border border-slate-700/50 cursor-pointer hover:scale-[1.02] transition-all hover:border-purple-500/50">
      <div class="flex items-center gap-4">
        <div class="text-5xl">${profile.emoji}</div>
        <div class="flex-1">
          <h3 class="text-2xl font-black text-white">${profile.name}, ${profile.age}</h3>
          <p class="text-slate-400">${profile.skill} • ${profile.lookingFor}</p>
          <p class="text-slate-500 text-sm mt-1">Send them a message!</p>
        </div>
        <div class="text-3xl">💬</div>
      </div>
    </div>
  `).join('');
}

function openChat(profileIndex) {
  const profile = matchedProfiles[profileIndex];
  document.getElementById('chatName').textContent = profile.name;
  
  const chatMessages = document.getElementById('chatMessages');
  chatMessages.innerHTML = `
    <div class="text-center text-slate-500 text-sm mb-6">
      <div class="text-4xl mb-2">💕</div>
      <p>You matched with ${profile.name}!</p>
      <p class="text-xs mt-1">Say hi and plan your first run together</p>
    </div>
    <div class="flex justify-end">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-5 py-3 max-w-[80%]">
        <p>Hey ${profile.name}! Want to hit some runs together? ⛷️</p>
      </div>
    </div>
    <div class="flex justify-start">
      <div class="bg-slate-700 text-white rounded-2xl px-5 py-3 max-w-[80%]">
        <p>Absolutely! I'm heading to Chair 3 in 20 min. Meet at the base? 🏂</p>
      </div>
    </div>
    <div class="flex justify-end">
      <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-5 py-3 max-w-[80%]">
        <p>Perfect! See you there 🙌</p>
      </div>
    </div>
  `;
  
  showView('chat');
}

function sendMessage() {
  const input = document.getElementById('messageInput');
  const message = input.value.trim();
  if (!message) return;
  
  const chatMessages = document.getElementById('chatMessages');
  const msgDiv = document.createElement('div');
  msgDiv.className = 'flex justify-end';
  msgDiv.innerHTML = `
    <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl px-5 py-3 max-w-[80%]">
      <p>${message}</p>
    </div>
  `;
  chatMessages.appendChild(msgDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  
  input.value = '';
}

// Character counter
const bioTextarea = document.getElementById('bio')
const charCount = document.getElementById('charCount')

if (bioTextarea) {
  bioTextarea.addEventListener('input', () => {
    charCount.textContent = `${bioTextarea.value.length} / 200`
  })
}

// Signup form
const signupForm = document.getElementById('signupForm')
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = '✓ Profile Created!';
    
    setTimeout(() => {
      showView('checkin')
    }, 800);
  })
}

// Message input enter key
const messageInput = document.getElementById('messageInput');
if (messageInput) {
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });
}

// Scale animation
const style = document.createElement('style');
style.textContent = `
  @keyframes scaleIn {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Globals
window.showView = showView
window.checkIn = checkIn
window.likeProfile = likeProfile
window.passProfile = passProfile
window.openChat = openChat
window.sendMessage = sendMessage

console.log('🏂 Slope Singles MVP loaded!')
