// Simple view management
const views = {
  landing: document.getElementById('landingView'),
  signup: document.getElementById('signupView'),
  browse: document.getElementById('browseView'),
}

// Sample profiles for demo
const sampleProfiles = [
  {
    name: "Alex",
    age: 26,
    skill: "Advanced",
    lookingFor: "Both",
    bio: "Love hitting blacks early morning when it's fresh. Coffee after? ☕",
    emoji: "🏂"
  },
  {
    name: "Sam",
    age: 24,
    skill: "Intermediate",
    lookingFor: "Friends",
    bio: "New to Mammoth! Looking for chill people to explore the mountain with 🗻",
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
    bio: "Park rat by day, apres by night. Living the dream at Mammoth 🎿",
    emoji: "⛷️"
  },
  {
    name: "Casey",
    age: 25,
    skill: "Beginner",
    lookingFor: "Friends",
    bio: "Still learning but having a blast! Patient riding buddies wanted 😊",
    emoji: "🏂"
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
      renderProfileCard();
    }
  }
  
  // Show/hide profile button
  const profileBtn = document.getElementById('profileBtn')
  if (viewName !== 'landing') {
    profileBtn.classList.remove('hidden')
  } else {
    profileBtn.classList.add('hidden')
  }
}

function renderProfileCard() {
  const cardStack = document.getElementById('cardStack');
  if (!cardStack) return;
  
  cardStack.innerHTML = '';
  
  if (currentProfileIndex >= sampleProfiles.length) {
    // No more profiles
    cardStack.innerHTML = `
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 shadow-2xl border border-slate-700/50 text-center">
          <div class="text-6xl mb-4">🎿</div>
          <h3 class="text-2xl font-bold text-white mb-2">That's Everyone!</h3>
          <p class="text-slate-400 mb-6">Check back later for new riders</p>
          <button onclick="currentProfileIndex = 0; renderProfileCard();" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:scale-105 transition">
            Start Over
          </button>
        </div>
      </div>
    `;
    return;
  }
  
  const profile = sampleProfiles[currentProfileIndex];
  
  const skillColors = {
    'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
    'Intermediate': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Advanced': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    'Expert': 'bg-pink-500/20 text-pink-400 border-pink-500/30'
  };
  
  const lookingForEmoji = {
    'Friends': '🤝',
    'Dating': '❤️',
    'Both': '✨'
  };
  
  const card = document.createElement('div');
  card.className = 'absolute inset-0 swipe-card';
  card.innerHTML = `
    <div class="h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden">
      <!-- Profile Header -->
      <div class="relative h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
        <div class="text-9xl">${profile.emoji}</div>
        <div class="absolute top-4 right-4">
          <span class="px-3 py-1 ${skillColors[profile.skill]} rounded-full text-xs font-semibold border backdrop-blur-sm">
            ${profile.skill}
          </span>
        </div>
      </div>
      
      <!-- Profile Info -->
      <div class="p-8 space-y-6">
        <!-- Name & Age -->
        <div>
          <h3 class="text-4xl font-bold text-white mb-1">${profile.name}, ${profile.age}</h3>
          <p class="text-slate-400 flex items-center gap-2">
            <span>${lookingForEmoji[profile.lookingFor]}</span>
            <span>Looking for ${profile.lookingFor.toLowerCase()}</span>
          </p>
        </div>
        
        <!-- Bio -->
        <div class="bg-slate-700/30 rounded-2xl p-4 border border-slate-600/50">
          <p class="text-slate-300 text-lg leading-relaxed">${profile.bio}</p>
        </div>
        
        <!-- Stats -->
        <div class="flex gap-4 pt-2">
          <div class="flex-1 bg-slate-700/30 rounded-xl p-3 text-center border border-slate-600/50">
            <div class="text-2xl mb-1">📍</div>
            <div class="text-xs text-slate-400">On mountain</div>
            <div class="text-white font-semibold">Right now</div>
          </div>
          <div class="flex-1 bg-slate-700/30 rounded-xl p-3 text-center border border-slate-600/50">
            <div class="text-2xl mb-1">🏂</div>
            <div class="text-xs text-slate-400">Skill level</div>
            <div class="text-white font-semibold">${profile.skill}</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  cardStack.appendChild(card);
  
  // Add swipe animations
  let startX = 0;
  let currentX = 0;
  
  card.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });
  
  card.addEventListener('touchmove', (e) => {
    currentX = e.touches[0].clientX - startX;
    card.style.transform = `translateX(${currentX}px) rotate(${currentX / 20}deg)`;
  });
  
  card.addEventListener('touchend', () => {
    if (Math.abs(currentX) > 100) {
      if (currentX > 0) {
        likeProfile();
      } else {
        passProfile();
      }
    }
    card.style.transform = '';
  });
}

function likeProfile() {
  const card = document.querySelector('.swipe-card');
  if (card) {
    card.style.transform = 'translateX(400px) rotate(30deg)';
    card.style.transition = 'all 0.3s ease-out';
    setTimeout(() => {
      currentProfileIndex++;
      renderProfileCard();
    }, 300);
  }
}

function passProfile() {
  const card = document.querySelector('.swipe-card');
  if (card) {
    card.style.transform = 'translateX(-400px) rotate(-30deg)';
    card.style.transition = 'all 0.3s ease-out';
    setTimeout(() => {
      currentProfileIndex++;
      renderProfileCard();
    }, 300);
  }
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
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value,
      age: parseInt(document.getElementById('age').value),
      skillLevel: document.getElementById('skillLevel').value,
      lookingFor: document.getElementById('lookingFor').value,
      bio: document.getElementById('bio').value,
    }
    
    // For now, just log it and show browse view
    console.log('User profile:', formData)
    
    // TODO: Save to Supabase
    alert('Profile created! (Backend not connected yet)')
    
    // Show browse view
    showView('browse')
  })
}

// Make functions available globally
window.showView = showView
window.likeProfile = likeProfile
window.passProfile = passProfile

// Log that app is loaded
console.log('Slope Singles MVP loaded!')
