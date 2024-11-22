const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: process.env.EMAIL_USER,
     pass: process.env.EMAIL_PASSWORD
   }
});

module.exports = {
   async forgotPassword(req, res) {
       try {
         const { email } = req.body;
         const user = await User.findOne({ where: { email } });
         
         if (!user) {
           return res.status(404).json({ error: 'Email tidak ditemukan' });
         }
     
         const resetToken = Math.floor(10000 + Math.random() * 90000).toString();
         const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour
     
         user.resetToken = resetToken;
         user.resetTokenExpiry = resetTokenExpiry;
         await user.save();
     
         const mailOptions = {
           from: process.env.EMAIL_USER,
           to: email,
           subject: 'Reset Password Code',
           text: `Kode reset password Anda: ${resetToken}\nKode berlaku selama 1 jam.`
         };
     
         await transporter.sendMail(mailOptions);
         res.json({ message: 'Kode reset password telah dikirim ke email Anda' });
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
   },
     
   async resetPassword(req, res) {
       try {
         const { email, token, newPassword } = req.body;
         
         const user = await User.findOne({ 
           where: { 
             email,
             resetToken: token,
             resetTokenExpiry: { [Op.gt]: new Date() }
           }
         });
     
         if (!user) {
           return res.status(400).json({ error: 'Token tidak valid atau sudah kadaluarsa' });
         }
     
         const hashedPassword = await bcrypt.hash(newPassword, 10);
         user.password = hashedPassword;
         user.resetToken = null;
         user.resetTokenExpiry = null;
         await user.save();
     
         res.json({ message: 'Password berhasil direset' });
       } catch (error) {
         res.status(500).json({ error: error.message });
       }
   },

   async register(req, res) {
       try {
           const { name, email, password } = req.body;

           if (!name || !email || !password) {
               return res.status(400).json({ error: 'Semua field wajib diisi' });
           }

           const existingUser = await User.findOne({ where: { email } });
           if (existingUser) {
               return res.status(400).json({ error: 'Email sudah digunakan' });
           }

           const hashedPassword = await bcrypt.hash(password, 10);
           const newUser = await User.create({ 
               name, 
               email, 
               password: hashedPassword,
               role: 'user' // Set default role
           });

           res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   },

   async login(req, res) {
       try {
           const { email, password } = req.body;

           if (!email || !password) {
               return res.status(400).json({ error: 'Email dan password harus diisi' });
           }

           const user = await User.findOne({ where: { email } });
           if (!user) {
               return res.status(404).json({ error: 'User tidak ditemukan' });
           }

           const isPasswordValid = await bcrypt.compare(password, user.password);
           if (!isPasswordValid) {
               return res.status(401).json({ error: 'Password salah' });
           }

           console.log('User ID saat login:', user.id);
           const token = jwt.sign(
               { 
                   userId: user.id,
                   email: user.email,
                   role: user.role || 'user'
               }, 
               process.env.JWT_SECRET, 
               { expiresIn: '1h' }
           );
           res.json({ message: 'Login berhasil', token });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   },

   async upgrade(req, res) {
       try {
           const userId = req.userId;

           const user = await User.findByPk(userId);
           if (!user) {
               return res.status(404).json({ error: 'User tidak ditemukan' });
           }

           user.role = 'premium';
           await user.save();

           res.json({ message: 'Akun berhasil diupgrade ke premium', user });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   },

   async updateProfile(req, res) {
       try {
           const { name, email, phone_number } = req.body;
           const userId = req.userId;

           const user = await User.findByPk(userId);
           if (!user) {
               return res.status(404).json({ error: 'User tidak ditemukan' });
           }

           if (email && email !== user.email) {
               const existingUser = await User.findOne({
                   where: { email, id: { [Op.ne]: userId } },
               });
               if (existingUser) {
                   return res.status(400).json({ error: 'Email sudah digunakan' });
               }
           }

           if (phone_number && phone_number !== user.phone_number) {
               const existingPhone = await User.findOne({
                   where: { phone_number, id: { [Op.ne]: userId } },
               });
               if (existingPhone) {
                   return res.status(400).json({ error: 'Nomor telepon sudah digunakan' });
               }
           }

           user.name = name?.trim() || user.name;
           user.email = email?.trim() || user.email;
           user.phone_number = phone_number?.trim() || user.phone_number;

           await user.save();

           const { password: _, ...userWithoutPassword } = user.toJSON();
           res.json({ message: 'Profile berhasil diupdate', user: userWithoutPassword });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   },

   async getProfile(req, res) {
       try {
           const userId = req.userId;
           const user = await User.findByPk(userId);

           if (!user) {
               return res.status(404).json({ error: 'User tidak ditemukan' });
           }

           const { password: _, ...userWithoutPassword } = user.toJSON();
           res.json({ user: userWithoutPassword, message: 'Profile berhasil dimuat' });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   },

   async changePassword(req, res) {
       try {
           const { currentPassword, newPassword } = req.body;
           const userId = req.userId;

           if (!currentPassword || !newPassword) {
               return res.status(400).json({ error: 'Current password dan new password harus diisi' });
           }

           const user = await User.findByPk(userId);
           if (!user) {
               return res.status(404).json({ error: 'User tidak ditemukan' });
           }

           const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
           if (!isPasswordValid) {
               return res.status(401).json({ error: 'Password saat ini tidak valid' });
           }

           const hashedPassword = await bcrypt.hash(newPassword, 10);
           user.password = hashedPassword;
           await user.save();

           res.json({ message: 'Password berhasil diubah' });
       } catch (error) {
           res.status(500).json({ error: error.message });
       }
   },
};