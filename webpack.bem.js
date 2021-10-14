//  Classname to replace with block name
const BASE_CLASS = 'base';

//  BEM-naming for CSS Modules
const nameByBEM = ({ context }, _, localName) => {
    //  Block name in kebab-case
    const blockName = context
        .split('\\') // Split path by backslashes
        .pop() // Get folder name
        .split(/([A-Z][a-z]*)/) // Split on words by the capital letters
        .filter(Boolean) // Filter out empty strings
        .join('-') // Join words by hyphens, like the truly kebab does
        .toLowerCase();

    //  Decrease naming complexity by replacing
    //  Base classname with block name
    if (localName.includes(BASE_CLASS))
        return localName.replace(BASE_CLASS, blockName);

    return `${blockName}__${localName}`;
};

module.exports = nameByBEM