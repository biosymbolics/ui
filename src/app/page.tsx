'use client';

import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

import { Button } from '@/components/input';

const Home = (): JSX.Element => (
    <main>
        <div
            style={{
                backgroundImage:
                    'linear-gradient(rgba(0, 0, 0, 0.1),rgba(0, 0, 0, 0.1)) , url(dalle-white-blue-black-network.png)',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'absolute',
                top: 0,
                left: 0,
                opacity: 0.6,
                width: '100%',
                height: '100%',
            }}
        />
        <Box alignItems="center" display="flex" height="100vh">
            <Box maxWidth={600} mx="auto">
                <Card size="lg" sx={{ p: 3 }} variant="outlined">
                    <Typography gutterBottom level="h1">
                        Biosymbolics.ai
                    </Typography>
                    <Typography level="body-md">
                        Systematic, pattern-based and predictive methods for
                        navigating the biomedical data landscape. Our technology
                        enables you to structure and quantify hunches,
                        triangulate across heterogeneous data sources, and
                        understand broad landscapes of complex activity.
                    </Typography>
                    <Typography gutterBottom level="body-md">
                        Our first product, currently in alpha, is a biomedical
                        entity explorer with NPV estimation. We are seeking
                        early partners. If you are a biomedical PE buyout fund
                        interested in having an outsized influence on the
                        roadmap and the potential for disease area exclusivity,
                        let&apos;s talk.
                    </Typography>
                    <CardActions>
                        <Button
                            endDecorator={<KeyboardArrowRight />}
                            href="mailto:kristin@biosymbolics.ai"
                            sx={{
                                flexGrow: '0 !important',
                                marginLeft: 'auto',
                            }}
                        >
                            Schedule a Demo
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Box>
    </main>
);
export default Home;
