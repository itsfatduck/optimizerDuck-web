<script setup lang="ts">
import { useData } from "vitepress";
import { useSidebar } from "vitepress/theme";

const { theme } = useData();
const { hasSidebar } = useSidebar();
const footer = theme.value.footer;
const year = new Date().getFullYear();
</script>

<template>
  <footer v-if="footer && !hasSidebar" class="VPFooter">
    <div class="footer-container">
      <div class="footer-top">
        <div
          v-for="group in footer.navigation"
          :key="group.title"
          class="footer-group"
        >
          <h4 class="footer-group-title">{{ group.title }}</h4>
          <ul class="footer-group-list">
            <li v-for="item in group.items" :key="item.text">
              <a
                :href="item.link"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-link"
              >
                {{ item.text }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="footer-license">
          <a
            v-if="footer.license"
            :href="footer.license.link"
            target="_blank"
            rel="noopener noreferrer"
            class="license-link"
          >
            <img src="/gplv3.png" alt="GPL-3.0 License" class="license-logo" />
            <span class="license-text">{{ footer.license.text }}</span>
          </a>
          <span v-if="footer.copyright" class="footer-copyright">
            {{ footer.copyright }}
          </span>
        </div>
        <div v-if="footer.social || theme.socialLinks" class="footer-social">
          <a
            v-for="social in footer.social || theme.socialLinks"
            :key="social.link"
            :href="social.link"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-social-link"
            :aria-label="
              social.name ||
              (typeof social.icon === 'string' ? social.icon : '')
            "
          >
            <div v-if="social.icon === 'discord'" class="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-discord"
                viewBox="0 0 16 16"
              >
                <path
                  d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"
                />
              </svg>
            </div>
            <div v-else-if="social.icon === 'github'" class="social-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33c.85 0 1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z"
                />
              </svg>
            </div>
            <img
              v-else
              :src="social.icon"
              :alt="social.name"
              class="social-icon-img"
            />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.VPFooter {
  border-top: 1px solid var(--vp-c-divider);
  padding: 3rem 1.5rem;
  background-color: var(--vp-c-bg-alt);
}

.footer-container {
  max-width: var(--vp-layout-max-width);
  margin: 0 auto;
}

.footer-top {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.footer-group-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--vp-c-text-1);
  margin-bottom: 1.25rem;
}

.footer-group-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer-link:hover {
  color: var(--vp-c-brand-1);
  transform: translateX(4px);
}

.footer-bottom {
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.footer-license {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.license-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  text-decoration: none;
  gap: 0.4rem;
}

.license-logo {
  max-width: 100%;
  width: 100%;
  height: auto;
  opacity: 0.8;
  transition: all 0.2s ease;
  filter: grayscale(0.2);
}

.license-link:hover .license-logo {
  opacity: 1;
  filter: grayscale(0);
  transform: translateY(-2px);
}

.license-text {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--vp-c-text-3);
  text-align: center;
  white-space: nowrap;
  transition: color 0.2s;
}

.license-link:hover .license-text {
  color: var(--vp-c-brand-1);
}

.footer-copyright {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
}

.footer-social {
  display: flex;
  gap: 0.75rem;
}

.footer-social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  background-color: transparent;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.footer-social-link:hover {
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
}

.social-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-icon svg {
  width: 100%;
  height: 100%;
}

.social-icon-img {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

@media (max-width: 640px) {
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }

  .footer-top {
    gap: 2rem;
  }
}
</style>
