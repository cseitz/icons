const { execSync } = require('child_process');
const { writeFileSync, existsSync } = require('fs');
const { readdir, readFile, rename } = require('fs/promises');
const { freemem, totalmem, EOL } = require('os');
const { basename, extname } = require('path');
const { memoryUsage } = require('process');
const { inspect } = require('util');

const __package = __dirname + '/package';
const __pkg = __package + '/package.json';
const fa = require(__pkg);
const { name } = require(__dirname + '/package.json');

if (!fa.name.startsWith('@cseitz')) {

    execSync('npm install cli-progress --no-save');

    const names = [
        ...fa.name.split('/').pop().split('-').filter(o => o != 'pro' && o != 'svg' && o != 'icons' && o != 'free'),
    ].filter(o => o);

    const newName = name + names.join('-');

    console.log(newName, { name, names });

    writeFileSync(__pkg, JSON.stringify({
        ...fa,
        version: '1.0.0',
        name: newName,
    }, null, 2));

    const cliProgress = require('cli-progress');

    ; (async () => {
        console.log('renaming files...')
        const __files = __package;
        const bar = new cliProgress.SingleBar({}, cliProgress.Presets.rect);
        const files = (await readdir(__files))
            .filter(o => o.endsWith('.js') && !o.startsWith('index') && o !== 'attribution.js');
        bar.start(files.length, 0);
        const mapped = new Map();
        for (const key of files) {
            const resolved = __files + '/' + key; //require.resolve();
            const name = basename(key, extname(key));
            try {
                const data = require(resolved);
                if ('iconName' in data) {
                    mapped.set(key, data.iconName + '.js');
                    // console.log(key, '=>', data.iconName + '.js')
                    await rename(__files + '/' + key, __files + '/' + data.iconName + '.js');
                    await rename(__files + '/' + name + '.d.ts', __files + '/' + data.iconName + '.d.ts');
                }
                delete require.cache[resolved];
            } catch (err) {
                // console.error(err);
                console.log(err.code, key, mapped.get(key));
            }
            bar.increment(1);
        }
        bar.stop();
    })();



}
// else {
//     execSync('npm install cli-progress --no-save');

//     const cliProgress = require('cli-progress');

//     ; (async () => {
//         const __files = '../../node_modules/@cseitz/fontawesome-svg-regular';
//         const bar = new cliProgress.SingleBar({
//             // format: `renaming files [{bar}] {percentage}% | ETA: {eta}s | {value}/{total}`,
//         }, cliProgress.Presets.rect);
//         const files = (await readdir(__files))
//             .filter(o => o.endsWith('.js') && !o.startsWith('index') && o !== 'attribution.js');
//         bar.start(files.length, 0);
//         for (const key of files) {
//             const resolved = require.resolve(__files + '/' + key);
//             const name = basename(key, extname(key));
//             const data = require(resolved);
//             delete require.cache[resolved];
//             bar.increment(1, {
//                 file: [key, data.iconName + '.js'],
//             });
//             if (Math.random() > 0.9) {
//                 await new Promise(r => setTimeout(r, 100));
//             }
//         }
//         bar.stop();
//     })();

// }