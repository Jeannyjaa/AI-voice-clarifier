const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const otpStore = {}; // เก็บ otp ชั่วคราว { phone: otp }

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

app.post('/send-otp', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.json({ success: false, message: 'กรุณากรอกเบอร์โทรศัพท์' });
  }
  const otp = generateOTP();
  otpStore[phone] = otp;

  console.log(`ส่ง OTP ไปยังเบอร์ ${phone}: ${otp}`); // สมมติแทนส่ง SMS จริง

  res.json({ success: true, message: `ส่งรหัส OTP ไปที่เบอร์ ${phone} แล้ว` });
});

app.post('/verify-otp', (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.json({ success: false, message: 'กรุณากรอกข้อมูลให้ครบถ้วน' });
  }
  if (otpStore[phone] && otpStore[phone] === otp) {
    delete otpStore[phone];
    return res.json({ success: true, message: 'ยืนยัน OTP สำเร็จ' });
  } else {
    return res.json({ success: false, message: 'รหัส OTP ไม่ถูกต้อง' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
