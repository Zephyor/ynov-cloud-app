import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ProTip from '../src/theme/mui-base-components/ProTip';
import Copyright from '../src/theme/mui-base-components/Copyright';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/auth.context';
import Link from '../src/theme/mui-base-components/Link';

export default function Index() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/ui/sign-in');
    }
  }, [user, router]);
  return (
    <Container maxWidth='sm'>
      <Box sx={{ my: 4 }}>
        <Typography variant='h4' component='h1' sx={{ mb: 2 }}>
          Material UI - Next.js example
        </Typography>
        <Link href='/About' color='secondary'>
          Go to the about page
        </Link>
        <Link href='/ui/landing' color='secondary'>
          Go to the landing page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
