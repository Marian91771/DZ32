import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const students = [];

const users = [{ username: 'admin', password: '$2b$10$EBsUXWo2pWNjXFOJehnXcuLZzg/UYx5u3VwZRFyeLbjYXbvPuRJNK' }]
const SECRET_KEY = 'hillel_fullstack';

app.post('/signin', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(usr => usr.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  // payload, secretKey, config
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '5min' });

  res.json({ token });
});

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    next();
  });
}



app.get('/api/courses', authMiddleware, (req, res) => {
  const courses = [{ id: 1, name: 'Pro JS' }, { id: 2, name: 'Fullstack' }];
  res.json(courses);
});

app.get('/api/students', (req, res) => res.json(students));

app.post('/api/students', (req, res) => {
  const { student } = req.body;
  const newStudent = { ...student, id: students.length + 1 };
  students.push(newStudent);
  res.send({ student: newStudent });
});

app.listen(3000);