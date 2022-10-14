const IPv4 = require('./index');

const ip = new IPv4('10.0.0.1/21');

console.log(ip);

console.log(ip.getBinaryRepresentation(true));

console.log(ip.getDottedRepresentation());
