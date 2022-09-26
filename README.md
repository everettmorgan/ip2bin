# ip2bin

```javascript
const ip = new IPv4('135.15.10.138/16');

console.log(ip);
// IPv4 {
//   input: '135.15.10.138/16',
//   binaryAddress: '10000111.00001111.00001010.10001010',
//   binarySubnetMask: '11111111.11111111.00000000.00000000',
//   dottedAddress: '135.15.10.138',
//   dottedCidr: '255.255.0.0'
// } 

console.log(ip.getBinaryRepresentation());
// 10000111.00001111.00001010.10001010/11111111.11111111.00000000.00000000 

console.log(ip.getDottedRepresentation());
// 135.15.10.138/255.255.0.0
```
