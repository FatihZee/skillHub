'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Banks', [
      { nama: 'Bank Central Asia (BCA)', kode: '014', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Mandiri', kode: '008', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Negara Indonesia (BNI)', kode: '009', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Rakyat Indonesia (BRI)', kode: '002', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Syariah Indonesia (BSI)', kode: '451', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Tabungan Negara (BTN)', kode: '200', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank CIMB Niaga', kode: '022', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Danamon', kode: '011', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Permata', kode: '013', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank OCBC NISP', kode: '028', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Maybank Indonesia', kode: '016', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Mega', kode: '426', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Bukopin', kode: '441', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank BTPN', kode: '213', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Panin', kode: '019', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank UOB Indonesia', kode: '023', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Artha Graha Internasional', kode: '037', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank J Trust Indonesia', kode: '095', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Sinarmas', kode: '153', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Commonwealth', kode: '950', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank DBS Indonesia', kode: '046', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank HSBC Indonesia', kode: '087', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Woori Saudara Indonesia', kode: '212', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank BJB', kode: '110', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank DKI', kode: '111', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Jateng', kode: '113', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Jatim', kode: '114', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Nagari', kode: '118', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Riau Kepri', kode: '119', createdAt: new Date(), updatedAt: new Date() },
      { nama: 'Bank Sumsel Babel', kode: '120', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Banks', null, {});
  }
};
