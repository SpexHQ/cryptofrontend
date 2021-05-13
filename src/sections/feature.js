/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Container, Grid } from 'theme-ui';
import SectionHeader from 'components/section-header';
import FeatureCard from 'components/feature-card.js';
import Performance from 'assets/feature/performance.svg';
import Partnership from 'assets/feature/partnership.svg';
import Subscription from 'assets/feature/subscription.svg';
import Support from 'assets/feature/support.svg';

const data = [
  {
    id: 1,
    imgSrc: Performance,
    altText: 'Latest Information',
    title: 'Latest Information',
    text:
      'We collect the latest data of all available cryptocurrencies. Our data covers not only the latest prices, but also developements, traded volumes, market caps, maximum supply limits and number of coins circulated',
  },
  {
    id: 2,
    imgSrc: Partnership,
    altText: 'Tailor-made packages',
    title: 'Tailor-made packages',
    text:
      'We believe it’s important for everyone to choose which information are relevant. You decide for which coins you would liek to receive the relevant information. You will receive the selected information on a daily basis.',
  },
  {
    id: 3,
    imgSrc: Subscription,
    altText: 'AI Pro Advise',
    title: 'AI Pro Advise',
    text:
      'Our machine learning algorithms are using the latest technologies. Our algorithms are developed to provide you with data enriched advises.',
  },
  {
    id: 4,
    imgSrc: Support,
    altText: 'Customer Support',
    title: 'Customer Support',
    text:
      'We believe it’s important for everyone to get their individual questions answered. Our team of experts will try to answer all your questions related to digital currencies.',
  },
];

export default function Feature() {
  return (
   <section sx={{variant: 'section.feature'}}>
    <Container>
      <SectionHeader 
        slogan="Our features"
        title="Amazing useful features"
      />

      <Grid sx={styles.grid}>
        {data.map((item) => (
          <FeatureCard
            key={item.id}
            src={item.imgSrc}
            alt={item.altText}
            title={item.title}
            text={item.text}
          />
        ))}
      </Grid>
    </Container>

   </section>
  );
}

const styles = {
  grid: {
    pt: [0, null, null, null, null, null, 2],
    px: [5, 6, 0, null, 7, 8, 7],
    gridGap: [
      '40px 0',
      null,
      '45px 30px',
      null,
      '60px 50px',
      '70px 50px',
      null,
      '80px 90px',
    ],
    gridTemplateColumns: ['repeat(1,1fr)', null, 'repeat(2,1fr)'],
  },
};
