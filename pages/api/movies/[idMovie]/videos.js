import fetch from 'node-fetch';
import clientPromise from '/lib/mongodb';
import { ConfigService } from '/services/config.service';

/**
 * @swagger
 * /api/movies/{idMovie}/videos:
 *   get:
 *     description: Endpoint which returns videos for a specific movie by its ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the movie to fetch videos for.
 *     responses:
 *       200:
 *         description: A list of videos for the specified movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     videos:
 *                       type: array
 *       400:
 *         description: Invalid request parameters.
 *       404:
 *         description: Movie not found.
 */

export default async function handler(req, res) {
  const idMovie = parseInt(req.query.idMovie, 10);
  if (isNaN(idMovie)) {
    return res.status(400).json({ status: 400, error: 'Invalid movie ID' });
  }

  const url = `${ConfigService.themoviedb.urls.movie}/${idMovie}/videos`;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const videos = await response.json();

    if (!videos || videos.results.length === 0) {
      return res.status(404).json({ status: 404, error: 'Not Found' });
    }

    res.json({ status: 200, data: { videos: videos.results } });
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
}
