import { config, fields, collection, singleton } from '@keystatic/core'

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: {
      name: 'Apollo Fitness CMS',
    },
    navigation: {
      'Content': ['hero', 'coaches', 'programs', 'gallery'],
      'Business': ['schedule', 'pricing'],
      'Settings': ['siteInfo'],
    },
  },
  collections: {
    coaches: collection({
      label: 'Coaches',
      slugField: 'name',
      path: 'content/coaches/*',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        name: fields.slug({
          name: {
            label: 'Name',
            description: 'Full name of the coach',
            validation: { isRequired: true },
          },
        }),
        tagline: fields.text({
          label: 'Tagline',
          description: 'A short nickname or descriptor shown under their name, e.g. "The Programmer" or "The Engine"',
          validation: { isRequired: true },
        }),
        role: fields.text({
          label: 'Role / Title',
          description: 'Their role at the studio, e.g. "Owner & Head Coach" or "Coach"',
          validation: { isRequired: true },
        }),
        photo: fields.image({
          label: 'Photo',
          description: 'Portrait photo of the coach (square or vertical works best)',
          directory: 'public/images/coaches',
          publicPath: '/images/coaches/',
        }),
        accent: fields.select({
          label: 'Accent Colour',
          description: 'The colour used for their card border and highlights',
          options: [
            { label: 'Teal', value: 'apollo-teal' },
            { label: 'Orange', value: 'apollo-orange' },
          ],
          defaultValue: 'apollo-teal',
        }),
        bio: fields.text({
          label: 'Bio',
          description: 'A few paragraphs about the coach — their background, coaching style, and what makes them great. Use \\n\\n for paragraph breaks.',
          multiline: true,
          validation: { isRequired: true },
        }),
        stats: fields.array(
          fields.object({
            value: fields.text({
              label: 'Value',
              description: 'The number or short text, e.g. "7+" or "50+"',
              validation: { isRequired: true },
            }),
            label: fields.text({
              label: 'Label',
              description: 'What the stat measures, e.g. "Years in Fitness"',
              validation: { isRequired: true },
            }),
          }),
          {
            label: 'Stats',
            description: 'Key achievements or numbers shown on the coach card (2-4 recommended)',
            itemLabel: (props) => `${props.fields.value.value} ${props.fields.label.value}` || 'Stat',
          }
        ),
        order: fields.integer({
          label: 'Display Order',
          description: 'Lower numbers appear first. Head coach should be 0.',
          defaultValue: 0,
        }),
      },
    }),
    programs: collection({
      label: 'Programs / Classes',
      slugField: 'title',
      path: 'content/programs/*',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        title: fields.slug({
          name: {
            label: 'Program Name',
            description: 'e.g. "WODs", "Strength & Conditioning", "Pilates"',
            validation: { isRequired: true },
          },
        }),
        id: fields.text({
          label: 'Display Number',
          description: 'Two-digit number shown on the card, e.g. "01", "02"',
          validation: { isRequired: true },
        }),
        image: fields.image({
          label: 'Photo',
          description: 'A landscape photo representing this class (will be cropped to fit)',
          directory: 'public/images/programs',
          publicPath: '/images/programs/',
        }),
        imageAlt: fields.text({
          label: 'Photo Description',
          description: 'Describe the image for accessibility, e.g. "Group WOD session outdoors"',
        }),
        description: fields.text({
          label: 'Description',
          description: 'One or two sentences explaining what this class involves and who it\'s for',
          multiline: true,
          validation: { isRequired: true },
        }),
        accent: fields.select({
          label: 'Card Accent',
          description: 'Background gradient colour for the program card',
          options: [
            { label: 'Teal', value: 'from-apollo-teal/20' },
            { label: 'Orange', value: 'from-apollo-orange/20' },
          ],
          defaultValue: 'from-apollo-teal/20',
        }),
        order: fields.integer({
          label: 'Display Order',
          description: 'Lower numbers appear first on the website',
          defaultValue: 0,
        }),
      },
    }),
    gallery: collection({
      label: 'Gallery Images',
      slugField: 'caption',
      path: 'content/gallery/*',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        caption: fields.slug({
          name: {
            label: 'Caption',
            description: 'Short description of the photo, e.g. "Saturday Team WOD"',
            validation: { isRequired: true },
          },
        }),
        image: fields.image({
          label: 'Photo',
          description: 'Upload a photo from the studio, classes, or events',
          directory: 'public/images/gallery',
          publicPath: '/images/gallery/',
        }),
        order: fields.integer({
          label: 'Display Order',
          description: 'Lower numbers appear first',
          defaultValue: 0,
        }),
      },
    }),
  },
  singletons: {
    hero: singleton({
      label: 'Hero Section',
      path: 'content/hero',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        eyebrow: fields.text({
          label: 'Eyebrow Text',
          description: 'Small text shown above the main headline',
          defaultValue: "Maidenhead's Boutique Fitness Studio",
        }),
        headlineLine1: fields.text({
          label: 'Headline — Line 1',
          description: 'First line of the big headline',
          defaultValue: 'Build Your',
        }),
        headlineLine2Word1: fields.text({
          label: 'Headline — Highlighted Word',
          description: 'The word shown in accent colour on line 2',
          defaultValue: 'Strongest',
        }),
        headlineLine2Word2: fields.text({
          label: 'Headline — Line 2 Rest',
          description: 'The remaining text after the highlighted word',
          defaultValue: 'Self',
        }),
        subheadline: fields.text({
          label: 'Subheadline',
          description: 'Supporting text below the headline — keep it punchy',
          defaultValue: 'Expert-coached functional fitness. Max 8 per class. No mirrors. No egos. Just progress.',
        }),
        ctaPrimary: fields.text({
          label: 'Primary Button Text',
          description: 'The main call-to-action button',
          defaultValue: 'Start Your Free Week',
        }),
        ctaSecondary: fields.text({
          label: 'Secondary Button Text',
          description: 'The secondary link/button',
          defaultValue: 'View Programs',
        }),
        heroImage: fields.image({
          label: 'Hero Background Image',
          description: 'Wide studio photo shown behind the hero text on desktop',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        vimeoUrl: fields.text({
          label: 'Vimeo Video URL',
          description: 'Background video URL for mobile hero (from Vimeo embed). Leave empty to use the static image instead.',
          defaultValue: 'https://player.vimeo.com/video/1101338417?h=cc9df9cc81&background=1&autoplay=1&loop=1&byline=0&title=0&muted=1',
        }),
      },
    }),
    schedule: singleton({
      label: 'Schedule / Timetable',
      path: 'content/schedule',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        days: fields.array(
          fields.object({
            day: fields.text({
              label: 'Day Name',
              description: 'Full day name, e.g. "Monday"',
              validation: { isRequired: true },
            }),
            shortDay: fields.text({
              label: 'Short Day',
              description: 'Abbreviated, e.g. "MON"',
              validation: { isRequired: true },
            }),
            subtitle: fields.text({
              label: 'Day Subtitle',
              description: 'Optional note for special days, e.g. "HYROX DAY"',
            }),
            classes: fields.array(
              fields.object({
                time: fields.text({
                  label: 'Time',
                  description: 'Class time, e.g. "7:15" or "5:30 PM"',
                  validation: { isRequired: true },
                }),
                type: fields.select({
                  label: 'Class Type',
                  options: [
                    { label: 'WOD', value: 'WOD' },
                    { label: 'S&C', value: 'S&C' },
                    { label: 'Pilates', value: 'Pilates' },
                    { label: 'Yoga', value: 'Yoga' },
                  ],
                  defaultValue: 'WOD',
                }),
                note: fields.text({
                  label: 'Note',
                  description: 'Optional note, e.g. "Team Workout!" or "HYROX Session"',
                }),
              }),
              {
                label: 'Classes',
                itemLabel: (props) => `${props.fields.time.value} — ${props.fields.type.value}${props.fields.note.value ? ` (${props.fields.note.value})` : ''}`,
              }
            ),
          }),
          {
            label: 'Days',
            description: 'Each day of the week with its class schedule',
            itemLabel: (props) => props.fields.day.value || 'Day',
          }
        ),
      },
    }),
    pricing: singleton({
      label: 'Pricing',
      path: 'content/pricing',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        sectionSubtitle: fields.text({
          label: 'Section Intro Text',
          description: 'Shown at the top of the pricing section',
          defaultValue: 'No contracts. No joining fees. Cancel anytime. Every membership includes a free trial week.',
        }),
        tiers: fields.array(
          fields.object({
            name: fields.text({
              label: 'Plan Name',
              description: 'e.g. "Unlimited", "6 Week Transformation"',
              validation: { isRequired: true },
            }),
            price: fields.integer({
              label: 'Price (£)',
              description: 'The price in pounds',
              validation: { isRequired: true },
            }),
            period: fields.text({
              label: 'Billing Period',
              description: 'e.g. "/month", " one-off", " every 3 weeks"',
              validation: { isRequired: true },
            }),
            description: fields.text({
              label: 'Short Description',
              description: 'One sentence explaining this plan',
              validation: { isRequired: true },
            }),
            features: fields.array(
              fields.text({
                label: 'Feature',
                validation: { isRequired: true },
              }),
              {
                label: 'What\'s Included',
                description: 'Bullet points shown on the pricing card',
                itemLabel: (props) => props.value || 'Feature',
              }
            ),
            accent: fields.select({
              label: 'Card Style',
              description: 'The colour theme for this pricing card',
              options: [
                { label: 'Teal', value: 'teal' },
                { label: 'Orange (Featured)', value: 'orange' },
                { label: 'White', value: 'white' },
              ],
              defaultValue: 'teal',
            }),
            popular: fields.checkbox({
              label: 'Show "Most Popular" Badge',
              description: 'Tick this for your most recommended plan',
              defaultValue: false,
            }),
            teamUpUrl: fields.url({
              label: 'TeamUp Booking Link',
              description: 'The direct link to this plan on TeamUp',
            }),
          }),
          {
            label: 'Pricing Plans',
            description: 'Add your membership options and packages',
            itemLabel: (props) => {
              const name = props.fields.name.value
              const price = props.fields.price.value
              return name ? `${name} — £${price}` : 'Plan'
            },
          }
        ),
      },
    }),
    siteInfo: singleton({
      label: 'General Site Info',
      path: 'content/site-info',
      format: { data: 'json' },
      entryLayout: 'form',
      schema: {
        studioName: fields.text({
          label: 'Studio Name',
          defaultValue: 'Apollo Fitness Studio',
          validation: { isRequired: true },
        }),
        tagline: fields.text({
          label: 'Tagline',
          description: 'Short slogan used in the footer and metadata',
          defaultValue: 'Your Strength, Our Focus.',
        }),
        description: fields.text({
          label: 'Site Description',
          description: 'Used for SEO — describe what the studio offers in 1-2 sentences',
          multiline: true,
        }),
        url: fields.url({
          label: 'Website URL',
          defaultValue: 'https://apollofitnessstudio.com',
        }),
        address: fields.object(
          {
            line1: fields.text({ label: 'Line 1', defaultValue: 'Inside Padel Maidenhead' }),
            line2: fields.text({ label: 'Line 2', defaultValue: 'Braywick Road' }),
            line3: fields.text({ label: 'Line 3', defaultValue: 'Maidenhead SL6 1BN' }),
          },
          { label: 'Studio Address' }
        ),
        phone: fields.text({
          label: 'Phone Number',
          description: 'Leave empty if you prefer WhatsApp only',
        }),
        email: fields.text({
          label: 'Email Address',
          defaultValue: 'apollofitnessstudio@gmail.com',
          validation: { isRequired: true },
        }),
        whatsappNumber: fields.text({
          label: 'WhatsApp Number',
          description: 'Full international format without + or spaces, e.g. "447521216772"',
          defaultValue: '447521216772',
        }),
        instagramUrl: fields.url({
          label: 'Instagram URL',
          defaultValue: 'https://www.instagram.com/apollofitnessstudio',
        }),
        instagramHandle: fields.text({
          label: 'Instagram Handle',
          description: 'Include the @, e.g. "@apollofitnessstudio"',
          defaultValue: '@apollofitnessstudio',
        }),
        googleMapsUrl: fields.url({
          label: 'Google Maps Link',
          description: 'Copy the share link from Google Maps',
          defaultValue: 'https://www.google.com/maps/place/Apollo+Fitness+Studio/@51.5132968,-0.7167016,17z/data=!4m6!3m5!1s0x48767d123b6dee05:0x99dbc9d0a38dc59b!8m2!3d51.5132968!4d-0.7167016!16s%2Fg%2F11xln57c8g',
        }),
        logo: fields.image({
          label: 'Studio Logo',
          description: 'Used in the header and footer',
          directory: 'public/images',
          publicPath: '/images/',
        }),
        teamUpBaseUrl: fields.url({
          label: 'TeamUp Base URL',
          description: 'The base URL for your TeamUp memberships page',
          defaultValue: 'https://goteamup.com/w10418345/p/10418345-apollo-fitness-studio/memberships/',
        }),
      },
    }),
  },
})
