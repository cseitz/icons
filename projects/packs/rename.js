const { execSync } = require('child_process');
const { writeFileSync, existsSync } = require('fs');
const { readdir, readFile, rename, writeFile, access } = require('fs/promises');
const { freemem, totalmem, EOL } = require('os');
const { basename, extname } = require('path');
const { memoryUsage } = require('process');
const { inspect } = require('util');
const { kebabCase } = require('lodash');

const __package = __dirname + '/package';
const __pkg = __package + '/package.json';
const fa = require(__pkg);
const { name } = require(__dirname + '/package.json');

const MATCH_SOURCE = /(var source = require\(\'.\/)(.+)('\))/;

if (!fa.name.startsWith('@cseitz')) {

    // execSync('npm install cli-progress lodash');

    const names = [
        ...fa.name.split('/').pop().split('-').filter(o => o != 'pro' && o != 'svg' && o != 'icons' && o != 'free'),
    ].filter(o => o);

    const newName = name + names.join('-');

    console.log(newName, { name, names });

    writeFileSync(__pkg, JSON.stringify({
        ...fa,
        scripts: [],
        keywords: [],
        // homepage: 'https://github.com/cseitz/icons',
        repository: {
            type: 'git',
            url: 'https://github.com/cseitz/icons'
        },
        // bugs: {
        //     url: 'https://github.com/cseitz/icons/issues'
        // },
        license: 'UNLICENSED',
        version: '1.0.2',
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
        const named = new Set();
        const mapped = new Map();
        const remaps = new Array();
        const move = async function(key) {
            const name = basename(key, extname(key));
            const __file = __files + '/' + name;
            const resolved = __files + '/' + key; //require.resolve();
            try {
                const data = require(resolved);
                if ('iconName' in data) {
                    let __name = data.iconName;
                    if (named.has(__name)) {
                        console.log('avoid mapping', name, 'to', __name, {
                            instead: kebabCase(name),
                        });
                        __name = kebabCase(name);
                    }
                    // console.log(key, '=>', data.iconName + '.js')
                    await rename(__files + '/' + key, __files + '/' + __name + '.js');
                    await rename(__files + '/' + name + '.d.ts', __files + '/' + __name + '.d.ts');
                    mapped.set(name, data.iconName);
                    named.set(__name);
                }
                delete require.cache[resolved];
            } catch (err) {
                console.log('error:', key, mapped.get(key));
                console.error(err);
            }
            bar.increment(1);
        }
        for (const key of files) {
            const name = basename(key, extname(key));
            const data = await readFile(__files + '/' + key, 'utf8');
            if (MATCH_SOURCE.test(data)) {
                remaps.push([key, MATCH_SOURCE.exec(data)[2]]);
            } else {
                await move(key);
            }
        }
        for (const [key, from] of remaps) {
            const to = mapped.get(from);
            console.log('remap', { key, from, to });
            if (to) {
                const data = await readFile(__files + '/' + key, 'utf8');
                await writeFile(__files + '/' + key, data.replace(MATCH_SOURCE, `$1${to}$3`));
                await move(key);
            }
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