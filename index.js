function intToXBit(num, bits) {
        const padding = new Array(bits - 1).fill('0').join('');
        const result = padding + (parseInt(num) >> 0).toString(2);
        return result.slice(result.length - 8, result.length);
}

const intTo8Bit = (num) => intToXBit(num, 8);

module.exports = function IPv4(input, showBoundaryLine) {
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

        let binaryCidr = [];

        if (dottedCidr.length) {
                binaryCidr = dottedCidr.map((octet) => intTo8Bit(octet));
        }

        const [a, b, c, d] = ip.split('.');

        const binaryIP = [
                intTo8Bit(a),
                intTo8Bit(b),
                intTo8Bit(c),
                intTo8Bit(d),
        ];

        this.binaryAddress = binaryIP.join('.');
        this.binarySubnetMask = binaryCidr.join('.');
        this.dottedAddress = ip;
        this.dottedCidr = dottedCidr.join('.');

        this.getBinaryRepresentation = function () {
                let subnetMask = this.binarySubnetMask;
                let { binaryAddress } = this;
                if (showBoundaryLine) {
                        const parsedCidr = parseInt(cidr, 10);
                        let bump = 0;
                        if (parsedCidr > 8) bump += 1;
                        if (parsedCidr > 16) bump += 1;
                        if (parsedCidr > 24) bump += 1;
                        subnetMask = `${subnetMask.slice(0, parsedCidr + bump)}|${subnetMask.slice(parsedCidr + bump, subnetMask.length)}`;
                        binaryAddress = `${binaryAddress.slice(0, parsedCidr + bump)}|${binaryAddress.slice(parsedCidr + bump, binaryAddress.length)}`;
                }
                return binaryAddress + (subnetMask ? `/${subnetMask}` : '');
        };

        this.getDottedRepresentation = function () {
                return this.dottedAddress + (this.dottedCidr ? `/${this.dottedCidr}` : '');
        };
}

function test() {
        const ip = new IPv4('60.0.0.0/28', true);

        console.log(...ip.getBinaryRepresentation().split('/').map((item) => `\`${item}\``));
}
