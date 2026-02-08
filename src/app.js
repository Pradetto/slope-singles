// View management
const views = {
  landing: document.getElementById('landingView'),
  signup: document.getElementById('signupView'),
  browse: document.getElementById('browseView'),
}

// Stats
let stats = {
  matches: 0,
  streak: 0,
  likes: 0
}

// Sample profiles with more personality
const sampleProfiles = [
  {
    name: "Alex",
    age: 26,
    skill: "Advanced",
    lookingFor: "Both",
    bio: "Early bird catches the powder 🌅 Love hitting blacks when it's fresh. Coffee after?",
    emoji: "🏂",
    traits: ["☕ Coffee addict", "🌄 Morning person", "⚫ Black diamonds"]
  },
  {
    name: "Sam",
    age: 24,
    skill: "Intermediate",
    lookingFor: "Friends",
    bio: "New to Mammoth! Looking for chill crew to explore the mountain with 🗻✨",
    emoji: "⛷️",
    traits: ["🗺️ Explorer", "😎 Chill vibes", "🎶 Music lover"]
  },
  {
    name: "Jordan",
    age: 29,
    skill: "Expert",
    lookingFor: "Dating",
    bio: "Backcountry enthusiast. If you can keep up in the pow, let's shred! 💪❄️",
    emoji: "🏂",
    traits: ["🏔️ Backcountry", "💪 Adventurous", "📸 Photography"]
  },
  {
    name: "Riley",
    age: 27,
    skill: "Intermediate",
    lookingFor: "Both",
    bio: "Park rat by day, apres by night 🎿🍻 Living the dream at Mammoth!",
    emoji: "⛷️",
    traits: ["🎢 Park lover", "🍻 Apres fan", "😄 Good vibes"]
  },
  {
    name: "Casey",
    age: 25,
    skill: "Beginner",
    lookingFor: "Friends",
    bio: "Still learning but having a blast! Patient riding buddies wanted 😊🏂",
    emoji: "🏂",
    traits: ["📚 Learning", "😊 Positive", "🙌 Supportive"]
  },
  {
    name: "Taylor",
    age: 28,
    skill: "Advanced",
    lookingFor: "Dating",
    bio: "Weekend warrior 🏂 Work hard, ride harder. Looking for someone to share the stoke!",
    emoji: "⛷️",
    traits: ["💼 Career-driven", "🔥 Passionate", "🌟 Motivated"]
  },
  {
    name: "Morgan",
    age: 23,
    skill: "Intermediate",
    lookingFor: "Both",
    bio: "Snowboard instructor by day, sunset chaser by evening 🌅 Let's catch some air!",
    emoji: "🏂",
    traits: ["👨‍🏫 Instructor", "🌅 Sunset lover", "🎯 Fun-focused"]
  },
  {
    name: "Avery",
    age: 30,
    skill: "Expert",
    lookingFor: "Friends",
    bio: "10 years riding, still obsessed 🏔️ Down for anything from groomers to trees!",
    emoji: "⛷️",
    traits: ["🏔️ Veteran", "🌲 Tree runs", "🤙 Down to earth"]
  }
];

let currentProfileIndex = 0;

function showView(viewName) {
  // Hide all views
  Object.values(views).forEach(view => view.classList.add('hidden'))
  
  // Show requested view
  if (views[viewName]) {
    views[viewName].classList.remove('hidden')
    
    // If showing browse view, load first profile
    if (viewName === 'browse') {
      currentProfileIndex = 0;
      document.getElementById('statsBar').classList.remove('hidden');
      renderProfileCard();
    } else {
      document.getElementById('statsBar').classList.add('hidden');
    }
  }
}

function updateStats() {
  document.getElementById('matchCount').textContent = stats.matches;
  document.getElementById('streakCount').textContent = stats.streak + '🔥';
}

function renderProfileCard() {
  const cardStack = document.getElementById('cardStack');
  if (!cardStack) return;
  
  cardStack.innerHTML = '';
  
  if (currentProfileIndex >= sampleProfiles.length) {
    // No more profiles - end screen
    cardStack.innerHTML = `
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl border border-slate-700/50 text-center space-y-6">
          <div class="text-8xl mb-4">🎿</div>
          <h3 class="text-3xl font-black text-white mb-2 gradient-text">You're All Caught Up!</h3>
          <p class="text-slate-400 text-lg mb-6">That's everyone on the mountain right now</p>
          <div class="bg-slate-700/30 rounded-2xl p-6 mb-6">
            <div class="text-5xl mb-2">${stats.matches}</div>
            <div class="text-slate-400 font-semibold">Total Matches 💕</div>
          </div>
          <button onclick="currentProfileIndex = 0; stats = {matches: 0, streak: 0, likes: 0}; updateStats(); renderProfileCard();" class="px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg hover:scale-105 transition shadow-xl">
            Start Over 🔄
          </button>
        </div>
      </div>
    `;
    return;
  }
  
  const profile = sampleProfiles[currentProfileIndex];
  
  const skillColors = {
    'Beginner': 'bg-green-500/20 text-green-400 border-green-500/40',
    'Intermediate': 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    'Advanced': 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    'Expert': 'bg-pink-500/20 text-pink-400 border-pink-500/40'
  };
  
  const lookingForEmoji = {
    'Friends': '🤝',
    'Dating': '❤️',
    'Both': '✨'
  };
  
  const card = document.createElement('div');
  card.className = 'absolute inset-0 swipe-card';
  card.innerHTML = `
    <div class="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border-2 border-slate-700/50 overflow-hidden relative">
      <!-- Swipe Feedback Overlays -->
      <div class="like-overlay" style="color: #10b981;">LIKE</div>
      <div class="pass-overlay" style="color: #ef4444;">PASS</div>
      
      <!-- Profile Header -->
      <div class="relative h-56 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
        <div class="text-[120px] drop-shadow-2xl">${profile.emoji}</div>
        <div class="absolute top-4 right-4">
          <span class="px-4 py-2 ${skillColors[profile.skill]} rounded-full text-sm font-black border-2 backdrop-blur-sm shadow-lg">
            ${profile.skill}
          </span>
        </div>
        <div class="absolute bottom-4 left-4">
          <span class="px-4 py-2 bg-slate-900/60 backdrop-blur-md text-white rounded-full text-sm font-bold border border-slate-700 shadow-lg">
            📍 On mountain now
          </span>
        </div>
      </div>
      
      <!-- Profile Info -->
      <div class="p-6 space-y-5">
        <!-- Name & Age -->
        <div>
          <h3 class="text-5xl font-black text-white mb-2">${profile.name}, ${profile.age}</h3>
          <p class="text-slate-300 flex items-center gap-2 text-lg font-semibold">
            <span class="text-2xl">${lookingForEmoji[profile.lookingFor]}</span>
            <span>Looking for ${profile.lookingFor.toLowerCase()}</span>
          </p>
        </div>
        
        <!-- Bio -->
        <div class="bg-slate-700/40 rounded-2xl p-5 border border-slate-600/50 backdrop-blur-sm">
          <p class="text-slate-200 text-lg leading-relaxed font-medium">${profile.bio}</p>
        </div>
        
        <!-- Traits -->
        <div class="flex flex-wrap gap-2">
          ${profile.traits.map(trait => `
            <span class="px-4 py-2 bg-slate-700/30 text-slate-300 rounded-full text-sm font-semibold border border-slate-600/50">
              ${trait}
            </span>
          `).join('')}
        </div>
        
        <!-- Stats Grid -->
        <div class="grid grid-cols-2 gap-3 pt-2">
          <div class="bg-slate-700/30 rounded-xl p-4 text-center border border-slate-600/50">
            <div class="text-3xl mb-1">🏔️</div>
            <div class="text-xs text-slate-400 font-semibold">Status</div>
            <div class="text-white font-bold">Active now</div>
          </div>
          <div class="bg-slate-700/30 rounded-xl p-4 text-center border border-slate-600/50">
            <div class="text-3xl mb-1">🏂</div>
            <div class="text-xs text-slate-400 font-semibold">Level</div>
            <div class="text-white font-bold">${profile.skill}</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  cardStack.appendChild(card);
  
  // Swipe handling
  let startX = 0;
  let startY = 0;
  let currentX = 0;
  let isDragging = false;
  
  const likeOverlay = card.querySelector('.like-overlay');
  const passOverlay = card.querySelector('.pass-overlay');
  
  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    isDragging = true;
  });
  
  card.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX - startX;
    const rotation = currentX / 20;
    card.style.transform = `translateX(${currentX}px) rotate(${rotation}deg)`;
    
    // Show feedback
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
    card.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    card.style.opacity = '0';
    
    // Update stats
    stats.likes++;
    stats.streak++;
    
    // Random match chance (40%)
    if (Math.random() < 0.4) {
      stats.matches++;
      setTimeout(() => {
        showMatchAnimation();
      }, 400);
    }
    
    updateStats();
    
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
    card.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    card.style.opacity = '0';
    
    stats.streak = 0;
    updateStats();
    
    setTimeout(() => {
      currentProfileIndex++;
      renderProfileCard();
    }, 400);
  }
}

function showMatchAnimation() {
  const cardStack = document.getElementById('cardStack');
  const matchDiv = document.createElement('div');
  matchDiv.className = 'absolute inset-0 flex items-center justify-center z-50 pointer-events-none';
  matchDiv.innerHTML = `
    <div class="bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl p-8 shadow-2xl transform scale-0 transition-all duration-500" style="animation: scaleIn 0.5s ease-out forwards;">
      <div class="text-8xl mb-4 text-center">💕</div>
      <div class="text-white text-4xl font-black text-center">It's a Match!</div>
    </div>
  `;
  cardStack.appendChild(matchDiv);
  
  setTimeout(() => {
    matchDiv.remove();
  }, 2000);
}

// Character counter for bio
const bioTextarea = document.getElementById('bio')
const charCount = document.getElementById('charCount')

if (bioTextarea) {
  bioTextarea.addEventListener('input', () => {
    const length = bioTextarea.value.length
    charCount.textContent = `${length} / 200`
  })
}

// Handle signup form
const signupForm = document.getElementById('signupForm')
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const formData = {
      name: document.getElementById('name').value,
      age: parseInt(document.getElementById('age').value),
      skillLevel: document.getElementById('skillLevel').value,
      lookingFor: document.getElementById('lookingFor').value,
      bio: document.getElementById('bio').value,
    }
    
    console.log('User profile:', formData)
    
    // Show success message
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = '✓ Profile Created!';
    btn.classList.add('bg-green-600');
    
    setTimeout(() => {
      showView('browse')
    }, 800);
  })
}

// Add scale animation
const style = document.createElement('style');
style.textContent = `
  @keyframes scaleIn {
    0% { transform: scale(0) rotate(-10deg); opacity: 0; }
    50% { transform: scale(1.1) rotate(5deg); }
    100% { transform: scale(1) rotate(0deg); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Make functions available globally
window.showView = showView
window.likeProfile = likeProfile
window.passProfile = passProfile

console.log('🏂 Slope Singles loaded! Let\'s find your riding partner!')
