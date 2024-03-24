// pages/ui/movieDetails/[id].js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  Box,
  Card,
  CardMedia,
  CardContent,
  Chip,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PrimarySearchAppBar from '../../../src/themes/mui-base-components/Header';

const theme = createTheme();

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/movies/${id}`)
        .then((response) => response.json())
        .then((data) => setMovie(data.data))
        .catch((error) =>
          console.error('Error fetching movie details:', error)
        );
    }
  }, [id]);

  return (
    <ThemeProvider theme={theme}>
      <PrimarySearchAppBar />

      <Container component='main' maxWidth='md'>
        <Box sx={{ my: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Details of : {movie?.title}
          </Typography>
        </Box>
        {movie && (
          <Card>
            <CardMedia
              component='img'
              height='400'
              image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <CardContent>
              <Typography gutterBottom variant='h4' component='div'>
                {movie.title} ({new Date(movie.release_date).getFullYear()})
              </Typography>
              <Typography variant='body1' color='text.secondary' gutterBottom>
                {movie.overview}
              </Typography>
              <Typography variant='h6' component='div'>
                Genres:
              </Typography>
              {movie.genres.map((genre) => (
                <Chip
                  key={genre.id}
                  label={genre.name}
                  variant='outlined'
                  style={{ marginRight: 5 }}
                />
              ))}
              <Typography
                variant='body2'
                color='text.secondary'
                component='div'
                style={{ marginTop: 10 }}
              >
                Runtime: {movie.runtime} minutes
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Release Date: {movie.release_date}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Rating: {movie.vote_average} / 10 ({movie.vote_count} votes)
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Tagline: {movie.tagline}
              </Typography>
            </CardContent>
          </Card>
        )}
        <Box sx={{ my: 4 }}>
          <Typography variant='h4' component='h1' gutterBottom>
            Footer
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
