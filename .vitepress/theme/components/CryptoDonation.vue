<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const cryptos = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin',
    address: '15jQG3i7UmK5sWR4xDoauWxZ6QVczTjFcV',
    color: '#f7931a',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'ERC-20',
    address: '0x830833ca8f2de54efb3b7f2a2ab39582441f826f',
    color: '#627eea',
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    network: 'TRC-20 only',
    isStrict: true,
    address: 'TFAthA5zyNBsW4ycjtC66r99fHnFHLf9L2',
    color: '#26a17b',
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    network: 'Litecoin',
    address: 'LQgpDT7aet8yLZhCZ8wE2SYjS8NNwKSJWW',
    color: '#345d9d',
  },
]

const qrDataUrls = ref<Record<string, string>>({})
const qrLoaded = ref<Record<string, boolean>>({})
const copiedStates = ref<Record<string, boolean>>({})

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        generateQRCodes()
        observer?.disconnect()
      }
    },
    { rootMargin: '200px' }
  )

  const el = document.querySelector('.crypto-donate')
  if (el) observer.observe(el)
  else generateQRCodes()
})

onUnmounted(() => {
  observer?.disconnect()
})

async function generateQRCodes() {
  const { default: QRCode } = await import('qrcode')
  const batchSize = 2

  for (let i = 0; i < cryptos.length; i += batchSize) {
    const batch = cryptos.slice(i, i + batchSize)
    await Promise.all(
      batch.map(async (crypto) => {
        if (qrLoaded.value[crypto.id]) return
        try {
          qrDataUrls.value[crypto.id] = await QRCode.toDataURL(crypto.address, {
            width: 240,
            margin: 2,
            color: {
              dark: '#111318',
              light: '#ffffff',
            },
          })
          qrLoaded.value[crypto.id] = true
        } catch {
          qrDataUrls.value[crypto.id] = ''
          qrLoaded.value[crypto.id] = true
        }
      })
    )
    await new Promise((r) => setTimeout(r, 0))
  }
}

function downloadQR(id: string, name: string) {
  const url = qrDataUrls.value[id]
  if (!url) return
  const link = document.createElement('a')
  link.download = `${name.toLowerCase().replace(/\s+/g, '-')}-qr.png`
  link.href = url
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

async function copyAddress(id: string, address: string) {
  try {
    await navigator.clipboard.writeText(address)
    copiedStates.value[id] = true
    setTimeout(() => {
      copiedStates.value[id] = false
    }, 2000)
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = address
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    copiedStates.value[id] = true
    setTimeout(() => {
      copiedStates.value[id] = false
    }, 2000)
  }
}
</script>

<template>
  <div class="crypto-donate">
    <div class="cd-grid">
      <div
        v-for="crypto in cryptos"
        :key="crypto.id"
        class="cd-card"
      >
        <div class="cd-card-inner">
          <!-- Header -->
          <div class="cd-header">
            <div class="cd-icon-box" :style="{ color: crypto.color }">
              <svg v-if="crypto.id === 'btc'" viewBox="0 0 24 24" class="cd-icon-svg" fill="currentColor">
                <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
              </svg>
              <svg v-else-if="crypto.id === 'eth'" viewBox="0 0 24 24" class="cd-icon-svg" fill="currentColor">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
              </svg>
              <svg v-else-if="crypto.id === 'usdt'" viewBox="0 0 24 24" class="cd-icon-svg" fill="currentColor">
                <path d="M18.7538 10.5176c0 .6251-2.2379 1.1483-5.2381 1.2812l.0028.0007c-.0848.0064-.5233.0325-1.5012.0325-.7778 0-1.33-.0233-1.5237-.0325-3.0059-.1322-5.2495-.6555-5.2495-1.2819s2.2436-1.149 5.2495-1.2834v2.0442c.1965.0142.7594.0474 1.5372.0474.9334 0 1.4008-.0389 1.4849-.0466V9.2356c2.9994.1337 5.2381.657 5.2381 1.282zm5.19.5466L12.1248 22.389a.1803.1803 0 0 1-.2496 0L.0562 11.0635a.1781.1781 0 0 1-.0382-.2079l4.3762-9.1921a.1767.1767 0 0 1 .1626-.1026h14.8878a.1768.1768 0 0 1 .1612.1032l4.3762 9.1922a.1782.1782 0 0 1-.0382.2079zm-4.478-.4038c0-.8068-2.5515-1.4799-5.9473-1.6369V7.195h4.186V4.4055H6.3076V7.195h4.1852v1.8286c-3.4018.1562-5.9601.83-5.9601 1.6376 0 .8075 2.5583 1.4806 5.9601 1.6376v5.8618h3.025v-5.8639c3.394-.1563 5.948-.8295 5.948-1.6363z"/>
              </svg>
              <svg v-else-if="crypto.id === 'ltc'" viewBox="0 0 24 24" class="cd-icon-svg" fill="currentColor">
                <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm-.2617 3.6777h2.584a.3425.3425 0 01.33.4356l-2.0312 6.918 1.9062-.582-.4082 1.3847-1.9238.5605-1.248 4.213h6.6757a.3425.3425 0 01.3282.4374l-.582 2a.4586.4586 0 01-.4395.3301H6.7324l1.7227-5.8223-1.9063.5801.42-1.3613 1.9101-.58 2.4219-8.1798a.4557.4557 0 01.4375-.334z"/>
              </svg>
            </div>
            <div class="cd-header-text">
              <div class="cd-title-row">
                <span class="cd-title">{{ crypto.name }}</span>
                <span class="cd-symbol">{{ crypto.symbol }}</span>
              </div>
              <span class="cd-network" :class="{ 'cd-network--strict': crypto.isStrict }">
                {{ crypto.network }}
              </span>
            </div>
          </div>

          <!-- QR Section -->
          <div class="cd-qr-area">
            <div class="cd-qr-box">
              <img
                v-if="qrDataUrls[crypto.id]"
                :src="qrDataUrls[crypto.id]"
                :alt="`${crypto.name} QR code`"
                class="cd-qr-img"
              />
              <div v-else class="cd-qr-loading">
                <span>Generating...</span>
              </div>
            </div>
            <button
              v-if="qrDataUrls[crypto.id]"
              type="button"
              class="cd-qr-download"
              @click="downloadQR(crypto.id, crypto.name)"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              <span>Download QR</span>
            </button>
          </div>

          <!-- 1-Click Copy Address -->
          <div
            class="cd-address-container"
            :class="{ 'is-copied': copiedStates[crypto.id] }"
            @click="copyAddress(crypto.id, crypto.address)"
            role="button"
            tabindex="0"
            :title="copiedStates[crypto.id] ? 'Copied!' : 'Click to copy address'"
            @keydown.enter="copyAddress(crypto.id, crypto.address)"
            @keydown.space.prevent="copyAddress(crypto.id, crypto.address)"
          >
            <span class="cd-address-text">{{ crypto.address }}</span>
            <span class="cd-copy-badge">
              <svg v-if="!copiedStates[crypto.id]" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
              <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{{ copiedStates[crypto.id] ? 'Copied' : 'Copy' }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crypto-donate {
  margin: 1.5rem 0;
  width: 100%;
}

.cd-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  width: 100%;
}

@media (min-width: 640px) {
  .cd-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}

/* ── Card (Single hairline, no multi-border highlight) ── */
.cd-card {
  position: relative;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  overflow: hidden;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s ease;
}

.cd-card:hover {
  border-color: var(--vp-c-brand-1);
}

.cd-card-inner {
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  min-width: 0;
}

/* ── Header ── */
.cd-header {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.cd-icon-box {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--vp-c-bg-elv);
}

.cd-icon-svg {
  width: 22px;
  height: 22px;
  display: block;
}

.cd-header-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
  flex: 1;
}

.cd-title-row {
  display: flex;
  align-items: center;
  gap: 6px;
}

.cd-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.cd-symbol {
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  padding: 0.05rem 0.35rem;
  border-radius: 4px;
}

.cd-network {
  font-size: 0.72rem;
  color: var(--vp-c-text-2);
  line-height: 1.2;
}

.cd-network--strict {
  color: var(--vp-c-warning-1, #eab308);
  font-weight: 600;
}

/* ── QR Section ── */
.cd-qr-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 2px 0;
}

.cd-qr-box {
  width: 120px;
  height: 120px;
  border-radius: 8px;
  padding: 6px;
  background: #ffffff;
  border: 1px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.cd-qr-img {
  width: 100%;
  height: 100%;
  display: block;
}

.cd-qr-loading {
  font-size: 0.72rem;
  color: #6b7280;
}

.cd-qr-download {
  all: unset;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  color: var(--vp-c-text-3);
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: color 0.15s ease;
}

.cd-qr-download:hover {
  color: var(--vp-c-brand-1);
}

/* ── 1-Click Copy Address Container ── */
.cd-address-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  padding: 6px 8px 6px 10px;
  cursor: pointer;
  min-width: 0;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.15s ease;
}

.cd-address-container:hover {
  border-color: var(--vp-c-text-3);
}

.cd-address-container.is-copied {
  border-color: var(--vp-c-green-1, #10b981) !important;
}

.cd-address-text {
  flex: 1;
  min-width: 0;
  font-family: var(--vp-font-family-mono);
  font-size: 0.73rem;
  color: var(--vp-c-text-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  user-select: all;
  line-height: 1.4;
}

.cd-copy-badge {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 0.72rem;
  font-weight: 500;
  color: var(--vp-c-text-2);
  padding: 2px 6px;
  border-radius: 4px;
  background: var(--vp-c-bg-mute);
  transition: color 0.15s ease, background-color 0.15s ease;
}

.cd-address-container:hover .cd-copy-badge {
  color: var(--vp-c-text-1);
}

.cd-address-container.is-copied .cd-copy-badge {
  color: var(--vp-c-green-1, #10b981) !important;
  background: var(--vp-c-green-soft, rgba(16, 185, 129, 0.12));
  font-weight: 600;
}
</style>
