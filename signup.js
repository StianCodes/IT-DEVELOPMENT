// Select elements from the DOM
const form = document.getElementById('form')
const firstname_input = document.getElementById('firstname-input')
const email_input = document.getElementById('email-input')
const password_input = document.getElementById('password-input')
const repeat_password_input = document.getElementById('repeat-password-input')
const error_message = document.getElementById('error-message')

// Add event listener for form submission
form.addEventListener('submit', (e) => {
  let errors = []

  if (firstname_input) {
    // Check if the first name input exists, if so, it's the signup form
    errors = getSignupFormErrors(
      firstname_input.value, 
      email_input.value, 
      password_input.value, 
      repeat_password_input.value
    )
  } else {
    // If first name input is missing, it's the login form
    errors = getLoginFormErrors(email_input.value, password_input.value)
  }

  if (errors.length > 0) {
    // Prevent form submission and display errors if any exist
    e.preventDefault()
    error_message.innerText = errors.join(". ")
  }
})

// Function to validate the signup form
function getSignupFormErrors(firstname, email, password, repeatPassword) {
  let errors = []

  // Validate first name
  if (firstname === '' || firstname == null) {
    errors.push('Firstname is required')
    firstname_input.parentElement.classList.add('incorrect')
  }
  // Validate email
  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  // Validate password presence and length
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }
  if (password.length < 8) {
    errors.push('Password must have at least 8 characters')
    password_input.parentElement.classList.add('incorrect')
  }
  // Validate password confirmation
  if (password !== repeatPassword) {
    errors.push('Password does not match repeated password')
    password_input.parentElement.classList.add('incorrect')
    repeat_password_input.parentElement.classList.add('incorrect')
  }

  return errors
}

// Function to validate the login form
function getLoginFormErrors(email, password) {
  let errors = []

  // Validate email
  if (email === '' || email == null) {
    errors.push('Email is required')
    email_input.parentElement.classList.add('incorrect')
  }
  // Validate password presence
  if (password === '' || password == null) {
    errors.push('Password is required')
    password_input.parentElement.classList.add('incorrect')
  }

  return errors
}

// Combine all inputs into a single array (exclude null inputs)
const allInputs = [firstname_input, email_input, password_input, repeat_password_input].filter(input => input != null)

// Add an input event listener to each input to remove error styles and messages when user starts typing
allInputs.forEach(input => {
  input.addEventListener('input', () => {
    if (input.parentElement.classList.contains('incorrect')) {
      input.parentElement.classList.remove('incorrect') // Remove error styles
      error_message.innerText = '' // Clear the error message
    }
  })
})
