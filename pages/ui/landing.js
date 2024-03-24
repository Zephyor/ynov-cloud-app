import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function Landing() {
  const [discoverMovies, setDiscoverMovies] = useState([]);

  useEffect(() => {
    fetch('/api/movies/discover')
      .then((response) => response.json())
      .then((data) => setDiscoverMovies(data.data))
      .catch((error) =>
        console.error('Error fetching top rated movies:', error)
      );
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='lg'>
        <Grid container spacing={4}>
          {discoverMovies.map((movie) => (
            <Grid item key={movie.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component='img'
                  height='140'
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {movie.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    Release Date: {movie.release_date}
                  </Typography>
                  <Typography variant='body2' color='text.primary'>
                    Rating: {movie.vote_average} / 10
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {movie.overview.length > 150
                      ? movie.overview.substring(0, 147) + '...'
                      : movie.overview}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small'>Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default Landing;
