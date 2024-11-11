const User = require('../models/modelUser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

module.exports = {
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
            const newUser = await User.create({ name, email, password: hashedPassword });

            res.status(201).json({ message: 'Registrasi berhasil', user: newUser });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Di bagian login pada userController.js
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

        // Tambahkan console.log untuk debugging
        console.log('User ID saat login:', user.id);
        const token = jwt.sign(
            { 
                userId: user.id,  // Pastikan properti ini sama dengan yang dibaca di middleware
                email: user.email // Optional: tambahan informasi yang mungkin berguna
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

            user.isPremium = true;
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