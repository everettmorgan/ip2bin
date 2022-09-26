function intToXBit(num, bits) {
        const padding = new Array(bits - 1).fill('0').join('');
        const result = padding + (parseInt(num) >> 0).toString(2);
        return result.slice(result.length - 8, result.length);
}

const intTo8Bit = (num) => intToXBit(num, 8);

function IPv4(input) {
        this.input = input;
        this.binaryAddress = null;
        this.binarySubnetMask = null;
        this.dottedAddress = null;
        this.dottedCidr = null;

        const [ip, cidr] = input.split('/');

        let dottedCidr = [];

        if (cidr) {
                const bits = [128, 64, 32, 16, 8, 4, 2, 1];
                const parsed = parseInt(cidr, 10);
                const getOctet = (num) => bits
                        .slice(0, parsed - num)
                        // eslint-disable-next-line no-param-reassign
                        .reduce((acc, item) => acc += item, 0);

                dottedCidr = [
                        getOctet(0),
                        parsed - 8 > 0 ? getOctet(8) : 0,
                        parsed - 16 > 0 ? getOctet(16) : 0,
                        parsed - 24 > 0 ? getOctet(24) : 0,
                ];
        }

        let binaryCidr = '';

        if (dottedCidr.length) {
                binaryCidr = `${dottedCidr.map((octet) => intTo8Bit(octet)).join('.')}`;
        }

        const [a, b, c, d] = ip.split('.');

        const [e, f, g, h] = [
                intTo8Bit(a),
                intTo8Bit(b),
                intTo8Bit(c),
                intTo8Bit(d),
        ];

        this.binaryAddress = `${e}.${f}.${g}.${h}`;
        this.binarySubnetMask = binaryCidr;
        this.dottedAddress = ip;
        this.dottedCidr = dottedCidr.join('.');

        this.getBinaryRepresentation = function () {
                return this.binaryAddress + (this.binarySubnetMask ? `/${this.binarySubnetMask}` : '');
        };

        this.getDottedRepresentation = function () {
                return this.dottedAddress + (this.dottedCidr ? `/${this.dottedCidr}` : '');
        };
}

const ip = new IPv4('135.15.10.138/16');

console.log(ip, ip.getBinaryRepresentation(), ip.getDottedRepresentation());
