// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import GitHubRelease from './components/GitHub/GitHubRelease.vue'
import GitHubChangelog from './components/GitHub/GitHubChangelog.vue'
import GitHubChangelogLink from './components/GitHub/GitHubChangelogLink.vue'
import DiscordWidget from './components/Discord/DiscordWidget.vue'
import ImagePreview from './components/ImagePreview.vue'
import ContributorList from './components/ContributorList.vue'
import SupportCard from './components/SupportCard.vue'
import CustomBlock from './components/CustomBlock.vue'
import Card from './components/Card.vue'
import CardGrid from './components/CardGrid.vue'
import Icon from './components/Icon.vue'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('GitHubRelease', GitHubRelease)
    app.component('GitHubChangelog', GitHubChangelog)
    app.component('GitHubChangelogLink', GitHubChangelogLink)
    app.component('DiscordWidget', DiscordWidget)
    app.component('ImagePreview', ImagePreview)
    app.component('ContributorList', ContributorList)
    app.component('SupportCard', SupportCard)
    app.component('CustomBlock', CustomBlock)
    app.component('Card', Card)
    app.component('CardGrid', CardGrid)
    app.component('Icon', Icon)
  }
} satisfies Theme
