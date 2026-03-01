<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps({
    guildId: {
        type: String,
        default: '1091675679994675240'
    }
})

const widgetData = ref(null)
const guildInfo = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchWidget = async () => {
    try {
        // Fetch basic widget data
        const widgetResponse = await fetch(`https://discord.com/api/guilds/${props.guildId}/widget.json`)
        if (!widgetResponse.ok) throw new Error('Failed to fetch Discord widget data')
        const data = await widgetResponse.json()
        widgetData.value = data

        // Extract invite code to get more guild info (like the icon)
        if (data.instant_invite) {
            const inviteCode = data.instant_invite.split('/').pop()
            const inviteResponse = await fetch(`https://discord.com/api/v9/invites/${inviteCode}`)
            if (inviteResponse.ok) {
                guildInfo.value = await inviteResponse.json()
            }
        }
    } catch (err) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

const serverIconUrl = computed(() => {
    if (guildInfo.value?.guild?.icon) {
        return `https://cdn.discordapp.com/icons/${props.guildId}/${guildInfo.value.guild.icon}.png?size=128`
    }
    return null
})

onMounted(() => {
    fetchWidget()
})
</script>

<template>
    <div class="discord-widget-wrapper">
        <div v-if="loading" class="discord-widget loading">
            <div class="shimmer"></div>
        </div>

        <div v-else-if="error" class="discord-widget error">
            <p>Could not load Discord widget.</p>
            <a :href="'https://discord.gg/tDUBDCYw9Q'" target="_blank">Join anyway</a>
        </div>

        <div v-else class="discord-widget">
            <div class="widget-header">
                <div v-if="serverIconUrl" class="server-icon-wrapper">
                    <img :src="serverIconUrl" :alt="widgetData.name" class="server-icon" />
                </div>
                <div v-else class="discord-logo">
                    <svg viewBox="0 0 127.14 96.36" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83,97.68,97.68,0,0,0-29.11,0,72.33,72.33,0,0,0-3.36-6.83A105.73,105.73,0,0,0,19.44,8.07C7.7,25.44,4.52,42.39,6.09,59.07a107.63,107.63,0,0,0,32.31,16.29,76.5,76.5,0,0,0,7.31-11.83,67,67,0,0,1-11.64-5.59l.88-.65a75,75,0,0,0,14,7.4,115,115,0,0,0,36,0,76.52,76.52,0,0,0,14-7.42l.88.67a67.8,67.8,0,0,1-11.64,5.59,76.5,76.5,0,0,0,7.31,11.83,107.41,107.41,0,0,0,32.31-16.29C123.18,37.38,119.5,21.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5.08-12.69,11.41-12.69S54,46,54,53,48.91,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.33,60,73.33,53s5.08-12.69,11.41-12.69S96.15,46,96.15,53,91.07,65.69,84.69,65.69Z"
                            fill="currentColor" />
                    </svg>
                </div>
                <div class="server-info">
                    <h4 class="server-name">{{ widgetData.name }}</h4>
                    <span class="online-count">
                        <span class="online-indicator"></span>
                        {{ widgetData.presence_count }} Online
                    </span>
                </div>
                <a :href="widgetData.instant_invite" target="_blank" class="join-btn">Join</a>
            </div>

            <div v-if="widgetData.members && widgetData.members.length > 0" class="member-preview">
                <div v-for="member in widgetData.members.slice(0, 16)" :key="member.id" class="member-avatar-wrapper">
                    <img :src="member.avatar_url" :alt="member.username" class="member-avatar"
                        :title="member.username" />
                    <span class="status-dot" :class="member.status"></span>
                </div>
                <div v-if="widgetData.members.length > 16" class="more-members">
                    +{{ widgetData.members.length - 16 }}
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.discord-widget-wrapper {
    margin: 1.5rem 0;
    max-width: 400px;
}

.discord-widget {
    background-color: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    border-radius: 12px;
    overflow: hidden;
    position: relative;
    transition: all 0.3s ease;
    padding: 1rem;
}

.discord-widget:hover {
    border-color: #5865F2;
    box-shadow: 0 0 20px rgba(88, 101, 242, 0.15);
}

.widget-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.discord-logo {
    width: 48px;
    height: 48px;
    background-color: #5865F2;
    color: white;
    padding: 10px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.server-icon-wrapper {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    overflow: hidden;
    flex-shrink: 0;
}

.server-icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.server-info {
    flex: 1;
}

.server-name {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 700;
    color: var(--vp-c-text-1);
}

.online-count {
    font-size: 0.85rem;
    color: var(--vp-c-text-2);
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.online-indicator {
    width: 8px;
    height: 8px;
    background-color: #23a559;
    border-radius: 50%;
}

.join-btn {
    background-color: #23a559;
    color: white !important;
    font-weight: 600;
    padding: 0.4rem 1.2rem;
    border-radius: 5px;
    font-size: 0.9rem;
    text-decoration: none !important;
    transition: background-color 0.2s;
}

.join-btn:hover {
    background-color: #1a7f45;
}

.member-preview {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 0.5rem;
}

.member-avatar-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
}

.member-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--vp-c-bg-mute);
}

.status-dot {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid var(--vp-c-bg-soft);
}

.status-dot.online {
    background-color: #23a559;
}

.status-dot.idle {
    background-color: #f0b232;
}

.status-dot.dnd {
    background-color: #f23f43;
}

.more-members {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: var(--vp-c-bg-mute);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    color: var(--vp-c-text-2);
    font-weight: 600;
}

/* Loading state */
.loading {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.shimmer {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.05) 50%,
            transparent 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
    0% {
        transform: translateX(-100%);
    }

    100% {
        transform: translateX(100%);
    }
}

.error {
    text-align: center;
    color: var(--vp-c-danger-1);
}

.error a {
    color: var(--vp-c-brand-1);
    text-decoration: underline;
}
</style>
