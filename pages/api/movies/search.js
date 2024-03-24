import { ConfigService } from '/services/config.service';

/**
 * @swagger
 * /api/movies/search:
 *   get:
 *     description: Endpoint which return the filtered part of movies to display
 *     parameters:
 *       - in: query
 *         name: sortByTitle
 *         required: false
 *         type: string
 *         description: Type of sorting to use on movies list
 *       - in: query
 *         name: page
 *         required: true
 *         type: integer
 *         description: Number of current page to display on movies list
 */

export default async function handler(req, res) {
    
}
