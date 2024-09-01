const UserService = require('../services/userService');
const path = require('path');
const fs = require('fs');

// Format nama file gambar
const formatImageName = (name, suffix, id) => {
  const formattedName = name.replace(/\s+/g, '_');
  return `/uploads/${formattedName}_${suffix}_ID${id}.jpg`;
};

module.exports = {
  async createUser(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      // Buat user terlebih dahulu untuk mendapatkan ID
      const user = await UserService.createUser({
        name,
        email,
        password,
        phone,
      });

      // Handle file uploads
      let profileImagePath = null;
      let coverImagePath = null;

      if (req.files?.profileImage) {
        const profileImage = req.files.profileImage;
        profileImagePath = formatImageName(name, 'profileImage', user.id);
        const profileImageSavePath = path.join(__dirname, '../', profileImagePath);
        await profileImage.mv(profileImageSavePath);
      }

      if (req.files?.coverImage) {
        const coverImage = req.files.coverImage;
        coverImagePath = formatImageName(name, 'coverImage', user.id);
        const coverImageSavePath = path.join(__dirname, '../', coverImagePath);
        await coverImage.mv(coverImageSavePath);
      }

      // Update user dengan path gambar
      const updatedUser = await UserService.updateUser(user.id, {
        profileImage: profileImagePath,
        coverImage: coverImagePath,
      });

      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async getUserById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (user) {
        res.json(user);
      } else {
        res.status(404).send('User not found');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async updateUser(req, res) {
    try {
      const { name, email, password, phone } = req.body;

      // Fetch the existing user to handle old images
      const existingUser = await UserService.getUserById(req.params.id);
      if (!existingUser) {
        return res.status(404).send('User not found');
      }

      // Handle file uploads
      let profileImagePath = existingUser.profileImage;
      let coverImagePath = existingUser.coverImage;

      if (req.files?.profileImage) {
        const profileImage = req.files.profileImage;
        profileImagePath = formatImageName(name, 'profileImage', req.params.id);
        const profileImageSavePath = path.join(__dirname, '../', profileImagePath);
        await profileImage.mv(profileImageSavePath);

        // Remove old profile image
        if (existingUser.profileImage && existingUser.profileImage !== profileImagePath) {
          const oldProfileImagePath = path.join(__dirname, '../', existingUser.profileImage.replace('/uploads/', ''));
          if (fs.existsSync(oldProfileImagePath)) {
            fs.unlinkSync(oldProfileImagePath);
          }
        }
      }

      if (req.files?.coverImage) {
        const coverImage = req.files.coverImage;
        coverImagePath = formatImageName(name, 'coverImage', req.params.id);
        const coverImageSavePath = path.join(__dirname, '../', coverImagePath);
        await coverImage.mv(coverImageSavePath);

        // Remove old cover image
        if (existingUser.coverImage && existingUser.coverImage !== coverImagePath) {
          const oldCoverImagePath = path.join(__dirname, '../', existingUser.coverImage.replace('/uploads/', ''));
          if (fs.existsSync(oldCoverImagePath)) {
            fs.unlinkSync(oldCoverImagePath);
          }
        }
      }

      // Update the user data
      const updatedUser = await UserService.updateUser(req.params.id, {
        name,
        email,
        password,
        phone,
        profileImage: profileImagePath,
        coverImage: coverImagePath,
      });

      res.json(updatedUser);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        return res.status(404).send('User not found');
      }

      // Remove associated images
      if (user.profileImage) {
        const profileImagePath = path.join(__dirname, '../', user.profileImage.replace('/uploads/', ''));
        if (fs.existsSync(profileImagePath)) {
          fs.unlinkSync(profileImagePath);
        }
      }

      if (user.coverImage) {
        const coverImagePath = path.join(__dirname, '../', user.coverImage.replace('/uploads/', ''));
        if (fs.existsSync(coverImagePath)) {
          fs.unlinkSync(coverImagePath);
        }
      }

      // Delete the user
      const isDeleted = await UserService.deleteUser(req.params.id);
      if (isDeleted) {
        res.status(204).send('User deleted successfully');
      } else {
        res.status(500).send('Failed to delete user');
      }
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
};