const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const watchDir = path.join(__dirname, 'src');
console.log(`🚀 Iniciando watch em: ${watchDir}`);
console.log('--- As mudanças serão sincronizadas com o GitHub automaticamente ao salvar ---');

let timeout;

fs.watch(watchDir, { recursive: true }, (event, filename) => {
    if (filename) {
        // Debounce para evitar múltiplos pushes seguidos
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            console.log(`\n📝 Mudança detectada em: ${filename}`);
            syncWithGit(filename);
        }, 1000);
    }
});

function syncWithGit(msg) {
    const commands = [
        ['add', '.'],
        ['commit', '-m', `Auto-update: ${msg}`],
        ['push', 'origin', 'main']
    ];

    const runCommand = (index) => {
        if (index >= commands.length) {
            console.log('✅ Sincronização concluída!');
            return;
        }

        const [cmd, ...args] = commands[index];
        const git = spawn('git', [cmd, ...args]);

        git.stdout.on('data', (data) => {
            // Silencioso por padrão, mas pode logar se necessário
        });

        git.stderr.on('data', (data) => {
            const output = data.toString();
            if (output.includes('error') || output.includes('fatal')) {
                console.error(`❌ Erro no git ${cmd}:`, output);
            }
        });

        git.on('close', (code) => {
            if (code === 0 || (cmd === 'commit' && code === 1)) {
                // code 1 no commit geralmente significa "nada para commitar"
                runCommand(index + 1);
            }
        });
    };

    runCommand(0);
}
