const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
    PermissionFlagsBits
} = require('discord.js');

/**
 * ========================================
 * DISCORD BOT - MENU SCRIPT CONFIGURATION
 * ========================================
 * Script Hub Menu Command
 * Hiển thị bảng chọn các Script Hub
 */

// ======== CONFIGURATION ========
const CONFIG = {
    // Admin Role IDs - Những người có quyền thực thi command này
    ADMIN_ROLES: [
        '1420260959913775155',
        '1420753551587807353',
        '1420262154271199283'
    ],
    // Embed Colors - Màu sắc cho embed
    COLORS: {
        PRIMARY: '#FF6B6B',      // Red/Pink (Main)
        SECONDARY: '#4ECDC4',    // Teal
        ACCENT: '#FFE66D',       // Yellow
        DARK: '#1A1A2E'          // Dark background
    },
    // Menu Configuration
    MENU: {
        CUSTOM_ID: 'shop_menu',
        PLACEHOLDER: '🔍 Chọn Script Hub...',
        TITLE: '🔥 SCRIPT HUB STORE',
        SUBTITLE: '⚡ Kho Script Game Roblox Uy Tín'
    }
};

// ======== SCRIPT HUB DATA ========
const SCRIPT_HUBS = [
    // ⭐ POPULAR & TRENDING
    { label: '⚡ Hop Night Hub', description: 'Script Hop Boss - Siêu phổ biến', value: 'hop night hub', emoji: '⚡' },
    { label: '🎬 Main Night Hub', description: 'Main Script Night - Đầy đủ chức năng', value: 'main night hub', emoji: '🎬' },
    { label: '💀 Terror Hub', description: 'Terror Hub - Script Kinh khủng', value: 'Terror hub', emoji: '💀' },
    { label: '✨ Omg Hub', description: 'Omg Hub - Tính năng rộng lớn', value: 'omg hub', emoji: '✨' },
    
    // 🎮 GAME SPECIFIC
    { label: '🧸 Teddy Hub', description: 'Teddy Script Hub - Đơn giản dễ dùng', value: 'teddy hub', emoji: '🧸' },
    { label: '🔴 Redz Fake', description: 'Redz Fake Script - Chất lượng cao', value: 'redz fake', emoji: '🔴' },
    { label: '🥥 Koko Hub', description: 'Koko Hub - Script Đặc biệt', value: 'koko hub', emoji: '🥥' },
    { label: '🧒 Realkid Hub', description: 'Realkid Hub - User-friendly', value: 'realkid hub', emoji: '🧒' },
    
    // 🛠️ UTILITIES & TOOLS
    { label: '🛠️ Fix Lag', description: 'Công cụ Fix Lag - Tối ưu FPS', value: 'fix lag', emoji: '🛠️' },
    { label: '⚡ Fly Gui V3', description: 'Fly Script V3 - Bay tự do', value: 'fly gui v3', emoji: '⚡' },
    { label: '🔧 Forge Hub', description: 'Forge Hub - Công cụ mạnh mẽ', value: 'Forge Hub', emoji: '🔧' },
    { label: '🔥 Main Hoho Hub', description: 'Main Hoho - Tính năng đa dạng', value: 'main hoho hub', emoji: '🔥' },
    
    // 🌟 SPECIAL & UNIQUE
    { label: '😈 Trẩu V9', description: 'Trẩu V9 - Version mới nhất', value: 'trẩu v9', emoji: '😈' },
    { label: '🧠 Steal A Brainrot', description: 'Steal A Brainrot - Độc lạ', value: 'steal a Brainrot', emoji: '🧠' },
    { label: '🌱 Grow A Garden 2', description: 'Grow A Garden 2 - Farming Script', value: 'Grow a Garden 2', emoji: '🌱' },
    { label: '▶️ Banana Fake', description: 'Banana Fake - Script Nhân bản', value: 'banana fake', emoji: '▶️' },
    { label: '🌌 Quantum Hub', description: 'Quantum Hub - Công nghệ tương lai', value: 'Quantum Hub', emoji: '🌌' }
];

// ======== UTILITY FUNCTIONS ========

/**
 * Kiểm tra xem user có phải là Admin không
 * @param {GuildMember} member - Discord Guild Member
 * @returns {boolean} true nếu là Admin hoặc có role Admin, false nếu không
 */
function isAdmin(member) {
    // Kiểm tra xem member có permission Administrator
    if (member.permissions.has(PermissionFlagsBits.Administrator)) {
        return true;
    }

    // Kiểm tra xem member có role trong danh sách Admin Roles
    return member.roles.cache.some(role => CONFIG.ADMIN_ROLES.includes(role.id));
}

/**
 * Tạo Embed lỗi khi không có quyền
 * @returns {EmbedBuilder} Error embed
 */
function createErrorEmbed() {
    return new EmbedBuilder()
        .setColor(CONFIG.COLORS.PRIMARY)
        .setTitle('❌ KHÔNG CÓ QUYỀN TRUY CẬP')
        .setDescription(`
╔════════════════════════════════════════╗
║  🚫 Bạn không có quyền sử dụng Menu này!
║
║  📋 Yêu cầu:
║  ├─ Admin Server hoặc
║  ├─ Các Role được phép
║  └─ Liên hệ Admin để cấp quyền
╚════════════════════════════════════════╝
        `)
        .setFooter({
            text: '💎 Script Hub Premium'
        });
}

/**
 * Tạo Embed cho Menu - Phiên bản đẹp
 * @returns {EmbedBuilder} Discord Embed Object
 */
function createMenuEmbed() {
    const embed = new EmbedBuilder()
        .setColor(CONFIG.COLORS.PRIMARY)
        .setTitle(CONFIG.MENU.TITLE)
        .setDescription(`
╔════════════════════════════════════════╗
║  ${CONFIG.MENU.SUBTITLE}
║
║  📋 Chọn Script Hub bên dưới
║  ✅ Tất cả script đều hoạt động tốt
║  🔒 An toàn - Được kiểm duyệt
╚════════════════════════════════════════╝
        `)
        .setThumbnail('https://cdn-icons-png.flaticon.com/512/3143/3143615.png')
        .addFields(
            {
                name: '📦 DANH MỤC SCRIPT',
                value: `
🎮 **Game Specific Scripts:**
├─ Hop Night Hub, Main Night Hub, Teddy Hub
├─ Omg Hub, Terror Hub, Quantum Hub
└─ Koko Hub, Realkid Hub

🛠️ **Utility & Tools:**
├─ Fix Lag, Fly Gui V3
├─ Forge Hub, Main Hoho Hub
└─ Redz Fake, Banana Fake

🌟 **Special Scripts:**
├─ Steal A Brainrot
├─ Grow A Garden 2
└─ Trẩu V9
                `,
                inline: false
            },
            {
                name: '⭐ ĐỘC ĐÃO VÀ NỔITIẾNG',
                value: '✨ Đây là những script được tin dùng nhất trên cộng đồng!',
                inline: false
            }
        )
        .setFooter({
            text: '💎 Script Hub Premium | Cập nhật hàng ngày',
            iconURL: 'https://cdn-icons-png.flaticon.com/512/1995/1995503.png'
        })
        .setTimestamp();

    return embed;
}

/**
 * Tạo Select Menu với các Script Hub
 * @returns {ActionRowBuilder} Discord ActionRow với Select Menu
 */
function createSelectMenu() {
    const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(CONFIG.MENU.CUSTOM_ID)
        .setPlaceholder(CONFIG.MENU.PLACEHOLDER)
        .addOptions(SCRIPT_HUBS)
        .setMinValues(1)
        .setMaxValues(1)
        .setDefaultValues([]);

    return new ActionRowBuilder().addComponents(selectMenu);
}

// ======== SLASH COMMAND EXPORT ========

module.exports = {
    // Command Data
    data: new SlashCommandBuilder()
        .setName('menu')
        .setDescription('Hiển thị bảng chọn Script Hub')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    /**
     * Execute Command
     * @param {ChatInputCommandInteraction} interaction - Discord Interaction
     */
    async execute(interaction) {
        // Kiểm tra quyền Admin
        if (!isAdmin(interaction.member)) {
            return interaction.reply({
                embeds: [createErrorEmbed()],
                ephemeral: true
            });
        }

        try {
            // Tạo Embed và Select Menu
            const embed = createMenuEmbed();
            const row = createSelectMenu();

            // Gửi reply
            await interaction.reply({
                embeds: [embed],
                components: [row],
                ephemeral: false  // Hiển thị công khai
            });

        } catch (error) {
            console.error('❌ Error in menu command:', error);

            const errorEmbed = new EmbedBuilder()
                .setColor(CONFIG.COLORS.PRIMARY)
                .setTitle('⚠️ LỖI SYSTEM')
                .setDescription('Có lỗi khi tải Menu. Vui lòng thử lại sau!')
                .setFooter({ text: 'Script Hub Premium' });

            return interaction.reply({
                embeds: [errorEmbed],
                ephemeral: true
            });
        }
    }
};
