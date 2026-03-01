import React from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import Image from 'next/image';


// TODO:
// - Bookcases
// - Gaggennau

// Helper function to get category display name
const getCategoryDisplay = (category) => {
  const categoryMap = {
    'Home': 'Home',
    'Photography': 'Photography',
    'Cars': 'Vehicles',
    'Work': 'Tech',
    'Watches': 'Watches',
    'Travel': 'Travel',
    'Fashion': 'Fashion'
  };
  return categoryMap[category] || category;
};

const ObjectsPage = () => {
  const categories = {
    'Home': [
      {
        name: 'Carl Hansen wishbone chair',
        brand: 'Carl Hansen',
        description: 'A timeless dining chair.',
        link: 'https://www.carlhansen.com/en/en/collection/chairs/dining-chairs/ch24',
        image: '/images/objects/wishbone-chair.png'
      },
      {
        name: 'Isamu Noguchi Akari',
        brand: 'Noguchi',
        description: 'Simple, beautiful and functional.',
        link: 'https://shop.noguchi.org/collections/akari-light-sculptures',
        image: '/images/objects/akari.png'
      },
      {
        name: 'La Marzocco Linea Micra',
        brand: 'La Marzocco',
        description: 'Daily shot of espresso.',
        link: 'https://home.lamarzoccousa.com/product/linea-micra/',
        image: '/images/objects/la-marzocco-lInea-micra.webp'
      },
      {
        name: 'Weber Workshops The Key',
        brand: 'Weber Workshops',
        description: '83mm conical burr grinder.',
        link: 'https://weberworkshops.com/products/key-grinder',
        image: '/images/objects/weber-workshops-the-key.png'
      },
      {
        name: 'Poul Kjærholm PK22 chair',
        brand: 'Fritz Hansen',
        description: 'A timeless lounge chair.',
        link: 'https://www.fritzhansen.com/en/categories/by-series/pk22/pk22-upholstered?sku=PK22-ELBLA-SBSS',
        image: '/images/objects/pk22.png'
      },
      {
        name: 'Bang Olufsen Beosound 2',
        brand: 'Bang & Olufsen',
        description: 'A timeless speaker.',
        link: 'https://www.bang-olufsen.com/en/us/speakers/beosound-2',
        image: '/images/objects/beosound2.png'
      },
      {
        name: 'Arne Jacobsen series 7 chair',
        brand: 'Fritz Hansen',
        description: 'Arne Jacobsen, model 3117 ',
        link: 'https://www.fritzhansen.com/en/categories/by-series/series-7/series-7-3117-front-upholstered',
        image: '/images/objects/fritz-hansen-seven-chair.png'
      },
      {
        name: 'HAY Mags soft sofa',
        brand: 'HAY',
        description: 'Danish design at its finest.',
        link: 'https://www.hay.com/products/furniture/seating/sofas/mags-sofa-collection/mags-soft',
        image: '/images/objects/hay-mags-soft.png'
      },
      {
        name: 'Vitsoe Shelves',
        brand: 'Vitsoe',
        description: 'Timeless Dieter Rams design.',
        link: 'https://www.vitsoe.com/us/606',
        image: '/images/objects/vitsoe-shelves.png'
      },
      {
        name: 'Mogens Koch bookcases',
        brand: 'Mogens Koch',
        description: 'A timeless bookcase.',
        link: 'https://form-atelier.com/shop/mogens-koch-modular-bookcases-solid-oak',
        image: '/images/objects/mogens-koch-bookcase.png'
      },
      {
        name: 'Fellow Stagg EKG Electric Kettle',
        brand: 'Fellow',
        description: 'A timeless electric kettle.',
        link: 'https://fellowproducts.com/products/stagg-ekg-electric-pour-over-kettle',
        image: '/images/objects/fellow_stagg.png'
      },
      {
        name: 'Eames Molded Plywood Chair',
        brand: 'Herman Miller',
        description: 'A timeless chair.',
        link: 'https://www.hermanmiller.com/products/seating/side-chairs/eames-molded-plywood-chairs/',
        image: '/images/objects/herman-miller-eames-molded-plyw.webp'
      },
      {
        name: "Beolab 50",
        brand: "Bang & Olufsen",
        description: "Beolab 50",
        link: "https://www.bang-olufsen.com/en/us/speakers/beolab-50",
        image: '/images/objects/beolab50.png'
      }
    ],
    'Photography': [
      {
        name: 'Leica M11 Monochrome',
        brand: 'Leica',
        description: 'My favorite camera for street photography.',
        link: 'https://www.leica-camera.com/en-us/products/m-system/m11-rangefinder-camera',
        image: '/images/objects/leica-m11-monochrome.png'
      },
      {
        name: 'Leica Q3',
        brand: 'Leica',
        description: 'My favorite camera for everything else.',
        link: 'https://www.leica-camera.com/en-us/products/m-system/m11-rangefinder-camera',
        image: '/images/objects/leica-q3.png'
      },
      {
        name: 'Leica Sofort 2',
        brand: 'Leica',
        description: 'Leica goes retro',
        link: 'https://leica-camera.com/en-US/photography/cameras/sofort-2-red?srsltid=AfmBOooNUwq2IkOCymDwQJuTr1A_BglEaNAbhKlcRVlPxEkxz1m28Jz5',
        image: '/images/objects/leica-sofort.png'
      },
    ],
    'Cars': [
      {
        name: '2019 Porsche 911 GT3 Touring',
        brand: 'Porsche',
        description: 'GT Silver.',
        link: 'https://www.cnet.com/roadshow/reviews/2019-porsche-911-gt3-touring-preview/',
        image: '/images/objects/porsche-911-gt3-touring.png'
      },
      {
        name: '1987 Porsche 911 Targa',
        brand: 'Porsche',
        description: 'Guards Red.',
        link: 'https://www.porsche.com/international/accessoriesandservice/classic/models/911-g/',
        image: '/images/objects/porsche-911-targa.png'
      },
      {
        name: 'Lego Icons 10295 Porsche 911',
        brand: 'Lego',
        description: 'My favorite Lego set.',
        link: 'https://www.lego.com/en-us/product/porsche-911-10295',
        image: '/images/objects/lego_porsche.png'
      }
    ],
    'Work': [
      {
        name: 'Apple Macbook Pro 13',
        brand: 'Apple',
        description: 'My daily driver.',
        link: 'https://www.apple.com/macbook-pro-13/',
        image: '/images/objects/apple-macbook-pro.png'
      },
      {
        name: 'Apple Studio Display',
        brand: 'Apple',
        description: 'My main display.',
        link: 'https://www.apple.com/studio-display/',
        image: '/images/objects/apple-studio-display.webp'
      },
      {
        name: 'Bang & Olufsen H95',
        brand: 'Bang & Olufsen',
        description: 'My go-to headphones.',
        link: 'https://www.bang-olufsen.com/en/us/headphones/beoplay-h95',
        image: '/images/objects/bang-olfsen-h95.png'
      },
      {
        name: 'Apple iPhone7 Pro',
        brand: 'Apple',
        description: 'My mobile driver.',
        link: 'https://www.apple.com/iphone-17-pro/',
        image: '/images/objects/apple-iphone-17-pro.png'
      },
      {
        name: 'Apple EarPods',
        brand: 'Apple',
        description: "Can't do meetings without",
        link: 'https://www.apple.com/shop/product/MYQY3AM/A/earpods-usb-c',
        image: '/images/objects/apple-earpods.png'
      },
      {
        name: 'Herman Miller Aeron Chair',
        brand: 'Herman Miller',
        description: 'Designed by Bill Stumpf and Don Chadwick',
        link: 'https://www.hermanmiller.com/products/seating/office-chairs/aeron-chair/',
        image: '/images/objects/herman-miller-aeron.webp'
      }
    ],
    'Watches': [
      {
        name: 'Omega Speedmaster Professional',
        brand: 'Omega',
        description: 'My favorite watch for everyday wear.',
        link: 'https://www.omegawatches.com/watch-omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425001002',
        image: '/images/objects/omega-speedmaster.webp'
      },
      {
        name: 'IWC Hodinkee',
        brand: 'IWC',
        description: 'My favorite re-issue watch.',
        link: 'https://limited.hodinkee.com/iwc/',
        image: '/images/objects/iwc-hodinkee.png'
      },
      {
        name: 'Braun BN0021',
        brand: 'Braun',
        description: 'My favorite watch for everyday wear.',
        link: 'https://www.braun.com/en-us/products/watches/bn0021.html',
        image: '/images/objects/braun_bn0021.png'
      },
      {
        name: 'Patek Philippe Ref. 3940',
        brand: 'Patek Philippe',
        description: 'Perpetual calendar in yellow gold.',
        link: 'https://www.patek.com/en/collection/grand-complications/5327R-001',
        image: '/images/objects/patek-philippe-3940.png'
      }
    ],
    'Travel': [
      {
        name: 'Apple AirTags',
        brand: 'Apple',
        description: 'Helps me stay sane.',
        link: 'https://www.apple.com/airtags/',
        image: '/images/objects/apple-airtags.png'
      },
      {
        name: 'Rimowa luggages',
        brand: 'Rimowa',
        description: 'Expensive, but worth it.',
        link: 'https://www.rimowa.com/en-us',
        image: '/images/objects/rimowa.webp'
      }
    ],
    'Fashion': [
      {
        name: 'Hardgraft Flat Pack',
        brand: 'Hardgraft',
        description: 'Perfect for daily carry.',
        link: 'https://www.mukama.com/products/hardgraft-flat-pack',
        image: '/images/objects/hardgraft-flatpack.png'
      },
      {
        name: 'Paul Smith Storm Wool Mac Coat',
        brand: 'Paul Smith',
        description: 'Seasonal staple.',
        link: 'https://www.paulsmith.com/men-s-navy-wool-mac-with-detachable-gilet',
        image: '/images/objects/paul-smith-coat.png'
      },
      {
        name: 'Oliver Peoples Oliver Sun',
        brand: 'Oliver Peoples',
        description: 'Wide fit.',
        link: 'https://www.oliverpeoples.com/usa/0OV5393SU--100357',
        image: '/images/objects/oliverspeople.png'
      },
      {
        name: 'Common Projects Achilles',
        brand: 'Common Projects',
        description: 'Perfect for everyday wear.',
        link: 'https://www.mrporter.com/en-us/mens/product/common-projects/shoes/low-top-sneakers/original-achilles-leather-sneakers/3024088872901548?utm_source=google&utm_medium=cpc&utm_campaign=GOO%3AMRP%3AAM%3AUS%3ANY%3AENG%3ASEAU%3APLA%3ASLR%3AMXO%3ANEW%3AMN%3ACOMMON-PROJECTS%3ALV0%3ALV1%3ALV2%3AXXX%3A18%3AEMPTY%3A&utm_id=19816477437&utm_term=3074457345616696426&vtp00=GOOGLE&vtp01=SEAU&vtp02=152923875245&vtp03=pla-489161055549&vtp04=g&vtp05=c&vtp06=677061953912&vtp07=pla&gad_source=1&gad_campaignid=19816477437&gbraid=0AAAAADRhcNaJfiY4WSIfanbnSqZzfUxXq&gclid=CjwKCAjw6ZTCBhBOEiwAqfwJd4yOhWjLNFlj1ViMhFRIpvq5POSKDT_AYQ3CjzbNKNzs-G_A0HhSMhoCWXMQAvD_BwE',
        image: '/images/objects/common-projects.png'
      }
    ]
  };

  return (
    <Layout
      title="Objects - a curated collection of objects I appreciate."
      description="A curated collection of objects I appreciate.."
      center
    >
      <div className="objects">
        <header>
          <h1>Objects</h1>
          <p className="intro">A curated collection of objects I appreciate.</p>
        </header>

        {Object.entries(categories).map(([category, items]) => (
          <section key={category}>
            <h2>{category}</h2>
            <div className="items-grid">
              {items.map((item, index) => (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="item-card"
                  key={index}
                >
                  <div className="image-wrapper">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="item-image"
                    />
                  </div>
                  <div className="item-info">
                    <div className="item-meta">
                      <span className="brand-category">
                        {item.brand} · {getCategoryDisplay(category)}
                      </span>
                    </div>
                    <h3 className="item-name">{item.name}</h3>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      <style jsx>{`
        .objects {
          margin: 0 auto;
          max-width: 1400px;
        }

        header {
          margin-bottom: 48px;
        }

        h1 {
          margin: 0 0 12px 0;
        }

        .intro {
          color: #666;
          margin: 0;
          font-size: 16px;
          line-height: 1.6;
        }

        section {
          margin-bottom: 60px;
        }

        h2 {
          font-size: 20px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eaeaea;
        }

        .items-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }

        @media (max-width: 768px) {
          .items-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        .item-card {
          display: flex;
          flex-direction: column;
          text-decoration: none;
          color: inherit;
        }

        .image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4/3;
          border-radius: 12px;
          overflow: hidden;
          background-color: #f5f5f5;
          margin-bottom: 16px;
        }

        :global(.item-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
          padding: 20px;
        }

        .item-card:hover :global(.item-image) {
          transform: translateY(-4px);
        }

        .item-info {
          display: flex;
          flex-direction: column;
          gap: 1px;
        }

        .item-meta {
          margin-bottom: 4px;
        }

        .brand-category {
          font-size: 13px;
          color: #666;
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .item-name {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
          color: #000;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .item-card:hover .item-name {
          text-decoration: underline;
        }
      `}</style>
    </Layout>
  );
};

export default ObjectsPage; 