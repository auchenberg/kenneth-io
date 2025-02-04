import React from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import Image from 'next/image';

// Inspiration: https://paulstamatiou.com/

// Hardware
// https://paulstamatiou.com/gear/apple-studio-display
// https://paulstamatiou.com/gear/apple-macbook-pro
// https://paulstamatiou.com/gear/apple-iphone-first-generation

// Watches
// https://paulstamatiou.com/gear/omega-speedmaster-38
// IWC HOdinkee

// Travel
// https://paulstamatiou.com/gear/apple-airtags
// Rimowa

// Fashion
// https://paulstamatiou.com/gear/peak-design-everyday

// Photography
// https://paulstamatiou.com/gear/leica-m11-rangefinder
// https://paulstamatiou.com/gear/leica-q3-43

// Furniture
// Vitsoe shelves
// Wishbone chair
// Eames lounge chair
// https://paulstamatiou.com/gear/kismas-doric-lamp
// https://paulstamatiou.com/gear/xiaomi-mi-led-desk-lamp

// Cars
// 2019 Porsche 911 GT3 Touring
// 1987 Porsche 930 Turbo`
// Porsche 964
// 2019 Mercedes-Benz AMG G-63

// Books


const ObjectsPage = () => {
  const categories = {
    'Work': [
      {
        name: 'Apple Studio Display',
        description: 'My main display.',
        link: 'https://www.apple.com/studio-display/',
        image: '/images/objects/studio-display.jpg'
      },
      {
        name: 'Bang & Olufsen H95',
        description: 'Premium active noise-cancelling headphones with exceptional sound quality and craftsmanship. The titanium drivers and leather ear cushions make these my go-to headphones for focused work and travel.',
        link: 'https://www.bang-olufsen.com/en/us/headphones/beoplay-h95',
        image: '/images/objects/bang-olfsen-h95.jpg'
      },
      {
        name: 'Apple iPhone 16 Pro',
        description: 'My daily driver and mobile computing device.',
        link: 'https://www.apple.com/iphone-16-pro/',
        image: '/images/objects/apple-iphone-16-pro.jpg'
      },
      {}

    ],
    'Photography': [
      {
        name: 'Leica M11 Monochrome Rangefinder',
        description: 'My favorite camera for street photography.',
        link: 'https://www.leica-camera.com/en-us/products/m-system/m11-rangefinder-camera',
        image: '/images/objects/leica-m11-monochrome.jpg'
      },
      {
        name: 'Leica Q3',
        description: 'My favorite camera for street photography.',
        link: 'https://www.leica-camera.com/en-us/products/m-system/m11-rangefinder-camera',
        image: '/images/objects/leica-q3.jpg'
      }
    ],
    'Furniture': [
      {
        name: 'Vitsoe Shelves',
        description: 'My favorite way to store my books and other items.',
        link: 'https://www.vitsoe.com/products/shelves',
        image: '/images/objects/vitsoe.jpg'
      }
    ],
    'Cars': [
      {
        name: '2019 Porsche 911 GT3 Touring',
        description: 'My daily driver and mobile computing device.',
        link: 'https://www.apple.com/iphone-16-pro/',
        image: '/images/objects/porsche-911-gt3-touring.jpg'
      }
    ],
    'Watches': [
      {
        name: 'Omega Speedmaster Professional',
        description: 'My favorite watch for everyday wear.',
        link: 'https://www.omegawatches.com/watch-omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425001002',
        image: '/images/objects/omega-speedmaster.jpg'
      }
    ],
    // 'Fashion': [
    //   {
    //     name: 'Peak Design Everyday',
    //     description: 'My favorite everyday bag.',
    //     link: 'https://www.peakdesign.com/products/everyday-bag',
    //     image: '/images/objects/peak-design-everyday.jpg'
    //   }
    // ],
    'Travel': [
      {
        name: 'Apple AirTags',
        description: 'My favorite way to find my keys and other small items.',
        link: 'https://www.apple.com/airtags/',
        image: '/images/objects/airtag.jpg'
      },
      {
        name: 'Rimowa',
        description: 'My favorite luggage.',
        link: 'https://www.rimowa.com/en-us',
        image: '/images/objects/rimowa.jpg'
      }
    ]
  };

  return (
    <Layout
      title="Objects"
      description="A collection of objects I appreciate and use."
      center
    >
      <div className="objects">
        <header>
          <h1>Objects</h1>
          <p className="intro">A curated collection of objects I appreciate and use in my daily life.</p>
        </header>

        {Object.entries(categories).map(([category, items]) => (
          <section key={category}>
            <h2>{category}</h2>
            <div className="items">
              {items.map((item, index) => (
                <div className="item" key={index}>
                  <div className="item-content">
                    <h3>
                      <a href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.name}
                      </a>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="image-container">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="item-image"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <style jsx>{`
        .objects {
          margin: 0 auto;
          max-width: 600px;
        }

        .intro {
          color: #666;
          margin-bottom: 40px;
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

        .items {
          display: grid;
          gap: 40px;
        }

        .item {
          margin-bottom: 20px;
        }

        :global(.image-container) {
          position: relative;
          margin-bottom: 15px;
          border-radius: 8px;
          overflow: hidden;
        }

        :global(.item-image) {
          width: 100%;
          height: auto;
          max-height: 300px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        :global(.item-image:hover) {
          transform: scale(1.02);
        }

        .item-content {
          padding: 10px 0;
        }

        .item h3 {
          font-size: 16px;
          margin: 0 0 8px 0;
        }

        .item a {
          color: #000;
          text-decoration: none;
          border-bottom: 1px solid #eaeaea;
        }

        .item a:hover {
          border-bottom-color: #000;
        }

        .item p {
          color: #666;
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
        }
      `}</style>
    </Layout>
  );
};

export default ObjectsPage; 