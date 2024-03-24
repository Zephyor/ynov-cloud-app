import fetch from 'node-fetch';
import { ConfigService } from '/services/config.service';

/**
 * @swagger
 * /api/movies/top_rated:
 *   get:
 *     summary: "Endpoint which returns a list of topRated movies."
 *     description: OK Returns a list of topRated movies used case 1096197
 *     responses:
 *       200:
 *         description: A JSON array of topRated movie objects
 */

export default async function handler(req, res) {
  const url = ConfigService.themoviedb.urls.top_rated; //https://api.themoviedb.org/3/top_rated
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + ConfigService.themoviedb.keys.API_TOKEN,
    },
  };
  const apiResponse = await fetch(url, options)
    .then((r) => r.json())
    .catch((err) => console.error('error:' + err));
  res.json({ status: 200, data: apiResponse.results });
}
