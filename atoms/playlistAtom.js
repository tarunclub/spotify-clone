const { atom } = require('recoil');

export const playlistState = atom({
  key: 'playlistAtomState',
  default: null,
});

export const playlistIdState = atom({
  key: 'playlistIdState',
  default: '6ksRilRHTBmEmlIMwf7Dbx',
});
