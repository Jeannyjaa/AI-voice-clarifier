fetch('https://your-backend-url.com/send-otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ phoneNumber: 'เบอร์โทร' })
});


