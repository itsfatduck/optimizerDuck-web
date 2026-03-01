<script setup>
import { ref, onMounted } from "vue";
import { useGitHub } from "../../composables/useGitHub";

const props = defineProps({
  repo: {
    type: String,
    required: true,
  },
});

const {
  latestRelease: release,
  loading,
  error,
  fetchReleases,
} = useGitHub("itsfatduck/optimizerDuck");

const md = ref(null);

onMounted(async () => {
  fetchReleases();

  try {
    if (!window.markdownit) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/markdown-it@14.1.0/dist/markdown-it.min.js";
      document.head.appendChild(script);
      await new Promise((resolve) => (script.onload = resolve));
    }
    md.value = window.markdownit({
      html: true,
      linkify: true,
      typographer: true,
    });
  } catch (err) {
    console.error("Failed to load markdown parser", err);
  }
});

const renderMD = (content) => {
  return md.value ? md.value.render(content || "") : content || "";
};

const formatSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};
</script>

<template>
  <div class="github-release" v-if="!loading && !error && release">
    <div class="release-info">
      <h3>Latest Version: {{ release.tag_name }}</h3>
      <p class="release-date">
        Published on:
        {{ new Date(release.published_at).toLocaleDateString() }}
      </p>

      <div v-for="asset in release.assets" :key="asset.id" class="download-card">
        <a :href="asset.browser_download_url" class="download-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download {{ asset.name }}
          <span class="file-size">({{ formatSize(asset.size) }})</span>
        </a>
      </div>
    </div>

    <div v-if="release.body" class="release-body">
      <h4>Release Notes</h4>
      <div class="release-body-content vp-doc" v-html="renderMD(release.body)" />
    </div>
  </div>
  <div v-else-if="loading" class="loading">Fetching latest release...</div>
  <div v-else class="error">Error: {{ error }}</div>
</template>

<style scoped>
.github-release {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

h3 {
  margin-top: 0;
  color: var(--vp-c-brand-1);
}

.release-date {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.download-card {
  margin-top: 1rem;
}

.download-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  background-color: var(--vp-c-brand-3);
  color: var(--vp-c-black);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.25s ease;
}

.dark .download-button {
  background-color: var(--vp-c-brand-1);
}

.download-button:hover {
  background-color: var(--vp-c-brand-2);
  color: var(--vp-c-black);
}

.file-size {
  font-weight: 400;
  font-size: 0.9em;
  opacity: 0.9;
}

.release-body {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}

.release-body h4 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 1rem 0;
}

.release-body-content :deep(img) {
  max-width: 100%;
  border-radius: 8px;
  margin: 1rem 0;
}

.release-body-content :deep(h1),
.release-body-content :deep(h2),
.release-body-content :deep(h3) {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  border: none;
}

.release-body-content :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
}

.loading,
.error {
  padding: 1rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.error {
  color: var(--vp-c-danger-1);
}
</style>
