const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

/**
 * ========================================
 * DISCORD BOT - MAIN FILE
 * ========================================
 * Script Hub Bot
 * Premium Menu System
 */

// ======== BOT CONFIGURATION ========
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMembers
    ]
});

// ======== VALIDATE ENV VARIABLES ========
if (!process.env.DISCORD_TOKEN) {
    console.error('❌ DISCORD_TOKEN not found in .env file');
    process.exit(1);
}

// ======== COMMAND COLLECTION ========
client.commands = new Collection();

// ======== LOAD COMMANDS ========
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

console.log(`📁 Loading ${commandFiles.length} commands...`);

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);

    if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
        console.log(`✅ Command loaded: /${command.data.name}`);
    } else {
        console.warn(`⚠️  Command ${file} is missing data or execute`);
    }
}

// ======== LOAD EVENTS ========
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

console.log(`📁 Loading ${eventFiles.length} events...`);

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);

    if (event.name && event.execute) {
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
        console.log(`✅ Event loaded: ${event.name}`);
    } else {
        console.warn(`⚠️  Event ${file} is missing name or execute`);
    }
}

// ======== ERROR HANDLING ========
process.on('unhandledRejection', error => {
    console.error('❌ Unhandled Promise Rejection:', error);
});

process.on('uncaughtException', error => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});

// ======== LOGIN BOT ========
console.log('\n🚀 Starting bot...');
client.login(process.env.DISCORD_TOKEN);

// ======== EXPORT CLIENT ========
module.exports = client;
