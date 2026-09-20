const { EmbedBuilder } = require('discord.js');

/**
 * Interaction Create Event
 * Handles slash commands and select menu interactions
 */

module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        // ======== SLASH COMMAND HANDLER ========
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);

            if (!command) {
                console.warn(`⚠️  Command /${interaction.commandName} not found`);
                return interaction.reply({
                    content: '❌ Command not found!',
                    ephemeral: true
                });
            }

            try {
                await command.execute(interaction);
                console.log(`✅ Command executed: /${interaction.commandName} by ${interaction.user.tag}`);
            } catch (error) {
                console.error(`❌ Error executing command /${interaction.commandName}:`, error);

                const errorEmbed = new EmbedBuilder()
                    .setColor('#F04747')
                    .setTitle('❌ Error')
                    .setDescription('An error occurred while executing the command.')
                    .setFooter({ text: 'Script Hub Bot' });

                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp({ embeds: [errorEmbed], ephemeral: true });
                } else {
                    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
                }
            }
        }

        // ======== SELECT MENU HANDLER ========
        if (interaction.isStringSelectMenu()) {
            // Handle shop_menu selection
            if (interaction.customId === 'shop_menu') {
                const selectedValue = interaction.values[0];

                console.log(`✅ Menu selected: ${selectedValue} by ${interaction.user.tag}`);

                // Create response embed
                const embed = new EmbedBuilder()
                    .setColor('#4ECDC4')
                    .setTitle(`✅ Script Selected: ${selectedValue.toUpperCase()}`)
                    .setDescription(`
╔════════════════════════════════════════╗
║  
║  📥 Script: **${selectedValue}**
║  👤 Requested by: ${interaction.user.username}
║  ⏰ Time: <t:${Math.floor(Date.now() / 1000)}:f>
║
║  🔗 Script details:
║  • Status: ✅ Active
║  • Updated: Today
║  • Rating: ⭐⭐⭐⭐⭐
║
║  💡 **Giáo dục sử dụng:**
║  Script này chỉ dùng cho mục đích học tập
║  Tuân thủ ToS của game
║
╚════════════════════════════════════════╝
                    `)
                    .setThumbnail('https://cdn-icons-png.flaticon.com/512/3143/3143615.png')
                    .addFields(
                        {
                            name: '📝 Script Info',
                            value: `**Name:** ${selectedValue}\n**Category:** Game Script\n**Version:** Latest`,
                            inline: true
                        },
                        {
                            name: '⚙️ Requirements',
                            value: `**Executor:** Universal\n**OS:** Windows/Mac\n**Size:** < 50KB`,
                            inline: true
                        }
                    )
                    .setFooter({
                        text: '💎 Script Hub Premium | Thank you for choosing us!',
                        iconURL: 'https://cdn-icons-png.flaticon.com/512/1995/1995503.png'
                    })
                    .setTimestamp();

                await interaction.reply({
                    embeds: [embed],
                    ephemeral: false
                });
            }
        }
    }
};
