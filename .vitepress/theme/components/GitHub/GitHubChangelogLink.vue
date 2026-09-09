<script setup>
import { useGitHub } from "../../composables/useGitHub";
import { onMounted } from "vue";
import Icon from "../Icon.vue";

const props = defineProps({
    repo: {
        type: String,
        default: "itsfatduck/optimizerDuck",
    },
    text: {
        type: String,
        default: "View Full Changelog",
    },
});

const { latestRelease, fetchLatestRelease } = useGitHub(props.repo);

onMounted(() => {
    fetchLatestRelease();
});
</script>

<template>
    <a v-if="latestRelease" :href="'./changelog#' + latestRelease.tag_name" class="changelog-link">
        <span>{{ text }}</span>
        <Icon name="arrow-up-right" :size="14" class="changelog-link__icon" />
    </a>
    <a v-else href="./changelog" class="changelog-link">
        <span>{{ text }}</span>
        <Icon name="arrow-up-right" :size="14" class="changelog-link__icon" />
    </a>
</template>

<style scoped>
.changelog-link {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    font-weight: 600;
    color: var(--vp-c-brand-1);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
    transition: text-decoration-color 0.2s ease, opacity 0.2s ease;
}

.changelog-link:hover {
    text-decoration-color: var(--vp-c-brand-1);
    opacity: 0.85;
}

.changelog-link__icon {
    transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.changelog-link:hover .changelog-link__icon {
  transform: translate(2px, -2px);
}
</style>
