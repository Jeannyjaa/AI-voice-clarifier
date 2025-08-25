const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const otpStore = {};

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // เสิร์ฟ index.html จาก public

// ✅ ส่ง OTP
app.post('/send-otp', (req, res) => {
  const phone = req.body.phone || req.body.phoneNumber;
  if (!phone) {
    return res.json({ success: false, message: 'กรุณากรอกเบอร์โทร' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;

  console.log(`📲 ส่ง OTP ไปยัง ${phone} คือ ${otp}`);
  res.json({ success: true, message: 'OTP ส่งเรียบร้อยแล้ว' });
});

// ✅ ตรวจสอบ OTP
app.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  const storedOtp = otpStore[phone];

  if (!phone || !otp) {
    return res.json({ success: false, message: 'ข้อมูลไม่ครบถ้วน' });
  }

  if (storedOtp && storedOtp === otp) {
    delete otpStore[phone];
    return res.json({ success: true, message: 'ยืนยัน OTP สำเร็จ!' });
  } else {
    return res.json({ success: false, message: 'รหัส OTP ไม่ถูกต้อง' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
