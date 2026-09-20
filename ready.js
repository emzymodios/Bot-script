const { REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');

/**
 * Ready Event
 * Triggered when bot successfully logs in
 */

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`\n${'='.repeat(50)}`);
        console.log(`✅ Bot is ready! Logged in as ${client.user.tag}`);
        console.log(`${'='.repeat(50)}\n`);

        // ======== REGISTER SLASH COMMANDS ========
        try {
            console.log('📝 Registering slash commands...');

            const commands = [];
            const commandsPath = path.join(__dirname, '..', 'commands');
            const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

            for (const file of commandFiles) {
                const filePath = path.join(commandsPath, file);
                const command = require(filePath);
                if (command.data) {
                    commands.push(command.data.toJSON());
                }
            }

            const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

            // Register commands globally
            await rest.put(
                Routes.applicationCommands(client.user.id),
                { body: commands }
            );

            console.log(`✅ Successfully registered ${commands.length} slash command(s) globally`);
        } catch (error) {
            console.error('❌ Error registering commands:', error);
        }

        // ======== SET BOT STATUS ========
        client.user.setPresence({
            activities: [{
                name: '/menu - Script Hub',
                type: 1 // PLAYING
            }],
            status: 'online'
        });

        console.log('🎮 Bot status updated!');
        console.log(`📊 Serving ${client.guilds.cache.size} server(s)`);
        console.log(`👥 Total users: ${client.users.cache.size}\n`);
    }
};
