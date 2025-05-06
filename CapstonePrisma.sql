/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `binh_luan`;
CREATE TABLE `binh_luan` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `hinh_anh`;
CREATE TABLE `hinh_anh` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int NOT NULL,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `luu_anh`;
CREATE TABLE `luu_anh` (
  `nguoi_dung_id` int NOT NULL,
  `hinh_id` int NOT NULL,
  `ngay_luu` date DEFAULT NULL,
  `deletedBy` int NOT NULL DEFAULT '0',
  `isDeleted` tinyint(1) NOT NULL DEFAULT '0',
  `deletedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `mat_khau` varchar(255) NOT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  `deleted` tinyint NOT NULL DEFAULT '0',
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 14, 2, '2025-04-07', 'Bức ảnh nhìn rất yên bình, thích quá!', 0, 0, '2025-05-05 10:39:44', '2025-05-05 10:39:44', '2025-05-05 10:39:44'),
(3, 16, 4, '2025-04-13', 'Có cảm giác như đang ở đó luôn á.', 0, 0, '2025-05-05 10:39:44', '2025-05-05 10:39:44', '2025-05-05 10:39:44'),
(4, 17, 5, '2025-04-16', 'Góc chụp này rất sáng tạo, cho 10 điểm!', 0, 0, '2025-05-05 10:39:44', '2025-05-05 10:39:44', '2025-05-05 10:39:44'),
(5, 18, 6, '2025-04-18', 'Chắc là chụp bằng điện thoại xịn nhỉ, đẹp ghê.', 0, 0, '2025-05-05 10:39:44', '2025-05-05 10:39:44', '2025-05-05 10:39:44'),
(6, 14, 7, '2025-04-21', 'Tấm này đẹp nhưng hơi mờ nhẹ, chỉnh nét tí là ok.', 0, 0, '2025-05-05 10:39:44', '2025-05-05 10:39:44', '2025-05-05 10:39:44'),
(7, 15, 2, '2025-04-24', 'Phong cách chỉnh màu rất hợp mắt.', 0, 0, '2025-05-05 10:39:44', '2025-05-05 10:39:44', '2025-05-05 10:39:44'),
(9, 17, 4, '2025-04-29', 'Bức ảnh rất có hồn, ánh sáng tự nhiên.', 0, 0, '2025-05-05 10:39:44', '2025-05-05 10:39:44', '2025-05-05 10:39:44'),
(10, 18, 5, '2025-05-01', 'Ảnh có chiều sâu, góc nhìn rất chuyên nghiệp.', 0, 0, '2025-05-05 10:39:44', '2025-05-05 10:39:44', '2025-05-05 10:39:44'),
(11, 17, 2, '2025-05-06', 'xinchao', 0, 0, '2025-05-06 02:12:00', '2025-05-06 02:12:00', '2025-05-06 02:12:00');
INSERT INTO `hinh_anh` (`id`, `nguoi_dung_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(2, 18, 'download.jpg', 'https://res.cloudinary.com/dgzknzxns/image/upload/v1746324109/articles/lgd3ale2soxqt88prom4.jpg', 'Mô tả hình ảnh 1', 0, 0, '2025-05-04 02:01:50', '2025-05-04 02:01:50', '2025-05-04 02:01:50'),
(4, 16, 'download (3).jpg', 'https://res.cloudinary.com/dgzknzxns/image/upload/v1746324249/articles/fko4fjnu5znlytqrtsj3.jpg', 'Mô tả hình ảnh 3', 0, 1, '2025-05-04 02:04:10', '2025-05-04 02:04:10', '2025-05-06 02:54:08'),
(5, 16, 'download (4).jpg', 'https://res.cloudinary.com/dgzknzxns/image/upload/v1746324259/articles/vw88a1ud2u4tjzyhubbw.jpg', 'Mô tả hình ảnh 4', 0, 0, '2025-05-04 02:04:20', '2025-05-04 02:04:20', '2025-05-04 02:04:20'),
(6, 17, 'dog.jpg', 'https://res.cloudinary.com/dgzknzxns/image/upload/v1746440090/articles/m2aidxoqxk1pfvvvzlmp.jpg', 'Mô tả hình ảnh chú cún ', 0, 0, '2025-05-05 10:14:49', '2025-05-05 10:14:49', '2025-05-05 10:14:49'),
(7, 17, 'tree.jpg', 'https://res.cloudinary.com/dgzknzxns/image/upload/v1746440106/articles/z4vgalnpp645gmaazq8v.jpg', 'Mô tả hình ảnh cây ', 0, 0, '2025-05-05 10:15:05', '2025-05-05 10:15:05', '2025-05-05 10:15:05');
INSERT INTO `luu_anh` (`nguoi_dung_id`, `hinh_id`, `ngay_luu`, `deletedBy`, `isDeleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(14, 2, '2025-05-01', 0, 0, '2025-05-05 10:47:59', '2025-05-05 10:47:59', '2025-05-05 10:47:59'),
(16, 5, '2025-05-03', 0, 0, '2025-05-05 10:47:59', '2025-05-05 10:47:59', '2025-05-05 10:47:59'),
(17, 6, '2025-05-04', 0, 0, '2025-05-05 10:47:59', '2025-05-05 10:47:59', '2025-05-05 10:47:59'),
(18, 7, '2025-05-05', 0, 0, '2025-05-05 10:47:59', '2025-05-05 10:47:59', '2025-05-05 10:47:59');
INSERT INTO `nguoi_dung` (`id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(14, 'nguyenanhtuan.forwork@gmail.com', '$2b$10$7eL/vvou3kDDJt/Negbd0ONLhbrNlumKeJR1LumJqMxoADrjLVVM.', 'Cam Tu ', 20, 'avatar/fsvxkjnui4mhvjgdg1qv', 0, NULL, '2025-05-01 09:20:57', '2025-05-04 12:12:00'),
(15, 'hung.nguyen28@gmail.com', '$2b$10$cHaCvWF//wxEHgi5lhluKuE/ZavJBMUKcolK5r4gGmi7Z/9eAKziG', 'Nguyễn Văn Hùng', 22, NULL, 0, NULL, '2025-05-04 02:00:10', '2025-05-04 02:00:10'),
(16, 'mai.tran24@yahoo.com', '$2b$10$xN4VYc6lrQLJutV2hYMIneXRX3B4IVX/YUZF.CzmbaQAKyv5q.udy', 'Cam Tu ', 20, 'avatar/m8e2dxjlqvd2z7x0flym', 0, NULL, '2025-05-04 02:00:28', '2025-05-06 02:16:40'),
(17, 'hoanganh.le@outlook.com', '$2b$10$JgoefY9q7.QOf3ZzGX501.W.HKdWmLVX302SIfrIZ7xETWlmeN1va', 'Lê Hoàng Anh', 22, NULL, 0, NULL, '2025-05-04 02:00:50', '2025-05-04 02:00:50'),
(18, 'duy.phamquoc22@gmail.com', '$2b$10$DUbVkjDP/KVF/fTG0eHpu.i3X3s9v5VF6QSlYXHwYBkVB5B8EZd5O', 'Phạm Quốc Duy', 22, NULL, 0, NULL, '2025-05-04 02:01:06', '2025-05-04 02:01:06');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;