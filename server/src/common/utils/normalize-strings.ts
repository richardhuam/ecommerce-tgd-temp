const toTitleCase = (phrase: string) => {
	return phrase
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
};

const capitalizeFirstLetter = (str: string) => {
	const strLowerCased = str.toLowerCase();
	return strLowerCased.charAt(0).toUpperCase() + strLowerCased.slice(1);
};

export { capitalizeFirstLetter, toTitleCase };
