import clientPromise from '/lib/mongodb';

/**
 * @swagger
 * /api/movies/{idMovie}/likes:
 *   patch:
 *     description: Increments the like counter for a specific movie by its ID, or creates a new counter if it doesn't exist.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the movie to increment likes for.
 *     responses:
 *       200:
 *         description: The like counter for the specified movie was incremented.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     action:
 *                       type: string
 *                     idMovie:
 *                       type: integer
 *                     matchedCount:
 *                       type: integer
 *                     modifiedCount:
 *                       type: integer
 *       201:
 *         description: A new like counter was created for the specified movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     action:
 *                       type: string
 *                     idMovie:
 *                       type: integer
 *                     insertedId:
 *                       type: string
 *       400:
 *         description: Invalid request parameters.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Internal Server Error.
 *   get:
 *     description: Returns the likes for a specific movie by its ID.
 *     parameters:
 *       - in: path
 *         name: idMovie
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the movie to fetch likes for.
 *     responses:
 *       200:
 *         description: The number of likes for the specified movie.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                 data:
 *                   type: object
 *                   properties:
 *                     likes:
 *                       type: integer
 *       400:
 *         description: Invalid request parameters.
 *       404:
 *         description: Movie not found.
 *       500:
 *         description: Internal Server Error.
 */

export default async function handler(req, res) {
  const idMovie = parseInt(req.query.idMovie, 10);

  if (isNaN(idMovie)) {
    // Handle case where idMovie is not a number
    return res.status(400).json({ status: 400, error: 'Invalid movie ID' });
  }

  const client = await clientPromise;
  const db = client.db('ynov-cloud');

  switch (req.method) {
    case 'PATCH':
      try {
        const updateResult = await db
          .collection('likes')
          .updateOne(
            { idTMDB: idMovie },
            { $inc: { likeCounter: 1 } },
            { upsert: true }
          );

        if (
          updateResult.matchedCount === 0 &&
          updateResult.upsertedCount === 1
        ) {
          // New document was created
          return res
            .status(201)
            .json({
              status: 201,
              data: {
                action: 'likeCounter created',
                idMovie: idMovie,
                insertedId: updateResult.upsertedId,
              },
            });
        } else {
          // Existing document was updated
          return res
            .status(200)
            .json({
              status: 200,
              data: {
                action: 'likeCounter incremented',
                idMovie: idMovie,
                matchedCount: updateResult.matchedCount,
                modifiedCount: updateResult.modifiedCount,
              },
            });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ status: 500, error: 'Internal Server Error' });
      }

    case 'GET':
      try {
        const like = await db.collection('likes').findOne({ idTMDB: idMovie });

        if (!like) {
          // No document found for the given idMovie
          return res
            .status(404)
            .json({ status: 404, error: 'Movie not found' });
        } else {
          return res.status(200).json({ status: 200, data: like });
        }
      } catch (error) {
        return res
          .status(500)
          .json({ status: 500, error: 'Internal Server Error' });
      }

    default:
      return res.status(405).json({ status: 405, error: 'Method Not Allowed' });
  }
}
