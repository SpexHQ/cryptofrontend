/** @jsx jsx */
import { jsx } from 'theme-ui';
import { Container, Grid } from 'theme-ui';
import SectionHeader from '../components/section-header';
import FeatureCardColumn from 'components/feature-card-column.js';
import Performance from 'assets/key-feature/performance.svg';
import Partnership from 'assets/key-feature/partnership.svg';
import Subscription from 'assets/key-feature/subscription.svg';
import Support from 'assets/key-feature/support.svg';
import FeatureCard from 'components/feature-card';

const data = [
  {
    id: 1,
    imgSrc: Performance,
    altText: 'Latest Information',
    title: 'Latest Information',
    text:
      'Get the latest information on all available cryptocurrencies.',
  },
  {
    id: 2,
    imgSrc: Partnership,
    altText: 'Tailor-made packages',
    title: 'Tailor-made packages',
    text:
      'You decide which information are relevant for you.',
  },
  {
    id: 3,
    imgSrc: Subscription,
    altText: 'AI Pro Advise',
    title: 'AI Pro Advise',
    text:
      'Get recommendations based on Artificial Intelligence.',
  },
  {
    id: 4,
    imgSrc: Support,
    altText: 'Customer Support',
    title: 'Customer Support',
    text:
      "You have questions? Don't hesitate to contact us anytime.",
  },
];

export default function KeyFeature() {
  return (
   <section sx={{variant: 'section.keyFeature'}} id="feature">
     <Container>
        <SectionHeader
          slogan="At a glance"
          title="What do we offer"
        />
        <Grid sx={styles.grid}>
          {data.map((item) => (
            <FeatureCardColumn
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
    width: ['100%', '80%', '100%'],
    mx: 'auto',
    gridGap: [
      '35px 0',
      null,
      '40px 40px',
      '50px 60px',
      '30px',
      '50px 40px',
      '55px 90px',
    ],
    gridTemplateColumns: [
      'repeat(1,1fr)',
      null,
      'repeat(2,1fr)',
      null,
      'repeat(4,1fr)',
    ],
  },
};
