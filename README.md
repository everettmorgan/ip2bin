# ip2bin

```javascript
const IPv4 = require('./index');

const ip = new IPv4('10.0.0.1/21');

console.log(ip);
// IPv4 {
//         input: '10.0.0.1/21',
//         binaryAddress: '00001010.00000000.00000000.00000001',
//         binarySubnetMask: '11111111.11111111.11111000.00000000',
//         dottedAddress: '10.0.0.1',
//         dottedCidr: '255.255.248.0',
//         getBinaryRepresentation: [Function (anonymous)],
//         getDottedRepresentation: [Function (anonymous)]
// }


console.log(ip.getBinaryRepresentation(true));
// 00001010.00000000.00000|000.00000001/11111111.11111111.11111|000.00000000

console.log(ip.getDottedRepresentation());
// 10.0.0.1/255.255.248.0
```
