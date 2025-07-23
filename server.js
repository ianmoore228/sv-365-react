import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as crypto from "crypto";
import rateLimit from "express-rate-limit";
import http from "http";

import { WebSocketServer } from "ws";

const app = express();
app.use(cors());
app.use(express.json());

// const limiter = rateLimit({
//   // windowMs: 15 * 60 * 1000,
//   // max: 100,
// });
// app.use(limiter);

import { Server } from "socket.io";
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://192.168.8.147:5173", "http://10.0.0.74:5173"], 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["my-custom-header"],
  },
  transports: ["websocket", "polling"],
});

dotenv.config();

const generateSecret = () => {
  return crypto.randomBytes(64).toString("hex");
};

const JWT_SECRET = process.env.JWT_SECRET || generateSecret();

const generateToken = (user) => {
  return jwt.sign({ id: user._id, phone: user.phone }, JWT_SECRET);
};

const port = process.env.PORT || 3000;

const uri = process.env.MONGODB_URI;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 20000,
      socketTimeoutMS: 20000,
    });
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("Mongoose connection error:", error);
  }
};

connectToDatabase();

// Подключение Socket.IO
io.on("connection", (socket) => {
  try {
    console.log("1!");
    console.log("A user connected:", socket.id);

    socket.on("connect", () => {
      console.log("connect!");
      console.log("Connected to the server:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.log("connect_error!");
      console.error("Connection error:", err.message);
    });

    // Fetch and emit message history
    socket.on("get-message-history", async ({ fromUserId, toUserId }) => {
      console.log("2!");
      try {
        const messages = await Message.find({
          $or: [
            { fromUserId, toUserId },
            { fromUserId: toUserId, toUserId: fromUserId },
          ],
        }).sort({ timestamp: 1 }); // Сортировка по времени
    
        socket.emit("chat-history", messages); 
      } catch (error) {
        console.error("Ошибка при получении истории сообщений:", error);
      }

      

    });

    // Handle sending a new message
    socket.on("send-message", async (data) => {
      console.log("3!");
      try {
        const { fromUserId, toUserId, content } = data;

        if (!fromUserId || !toUserId || !content) {
          console.warn("Invalid message data received:", data);
          socket.emit("error", { message: "Invalid message data" });
          return;
        }

        const message = new Message({
          fromUserId,
          toUserId,
          content,
          timestamp: Date.now(),
        });

        await message.save();
        console.log("Message saved successfully:", message);
        io.emit("new-message", message); // Broadcast new message
      } catch (error) {
        console.log("4!");
        console.error("Error saving message to database:", error.message);
        socket.emit("error", { message: "Failed to save message" });
      }
    });

    socket.on("connection_error", (err) => {
      console.log("5!");
      try {
        console.log(err.req); // the request object
        console.log(err.code); // the error code, for example 1
        console.log(err.message); // the error message, for example "Session ID unknown"
        console.log(err.context); // some additional error context
      } catch (e) {
        console.error("Error handling connection error:", e.message);
      }
    });

    // Handle user disconnect
    socket.on("disconnect", () => {
      console.log("6!");
      console.log("User disconnected:", socket.id);
    });
  } catch (error) {
    console.error("Error in connection handler:", error.message);
  }
});

io.on("connection_error", (err) => {
  console.log(err.req); // the request object
  console.log(err.code); // the error code, for example 1
  console.log(err.message); // the error message, for example "Session ID unknown"
  console.log(err.context); // some additional error context
});

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  middlename: String,
  phone: { type: String, unique: true },
  password: String,
  tariff: String,
  hasPayed: Boolean,
  purchaseDate: Date,
  expirationDate: Date,
  role: String,
});

const User = mongoose.model("User", userSchema);

const messageSchema = new mongoose.Schema({
  fromUserId: String,
  toUserId: String,
  content: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

// Сообщение
app.post("/message", async (req, res) => {
  const { content, fromUserId, toUserId } = req.body;

  try {
    const newMessage = new Message({
      fromUserId,
      toUserId,
      content,
      timestamp: Date.now(),
    });

    console.log("Сообщение для сохранения:", newMessage);

    await newMessage.save();

    res.status(200).json({ message: "Собщение отправлено" });
  } catch (error) {
    console.error("Error user:", error);
    res.status(500).json({ error: "Ошибка" });
  }
});

// Регистрация
app.post("/register", async (req, res) => {
  const { name, surname, middlename, phone, password, role } = req.body;

  if (!name || !surname || !phone || !password) {
    return res.status(400).json({ error: "Заполните все обязательные поля" });
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Пользователь с таким телефоном уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      surname,
      middlename,
      phone,
      password: hashedPassword,
      tariff: "",
      hasPayed: false,
      role,
      expirationDate: null,
      purchaseDate: null,
    });

    await newUser.save();

    res.status(201).json({ message: "Пользователь успешно зарегистрирован" });
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Ошибка при регистрации пользователя" });
  }
});

// Логин
app.post("/login", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    const encodedCredentials = authHeader;
    const encodedCredentialsMain = encodedCredentials.split("_")[1];
    const decodedCredentials = Buffer.from(
      encodedCredentialsMain,
      "base64"
    ).toString("utf-8");

    const decodedCredentialsPassLog = decodedCredentials.split(" ")[1];
    const username = decodedCredentialsPassLog.split(":")[0];
    const password = decodedCredentialsPassLog.split(":")[1];

    if (!username || !password) {
      return res.status(400).json({ error: "Неверные данные для входа" });
    }

    const user = await User.findOne({ phone: username });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Неверный пароль" });
    }

    const token = generateToken(user);

    res.status(200).json({
      token,
      user: { name: user.name, phone: user.phone },
      role: user.role,
    });
  } catch (error) {
    console.error("Ошибка при входе:", error);
    res.status(500).json({ error: "Ошибка при входе в систему" });
  }
});

// Проверка авторизации, верификация токена
app.get("/check-auth", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Нет токена, доступ запрещён" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Недействительный токен" });
    }

    res.status(200).json({ message: "Authorized", user });
  });
});

// Обновление данных при переходе на страницу с оплатой
app.put("/updateUser", async (req, res) => {
  const { tariff, hasPayed, expirationDate, purchaseDate } = req.body;

  console.log("Полученные данные:", req.body);

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Нет токена, доступ запрещён" });
  }

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      console.error("Ошибка проверки токена:", err);
      return res.status(403).json({ message: "Недействительный токен" });
    }

    try {
      const result = await User.updateOne(
        { phone: user.phone },
        { $set: { tariff, hasPayed, expirationDate, purchaseDate } }
      );

      if (result.modifiedCount === 0) {
        console.error("Пользователь не найден или данные не обновлены.");
        return res
          .status(404)
          .json({ error: "Пользователь не найден или данные не обновлены" });
      }

      res
        .status(200)
        .json({ message: "Данные пользователя успешно обновлены" });
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
      res
        .status(500)
        .json({ error: "Ошибка при обновлении данных пользователя" });
    }
  });
});

// Получние всех юзеров с ролью "support"
app.post("/find-support", async (req, res) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  jwt.verify(token, JWT_SECRET, async (err) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
  
    try {
      const allSupportUsers = await User.find({ role: "support" });
      res.status(200).json(allSupportUsers);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  
  })
  
});


app.post("/find-buyers", async (req, res) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  jwt.verify(token, JWT_SECRET, async (err) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }
  
    try {
      const allSupportUsers = await User.find({ role: "buyer" });
      res.status(200).json(allSupportUsers);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  
 } )
  
});


// Получение инфы о юзере
app.post("/me", (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
      return res.status(403).json({ message: "Invalid token" });
    }

    try {
      const userInfo = await User.findById(
        user.id,
        "_id name phone tariff expirationDate purchaseDate hasPayed role"
      );
      if (!userInfo) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(userInfo);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});

// Обновление данных при покупке
app.put("/updateUserPayment", async (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Нет токена, доступ запрещён" });
  }

  jwt.verify(token, JWT_SECRET, async (err, user) => {
    if (err) {
      console.error("Ошибка проверки токена:", err);
      return res.status(403).json({ message: "Недействительный токен" });
    }

    try {
      const result = await User.updateOne(
        { _id: user.id },
        {
          $set: {
            purchaseDate: req.body.purchaseDate,
            expirationDate: req.body.expirationDate,
            hasPayed: req.body.hasPayed,
          },
        }
      );

      if (result.modifiedCount === 0) {
        console.error("Пользователь не найден или данные не обновлены.");
        return res
          .status(404)
          .json({ error: "Пользователь не найден или данные не обновлены" });
      }

      res
        .status(200)
        .json({ message: "Данные пользователя успешно обновлены" });
    } catch (error) {
      console.error("Ошибка обновления данных:", error);
      res
        .status(500)
        .json({ error: "Ошибка при обновлении данных пользователя" });
    }
  });
});

// app.get('/api/wall', async (req, res) => {
//   try {
//     const url = 'https://api.vk.com/method/wall.get';
//     const params = new URLSearchParams({
//       owner_id: '-229122617',
//       count: '1',
//       filter: 'all',
//       offset: '0',
//       access_token: '80adbc7d80adbc7d80adbc7de88385a4c5880ad80adbc7de73fe1c01f2e2887b4639c33',
//       v: '5.137',
//     });

//     const response = await fetch(`${url}?${params}`);
//     if (!response.ok) {
//       throw new Error(`Ошибка запроса: ${response.status}`);
//     }

//     const data = await response.json();
//     res.json(data);
//     console.log(data);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });


server.listen(port, () => {
  console.log(`HTTP and WebSocket server is running on http://localhost:3000`);
});