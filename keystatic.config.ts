import { config, fields, collection, singleton } from '@keystatic/core'

// ── Storage mode ──
// Local storage — content lives in the repo as JSON files
// For production: deploy via git push (content changes = code changes)
export default config({
  storage: { kind: 'local' as const },
  ui: {
    brand: {
      name: 'Apollo Fitness CMS',
    },
  },
  collections: {
    coaches: collection({
      label: 'Coaches',
      slugField: 'name',
      path: 'content/coaches/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name' } }),
        tagline: fields.text({ label: 'Tagline', description: 'e.g. "The Programmer"' }),
        role: fields.text({ label: 'Role / Title', description: 'e.g. "Owner & Head Coach"' }),
        photo: fields.image({
          label: 'Photo',
          description: 'Upload a portrait photo of the coach',
          directory: 'public/images/coaches',
          publicPath: '/images/coaches/',
        }),
        accent: fields.select({
          label: 'Accent colour',
          options: [
            { label: 'Teal', value: 'apollo-teal' },
            { label: 'Orange', value: 'apollo-orange' },
          ],
          defaultValue: 'apollo-teal',
        }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        stats: fields.array(
          fields.object({
            value: fields.text({ label: 'Value', description: 'e.g. "7+"' }),
            label: fields.text({ label: 'Label', description: 'e.g. "Years in Fitness"' }),
          }),
          {
            label: 'Stats',
            itemLabel: (props) => props.fields.label.value || 'Stat',
          }
        ),
        order: fields.integer({ label: 'Display order', defaultValue: 0 }),
      },
    }),
    programs: collection({
      label: 'Programs / Classes',
      slugField: 'title',
      path: 'content/programs/*',
      format: { data: 'json' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        id: fields.text({ label: 'ID number', description: 'e.g. "01"' }),
        image: fields.image({
          label: 'Image',
          description: 'Upload a class/program photo',
          directory: 'public/images/programs',
          publicPath: '/images/programs/',
        }),
        imageAlt: fields.text({ label: 'Image alt text' }),
        description: fields.text({ label: 'Description', multiline: true }),
        accent: fields.text({ label: 'Accent gradient class', description: 'e.g. "from-apollo-teal/20"', defaultValue: 'from-apollo-teal/20' }),
        order: fields.integer({ label: 'Display order', defaultValue: 0 }),
      },
    }),
    gallery: collection({
      label: 'Gallery Images',
      slugField: 'caption',
      path: 'content/gallery/*',
      format: { data: 'json' },
      schema: {
        caption: fields.slug({ name: { label: 'Caption' } }),
        image: fields.image({
          label: 'Image',
          description: 'Upload a gallery photo',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
        }),
        order: fields.integer({ label: 'Display order', defaultValue: 0 }),
      },
    }),
  },
  singletons: {
    hero: singleton({
      label: 'Hero Section',
      path: 'content/hero',
      format: { data: 'json' },
      schema: {
        eyebrow: fields.text({ label: 'Eyebrow text', defaultValue: "Maidenhead's Boutique Fitness Studio" }),
        headlineLine1: fields.text({ label: 'Headline line 1', defaultValue: 'Build Your' }),
        headlineLine2Word1: fields.text({ label: 'Headline line 2 — highlighted word', defaultValue: 'Strongest' }),
        headlineLine2Word2: fields.text({ label: 'Headline line 2 — rest', defaultValue: 'Self' }),
        subheadline: fields.text({ label: 'Subheadline', defaultValue: 'Expert-coached functional fitness. Max 8 per class. No mirrors. No egos. Just progress.' }),
        ctaPrimary: fields.text({ label: 'Primary CTA text', defaultValue: 'Start Your Free Week' }),
        ctaSecondary: fields.text({ label: 'Secondary CTA text', defaultValue: 'View Programs' }),
        heroImage: fields.image({
          label: 'Hero background image (desktop)',
          description: 'Upload a wide studio photo for the hero banner',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        vimeoUrl: fields.text({ label: 'Vimeo video URL (mobile background)', defaultValue: 'https://player.vimeo.com/video/1101338417?h=cc9df9cc81&background=1&autoplay=1&loop=1&byline=0&title=0&muted=1' }),
      },
    }),
    schedule: singleton({
      label: 'Schedule / Timetable',
      path: 'content/schedule',
      format: { data: 'json' },
      schema: {
        days: fields.array(
          fields.object({
            day: fields.text({ label: 'Day name', description: 'e.g. "Monday"' }),
            shortDay: fields.text({ label: 'Short day', description: 'e.g. "MON"' }),
            subtitle: fields.text({ label: 'Subtitle (optional)', description: 'e.g. "HYROX DAY"' }),
            classes: fields.array(
              fields.object({
                time: fields.text({ label: 'Time', description: 'e.g. "7:15" or "5:30 PM"' }),
                type: fields.select({
                  label: 'Class type',
                  options: [
                    { label: 'WOD', value: 'WOD' },
                    { label: 'S&C', value: 'S&C' },
                    { label: 'Pilates', value: 'Pilates' },
                    { label: 'Yoga', value: 'Yoga' },
                  ],
                  defaultValue: 'WOD',
                }),
                note: fields.text({ label: 'Note (optional)', description: 'e.g. "Team Workout!"' }),
              }),
              {
                label: 'Classes',
                itemLabel: (props) => `${props.fields.time.value} — ${props.fields.type.value}`,
              }
            ),
          }),
          {
            label: 'Days',
            itemLabel: (props) => props.fields.day.value || 'Day',
          }
        ),
      },
    }),
    pricing: singleton({
      label: 'Pricing',
      path: 'content/pricing',
      format: { data: 'json' },
      schema: {
        sectionSubtitle: fields.text({ label: 'Section subtitle', defaultValue: 'No contracts. No joining fees. Cancel anytime. Every membership includes a free trial week.' }),
        tiers: fields.array(
          fields.object({
            name: fields.text({ label: 'Tier name' }),
            price: fields.integer({ label: 'Price (£)' }),
            period: fields.text({ label: 'Period', description: 'e.g. "/month" or " one-off"' }),
            description: fields.text({ label: 'Description' }),
            features: fields.array(
              fields.text({ label: 'Feature' }),
              { label: 'Features', itemLabel: (props) => props.value || 'Feature' }
            ),
            accent: fields.select({
              label: 'Accent colour',
              options: [
                { label: 'Teal', value: 'teal' },
                { label: 'Orange', value: 'orange' },
                { label: 'White', value: 'white' },
              ],
              defaultValue: 'teal',
            }),
            popular: fields.checkbox({ label: 'Most Popular badge', defaultValue: false }),
            teamUpUrl: fields.text({ label: 'TeamUp URL' }),
          }),
          {
            label: 'Tiers',
            itemLabel: (props) => props.fields.name.value || 'Tier',
          }
        ),
      },
    }),
    siteInfo: singleton({
      label: 'General Site Info',
      path: 'content/site-info',
      format: { data: 'json' },
      schema: {
        studioName: fields.text({ label: 'Studio name', defaultValue: 'Apollo Fitness Studio' }),
        tagline: fields.text({ label: 'Tagline', defaultValue: 'Your Strength, Our Focus.' }),
        description: fields.text({ label: 'Site description', multiline: true }),
        url: fields.text({ label: 'Site URL', defaultValue: 'https://apollofitnessstudio.com' }),
        address: fields.object({
          line1: fields.text({ label: 'Line 1', defaultValue: 'Inside Padel Maidenhead' }),
          line2: fields.text({ label: 'Line 2', defaultValue: 'Braywick Road' }),
          line3: fields.text({ label: 'Line 3', defaultValue: 'Maidenhead SL6 1BN' }),
        }),
        phone: fields.text({ label: 'Phone number' }),
        email: fields.text({ label: 'Email', defaultValue: 'apollofitnessstudio@gmail.com' }),
        whatsappNumber: fields.text({ label: 'WhatsApp number (full international)', defaultValue: '447521216772' }),
        instagramUrl: fields.text({ label: 'Instagram URL', defaultValue: 'https://www.instagram.com/apollofitnessstudio' }),
        instagramHandle: fields.text({ label: 'Instagram handle', defaultValue: '@apollofitnessstudio' }),
        googleMapsUrl: fields.text({ label: 'Google Maps URL', defaultValue: 'https://www.google.com/maps/place/Apollo+Fitness+Studio/@51.5132968,-0.7167016,17z/data=!4m6!3m5!1s0x48767d123b6dee05:0x99dbc9d0a38dc59b!8m2!3d51.5132968!4d-0.7167016!16s%2Fg%2F11xln57c8g' }),
        logo: fields.image({
          label: 'Logo',
          description: 'Upload the studio logo',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        teamUpBaseUrl: fields.text({ label: 'TeamUp base URL', defaultValue: 'https://goteamup.com/w10418345/p/10418345-apollo-fitness-studio/memberships/' }),
      },
    }),
  },
})
