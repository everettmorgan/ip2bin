function octet(num) {
        const padding = new Array(7).fill('0').join('');
        const result = padding + (parseInt(num) >> 0).toString(2);
        return result.slice(result.length - 8, result.length);
}

function IPv4(input) {
        this.input = input;
        this.binaryAddress = null;
        this.binarySubnetMask = null;
        this.dottedAddress = null;
        this.dottedCidr = null;

        const [ip, cidr] = input.split('/');

        const dottedCidr = [];
        const binaryCidr = [];

        if (cidr) {
                const bits = [128, 64, 32, 16, 8, 4, 2, 1];
                const parsed = parseInt(cidr, 10);
                const getOctet = (num) => bits
                        .slice(0, parsed - num)
                        // eslint-disable-next-line no-param-reassign
                        .reduce((acc, item) => acc += item, 0);

                dottedCidr.push(getOctet(0));
                dottedCidr.push(parsed - 8 > 0 ? getOctet(8) : 0);
                dottedCidr.push(parsed - 16 > 0 ? getOctet(16) : 0);
                dottedCidr.push(parsed - 24 > 0 ? getOctet(24) : 0);

                binaryCidr.push(octet(dottedCidr[0]));
                binaryCidr.push(octet(dottedCidr[1]));
                binaryCidr.push(octet(dottedCidr[2]));
                binaryCidr.push(octet(dottedCidr[3]));
        }

        const [a, b, c, d] = ip.split('.');

        const binaryIP = [octet(a), octet(b), octet(c), octet(d)];

        this.dottedAddress = ip;
        this.dottedCidr = dottedCidr.join('.');
        this.binaryAddress = binaryIP.join('.');
        this.binarySubnetMask = binaryCidr.join('.');

        this.getBinaryRepresentation = function (showBoundaryLine) {
                let subnetMask = this.binarySubnetMask;
                let address = this.binaryAddress;
                if (showBoundaryLine) {
                        const parsedCidr = parseInt(cidr, 10);
                        let bump = 0;
                        if (parsedCidr > 8) bump += 1;
                        if (parsedCidr > 16) bump += 1;
                        if (parsedCidr > 24) bump += 1;

                        const a = subnetMask.slice(0, parsedCidr + bump);
                        const b = subnetMask.slice(parsedCidr + bump, subnetMask.length);
                        subnetMask = `${a}|${b}`;

                        const c = address.slice(0, parsedCidr + bump);
                        const d = address.slice(parsedCidr + bump, address.length);
                        address = `${c}|${d}`;
                }
                return address + (subnetMask ? `/${subnetMask}` : '');
        };

        this.getDottedRepresentation = function () {
                return this.dottedAddress + (this.dottedCidr ? `/${this.dottedCidr}` : '');
        };
}

module.exports = IPv4;
