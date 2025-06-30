let isLogin = true;

function toggleForm() {
  isLogin = !isLogin;
  document.getElementById('formTitle').innerText = isLogin ? 'Login' : 'Sign Up';
  document.querySelector('button').innerText = isLogin ? 'Login' : 'Sign Up';
  document.getElementById('toggleText').innerHTML = isLogin ?
    "Don't have an account? <a onclick=\"toggleForm()\">Sign Up</a>" :
    "Already have an account? <a onclick=\"toggleForm()\">Login</a>";
}

function hashPassword(password) {
  return btoa(password);
}

function handleAuth() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  if (!email || !password) return alert('Please fill all fields');

  let users = JSON.parse(localStorage.getItem('users')) || {};
  const hashed = hashPassword(password);

  if (isLogin) {
    if (users[email] && users[email].password === hashed) {
      localStorage.setItem('session', email);
      alert('Logged in!');
    } else {
      alert('Invalid credentials');
    }
  } else {
    if (users[email]) {
      alert('User already exists!');
    } else {
      users[email] = { password: hashed };
      localStorage.setItem('users', JSON.stringify(users));
      alert('Account created! Now login.');
      toggleForm();
    }
  }
}

function forgotPassword() {
  const email = prompt('Enter your email to reset password');
  if (!email) return;

  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (users[email]) {
    const newPass = prompt('Enter your new password');
    if (newPass) {
      users[email].password = hashPassword(newPass);
      localStorage.setItem('users', JSON.stringify(users));
      alert('Password updated. You can now login.');
    }
  } else {
    alert('No account found with that email');
  }
}
