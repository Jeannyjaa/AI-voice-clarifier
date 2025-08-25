const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// ให้ server ส่งไฟล์ในโฟลเดอร์ public
app.use(express.static('public'));

// สำหรับรับข้อมูลแบบ POST (ถ้าโปรเจกต์ใช้)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// เริ่ม server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
