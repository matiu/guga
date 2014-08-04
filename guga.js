#!/usr/bin/env node

var bip38 = require('bip38');
var bitcore = require('bitcore');
var Address = bitcore.Address;
var networks = bitcore.networks;
var WalletKey = bitcore.WalletKey;
var Bip38 = new bip38();


var addr = process.argv[2];
var epk = process.argv[3];
var a = new Address(addr);
if (!addr || !a.isValid() || !epk) {
  console.log("Usage: guga.js address privateKey(WIF)");
  process.exit(1);
}
var fs = require('fs');
var FILE = 'words';
try {
  var passArr = fs.readFileSync(FILE).toString().split("\n");
} catch (e) {
  console.log('Could not open ' + FILE + ' file:', e); //TODO
  process.exit(1);
}

for (i in passArr) {
  var pass = passArr[i];
  console.log('Testing:', i, pass); //TODO

  try {
    var pk = Bip38.decrypt(epk, pass);
    var wk = new WalletKey({network:networks.livenet});
    wk.fromObj({priv:pk});
    var o = wk.storeObj();
    if (o.addr === addr) {
      console.log('##############   FOUND Address:' + addr + ' with password:' + pass);
      process.exit(1);
    }
  } catch (e) {
console.log('[guga.js.40]',e); //TODO
    console.log('.');
  }
}

console.log('Finished with file:' + FILE); //TODO
