-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Des 2024 pada 06.38
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cihuykids`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `favorites`
--

CREATE TABLE `favorites` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `contentId` int(11) NOT NULL,
  `contentType` enum('video','music','reading') NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `history`
--

CREATE TABLE `history` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `contentId` int(11) NOT NULL,
  `contentType` enum('video','music','reading') NOT NULL,
  `lastViewed` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `music`
--

CREATE TABLE `music` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `musicUrl` varchar(255) NOT NULL,
  `thumbnailUrl` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `plays` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ageRange` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `musics`
--

CREATE TABLE `musics` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `thumbnailUrl` varchar(255) NOT NULL,
  `genre` enum('Lagu Anak','Lagu Nasional') NOT NULL,
  `view_count` int(11) NOT NULL DEFAULT 0,
  `isPremium` tinyint(1) DEFAULT 0,
  `ageRange` enum('4-5','6-7','8-9','10-12') NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `musics`
--

INSERT INTO `musics` (`id`, `title`, `url`, `thumbnailUrl`, `genre`, `view_count`, `isPremium`, `ageRange`, `createdAt`, `updatedAt`) VALUES
(1, 'cocomelon remix', 'https://drive.google.com/file/d/13rWt0w3S3d_Ju-M29SgM43Y9dv2yQB9v/view?usp=sharing', 'https://drive.google.com/file/d/13rWt0w3S3d_Ju-M29SgM43Y9dv2yQB9v/view?usp=sharing', 'Lagu Anak', 0, 0, '10-12', '2024-11-26 14:12:57', '2024-11-28 12:12:10'),
(2, 'dandandan', 'https://drive.google.com/file/d/1f-DvpwkgIWjPxgqxxJeqIlUH0WGI3P0N/view?usp=drive_link', 'https://drive.google.com/file/d/13rWt0w3S3d_Ju-M29SgM43Y9dv2yQB9v/view?usp=drive_link', 'Lagu Nasional', 0, 0, '4-5', '2024-11-27 17:44:03', '2024-11-27 17:44:03'),
(4, 'Lagu pengantar tidur', 'https://drive.google.com/file/d/1aA04oaBzTR9fRh6AyfdnAmvet_L0rf2z/view?usp=drive_link', 'https://drive.google.com/file/d/1fu0ugeCudCMOJxTLdEVyLxPqUIW96FNg/view?usp=drive_link', 'Lagu Nasional', 0, 0, '4-5', '2024-12-02 18:42:50', '2024-12-02 18:42:50'),
(5, 'awdawdawd', 'https://drive.google.com/file/d/1fu0ugeCudCMOJxTLdEVyLxPqUIW96FNg/view?usp=drive_link', 'https://drive.google.com/file/d/1fu0ugeCudCMOJxTLdEVyLxPqUIW96FNg/view?usp=drive_link', 'Lagu Anak', 0, 0, '4-5', '2024-12-02 19:12:41', '2024-12-02 19:12:41'),
(6, 'awdawdawd', 'https://drive.google.com/file/d/1fu0ugeCudCMOJxTLdEVyLxPqUIW96FNg/view?usp=drive_link', 'https://drive.google.com/file/d/1fu0ugeCudCMOJxTLdEVyLxPqUIW96FNg/view?usp=drive_link', 'Lagu Nasional', 0, 0, '4-5', '2024-12-02 19:12:46', '2024-12-02 19:12:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `paymentMethod` varchar(255) NOT NULL,
  `status` enum('pending','success','failed') DEFAULT 'pending',
  `proofImage` varchar(255) DEFAULT NULL,
  `paymentDate` datetime NOT NULL DEFAULT current_timestamp(),
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp(),
  `durationType` enum('1_month','12_month') NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `accountName` varchar(255) NOT NULL,
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `payments`
--

INSERT INTO `payments` (`id`, `userId`, `amount`, `paymentMethod`, `status`, `proofImage`, `paymentDate`, `createdAt`, `updatedAt`, `durationType`, `bankName`, `accountName`, `notes`) VALUES
(1, 7, 100000.00, 'transfer', 'success', 'hehe.jpg', '2024-11-28 01:49:29', '2024-11-28 01:49:29', '2024-11-27 19:19:39', '12_month', 'jago', 'akun biasa', 'untuk anak'),
(2, 7, 7000.00, '', 'success', 'payment-1732738623124-929804627.jpg', '2024-11-27 20:17:03', '2024-11-27 20:17:03', '2024-11-27 20:24:26', '12_month', 'BCA', 'BCA', NULL),
(3, 7, 70000.00, '', 'failed', 'payment-1732739429541-724297713.jpg', '2024-11-27 20:30:29', '2024-11-27 20:30:29', '2024-11-27 20:50:08', '1_month', 'BCA', 'BCA', NULL),
(4, 7, 70000.00, '', 'success', 'payment-1732739860311-981881535.jpg', '2024-11-27 20:37:40', '2024-11-27 20:37:40', '2024-11-27 20:50:09', '1_month', 'BCA', 'BCA', NULL),
(5, 7, 70000.00, '', 'failed', 'payment-1732740632242-97847373.jpg', '2024-11-27 20:50:32', '2024-11-27 20:50:32', '2024-11-27 20:50:37', '1_month', 'BCA', 'BCA', NULL),
(6, 8, 70000.00, '', 'success', 'payment-1732783286854-36922839.png', '2024-11-28 08:41:26', '2024-11-28 08:41:26', '2024-11-28 08:41:44', '1_month', 'BCA', 'BCA', NULL),
(7, 9, 70000.00, '', 'success', 'payment-1732798642636-696675078.png', '2024-11-28 12:57:22', '2024-11-28 12:57:22', '2024-11-28 12:57:35', '1_month', 'BCA', 'BCA', NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `readings`
--

CREATE TABLE `readings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `thumbnailUrl` varchar(255) DEFAULT NULL,
  `genre` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ageRange` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `isPremium` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('001-createTable.js'),
('002-createVideoTable.js'),
('003-createMusicTable.js'),
('004-createReadingTable.js'),
('005-createFavoriteAndHistoryTables.js'),
('006-createPaymentTable.js'),
('007-updateTables.js'),
('20241125085243-create-users-table.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` int(15) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `premiumUntil` datetime DEFAULT NULL,
  `resetToken` varchar(255) DEFAULT NULL,
  `resetTokenExpiry` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `isPremium` tinyint(1) NOT NULL DEFAULT 0,
  `premiumExpiry` datetime DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone_number`, `password`, `role`, `premiumUntil`, `resetToken`, `resetTokenExpiry`, `createdAt`, `updatedAt`, `isPremium`, `premiumExpiry`, `isActive`) VALUES
(1, 'lenovo', 'mlyarmdhn@gmail.com', 808080808, '$2b$10$W9D.DYGwlNeuZ1fY2e/wPej13ByqR79ysVNem2CNHWKKXlXU/4Ivu', 'admin', NULL, '55229', '2024-11-26 05:21:29', '2024-11-25 09:15:19', '2024-11-26 04:21:29', 0, NULL, 1),
(2, 'nanda jbe', 'nandajbe@gmail.com', 0, '$2b$10$hfqoN5icjB0hj9xjO4O8eOjWpkBbwzUMH3zihnuJwMI1EpxVRBkke', 'admin', NULL, '43132', '2024-11-26 18:03:34', '2024-11-25 17:19:29', '2024-11-26 17:03:34', 0, NULL, 1),
(3, 'Admin satu', 'admin1@example.com', 0, '$2b$10$5CXHrh9IZ9o/8Xdg9mQ2pOEhFtAwWbEs4sA.2aCVs1bWKR4Ihhtji', 'admin', NULL, NULL, NULL, '2024-11-26 04:13:57', '2024-11-26 04:13:57', 0, NULL, 1),
(4, 'John Doe Updated', 'admin1@gmail.com', 2147483647, '$2b$10$plLStH/GmNm4M1Veuf./muHj.lynL3STM6RNicizlyCeb6nk3KuE.', 'admin', NULL, NULL, NULL, '2024-11-26 04:21:47', '2024-11-27 06:11:57', 0, NULL, 1),
(5, 'admin ganteng', 'admin@example.com', 0, '$2b$10$VkrTzy.YGjKS9dbR787kGu3K/3RbdNaLYqnQuZxvkryiJvWFQI6T2', 'admin', NULL, NULL, NULL, '2024-11-26 09:52:13', '2024-11-26 09:52:13', 0, NULL, 1),
(6, 'alhadi', 'aldialhadi9@gmail.com', 0, '$2b$10$1WklCrunbKXtEjvqPbkA2OKnmXvotaB6vEkEUJ78RtSGXGk/FTSVu', 'admin', NULL, '56926', '2024-11-26 14:34:41', '2024-11-26 13:18:04', '2024-11-26 13:34:41', 0, NULL, 1),
(7, 'akun biasa', 'akunbiasa@example.com', 0, '$2b$10$KZdlevTbbu1o1C4mQusM9.CgLWH/NMt0f6.f.lcOdxKqPDOEKAscq', 'user', '2049-08-18 19:02:37', NULL, NULL, '2024-11-27 08:24:54', '2024-11-27 20:50:09', 1, NULL, 1),
(8, 'herdin', 'herdin@example.com', 0, '$2b$10$y9aLJX1.BkYNhWoxX1nwGey0QTDmPljAMyJF1OjstCX13.GMVNbeq', 'user', '2024-12-28 08:41:44', NULL, NULL, '2024-11-28 08:37:56', '2024-11-28 08:41:44', 1, NULL, 1),
(9, 'gayus', 'gayus@example.com', 0, '$2b$10$d8nkU9N/iiDfMpsExQ3PH.n7XBV5YzZSmcAPDrmoCF9VeX7LBLPn6', 'user', '2024-12-28 12:57:35', NULL, NULL, '2024-11-28 12:54:13', '2024-11-28 12:57:35', 1, NULL, 1);

-- --------------------------------------------------------

--
-- Struktur dari tabel `videos`
--

CREATE TABLE `videos` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `videoUrl` varchar(255) NOT NULL,
  `thumbnailUrl` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `ageRange` enum('4-5','6-7','8-9','10-12') NOT NULL,
  `category` enum('Edukasi','Hiburan') NOT NULL,
  `isPremium` tinyint(1) DEFAULT 0,
  `viewCount` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `videos`
--

INSERT INTO `videos` (`id`, `title`, `description`, `videoUrl`, `thumbnailUrl`, `createdAt`, `updatedAt`, `ageRange`, `category`, `isPremium`, `viewCount`) VALUES
(22, 'Bayi ngomong kiamat!!!!', 'Keajaiban dunia', 'https://youtu.be/VvhmI8iTbOE?si=hQIc1wXbBspab7p8', 'https://youtu.be/VvhmI8iTbOE?si=hQIc1wXbBspab7p8', '2024-11-28 09:06:12', '2024-11-28 09:06:12', '4-5', 'Edukasi', 1, 0),
(23, 'Cocomelon ulang tahun ke Jakarta', '', 'https://youtu.be/uiwOgoi3E_w?si=M4MA3GR4jF3HsJzR', 'https://youtu.be/uiwOgoi3E_w?si=M4MA3GR4jF3HsJzR', '2024-11-28 09:08:10', '2024-11-28 09:25:08', '6-7', 'Edukasi', 1, 0),
(31, 'Mobil pemadam kebakaran', '', 'https://youtu.be/ohDegt5yR5w?si=ibfyyCTm0Jzmoul-', 'https://youtu.be/ohDegt5yR5w?si=ibfyyCTm0Jzmoul-', '2024-11-28 09:22:23', '2024-11-28 09:23:18', '6-7', 'Edukasi', 0, 0),
(32, 'Belajar dan bermain untuk balita', '', 'https://youtu.be/cV7jx7-4aFE?si=hnoba12Q7pkBRzXz', 'https://youtu.be/cV7jx7-4aFE?si=hnoba12Q7pkBRzXz', '2024-11-28 09:24:30', '2024-11-28 09:24:30', '4-5', 'Edukasi', 0, 0),
(33, 'Junior Squad Makan Ulat', '', 'https://youtu.be/fnsKhd2QLyU?si=xRyWrPi70-wO6kdy', 'https://youtu.be/fnsKhd2QLyU?si=xRyWrPi70-wO6kdy', '2024-11-28 09:26:44', '2024-11-28 09:26:44', '8-9', 'Edukasi', 1, 0),
(34, 'Nussa Belajar Doa!', '', 'https://youtu.be/1uGFLo4Oy94?si=cD8PMeIgcq4EIPRy', 'https://youtu.be/1uGFLo4Oy94?si=cD8PMeIgcq4EIPRy', '2024-11-28 09:27:24', '2024-11-28 09:27:24', '8-9', 'Edukasi', 0, 0),
(35, 'Kisah Sedih Bot EfEf di Bermuda', '', 'https://youtu.be/hd7b7Thu7gY?si=bCmVlpy5dUZPPROx', 'https://youtu.be/hd7b7Thu7gY?si=bCmVlpy5dUZPPROx', '2024-11-28 09:30:01', '2024-11-28 09:31:33', '10-12', 'Edukasi', 0, 0),
(36, 'Kisah sedih! Ibuku Meningal Dunia! Ketika Aku Dirantau Orang.', '', 'https://youtu.be/RKYKgsIpEWE?si=3SYIF4fcu5Jb8RoF', 'https://youtu.be/RKYKgsIpEWE?si=3SYIF4fcu5Jb8RoF', '2024-11-28 09:30:52', '2024-11-28 09:30:52', '10-12', 'Edukasi', 1, 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `music`
--
ALTER TABLE `music`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `musics`
--
ALTER TABLE `musics`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indeks untuk tabel `readings`
--
ALTER TABLE `readings`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `history`
--
ALTER TABLE `history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `music`
--
ALTER TABLE `music`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `musics`
--
ALTER TABLE `musics`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT untuk tabel `readings`
--
ALTER TABLE `readings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `history`
--
ALTER TABLE `history`
  ADD CONSTRAINT `history_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
