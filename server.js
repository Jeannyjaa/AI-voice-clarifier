app.post('/send-otp', (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  // สร้างรหัส OTP แล้วส่งกลับ
  res.json({ message: 'OTP ส่งเรียบร้อยแล้ว' });
});
