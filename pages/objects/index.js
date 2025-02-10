import React from 'react';
import Layout from '../../components/layout';
import Link from 'next/link';
import Image from 'next/image';


// TODO:
// - Bookcases
// - Gaggennau


const ObjectsPage = () => {
  const categories = {
    'Home': [
      {
        name: 'Vitsoe Shelves',
        description: 'Timeless Dieter Rams design.',
        link: 'https://www.vitsoe.com/us/606',
        image: '/images/objects/vitsoe.jpg'
      },
      {
        name: 'Carl Hansen Wishbone Chair',
        description: 'A timeless dining chair.',
        link: 'https://www.carlhansen.com/en/en/collection/chairs/dining-chairs/ch24',
        image: '/images/objects/wishbone-chair.jpg'
      },
      {
        name: 'Isamu Noguchi Akari',
        description: 'Simple, beautiful and functional.',
        link: 'https://shop.noguchi.org/collections/akari-light-sculptures',
        image: '/images/objects/akari.jpg'
      },
      {
        name: 'La Marzocco Linea Micra',
        description: 'Daily shot of espresso.',
        link: 'https://home.lamarzoccousa.com/product/linea-micra/',
        image: '/images/objects/la-marzocco-lInea-micra.jpg'
      },
      {
        name: 'Poul Kjærholm PK22 chair',
        description: 'A timeless lounge chair.',
        link: 'https://www.fritzhansen.com/en/categories/by-series/pk22/pk22-upholstered?sku=PK22-ELBLA-SBSS',
        image: '/images/objects/pk22.jpg'
      },
      {
        name: 'Bang Olufsen Beosound 2',
        description: 'A timeless speaker.',
        link: 'https://www.bang-olufsen.com/en/us/speakers/beosound-2',
        image: '/images/objects/beosound2.jpg'
      }
    ],
    'Photography': [
      {
        name: 'Leica M11 Monochrome',
        description: 'My favorite camera for street photography.',
        link: 'https://www.leica-camera.com/en-us/products/m-system/m11-rangefinder-camera',
        image: '/images/objects/leica-m11-monochrome.jpg'
      },
      {
        name: 'Leica Q3',
        description: 'My favorite camera for everything else.',
        link: 'https://www.leica-camera.com/en-us/products/m-system/m11-rangefinder-camera',
        image: '/images/objects/leica-q3.jpg'
      }
    ],
    'Cars': [
      {
        name: '2019 Porsche 911 GT3 Touring',
        description: 'GT Silver.',
        link: 'https://www.cnet.com/roadshow/reviews/2019-porsche-911-gt3-touring-preview/',
        image: '/images/objects/porsche-911-gt3-touring.jpg'
      },
      // {
      //   name: '1993 Porsche 964 Carrera 4',
      //   description: 'Oak Green Metallic',
      //   link: 'https://www.porsche.com/international/accessoriesandservice/classic/models/964/',
      //   image: '/images/objects/porsche-964.jpg'
      // },
      // {
      //   name: '1989 Porsche 930 Turbo 3.3',
      //   description: 'Black',
      //   link: 'https://www.porsche.com/international/accessoriesandservice/classic/models/911-g/#open-911-turbo',
      //   image: '/images/objects/porsche-930.jpg'
      // },
      {
        name: '1987 Porsche 911 Targa',
        description: 'Guards Red.',
        link: 'https://www.porsche.com/international/accessoriesandservice/classic/models/911-g/',
        image: '/images/objects/porsche-911-carrera-targa.jpg'
      },
    ],
    'Work': [
      {
        name: 'Apple Macbook Pro 13',
        description: 'My daily driver.',
        link: 'https://www.apple.com/macbook-pro-13/',
        image: '/images/objects/apple-macbook-pro.jpg'
      },
      {
        name: 'Apple Studio Display',
        description: 'My main display.',
        link: 'https://www.apple.com/studio-display/',
        image: '/images/objects/apple-studio-display.jpg'
      },
      {
        name: 'Bang & Olufsen H95',
        description: 'My go-to headphones.',
        link: 'https://www.bang-olufsen.com/en/us/headphones/beoplay-h95',
        image: '/images/objects/bang-olfsen-h95.jpg'
      },
      {
        name: 'Apple iPhone 16 Pro',
        description: 'My mobile driver.',
        link: 'https://www.apple.com/iphone-16-pro/',
        image: '/images/objects/apple-iphone-16-pro.jpg'
      },
      {
        name: 'Apple EarPods',
        description: "Can't do meetings without",
        link: 'https://www.apple.com/shop/product/MYQY3AM/A/earpods-usb-c',
        image: '/images/objects/apple-earbuds.jpg'
      },
    ],
    'Watches': [
      {
        name: 'Omega Speedmaster Professional',
        description: 'My favorite watch for everyday wear.',
        link: 'https://www.omegawatches.com/watch-omega-speedmaster-moonwatch-professional-co-axial-master-chronometer-chronograph-42-mm-31030425001002',
        image: '/images/objects/omega-speedmaster.jpg'
      },
      {
        name: 'IWC Hodinkee',
        description: 'My favorite re-issue watch.',
        link: 'https://limited.hodinkee.com/iwc/',
        image: '/images/objects/iwc1.jpg'
      }
    ],
    'Travel': [
      {
        name: 'Apple AirTags',
        description: 'Helps me stay sane.',
        link: 'https://www.apple.com/airtags/',
        image: '/images/objects/airtags.jpg'
      },
      {
        name: 'Rimowa luggages',
        description: 'Expensive, but worth it.',
        link: 'https://www.rimowa.com/en-us',
        image: '/images/objects/rimowa.jpg'
      }
    ]
  };

  return (
    <Layout
      title="Objects - a curated collection of objects I appreciate and use in my daily life."
      description="A curated collection of objects I appreciate and use in my daily life."
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
          max-width: 1200px;
          padding: 0 20px;
        }

        .intro {
          color: #666;
          margin-bottom: 40px;
          max-width: 600px;
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
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
        }

        @media (max-width: 768px) {
          .items {
            grid-template-columns: 1fr;
          }
        }

        .item {
          margin-bottom: 20px;
        }

        :global(.image-container) {
          position: relative;
          margin-bottom: 15px;
          border-radius: 10px;
          overflow: hidden;
          background-color: #fff;
          aspect-ratio: 16/9;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        :global(.item-image) {
          width: 100%;
          height: 100%;
          object-fit: cover;
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
          min-height: 50px;
          display: inline-block;
        }
      `}</style>
    </Layout>
  );
};

export default ObjectsPage; 