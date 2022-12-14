const { dirname } = require('path');
const { symlinkSync, existsSync, unlinkSync } = require('fs');

const iconPacks = [
    'regular',
    'solid',
    'light',
    'brands',
    'duotone',
    'thin',
    'sharp-solid',
];

const __self = __dirname;
iconPacks.forEach(packName => {
    const __symlink = __self + '/' + packName.split('-').join('/');
    try {
        const found = dirname(require.resolve('@cseitz/icons-' + packName));
        console.log(packName, { found });
        if (found) {
            console.log('creating symlink', [found, __symlink]);
        }
    } catch(err) {
        console.log('oof', packName);
        if (existsSync(__symlink)) {
            console.log('removing symlink', __symlink);
            unlinkSync(__symlink);
        }
    }
})

