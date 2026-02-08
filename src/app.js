// Simple view management
const views = {
  landing: document.getElementById('landingView'),
  signup: document.getElementById('signupView'),
  browse: document.getElementById('browseView'),
}

function showView(viewName) {
  // Hide all views
  Object.values(views).forEach(view => view.classList.add('hidden'))
  
  // Show requested view
  if (views[viewName]) {
    views[viewName].classList.remove('hidden')
  }
  
  // Show/hide profile button
  const profileBtn = document.getElementById('profileBtn')
  if (viewName !== 'landing') {
    profileBtn.classList.remove('hidden')
  } else {
    profileBtn.classList.add('hidden')
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

// Make showView available globally
window.showView = showView

// Log that app is loaded
console.log('Slope Singles MVP loaded!')
