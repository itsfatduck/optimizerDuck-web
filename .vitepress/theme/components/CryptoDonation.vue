<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import QRCode from 'qrcode'

const cryptos = [
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'BTC',
    address: '15jQG3i7UmK5sWR4xDoauWxZ6QVczTjFcV',
    color: '#f7931a',
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'ETH',
    address: '0x830833ca8f2de54efb3b7f2a2ab39582441f826f',
    color: '#627eea',
  },
  {
    id: 'usdt',
    name: 'Tether',
    symbol: 'USDT',
    network: 'TRC20',
    address: 'TFAthA5zyNBsW4ycjtC66r99fHnFHLf9L2',
    color: '#26a17b',
  },
  {
    id: 'ltc',
    name: 'Litecoin',
    symbol: 'LTC',
    network: 'LTC',
    address: 'LQgpDT7aet8yLZhCZ8wE2SYjS8NNwKSJWW',
    color: '#345d9d',
  },
]

const qrDataUrls = ref<Record<string, string>>({})
const qrLoaded = ref<Record<string, boolean>>({})
const copiedStates = ref<Record<string, boolean>>({})

let observer: IntersectionObserver | null = null

onMounted(() => {
  // Only generate QR codes when component scrolls into view (perf optimization)
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
  else generateQRCodes() // fallback: generate immediately
})

onUnmounted(() => {
  observer?.disconnect()
})

async function generateQRCodes() {
  const batchSize = 2 // generate 2 at a time to avoid frame drops

  for (let i = 0; i < cryptos.length; i += batchSize) {
    const batch = cryptos.slice(i, i + batchSize)

    await Promise.all(
      batch.map(async (crypto) => {
        if (qrLoaded.value[crypto.id]) return
        try {
          qrDataUrls.value[crypto.id] = await QRCode.toDataURL(crypto.address, {
            width: 280,
            margin: 2,
            color: {
              dark: '#1f2937',
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

    // Yield to main thread between batches
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
        :style="{ '--card-color': crypto.color }"
      >
        <div class="cd-card-inner">
          <!-- Header: Icon + Name + Network Badge -->
          <div class="cd-header">
            <div class="cd-icon-wrapper" :style="{ background: crypto.color + '14', color: crypto.color }">
              <!-- Bitcoin (BTC) -->
              <svg v-if="crypto.id === 'btc'" viewBox="0 0 24 24" class="cd-icon-svg" fill="currentColor">
                <path d="M23.638 14.904c-1.602 6.43-8.113 10.34-14.542 8.736C2.67 22.05-1.244 15.525.362 9.105 1.962 2.67 8.475-1.243 14.9.358c6.43 1.605 10.342 8.115 8.738 14.548v-.002zm-6.35-4.613c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-1.815-.45-.35 1.407s.975.225.955.236c.535.136.63.486.615.766l-1.477 5.92c-.075.166-.24.406-.614.314.015.02-.96-.24-.96-.24l-.66 1.51 1.71.426.93.242-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.64-1.774.57-1.637-.03-2.58-1.217-3.196.854-.193 1.5-.76 1.68-1.93h.01zm-3.01 4.22c-.404 1.64-3.157.75-4.05.53l.72-2.9c.896.23 3.757.67 3.33 2.37zm.41-4.24c-.37 1.49-2.662.735-3.405.55l.654-2.64c.744.18 3.137.524 2.75 2.084v.006z"/>
              </svg>
              <!-- Ethereum (ETH) -->
              <svg v-else-if="crypto.id === 'eth'" viewBox="0 0 24 24" class="cd-icon-svg" fill="currentColor">
                <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/>
              </svg>
              <!-- Tether (USDT) -->
              <svg v-else-if="crypto.id === 'usdt'" viewBox="0 0 24 24" class="cd-icon-svg" fill="currentColor">
                <path d="M18.7538 10.5176c0 .6251-2.2379 1.1483-5.2381 1.2812l.0028.0007c-.0848.0064-.5233.0325-1.5012.0325-.7778 0-1.33-.0233-1.5237-.0325-3.0059-.1322-5.2495-.6555-5.2495-1.2819s2.2436-1.149 5.2495-1.2834v2.0442c.1965.0142.7594.0474 1.5372.0474.9334 0 1.4008-.0389 1.4849-.0466V9.2356c2.9994.1337 5.2381.657 5.2381 1.282zm5.19.5466L12.1248 22.389a.1803.1803 0 0 1-.2496 0L.0562 11.0635a.1781.1781 0 0 1-.0382-.2079l4.3762-9.1921a.1767.1767 0 0 1 .1626-.1026h14.8878a.1768.1768 0 0 1 .1612.1032l4.3762 9.1922a.1782.1782 0 0 1-.0382.2079zm-4.478-.4038c0-.8068-2.5515-1.4799-5.9473-1.6369V7.195h4.186V4.4055H6.3076V7.195h4.1852v1.8286c-3.4018.1562-5.9601.83-5.9601 1.6376 0 .8075 2.5583 1.4806 5.9601 1.6376v5.8618h3.025v-5.8639c3.394-.1563 5.948-.8295 5.948-1.6363z"/>
              </svg>
              <!-- Litecoin (LTC) -->
              <svg v-else-if="crypto.id === 'ltc'" viewBox="0 0 24 24" class="cd-icon-svg" fill="currentColor">
                <path d="M12 0a12 12 0 1012 12A12 12 0 0012 0zm-.2617 3.6777h2.584a.3425.3425 0 01.33.4356l-2.0312 6.918 1.9062-.582-.4082 1.3847-1.9238.5605-1.248 4.213h6.6757a.3425.3425 0 01.3282.4374l-.582 2a.4586.4586 0 01-.4395.3301H6.7324l1.7227-5.8223-1.9063.5801.42-1.3613 1.9101-.58 2.4219-8.1798a.4557.4557 0 01.4375-.334z"/>
              </svg>
            </div>
            <div class="cd-header-info">
              <div class="cd-name-row">
                <span class="cd-name">{{ crypto.name }}</span>
                <span class="cd-symbol">{{ crypto.symbol }}</span>
              </div>
              <span class="cd-network-badge" :style="{
                background: crypto.color + '14',
                color: crypto.color,
              }">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="cd-network-icon">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span v-if="crypto.id === 'usdt'">Only on <strong>TRC20</strong></span>
                <span v-else>Send via <strong>{{ crypto.network }}</strong></span>
              </span>
            </div>
          </div>

          <!-- QR Code with download -->
          <div class="cd-qr-section">
            <div class="cd-qr-frame">
              <img
                v-if="qrDataUrls[crypto.id]"
                :src="qrDataUrls[crypto.id]"
                :alt="`${crypto.name} QR code`"
                class="cd-qr-img"
              />
              <div v-else class="cd-qr-placeholder">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                <span class="cd-qr-loading">Loading...</span>
              </div>
            </div>
            <button
              v-if="qrDataUrls[crypto.id]"
              class="cd-dl-btn"
              :style="{ '--btn-color': crypto.color }"
              @click="downloadQR(crypto.id, crypto.name)"
              title="Download QR code"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
            </button>
          </div>

          <!-- Address - simple copyable field -->
          <div class="cd-address-section">
            <div class="cd-address-label">Address</div>
            <div class="cd-address-row">
              <code class="cd-address">{{ crypto.address }}</code>
              <button
                class="cd-copy-btn"
                :class="{ 'cd-copy-btn--copied': copiedStates[crypto.id] }"
                :style="{ '--btn-color': crypto.color }"
                @click="copyAddress(crypto.id, crypto.address)"
                :title="copiedStates[crypto.id] ? 'Copied!' : 'Copy address'"
              >
                <svg v-if="!copiedStates[crypto.id]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crypto-donate {
  margin: 2rem 0;
}

.cd-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .cd-grid {
    grid-template-columns: 1fr 1fr;
  }
}

/* ── Card ── */
.cd-card {
  --card-color: var(--vp-c-brand-1);

  position: relative;
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

.cd-card:hover {
  border-color: var(--card-color);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--card-color) 18%, transparent),
              0 4px 20px rgba(0, 0, 0, 0.06);
}

.dark .cd-card:hover {
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--card-color) 20%, transparent),
              0 4px 20px rgba(0, 0, 0, 0.2);
}

.cd-card-inner {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ── Header ── */
.cd-header {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.cd-icon-wrapper {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cd-icon-svg {
  width: 26px;
  height: 26px;
  display: block;
}

.cd-header-info {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 0;
}

.cd-name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cd-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.3;
}

.cd-symbol {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--vp-c-text-3);
  background: var(--vp-c-bg-mute);
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
}

.cd-network-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.72rem;
  font-weight: 500;
  padding: 0.2rem 0.55rem;
  border-radius: 6px;
  width: fit-content;
  letter-spacing: 0.01em;
}

.cd-network-badge strong {
  font-weight: 700;
}

.cd-network-icon {
  flex-shrink: 0;
}

/* ── QR Code ── */
.cd-qr-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
}

.cd-qr-frame {
  border-radius: 10px;
  padding: 0.5rem;
  background: #fff;
  border: 1px solid var(--vp-c-divider);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.25s ease;
}

.cd-card:hover .cd-qr-frame {
  box-shadow: 0 0 18px color-mix(in srgb, var(--card-color) 12%, transparent);
}

.cd-qr-img {
  width: 130px;
  height: 130px;
  display: block;
}

.cd-qr-placeholder {
  width: 130px;
  height: 130px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  color: var(--vp-c-text-3);
}

.cd-qr-loading {
  font-size: 0.75rem;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

/* ── Download Button ── */
.cd-dl-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.35rem 0.75rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.cd-dl-btn:hover {
  border-color: var(--btn-color, var(--vp-c-brand-2));
  color: var(--btn-color, var(--vp-c-brand-2));
  background: color-mix(in srgb, var(--btn-color, var(--vp-c-brand-2)) 10%, transparent);
}

/* ── Address ── */
.cd-address-section {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.cd-address-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--vp-c-text-3);
}

.cd-address-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cd-address {
  flex: 1;
  min-width: 0;
  font-size: 0.7rem;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-mute);
  padding: 0.5rem 0.65rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  word-break: break-all;
  user-select: all;
  line-height: 1.5;
  transition: border-color 0.2s ease;
}

.cd-card:hover .cd-address {
  border-color: color-mix(in srgb, var(--card-color) 30%, transparent);
}

/* ── Copy Button ── */
.cd-copy-btn {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.cd-copy-btn:hover {
  border-color: var(--btn-color, var(--vp-c-brand-2));
  color: var(--btn-color, var(--vp-c-brand-2));
  background: color-mix(in srgb, var(--btn-color, var(--vp-c-brand-2)) 10%, transparent);
}

.cd-copy-btn--copied {
  border-color: var(--vp-c-green-2);
  color: var(--vp-c-green-2);
  background: var(--vp-c-green-soft);
}
</style>
