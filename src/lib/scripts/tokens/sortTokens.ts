const sortTokens = (addr1: string, addr2: string): [string, string] => {
	return addr1.toLowerCase() < addr2.toLowerCase() ? [addr1, addr2] : [addr2, addr1];
};

export default sortTokens;
