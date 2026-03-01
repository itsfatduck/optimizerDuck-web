<script setup>
import { useGitHub } from "../../composables/useGitHub";
import { onMounted } from "vue";

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

const { latestRelease, fetchReleases } = useGitHub(props.repo);

onMounted(() => {
    fetchReleases();
});
</script>

<template>
    <a v-if="latestRelease" :href="'./changelog#' + latestRelease.tag_name" class="changelog-link">
        {{ text }} →
    </a>
    <a v-else href="./changelog" class="changelog-link">
        {{ text }} →
    </a>
</template>

<style scoped>
.changelog-link {
    font-weight: 600;
    color: var(--vp-c-brand-1);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 4px;
    transition: all 0.2s ease;
}

.changelog-link:hover {
    text-decoration-color: var(--vp-c-brand-1);
    opacity: 0.8;
}
</style>
