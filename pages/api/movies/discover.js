import fetch from 'node-fetch';
import { ConfigService } from '/services/config.service';

/**
 * @swagger
 * /api/movies/discover:
 *   get:
 *     description: Endpoint which returns discoverable movies.
 *     responses:
 *       200:
 *         description: A list of discoverable movies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: An error response due to client-side mistake.
 *       500:
 *         description: An error response due to server-side issue.
 */

export default async function handler(req, res) {
  const url = ConfigService.themoviedb.urls.discover;

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

    const apiResponse = await response.json();
    res.json({ status: 200, data: apiResponse.results });
  } catch (error) {
    console.error('Error fetching discoverable movies:', error);
    res.status(500).json({ status: 500, message: 'Internal Server Error' });
  }
}
